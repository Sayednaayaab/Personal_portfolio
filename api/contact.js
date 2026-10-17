import nodemailer from 'nodemailer';

// Vercel serverless function: POST /api/contact
// Required environment variables (set in Vercel → Project → Settings → Environment Variables):
//   EMAIL_USER       Gmail address used to send
//   EMAIL_PASS       Gmail App Password (16 chars, spaces are stripped)
//   RECIPIENT_EMAIL  Where messages are delivered (defaults to EMAIL_USER)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit. Serverless instances are short-lived, so this only
// slows down bursts hitting the same warm instance.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate({ name, email, subject, message }) {
  const errors = [];
  if (typeof name !== 'string' || name.trim().length < 2) errors.push('Name must be at least 2 characters long.');
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) errors.push('Valid email is required.');
  if (typeof subject !== 'string' || subject.trim().length < 2) errors.push('Subject must be at least 2 characters.');
  if (typeof message !== 'string' || message.trim().length < 10) errors.push('Message must be at least 10 characters long.');
  return errors;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const errors = validate(body);
  if (errors.length) {
    return res.status(400).json({ message: errors[0], errors });
  }

  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.replace(/\s+/g, '');
  if (!user || !pass) {
    console.error('EMAIL_USER / EMAIL_PASS environment variables are not set');
    return res.status(500).json({ message: 'Email service is not configured.' });
  }

  const { name, email, subject, message } = body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to: process.env.RECIPIENT_EMAIL || user,
      replyTo: email,
      subject: `Portfolio: ${subject.trim()}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <div style="white-space: pre-line;">${escapeHtml(message)}</div>
      `,
    });
    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Send email error:', error);
    return res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
}
