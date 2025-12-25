# Sopner Faridganj Backend API

Backend server for the Sopner Faridganj website with PostgreSQL database and Cloudinary image storage.

## Features

- RESTful API with Express.js
- PostgreSQL database (Neon)
- Cloudinary integration for image storage
- CORS enabled for both production URLs
- Comprehensive error handling
- Database migrations

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

The `.env` file is already configured with your credentials:
- Database: Neon PostgreSQL
- Cloudinary: Image storage
- CORS: Both production URLs allowed

### 3. Run Database Migration

```bash
npm run migrate
```

This will create all necessary tables in your PostgreSQL database.

### 4. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on port 5000 by default.

## API Endpoints

### Hero Images
- `GET /api/hero` - Get all active hero images
- `POST /api/hero` - Create new hero image
- `PUT /api/hero/:id` - Update hero image
- `DELETE /api/hero/:id` - Delete hero image

### Statistics
- `GET /api/stats` - Get all statistics
- `POST /api/stats` - Create new statistic
- `PUT /api/stats/:id` - Update statistic
- `DELETE /api/stats/:id` - Delete statistic

### Advisors
- `GET /api/advisors` - Get all advisors
- `POST /api/advisors` - Create new advisor
- `PUT /api/advisors/:id` - Update advisor
- `DELETE /api/advisors/:id` - Delete advisor

### Committee Members
- `GET /api/committee?year=2025` - Get committee members by year
- `POST /api/committee` - Create new committee member
- `PUT /api/committee/:id` - Update committee member
- `DELETE /api/committee/:id` - Delete committee member

### Gallery
- `GET /api/gallery/categories?year=2025` - Get gallery categories
- `GET /api/gallery/categories/:slug` - Get category with images
- `POST /api/gallery/categories` - Create new category
- `POST /api/gallery/images` - Add image to category
- `DELETE /api/gallery/images/:id` - Delete image

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity

### Sponsors
- `GET /api/sponsors` - Get all sponsors
- `POST /api/sponsors` - Create new sponsor

### Blood Donors
- `GET /api/blood-donors?blood_group=A+&district=চাঁদপুর&upazila=ফরিদগঞ্জ` - Get filtered donors
- `POST /api/blood-donors` - Create new donor
- `PUT /api/blood-donors/:id` - Update donor

### Info Desk
- `GET /api/schools` - Get all schools
- `GET /api/madrasas` - Get all madrasas
- `GET /api/markets` - Get all markets
- `GET /api/upazila?category=general` - Get upazila data by category

## Database Schema

The database includes tables for:
- Hero images
- Statistics
- Advisors
- Committee members
- Gallery categories and images
- Activities
- Sponsors
- Blood donors
- Schools
- Madrasas
- Markets
- Upazila data

## Deployment

### Option 1: Render.com (Recommended)
1. Push code to GitHub
2. Connect to Render
3. Add environment variables
4. Deploy

### Option 2: Railway.app
1. Push code to GitHub
2. Connect to Railway
3. Add environment variables
4. Deploy

### Option 3: Heroku
1. Install Heroku CLI
2. `heroku create sopner-faridganj-api`
3. `git push heroku main`

## Frontend Integration

Update your frontend to use:
```javascript
const API_URL = 'https://your-backend-url.com/api';

// Example: Fetch hero images
fetch(`${API_URL}/hero`)
  .then(res => res.json())
  .then(data => console.log(data));
```

## Security

- Helmet.js for security headers
- CORS restricted to allowed origins
- Environment variables for sensitive data
- SQL injection protection with parameterized queries

## Support

For issues or questions, contact: sopnerfaridganj@gmail.com
