const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all active founding members
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM founding_members WHERE is_active = true ORDER BY display_order ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching founding members:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch founding members' });
    }
});

// Get single founding member
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'SELECT * FROM founding_members WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Founding member not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching founding member:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch founding member' });
    }
});

// Create new founding member
router.post('/', async (req, res) => {
    try {
        const { name, name_en, role, position, institution, image_url, cloudinary_id, bio, display_order } = req.body;

        const result = await query(
            `INSERT INTO founding_members (name, name_en, role, position, institution, image_url, cloudinary_id, bio, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [name, name_en, role, position, institution, image_url, cloudinary_id, bio, display_order || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating founding member:', error);
        res.status(500).json({ success: false, error: 'Failed to create founding member' });
    }
});

// Update founding member
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, name_en, role, position, institution, image_url, cloudinary_id, bio, display_order, is_active } = req.body;

        const result = await query(
            `UPDATE founding_members 
       SET name = COALESCE($1, name),
           name_en = COALESCE($2, name_en),
           role = COALESCE($3, role),
           position = COALESCE($4, position),
           institution = COALESCE($5, institution),
           image_url = COALESCE($6, image_url),
           cloudinary_id = COALESCE($7, cloudinary_id),
           bio = COALESCE($8, bio),
           display_order = COALESCE($9, display_order),
           is_active = COALESCE($10, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 RETURNING *`,
            [name, name_en, role, position, institution, image_url, cloudinary_id, bio, display_order, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Founding member not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating founding member:', error);
        res.status(500).json({ success: false, error: 'Failed to update founding member' });
    }
});

// Delete founding member
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'DELETE FROM founding_members WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Founding member not found' });
        }

        res.json({ success: true, message: 'Founding member deleted successfully' });
    } catch (error) {
        console.error('Error deleting founding member:', error);
        res.status(500).json({ success: false, error: 'Failed to delete founding member' });
    }
});

module.exports = router;
