# Contact Form Email Integration and Navbar Cursor Fix - TODO

## Completed Tasks
- [x] Install @emailjs/browser package
- [x] Update ContactForm.tsx to import EmailJS
- [x] Initialize EmailJS with public key
- [x] Replace Formspree integration with EmailJS send method
- [x] Configure email parameters (from_name, from_email, project_type, message)
- [x] Fix EmailJS template parameters by removing hardcoded to_email
- [x] Add cursor-pointer class to navbar buttons on hover (desktop and mobile)

## Summary
The contact form now sends emails directly to www.naayaab2004@gmail.com using EmailJS when the "Send Message" button is clicked. The email includes the form data: name, email, project type, and message. Navbar buttons now show a pointer cursor on hover for better UX.
