const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get committee members by year
router.get('/', async (req, res) => {
    try {
        const { year } = req.query;
        let sqlQuery = 'SELECT * FROM committee_members WHERE is_active = true';
        const params = [];

        if (year) {
            sqlQuery += ' AND year = $1';
            params.push(year);
        }

        sqlQuery += ' ORDER BY display_order ASC';

        const result = await query(sqlQuery, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching committee members:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch committee members' });
    }
});

// Get single committee member
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(
            'SELECT * FROM committee_members WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Committee member not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching committee member:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch committee member' });
    }
});

// Create new committee member
router.post('/', async (req, res) => {
    try {
        const { name, name_en, role, position, institution, image_url, cloudinary_id, year, display_order } = req.body;

        const result = await query(
            `INSERT INTO committee_members (name, name_en, role, position, institution, image_url, cloudinary_id, year, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [name, name_en, role, position, institution, image_url, cloudinary_id, year, display_order || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating committee member:', error);
        res.status(500).json({ success: false, error: 'Failed to create committee member' });
    }
});

// Update committee member
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, name_en, role, position, institution, image_url, cloudinary_id, year, display_order, is_active } = req.body;

        const result = await query(
            `UPDATE committee_members 
       SET name = COALESCE($1, name),
           name_en = COALESCE($2, name_en),
           role = COALESCE($3, role),
           position = COALESCE($4, position),
           institution = COALESCE($5, institution),
           image_url = COALESCE($6, image_url),
           cloudinary_id = COALESCE($7, cloudinary_id),
           year = COALESCE($8, year),
           display_order = COALESCE($9, display_order),
           is_active = COALESCE($10, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 RETURNING *`,
            [name, name_en, role, position, institution, image_url, cloudinary_id, year, display_order, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Committee member not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating committee member:', error);
        res.status(500).json({ success: false, error: 'Failed to update committee member' });
    }
});

// Delete committee member
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'DELETE FROM committee_members WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Committee member not found' });
        }

        res.json({ success: true, message: 'Committee member deleted successfully' });
    } catch (error) {
        console.error('Error deleting committee member:', error);
        res.status(500).json({ success: false, error: 'Failed to delete committee member' });
    }
});

module.exports = router;
