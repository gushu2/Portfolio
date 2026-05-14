const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: 'Too many contact requests. Please try again later.' }
});

router.post('/', contactLimiter, (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  // In production, integrate with email service (nodemailer, SendGrid, etc.)
  console.log('New contact inquiry:', { name, email, phone, service, message });

  res.json({ message: 'Thank you! Your inquiry has been received. I will get back to you soon.' });
});

module.exports = router;
