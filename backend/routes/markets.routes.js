const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM markets WHERE is_active = true ORDER BY name ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching markets:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch markets' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, name_en, location, market_days, type } = req.body;
        const result = await query(
            `INSERT INTO markets (name, name_en, location, market_days, type) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, name_en, location, market_days, type]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating market:', error);
        res.status(500).json({ success: false, error: 'Failed to create market' });
    }
});

module.exports = router;
