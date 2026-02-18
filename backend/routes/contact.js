const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { authMiddleware } = require('../middleware/auth');

// Create email transporter (configure in .env)
const createTransporter = () => {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { name, email, phone, message, event_type } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Save to database
    const [result] = await pool.query(
      'INSERT INTO contacts (name, email, phone, message, event_type) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || '', message, event_type || '']
    );

    // Send email notification
    const transporter = createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || 'noreply@chaind.com',
          to: process.env.CONTACT_EMAIL || 'info@chaind.com',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Event Type:</strong> ${event_type || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contacts (protected - admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { status, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM contacts';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM contacts';
    if (status) {
      countQuery += ' WHERE status = ?';
    }
    const [countResult] = await pool.query(countQuery, status ? [status] : []);

    res.json({
      contacts: rows,
      total: countResult[0].total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Update contact status (protected)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { status } = req.body;

    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    await pool.query(
      'UPDATE contacts SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    res.json({ message: 'Contact status updated' });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete contact (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    await pool.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = router;
