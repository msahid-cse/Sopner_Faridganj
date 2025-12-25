const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all active hero images
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM hero_images WHERE is_active = true ORDER BY display_order ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching hero images:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch hero images' });
    }
});

// Get single hero image
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'SELECT * FROM hero_images WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Hero image not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching hero image:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch hero image' });
    }
});

// Create new hero image
router.post('/', async (req, res) => {
    try {
        const { image_url, cloudinary_id, alt_text, display_order } = req.body;

        const result = await query(
            `INSERT INTO hero_images (image_url, cloudinary_id, alt_text, display_order) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
            [image_url, cloudinary_id, alt_text, display_order || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating hero image:', error);
        res.status(500).json({ success: false, error: 'Failed to create hero image' });
    }
});

// Update hero image
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url, cloudinary_id, alt_text, display_order, is_active } = req.body;

        const result = await query(
            `UPDATE hero_images 
       SET image_url = COALESCE($1, image_url),
           cloudinary_id = COALESCE($2, cloudinary_id),
           alt_text = COALESCE($3, alt_text),
           display_order = COALESCE($4, display_order),
           is_active = COALESCE($5, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
            [image_url, cloudinary_id, alt_text, display_order, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Hero image not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating hero image:', error);
        res.status(500).json({ success: false, error: 'Failed to update hero image' });
    }
});

// Delete hero image
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'DELETE FROM hero_images WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Hero image not found' });
        }

        res.json({ success: true, message: 'Hero image deleted successfully' });
    } catch (error) {
        console.error('Error deleting hero image:', error);
        res.status(500).json({ success: false, error: 'Failed to delete hero image' });
    }
});

module.exports = router;
