# স্বপ্নের ফরিদগঞ্জ - Complete Project

## 🎉 Project Overview

A complete dynamic website system for **স্বপ্নের ফরিদগঞ্জ** social organization with:
- **Frontend**: Static website hosted on Netlify
- **Backend**: Node.js/Express API on Vercel
- **Database**: PostgreSQL (Neon Cloud)
- **Image Storage**: Cloudinary CDN
- **Admin Panel**: Full-featured management dashboard

## 📁 Project Structure

```
Sopner_Faridganj/
├── admin/                          # Admin Panel
│   ├── index.html                  # Admin UI
│   ├── admin-config.js             # Configuration
│   ├── admin-auth.js               # Authentication
│   ├── admin-api.js                # API client
│   ├── admin-ui.js                 # UI components
│   └── admin-main.js               # Main application
│
├── backend/                        # Backend API Server
│   ├── config/                     # Configuration files
│   │   ├── database.js             # PostgreSQL connection
│   │   └── cloudinary.js           # Cloudinary setup
│   ├── routes/                     # API routes
│   │   ├── hero.routes.js          # Hero images
│   │   ├── stats.routes.js         # Statistics
│   │   ├── advisors.routes.js      # Advisors
│   │   ├── committee.routes.js     # Committee members
│   │   ├── gallery.routes.js       # Gallery
│   │   ├── activities.routes.js    # Activities
│   │   ├── sponsors.routes.js      # Sponsors
│   │   ├── bloodDonors.routes.js   # Blood donors
│   │   ├── schools.routes.js       # Schools
│   │   ├── madrasas.routes.js      # Madrasas
│   │   ├── markets.routes.js       # Markets
│   │   └── upazila.routes.js       # Upazila data
│   ├── migrations/                 # Database migrations
│   │   ├── 001_create_tables.js    # Schema creation
│   │   └── 002_seed_data.js        # Initial data
│   ├── server.js                   # Main server file
│   ├── package.json                # Dependencies
│   ├── vercel.json                 # Vercel config
│   ├── .env                        # Environment variables
│   └── README.md                   # Backend docs
│
├── Blood Bank/                     # Blood Bank page
├── Info Desk/                      # Info Desk page
├── scholarship_exam/               # Scholarship exam page
│
├── index.html                      # Main homepage
├── script.js                       # Frontend JavaScript
├── api-integration.js              # API integration
├── styles.css                      # Styles
│
└── Documentation/
    ├── DEPLOYMENT_GUIDE.md         # Deployment instructions
    ├── VERCEL_DEPLOYMENT.md        # Vercel-specific guide
    ├── ADMIN_GUIDE.md              # Admin panel guide
    ├── BACKEND_SUMMARY.md          # Backend overview
    ├── ARCHITECTURE.md             # System architecture
    └── QUICK_REFERENCE.md          # Quick commands
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Install dependencies
cd backend
npm install

# Run database migration
npm run migrate

# Seed initial data
node migrations/002_seed_data.js

# Start development server
npm run dev
```

Backend will run on: http://localhost:5000

### 2. Frontend Setup

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js http-server
npx http-server -p 8080
```

Frontend will run on: http://localhost:8080

### 3. Admin Panel Setup

Open `admin/index.html` in browser:

```bash
# Navigate to admin folder
cd admin

# Use any local server
npx http-server -p 8081
```

Admin panel will run on: http://localhost:8081

**Login Credentials:**
- Username: `admin`
- Password: `sopner2024`

## 🌐 Deployment

### Backend → Vercel

1. **Push to GitHub**
2. **Import to Vercel**
3. **Configure**:
   - Root: `backend`
   - Framework: Other
4. **Add Environment Variables**
5. **Deploy**

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for details.

### Frontend → Netlify

1. **Connect GitHub repository**
2. **Build settings**:
   - Build command: (none)
   - Publish directory: `/`
3. **Deploy**

### Admin Panel → Netlify

1. **Drag & drop `admin` folder**
2. **Or use Netlify CLI**:
```bash
cd admin
netlify deploy --prod
```

## 📊 Features

### Frontend Features
- ✅ Responsive design
- ✅ Dark/Light theme
- ✅ Dynamic content from API
- ✅ Image carousel
- ✅ Gallery with lightbox
- ✅ Blood bank search
- ✅ Info desk
- ✅ Scholarship exam info

### Backend Features
- ✅ RESTful API
- ✅ PostgreSQL database
- ✅ Cloudinary integration
- ✅ CORS enabled
- ✅ Error handling
- ✅ Input validation
- ✅ SQL injection protection

### Admin Panel Features
- ✅ User authentication
- ✅ Session management
- ✅ CRUD operations for all data
- ✅ Image upload to Cloudinary
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Form validation
- ✅ Confirmation dialogs

## 🔐 Security

- Environment variables for sensitive data
- CORS restricted to allowed origins
- Parameterized SQL queries
- Session timeout (1 hour)
- HTTPS only in production
- Secure password storage (update default!)

## 📱 API Endpoints

### Base URL
- **Local**: `http://localhost:5000/api`
- **Production**: `https://your-backend.vercel.app/api`

