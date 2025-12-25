const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let sqlQuery = 'SELECT * FROM upazila_data WHERE is_active = true';
        const params = [];

        if (category) {
            sqlQuery += ' AND category = $1';
            params.push(category);
        }

        sqlQuery += ' ORDER BY category, display_order ASC';

        const result = await query(sqlQuery, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching upazila data:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch upazila data' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { category, title, value, display_order } = req.body;
        const result = await query(
            `INSERT INTO upazila_data (category, title, value, display_order) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
            [category, title, value, display_order || 0]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating upazila data:', error);
        res.status(500).json({ success: false, error: 'Failed to create upazila data' });
    }
});

module.exports = router;
