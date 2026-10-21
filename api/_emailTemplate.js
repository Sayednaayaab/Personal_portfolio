// Branded HTML email for contact form submissions.
// Files in /api starting with "_" are not deployed as endpoints by Vercel.
// Email clients ignore <style> blocks and modern CSS, so everything is
// table-based with inline styles.

const PORTFOLIO_URL = 'https://sayedmirchoni-portfolio.vercel.app/';
const OWNER_NAME = 'Sayed Mirchoni';

// Colors taken from the portfolio's dark theme (src/index.css)
const c = {
  page: '#0B0E13',
  card: '#14181F',
  panel: '#1A1F28',
  border: '#262D39',
  text: '#E8ECF2',
  muted: '#8B95A5',
  primary: '#2A6DF4',
  accent: '#17CFBF',
};

const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'JetBrains Mono', Consolas, 'Courier New', monospace";

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function field(label, valueHtml) {
  return `
    <tr>
      <td style="padding: 0 0 18px 0;">
        <div style="font-family: ${MONO}; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${c.muted}; padding-bottom: 6px;">${label}</div>
        <div style="font-family: ${FONT}; font-size: 16px; line-height: 1.5; color: ${c.text};">${valueHtml}</div>
      </td>
    </tr>`;
}

export function buildContactEmail({ name, email, subject, message }) {
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safeSubject = escapeHtml(subject.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, '<br>');
  const initial = escapeHtml(name.trim().charAt(0).toUpperCase() || '?');

  const sentAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const replyHref = `mailto:${encodeURIComponent(email.trim())}?subject=${encodeURIComponent(`Re: ${subject.trim()}`)}`;
  const preheader = `${name.trim()}: ${message.trim().slice(0, 90)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>New portfolio message</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${c.page};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: ${c.page};">${escapeHtml(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${c.page}" style="background-color: ${c.page};">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px;">

          <!-- Brand row -->
          <tr>
            <td style="padding: 0 4px 16px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family: ${FONT}; font-size: 18px; font-weight: 700; color: ${c.text};">
                    <span style="color: ${c.primary};">&lt;</span>Portfolio<span style="color: ${c.accent};">/&gt;</span>
                  </td>
                  <td align="right" style="font-family: ${MONO}; font-size: 12px; color: ${c.muted};">${escapeHtml(sentAt)} IST</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td bgcolor="${c.card}" style="background-color: ${c.card}; border: 1px solid ${c.border}; border-radius: 16px; overflow: hidden;">

              <!-- Gradient bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="4" bgcolor="${c.primary}" style="height: 4px; line-height: 4px; font-size: 0; background-color: ${c.primary}; background-image: linear-gradient(90deg, ${c.primary}, ${c.accent}); border-radius: 16px 16px 0 0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Heading -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 32px 32px 8px 32px;">
                    <div style="font-family: ${MONO}; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: ${c.accent};">// New message</div>
                    <h1 style="margin: 10px 0 0 0; font-family: ${FONT}; font-size: 26px; line-height: 1.3; font-weight: 700; color: ${c.text};">Someone wants to work with you</h1>
                  </td>
                </tr>
              </table>

              <!-- Sender -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 20px 32px 8px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="48" height="48" align="center" valign="middle" bgcolor="${c.primary}" style="width: 48px; height: 48px; border-radius: 24px; background-color: ${c.primary}; background-image: linear-gradient(135deg, ${c.primary}, ${c.accent}); font-family: ${FONT}; font-size: 20px; font-weight: 700; color: #ffffff;">${initial}</td>
                        <td style="padding-left: 14px;">
                          <div style="font-family: ${FONT}; font-size: 17px; font-weight: 600; color: ${c.text};">${safeName}</div>
                          <a href="mailto:${safeEmail}" style="font-family: ${FONT}; font-size: 14px; color: ${c.accent}; text-decoration: none;">${safeEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 20px 32px 0 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid ${c.border}; padding-top: 20px;">
                      ${field('Subject', safeSubject)}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 0 32px;">
                    <div style="font-family: ${MONO}; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${c.muted}; padding-bottom: 8px;">Message</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td bgcolor="${c.panel}" style="background-color: ${c.panel}; border: 1px solid ${c.border}; border-left: 3px solid ${c.accent}; border-radius: 10px; padding: 18px 20px; font-family: ${FONT}; font-size: 15px; line-height: 1.7; color: ${c.text};">${safeMessage}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Reply button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 28px 32px 32px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="${c.primary}" style="border-radius: 10px; background-color: ${c.primary}; background-image: linear-gradient(90deg, ${c.primary}, ${c.accent});">
                          <a href="${replyHref}" style="display: inline-block; padding: 14px 28px; font-family: ${FONT}; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 10px;">Reply to ${safeName} &rarr;</a>
                        </td>
                      </tr>
                    </table>
                    <div style="font-family: ${FONT}; font-size: 12px; color: ${c.muted}; padding-top: 12px;">Or just hit reply. It goes straight to ${safeEmail}.</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 16px 0 16px; font-family: ${FONT}; font-size: 12px; line-height: 1.6; color: ${c.muted};">
              Sent from the contact form on
              <a href="${PORTFOLIO_URL}" style="color: ${c.accent}; text-decoration: none;">${OWNER_NAME}'s portfolio</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    'New message from your portfolio',
    '',
    `From:    ${name.trim()} <${email.trim()}>`,
    `Subject: ${subject.trim()}`,
    `Sent:    ${sentAt} IST`,
    '',
    message.trim(),
    '',
    '---',
    `Reply directly to this email to respond to ${name.trim()}.`,
    PORTFOLIO_URL,
  ].join('\n');

  return { html, text };
}
