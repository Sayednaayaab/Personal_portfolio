const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Rate limiting (simple IP based)
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const limitKey = `contact:${clientIP}`;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  let requests = req.vars.rateLimits?.[limitKey] || [];
  requests = requests.filter(time => now - time < windowMs);
  if (requests.length >= maxRequests) {
    return res.status(429).json({ message: 'Too many requests, try again later' });
  }
  requests.push(now);
  req.vars.rateLimits = { ...req.vars.rateLimits, [limitKey]: requests };

  // Validation
  const { name, email, subject, message } = req.body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name required (2+ chars)');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email required');
  if (!subject || subject.trim().length < 2) errors.push('Subject required (2+ chars)');
  if (!message || message.trim().length < 10) errors.push('Message required (10+ chars)');

  if (errors.length) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  // Nodemailer setup
  let transporter;
  try {
    transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } catch (error) {
    console.error('Transporter error:', error);
    return res.status(503).json({ message: 'Email service unavailable' });
  }

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL || 'www.naayaab2004@gmail.com',
    subject: `${name} - Contact Form`,
    html: `
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

