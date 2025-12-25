const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all active advisors
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM advisors WHERE is_active = true ORDER BY is_chief DESC, display_order ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching advisors:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch advisors' });
    }
});

// Get single advisor
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'SELECT * FROM advisors WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Advisor not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching advisor:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch advisor' });
    }
});

// Create new advisor
router.post('/', async (req, res) => {
    try {
        const { name, name_en, role, position, institution, image_url, cloudinary_id, is_chief, display_order } = req.body;

        const result = await query(
            `INSERT INTO advisors (name, name_en, role, position, institution, image_url, cloudinary_id, is_chief, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [name, name_en, role, position, institution, image_url, cloudinary_id, is_chief || false, display_order || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating advisor:', error);
        res.status(500).json({ success: false, error: 'Failed to create advisor' });
    }
});

// Update advisor
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, name_en, role, position, institution, image_url, cloudinary_id, is_chief, display_order, is_active } = req.body;

        const result = await query(
            `UPDATE advisors 
       SET name = COALESCE($1, name),
           name_en = COALESCE($2, name_en),
           role = COALESCE($3, role),
           position = COALESCE($4, position),
           institution = COALESCE($5, institution),
           image_url = COALESCE($6, image_url),
           cloudinary_id = COALESCE($7, cloudinary_id),
           is_chief = COALESCE($8, is_chief),
           display_order = COALESCE($9, display_order),
           is_active = COALESCE($10, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 RETURNING *`,
            [name, name_en, role, position, institution, image_url, cloudinary_id, is_chief, display_order, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Advisor not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating advisor:', error);
        res.status(500).json({ success: false, error: 'Failed to update advisor' });
    }
});

// Delete advisor
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'DELETE FROM advisors WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Advisor not found' });
        }

        res.json({ success: true, message: 'Advisor deleted successfully' });
    } catch (error) {
        console.error('Error deleting advisor:', error);
        res.status(500).json({ success: false, error: 'Failed to delete advisor' });
    }
});

module.exports = router;
