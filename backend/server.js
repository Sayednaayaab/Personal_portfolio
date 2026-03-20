const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/contact', limiter);

// Input validation function
function validateContactForm(data) {
  const { name, email, subject, message } = data;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email is required.');
  }
  if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
    errors.push('Subject is required and must be at least 2 characters.');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long.');
  }

  return errors;
}

// Sanitize env values
const EMAIL_USER = process.env.EMAIL_USER && process.env.EMAIL_USER.trim();
// Remove accidental spaces from app passwords (users sometimes copy with spaces)
const EMAIL_PASS = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : undefined;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'www.naayaab2004@gmail.com';

// Debug: show whether credentials are present (do NOT print secrets)
console.log('EMAIL_USER set:', !!EMAIL_USER);
console.log('EMAIL_PASS set:', !!EMAIL_PASS);

// Create transporter. If credentials are missing, fall back to an Ethereal test account
// (development only) so you can preview messages without real SMTP credentials.
let transporter;
let transporterReady = false;
(async () => {
  try {
    if (EMAIL_USER && EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });
      transporter.verify((err) => {
        if (err) {
          console.error('Nodemailer transporter verification failed:', err.message || err);
          transporterReady = false;
        } else {
          console.log('Nodemailer transporter is ready to send messages via Gmail');
          transporterReady = true;
        }
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      transporter.verify((err) => {
        if (err) {
          console.error('Ethereal transporter verification failed:', err.message || err);
          transporterReady = false;
        } else {
          console.log('Using Ethereal test account for email preview');
          transporterReady = true;
        }
      });
      console.log('Ethereal user:', testAccount.user);
    }
  } catch (err) {
    console.error('Error creating transporter:', err && err.message ? err.message : err);
    transporterReady = false;
  }
})();

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  const validationErrors = validateContactForm(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
  }

  // Ensure transporter is ready before attempting to send
  if (!transporter || !transporterReady) {
    return res.status(503).json({ message: 'Email service not ready. Try again shortly.' });
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'www.naayaab2004@gmail.com',
      subject: subject || `${name} - Contact`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h3>${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-line;">${message}</div>
          <hr />
          <p><strong>Server:</strong> EMAIL_USER=${process.env.EMAIL_USER}</p>
          <p><strong>Pass set:</strong> ${!!process.env.EMAIL_PASS ? 'Yes' : 'No'}</p>
          <p><strong>Recipient:</strong> ${RECIPIENT_EMAIL}</p>
        </div>
      `

    };

    const info = await transporter.sendMail(mailOptions);
    // Log full info for debugging, but only return serializable fields to client
    console.log('Email sent:', info);
    const result = {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    };
    // If using Ethereal test account, provide preview URL
    try {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        result.previewUrl = previewUrl;
        console.log('Preview URL:', previewUrl);
      }
    } catch (e) {
      // ignore if not available
    }
    res.status(200).json({ message: 'Email sent successfully', result });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Bind explicitly to IPv4 loopback to avoid IPv6-only binding issues on some systems
const HOST = '127.0.0.1';
const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err && err.message ? err.message : err);
});
