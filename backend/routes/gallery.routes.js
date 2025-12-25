const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// Get all gallery categories
router.get('/categories', async (req, res) => {
    try {
        const { year } = req.query;
        let sqlQuery = 'SELECT * FROM gallery_categories WHERE is_active = true';
        const params = [];

        if (year) {
            sqlQuery += ' AND year = $1';
            params.push(year);
        }

        sqlQuery += ' ORDER BY year DESC, display_order ASC';

        const result = await query(sqlQuery, params);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching gallery categories:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch gallery categories' });
    }
});

// Get single category with images
router.get('/categories/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        // Get category
        const categoryResult = await query(
            'SELECT * FROM gallery_categories WHERE slug = $1 AND is_active = true',
            [slug]
        );

        if (categoryResult.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Gallery category not found' });
        }

        const category = categoryResult.rows[0];

        // Get images for this category
        const imagesResult = await query(
            'SELECT * FROM gallery_images WHERE category_id = $1 AND is_active = true ORDER BY display_order ASC',
            [category.id]
        );

        res.json({
            success: true,
            data: {
                ...category,
                images: imagesResult.rows
            }
        });
    } catch (error) {
        console.error('Error fetching gallery category:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch gallery category' });
    }
});

// Create new gallery category
router.post('/categories', async (req, res) => {
    try {
        const { name, name_en, description, year, slug, display_order } = req.body;

        const result = await query(
            `INSERT INTO gallery_categories (name, name_en, description, year, slug, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, name_en, description, year, slug, display_order || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating gallery category:', error);
        res.status(500).json({ success: false, error: 'Failed to create gallery category' });
    }
});

// Add image to gallery category
router.post('/images', async (req, res) => {
    try {
        const { category_id, image_url, cloudinary_id, alt_text, display_order } = req.body;

        const result = await query(
            `INSERT INTO gallery_images (category_id, image_url, cloudinary_id, alt_text, display_order) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [category_id, image_url, cloudinary_id, alt_text, display_order || 0]
        );

        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error adding gallery image:', error);
        res.status(500).json({ success: false, error: 'Failed to add gallery image' });
    }
});

// Update gallery category
router.put('/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, name_en, description, year, slug, display_order, is_active } = req.body;

        const result = await query(
            `UPDATE gallery_categories 
       SET name = COALESCE($1, name),
           name_en = COALESCE($2, name_en),
           description = COALESCE($3, description),
           year = COALESCE($4, year),
           slug = COALESCE($5, slug),
           display_order = COALESCE($6, display_order),
           is_active = COALESCE($7, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
            [name, name_en, description, year, slug, display_order, is_active, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Gallery category not found' });
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error updating gallery category:', error);
        res.status(500).json({ success: false, error: 'Failed to update gallery category' });
    }
});

// Delete gallery image
router.delete('/images/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            'DELETE FROM gallery_images WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Gallery image not found' });
        }

        res.json({ success: true, message: 'Gallery image deleted successfully' });
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        res.status(500).json({ success: false, error: 'Failed to delete gallery image' });
    }
});

module.exports = router;
