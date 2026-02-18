-- CHAIND Database Schema
-- Permanent Jewelry Business Website

CREATE DATABASE IF NOT EXISTS chaind_db;
USE chaind_db;

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role ENUM('admin', 'editor') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Gallery table (for showcasing jewelry and events)
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    category ENUM('jewelry', 'events', 'bridal', 'corporate', 'markets') DEFAULT 'jewelry',
    featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    event_type VARCHAR(100),
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Event booking requests table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    event_type ENUM('market', 'private_party', 'corporate', 'bridal', 'popup', 'other') NOT NULL,
    event_date DATE,
    event_time VARCHAR(50),
    location VARCHAR(500),
    guest_count INT,
    message TEXT,
    budget_range VARCHAR(100),
    how_heard VARCHAR(255),
    status ENUM('new', 'contacted', 'confirmed', 'completed', 'cancelled') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_featured ON gallery(featured);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created ON contacts(created_at);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_created ON bookings(created_at);

-- Insert default admin user (password: admin123 - CHANGE IN PRODUCTION!)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (email, password_hash, name, role) VALUES 
('admin@chaind.com', '$2b$10$rQZ6.RKjVIHSxWH7mMWHXOqGYhVZxT6rJVXEJLrL.q5C5YqVqRhHW', 'Admin', 'admin')
ON DUPLICATE KEY UPDATE email = email;

-- Insert some sample gallery images (using Unsplash placeholders)
INSERT INTO gallery (title, description, image_url, category, featured) VALUES 
('Gold Chain Bracelet', 'Delicate 14k gold permanent bracelet', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800', 'jewelry', TRUE),
('Silver Anklet', 'Sterling silver permanent anklet', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800', 'jewelry', TRUE),
('Friendship Bracelets', 'Matching permanent bracelets for best friends', 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800', 'jewelry', TRUE),
('Market Event', 'Pop-up at local farmers market', 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800', 'markets', FALSE),
('Bridal Party', 'Bridesmaids getting permanent bracelets', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', 'bridal', TRUE),
('Corporate Event', 'Team building with permanent jewelry', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'corporate', FALSE);
