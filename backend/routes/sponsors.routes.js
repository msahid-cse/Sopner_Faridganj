const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all active sponsors
router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM sponsors WHERE is_active = true ORDER BY display_order ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching sponsors:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch sponsors' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, logo_url, cloudinary_id, website_url, display_order } = req.body;
        const result = await query(
            `INSERT INTO sponsors (name, logo_url, cloudinary_id, website_url, display_order) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, logo_url, cloudinary_id, website_url, display_order || 0]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating sponsor:', error);
        res.status(500).json({ success: false, error: 'Failed to create sponsor' });
    }
});

module.exports = router;