### Available Endpoints

```
GET    /api/hero                    # Hero images
GET    /api/stats                   # Statistics
GET    /api/advisors                # Advisors
GET    /api/committee?year=2025     # Committee members
GET    /api/gallery/categories      # Gallery categories
GET    /api/activities              # Activities
GET    /api/sponsors                # Sponsors
GET    /api/blood-donors            # Blood donors
GET    /api/schools                 # Schools
GET    /api/madrasas                # Madrasas
GET    /api/markets                 # Markets
GET    /api/upazila                 # Upazila data
```

See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for all endpoints.

## 🗄️ Database Schema

**13 Tables:**
- `hero_images` - Hero carousel images
- `statistics` - Homepage statistics
- `advisors` - Advisor profiles
- `committee_members` - Committee members
- `gallery_categories` - Gallery categories
- `gallery_images` - Gallery images
- `activities` - Organization activities
- `sponsors` - Sponsor information
- `blood_donors` - Blood donor database
- `schools` - School information
- `madrasas` - Madrasa information
- `markets` - Market information
- `upazila_data` - General upazila data

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- Tailwind CSS
- Font Awesome icons
- Google Fonts (Hind Siliguri)

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon)
- Cloudinary
- Helmet.js (security)
- CORS

### DevOps
- Vercel (backend hosting)
- Netlify (frontend hosting)
- GitHub (version control)
- Cloudinary (CDN)

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Vercel-specific deployment
- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** - Admin panel user guide
- **[BACKEND_SUMMARY.md](BACKEND_SUMMARY.md)** - Backend implementation details
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick command reference

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=dvvrhif9d
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ALLOWED_ORIGINS=https://...
```

### Admin Panel (admin-config.js)
```javascript
API_URL: 'https://your-backend.vercel.app/api'
ADMIN_USERS: [{ username: 'admin', password: '...' }]
```

### Frontend (api-integration.js)
```javascript
const API_URL = 'https://your-backend.vercel.app/api';
```

## 🧪 Testing

### Test Backend
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/advisors
```

### Test Admin Panel
1. Open admin panel
2. Login with credentials
3. Test CRUD operations
4. Upload images
5. Verify changes on frontend

## 🐛 Troubleshooting

### Backend Won't Start
- Check if port 5000 is available
- Verify environment variables
- Check database connection

### API Returns Errors
- Check CORS configuration
- Verify database is running
- Check API endpoint URLs

### Admin Panel Issues
- Verify API URL is correct
- Check browser console
- Clear cache and cookies

### Images Not Uploading
- Check Cloudinary credentials
- Verify upload preset exists
- Check file size (<10MB)

## 📞 Support

- **Email**: sopnerfaridganj@gmail.com
- **Documentation**: See docs folder
- **Issues**: Check troubleshooting guides

## 🎯 Roadmap

### Phase 1 (Completed) ✅
- Backend infrastructure
- Database schema
- API endpoints
- Admin panel
- Basic CRUD operations

### Phase 2 (Next)
- [ ] Complete all CRUD operations
- [ ] Bulk upload features
- [ ] Export/Import data
- [ ] Advanced filtering
- [ ] User roles

### Phase 3 (Future)
- [ ] Email notifications
- [ ] SMS integration
- [ ] Analytics dashboard
- [ ] Mobile app
- [ ] Advanced reporting

## 📄 License

This project is private and belongs to স্বপ্নের ফরিদগঞ্জ.

## 👥 Contributors

- **Development**: Created for স্বপ্নের ফরিদগঞ্জ
- **Organization**: স্বপ্নের ফরিদগঞ্জ Team

## 🙏 Acknowledgments

- Neon for database hosting
- Cloudinary for image CDN
- Vercel for backend hosting
- Netlify for frontend hosting

---

**Made with ❤️ for স্বপ্নের ফরিদগঞ্জ**

**Version**: 2.0.0  
**Last Updated**: December 25, 2024  
**Status**: Production Ready 🚀
