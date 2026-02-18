const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { authMiddleware } = require('../middleware/auth');

// Create email transporter
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

// Submit booking request (public)
router.post('/', async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { 
      name, 
      email, 
      phone, 
      event_type, 
      event_date, 
      event_time,
      location, 
      guest_count, 
      message,
      budget_range,
      how_heard
    } = req.body;

    // Validation
    if (!name || !email || !event_type) {
      return res.status(400).json({ error: 'Name, email, and event type are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Event type validation
    const validEventTypes = ['market', 'private_party', 'corporate', 'bridal', 'popup', 'other'];
    if (!validEventTypes.includes(event_type)) {
      return res.status(400).json({ error: 'Invalid event type' });
    }

    // Save to database
    const [result] = await pool.query(
      `INSERT INTO bookings 
        (name, email, phone, event_type, event_date, event_time, location, guest_count, message, budget_range, how_heard) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        email, 
        phone || '', 
        event_type, 
        event_date || null, 
        event_time || '',
        location || '', 
        guest_count || null, 
        message || '',
        budget_range || '',
        how_heard || ''
      ]
    );

    // Send email notification
    const transporter = createTransporter();
    if (transporter) {
      try {
        const eventTypeLabels = {
          market: 'Market/Festival',
          private_party: 'Private Party',
          corporate: 'Corporate Event',
          bridal: 'Bridal/Wedding',
          popup: 'Pop-up Event',
          other: 'Other'
        };

        await transporter.sendMail({
          from: process.env.EMAIL_FROM || 'noreply@chaind.com',
          to: process.env.BOOKING_EMAIL || process.env.CONTACT_EMAIL || 'info@chaind.com',
          subject: `New Booking Request: ${eventTypeLabels[event_type]} from ${name}`,
          html: `
            <h2>New Event Booking Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <hr>
            <p><strong>Event Type:</strong> ${eventTypeLabels[event_type]}</p>
            <p><strong>Event Date:</strong> ${event_date || 'Not specified'}</p>
            <p><strong>Event Time:</strong> ${event_time || 'Not specified'}</p>
            <p><strong>Location:</strong> ${location || 'Not specified'}</p>
            <p><strong>Expected Guests:</strong> ${guest_count || 'Not specified'}</p>
            <p><strong>Budget Range:</strong> ${budget_range || 'Not specified'}</p>
            <p><strong>How They Heard About Us:</strong> ${how_heard || 'Not specified'}</p>
            <hr>
            <p><strong>Additional Message:</strong></p>
            <p>${message ? message.replace(/\n/g, '<br>') : 'None'}</p>
          `
        });
      } catch (emailError) {
        console.error('Failed to send booking notification:', emailError);
      }
    }

    res.status(201).json({
      message: 'Booking request submitted successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Booking submission error:', error);
    res.status(500).json({ error: 'Failed to submit booking request' });
  }
});

// Get all bookings (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { status, event_type, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM bookings';
    const params = [];
    const conditions = [];

    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }

    if (event_type) {
      conditions.push('event_type = ?');
      params.push(event_type);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM bookings';
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    const countParams = params.slice(0, -2); // Remove limit and offset
    const [countResult] = await pool.query(countQuery, countParams);

    res.json({
      bookings: rows,
      total: countResult[0].total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get single booking (protected)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ booking: rows[0] });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

// Update booking (protected)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { status, notes } = req.body;

    const updates = [];
    const params = [];

    if (status) {
      const validStatuses = ['new', 'contacted', 'confirmed', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      updates.push('status = ?');
      params.push(status);
    }

    if (notes !== undefined) {
      updates.push('notes = ?');
      params.push(notes);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    params.push(req.params.id);
    await pool.query(
      `UPDATE bookings SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    res.json({ message: 'Booking updated' });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Delete booking (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    await pool.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

module.exports = router;
