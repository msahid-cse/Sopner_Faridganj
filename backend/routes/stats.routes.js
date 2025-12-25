const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all active statistics
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM statistics WHERE is_active = true ORDER BY display_order ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch statistics' });
    }
});

// Get single statistic
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'SELECT * FROM statistics WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Statistic not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching statistic:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch statistic' });
    }
});

// Create new statistic
router.post('/', async (req, res) => {
    try {
        const { title, value, icon, color, display_order } = req.body;

        const result = await query(
            `INSERT INTO statistics (title, value, icon, color, display_order) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, value, icon, color, display_order || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating statistic:', error);
        res.status(500).json({ success: false, error: 'Failed to create statistic' });
    }
});

// Update statistic
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, value, icon, color, display_order, is_active } = req.body;

        const result = await query(
            `UPDATE statistics 
       SET title = COALESCE($1, title),
           value = COALESCE($2, value),
           icon = COALESCE($3, icon),
           color = COALESCE($4, color),
           display_order = COALESCE($5, display_order),
           is_active = COALESCE($6, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
            [title, value, icon, color, display_order, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Statistic not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating statistic:', error);
        res.status(500).json({ success: false, error: 'Failed to update statistic' });
    }
});

// Delete statistic
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'DELETE FROM statistics WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Statistic not found' });
        }

        res.json({ success: true, message: 'Statistic deleted successfully' });
    } catch (error) {
        console.error('Error deleting statistic:', error);
        res.status(500).json({ success: false, error: 'Failed to delete statistic' });
    }
});

module.exports = router;
