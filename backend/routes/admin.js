const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// All admin routes require authentication
router.use(authMiddleware);

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const pool = req.app.get('db');

    // Get counts
    const [galleryCount] = await pool.query('SELECT COUNT(*) as count FROM gallery');
    const [newContacts] = await pool.query('SELECT COUNT(*) as count FROM contacts WHERE status = "new"');
    const [newBookings] = await pool.query('SELECT COUNT(*) as count FROM bookings WHERE status = "new"');
    const [totalContacts] = await pool.query('SELECT COUNT(*) as count FROM contacts');
    const [totalBookings] = await pool.query('SELECT COUNT(*) as count FROM bookings');

    // Recent contacts
    const [recentContacts] = await pool.query(
      'SELECT id, name, email, event_type, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 5'
    );

    // Recent bookings
    const [recentBookings] = await pool.query(
      'SELECT id, name, email, event_type, event_date, status, created_at FROM bookings ORDER BY created_at DESC LIMIT 5'
    );

    // Upcoming events (bookings with future dates)
    const [upcomingEvents] = await pool.query(
      `SELECT id, name, event_type, event_date, location, guest_count 
       FROM bookings 
       WHERE event_date >= CURDATE() AND status IN ('confirmed', 'new', 'contacted')
       ORDER BY event_date ASC 
       LIMIT 5`
    );

    res.json({
      stats: {
        galleryItems: galleryCount[0].count,
        newContacts: newContacts[0].count,
        newBookings: newBookings[0].count,
        totalContacts: totalContacts[0].count,
        totalBookings: totalBookings[0].count
      },
      recentContacts,
      recentBookings,
      upcomingEvents
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
