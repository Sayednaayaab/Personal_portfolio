# Contact Form Ready

The futuristic contact form is fully functional at `http://localhost:8080/contact`

## Setup
1. Backend (email sending):
```
cd backend
npm install
npm start
```
Runs on port 5001

2. Frontend:
```
bun run dev
```
Runs on port 8080, proxies /api to backend.

## Features
- Neon glassmorphism UI
- Zod validation
- Backend nodemailer + Gmail/Ethereal
- Rate limiting

## Nav
Header → Contact link takes you to the form page.

Test: Fill form, submit → check console/email preview.
