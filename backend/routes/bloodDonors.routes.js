const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all blood donors with filters
router.get('/', async (req, res) => {
    try {
        const { blood_group, district, upazila, is_available } = req.query;
        let sqlQuery = 'SELECT * FROM blood_donors WHERE 1=1';
        const params = [];
        let paramCount = 1;

        if (blood_group) {
            sqlQuery += ` AND blood_group = $${paramCount}`;
            params.push(blood_group);
            paramCount++;
        }

        if (district) {
            sqlQuery += ` AND district = $${paramCount}`;
            params.push(district);
            paramCount++;
        }

        if (upazila) {
            sqlQuery += ` AND upazila = $${paramCount}`;
            params.push(upazila);
            paramCount++;
        }

        if (is_available !== undefined) {
            sqlQuery += ` AND is_available = $${paramCount}`;
            params.push(is_available === 'true');
            paramCount++;
        }

        sqlQuery += ' ORDER BY name ASC';

        const result = await query(sqlQuery, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching blood donors:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch blood donors' });
    }
});

// Create new blood donor
router.post('/', async (req, res) => {
    try {
        const { name, blood_group, phone, district, upazila, facebook_url, last_donation_date, is_available } = req.body;

        const result = await query(
            `INSERT INTO blood_donors (name, blood_group, phone, district, upazila, facebook_url, last_donation_date, is_available) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, blood_group, phone, district, upazila, facebook_url, last_donation_date, is_available !== false]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating blood donor:', error);
        res.status(500).json({ success: false, error: 'Failed to create blood donor' });
    }
});

// Update blood donor
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, blood_group, phone, district, upazila, facebook_url, last_donation_date, is_available } = req.body;

        const result = await query(
            `UPDATE blood_donors 
       SET name = COALESCE($1, name),
           blood_group = COALESCE($2, blood_group),
           phone = COALESCE($3, phone),
           district = COALESCE($4, district),
           upazila = COALESCE($5, upazila),
           facebook_url = COALESCE($6, facebook_url),
           last_donation_date = COALESCE($7, last_donation_date),
           is_available = COALESCE($8, is_available),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9 RETURNING *`,
            [name, blood_group, phone, district, upazila, facebook_url, last_donation_date, is_available, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Blood donor not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating blood donor:', error);
        res.status(500).json({ success: false, error: 'Failed to update blood donor' });
    }
});

module.exports = router;
