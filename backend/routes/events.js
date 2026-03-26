const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middleware/auth');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/events');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// Helper function to build Google Maps link from address
function buildMapLink(street, city, state, zip) {
  const parts = [street, city, state, zip].filter(Boolean);
  if (parts.length === 0) return null;
  const query = encodeURIComponent(parts.join(', '));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// Get all events (public) - upcoming by default
router.get('/', async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { status, includeAll } = req.query;
    
    let query = 'SELECT * FROM events';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    } else if (!includeAll) {
      // Default: only show upcoming events
      query += ' WHERE status = "upcoming" AND event_date >= CURDATE()';
    }

    query += ' ORDER BY event_date ASC, start_time ASC';

    const [rows] = await pool.query(query, params);
    
    // Add map link to each event
    const eventsWithMaps = rows.map(event => ({
      ...event,
      map_link: buildMapLink(event.street_address, event.city, event.state, event.zip_code)
    }));

    res.json({ events: eventsWithMaps });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get single event (public)
router.get('/:id', async (req, res) => {
  try {
    const pool = req.app.get('db');
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = rows[0];
    event.map_link = buildMapLink(event.street_address, event.city, event.state, event.zip_code);

    res.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create event (protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const pool = req.app.get('db');
    const {
      name,
      description,
      location_name,
      street_address,
      city,
      state,
      zip_code,
      event_date,
      start_time,
      end_time,
      status,
      image_url
    } = req.body;

    // Use uploaded file URL or provided URL
    let finalImageUrl = image_url || null;
    if (req.file) {
      finalImageUrl = `/uploads/events/${req.file.filename}`;
    }

    if (!name || !event_date || !start_time || !end_time) {
      return res.status(400).json({ error: 'Name, event date, start time, and end time are required' });
    }

    const [result] = await pool.query(
      `INSERT INTO events (
        name, description, image_url,
        location_name, street_address, city, state, zip_code,
        event_date, start_time, end_time, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description || '',
        finalImageUrl,
        location_name || '',
        street_address || '',
        city || '',
        state || '',
        zip_code || '',
        event_date,
        start_time,
        end_time,
        status || 'upcoming'
      ]
    );

    res.status(201).json({
      message: 'Event created',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event (protected)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const pool = req.app.get('db');
    const {
      name,
      description,
      location_name,
      street_address,
      city,
      state,
      zip_code,
      event_date,
      start_time,
      end_time,
      status,
      image_url
    } = req.body;

    // Get existing event
    const [existing] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Handle image update
    let finalImageUrl = existing[0].image_url;
    if (req.file) {
      finalImageUrl = `/uploads/events/${req.file.filename}`;
      // Delete old file if it's a local upload
      if (existing[0].image_url && existing[0].image_url.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', existing[0].image_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    } else if (image_url !== undefined) {
      finalImageUrl = image_url;
    }

    await pool.query(
      `UPDATE events SET 
        name = ?, 
        description = ?, 
        image_url = ?,
        location_name = ?,
        street_address = ?,
        city = ?,
        state = ?,
        zip_code = ?,
        event_date = ?,
        start_time = ?,
        end_time = ?,
        status = ?
      WHERE id = ?`,
      [
        name !== undefined ? name : existing[0].name,
        description !== undefined ? description : existing[0].description,
        finalImageUrl,
        location_name !== undefined ? location_name : existing[0].location_name,
        street_address !== undefined ? street_address : existing[0].street_address,
        city !== undefined ? city : existing[0].city,
        state !== undefined ? state : existing[0].state,
        zip_code !== undefined ? zip_code : existing[0].zip_code,
        event_date !== undefined ? event_date : existing[0].event_date,
        start_time !== undefined ? start_time : existing[0].start_time,
        end_time !== undefined ? end_time : existing[0].end_time,
        status !== undefined ? status : existing[0].status,
        req.params.id
      ]
    );

    res.json({ message: 'Event updated' });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    
    // Get existing event to delete file
    const [existing] = await pool.query('SELECT * FROM events WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Delete local file if exists
    if (existing[0].image_url && existing[0].image_url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', existing[0].image_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.query('DELETE FROM events WHERE id = ?', [req.params.id]);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
