const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM madrasas WHERE is_active = true ORDER BY name ASC',
            []
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching madrasas:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch madrasas' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, name_en, type, eiin, address, phone, email, established_year } = req.body;
        const result = await query(
            `INSERT INTO madrasas (name, name_en, type, eiin, address, phone, email, established_year) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, name_en, type, eiin, address, phone, email, established_year]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating madrasa:', error);
        res.status(500).json({ success: false, error: 'Failed to create madrasa' });
    }
});

module.exports = router;
