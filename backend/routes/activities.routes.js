const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all active activities
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM activities WHERE is_active = true ORDER BY display_order ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch activities' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, title_en, description, icon, color, display_order } = req.body;
        const result = await query(
            `INSERT INTO activities (title, title_en, description, icon, color, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [title, title_en, description, icon, color, display_order || 0]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating activity:', error);
        res.status(500).json({ success: false, error: 'Failed to create activity' });
    }
});

module.exports = router;
