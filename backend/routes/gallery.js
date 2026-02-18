const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { authMiddleware } = require('../middleware/auth');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/gallery');
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

// Get all gallery items (public)
router.get('/', async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { category, featured } = req.query;
    
    let query = 'SELECT * FROM gallery';
    const params = [];
    const conditions = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }

    if (featured === 'true') {
      conditions.push('featured = TRUE');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY sort_order ASC, created_at DESC';

    const [rows] = await pool.query(query, params);
    res.json({ gallery: rows });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// Get single gallery item (public)
router.get('/:id', async (req, res) => {
  try {
    const pool = req.app.get('db');
    const [rows] = await pool.query('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    res.json({ item: rows[0] });
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery item' });
  }
});

// Create gallery item (protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { title, description, category, featured, image_url } = req.body;

    // Use uploaded file URL or provided URL
    let finalImageUrl = image_url;
    if (req.file) {
      finalImageUrl = `/uploads/gallery/${req.file.filename}`;
    }

    if (!title || !finalImageUrl) {
      return res.status(400).json({ error: 'Title and image are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO gallery (title, description, image_url, category, featured) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', finalImageUrl, category || 'jewelry', featured === 'true' || featured === true]
    );

    res.status(201).json({
      message: 'Gallery item created',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({ error: 'Failed to create gallery item' });
  }
});

// Update gallery item (protected)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const pool = req.app.get('db');
    const { title, description, category, featured, image_url, sort_order } = req.body;

    // Get existing item
    const [existing] = await pool.query('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    // Use new uploaded file, provided URL, or keep existing
    let finalImageUrl = existing[0].image_url;
    if (req.file) {
      finalImageUrl = `/uploads/gallery/${req.file.filename}`;
      // Delete old file if it's a local upload
      if (existing[0].image_url.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', existing[0].image_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    } else if (image_url) {
      finalImageUrl = image_url;
    }

    await pool.query(
      `UPDATE gallery SET 
        title = ?, 
        description = ?, 
        image_url = ?, 
        category = ?, 
        featured = ?,
        sort_order = ?
      WHERE id = ?`,
      [
        title || existing[0].title,
        description !== undefined ? description : existing[0].description,
        finalImageUrl,
        category || existing[0].category,
        featured !== undefined ? (featured === 'true' || featured === true) : existing[0].featured,
        sort_order !== undefined ? sort_order : existing[0].sort_order,
        req.params.id
      ]
    );

    res.json({ message: 'Gallery item updated' });
  } catch (error) {
    console.error('Update gallery error:', error);
    res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

// Delete gallery item (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const pool = req.app.get('db');
    
    // Get existing item to delete file
    const [existing] = await pool.query('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }

    // Delete local file if exists
    if (existing[0].image_url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', existing[0].image_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

module.exports = router;
