# 🌟 স্বপ্নের ফরিদগঞ্জ | Sopner Faridganj

<div align="center">

![Sopner Faridganj Logo](https://i.imghippo.com/files/pXSS3590qA.png)

**স্বপ্ন আর সম্ভাবনার পথে**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://sopner-faridganj.netlify.app/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/msahid-cse)

</div>

---

## 📖 About | সম্পর্কে

**স্বপ্নের ফরিদগঞ্জ** is a social welfare organization based in Faridganj, Chandpur, Bangladesh. Founded on **September 24, 2023**, our mission is to bring positive change to every level of society through education, healthcare, environmental conservation, and humanitarian aid.

### 🎯 Our Mission
- 📚 **Education Support**: Providing scholarships and educational materials to underprivileged students
- 🏥 **Healthcare Services**: Organizing health camps and medical assistance programs
- 🌱 **Environmental Conservation**: Tree plantation and awareness campaigns
- 🤝 **Humanitarian Aid**: Relief distribution during natural disasters
- 🎓 **Skill Development**: Conducting seminars and training programs

---

## ✨ Features

### 🎨 Modern & Responsive Design
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Beautiful UI**: Modern gradient backgrounds and smooth animations
- **Bangla Typography**: Native Bangla font support (Hind Siliguri)

### 🚀 Interactive Components
- **Hero Carousel**: Auto-rotating background images
- **Gallery Modal**: Advanced image gallery with lightbox viewer
- **Founding Members Scroll**: Draggable horizontal scroll with touch support
- **Advisor Carousel**: Auto-playing carousel with manual controls
- **Mobile Menu**: Smooth slide-down navigation for mobile devices

### 💰 Donation System
- **Multiple Payment Methods**: bKash, Nagad, Rocket integration
- **QR Code**: Easy scan-to-pay functionality
- **Quick Donate Buttons**: Preset amounts for faster donations
- **Copy to Clipboard**: One-click number copying

### 📅 Scholarship Exam 2025
- **Event Information**: Complete details about the scholarship exam
- **Add to Calendar**: ICS file download with reminders
- **Syllabus Access**: Direct download link for exam syllabus
- **Notice Board**: Scrolling marquee for important announcements

---

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **JavaScript (ES6+)**: Vanilla JS for interactivity
- **Tailwind CSS**: Utility-first CSS framework

### Libraries & Tools
- **Google Fonts**: Hind Siliguri for Bangla typography
- **QR Code API**: Dynamic QR code generation
- **Intersection Observer API**: Scroll animations
- **Clipboard API**: Copy to clipboard functionality

### Hosting & Deployment
- **Netlify**: Fast and reliable hosting
- **Git**: Version control
- **GitHub**: Code repository

---

## 📂 Project Structure

```
Sopner_Faridganj/
│
├── index.html                 # Main HTML file
├── styles.css                 # Main stylesheet
├── script.js                  # Main JavaScript file
├── advisor-position.css       # Advisor card styling
├── manifest.json              # PWA manifest
├── robots.txt                 # SEO robots file
├── README.md                  # Project documentation
│
└── assets/                    # Images and media (external CDN)
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML/CSS/JavaScript (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/msahid-cse/Sopner_Faridganj.git
   cd Sopner_Faridganj
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended)
   
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Visit**
   ```
   http://localhost:8000
   ```

### Development

For development, you can use any code editor:
- **VS Code** (Recommended)
- **Sublime Text**
- **Atom**
- **WebStorm**

---

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #10b981;
    --secondary-color: #3b82f6;
    --accent-color: #f59e0b;
}

.light-theme {
    --bg-primary: #ffffff;
    --text-primary: #1f2937;
    /* ... */
}

.dark-theme {
    --bg-primary: #1a1a2e;
    --text-primary: #f3f4f6;
    /* ... */
}
```

### Adding New Sections

1. Add HTML markup in `index.html`
2. Add styles in `styles.css`
3. Add interactivity in `script.js`

### Updating Gallery Images

Edit the `galleryDataModal` object in `script.js`:

```javascript
const galleryDataModal = {
    'event-id': {
        title: 'Event Title',
        images: [
            'image-url-1.jpg',
            'image-url-2.jpg'
        ]
    }
};
```

---

## 📱 Features Breakdown

### 1. Navigation System
- **Desktop Navigation**: Full menu with all links
- **Mobile Navigation**: Hamburger menu with slide-down effect
- **Sticky Header**: Stays at top while scrolling
- **Active Link Highlighting**: Shows current section

### 2. Hero Section
- **Auto-rotating Backgrounds**: 5 images with smooth transitions
- **Gradient Overlay**: Ensures text readability
- **CTA Buttons**: "Learn More" and "Donate" actions

### 3. Statistics Section
- **Real-time Counters**: Showing organization achievements
- **Animated Cards**: Fade-in on scroll
- **Color-coded**: Different colors for different metrics

### 4. About Section
- **Expandable Content**: "Read More" functionality
- **Inspiration Story**: Tribute to Md. Saidul Islam Roni
- **Responsive Layout**: Adapts to all screen sizes

### 5. Activities Section
- **Card Grid**: Showcasing different programs
- **Hover Effects**: Interactive card animations
- **Icon Integration**: Visual representation of activities

### 6. Leadership Section
- **Year Switcher**: Toggle between 2024 and 2025
- **Carousel View**: Desktop and mobile carousels
- **Auto-play**: Automatic rotation with pause on hover

### 7. Gallery Section
- **Modal System**: Full-screen gallery view
- **Lightbox Viewer**: Image zoom with navigation
- **Keyboard Support**: Arrow keys and Escape
- **Touch Gestures**: Swipe support on mobile

### 8. Donation Section
- **Payment Options**: bKash, Nagad, Rocket
- **QR Code**: Scan to pay
- **Quick Amounts**: ৳100, ৳500, ৳1000, Custom
- **Copy Function**: One-click number copying

### 9. Scholarship Exam Section
- **Event Details**: Date, time, location
- **Calendar Integration**: Download ICS file
- **Syllabus Download**: Direct PDF link
- **Notice Marquee**: Scrolling announcements

---

## 🔧 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |
| Opera   | 76+     | ✅ Full |

---

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Page Load Time**: < 2 seconds
- **First Contentful Paint**: < 1 second
- **Mobile Friendly**: 100% responsive

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Write clear commit messages
- Test on multiple browsers
- Update documentation if needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

### Founder & Inspiration
**মোঃ সাইদুল ইসলাম রনি**  
*January 21, 1997 - May 23, 2024*

### Development Team
- **Developer**: [Md. Sahid](https://msahid-cse.github.io/portfolio/)
- **Organization**: স্বপ্নের ফরিদগঞ্জ

---

## 📞 Contact

- **Email**: sopnerfaridganj@gmail.com
- **Phone**: 01642164347
- **Location**: Faridganj, Chandpur, Bangladesh
- **Facebook**: [Sopner Faridganj](https://www.facebook.com/tarunnerfaridgonj)
- **Website**: [https://sopner-faridganj.netlify.app/](https://sopner-faridganj.netlify.app/)

---

## 🙏 Acknowledgments

- **Inspiration**: Md. Saidul Islam Roni
- **Community**: All volunteers and supporters
- **Technology**: Open source community
- **Hosting**: Netlify
- **Fonts**: Google Fonts
- **Icons**: Emoji & SVG

---

## 📈 Roadmap

### Upcoming Features
- [ ] Member Registration System
- [ ] Event Booking System
- [ ] Blog Section
- [ ] Newsletter Subscription
- [ ] Multi-language Support
- [ ] Progressive Web App (PWA)
- [ ] Admin Dashboard
- [ ] Payment Gateway Integration
- [ ] Social Media Feed Integration
- [ ] Volunteer Management System

---

## 🐛 Known Issues

- None at the moment! 🎉

If you find any bugs, please [open an issue](https://github.com/msahid-cse/Sopner_Faridganj/issues).

---

## 📸 Screenshots

### Desktop View
![Desktop View](https://i.imghippo.com/files/HgSL2592WO.png))

### Mobile View
![Mobile View](https://i.imghippo.com/files/lCIJ4741vg.jpeg))

### Mobile View
![Mobile View](https://i.imghippo.com/files/ZLH6241oDA.jpeg))

### Dark Mode
![Dark Mode](https://i.imghippo.com/files/ryA1501OOs.png))

---

## 💖 Support

If you like this project, please consider:
- ⭐ Starring the repository
- 🍴 Forking and contributing
- 💰 Donating to the organization
- 📢 Sharing with others

---

## 📜 Changelog

### Version 1.0.0 (December 2024)
- ✨ Initial release
- 🎨 Modern responsive design
- 🌓 Dark/Light theme toggle
- 📱 Mobile-first approach
- 💰 Donation system
- 📅 Scholarship exam section
- 🖼️ Gallery with lightbox
- 👥 Leadership carousel
- 🎯 Founding members scroll

---

<div align="center">

**Made with ❤️ by [Md. Sahid](https://msahid-cse.github.io/portfolio/)**

**© 2024-2025 স্বপ্নের ফরিদগঞ্জ. All Rights Reserved.**

[![GitHub](https://img.shields.io/badge/GitHub-msahid--cse-black?style=for-the-badge&logo=github)](https://github.com/msahid-cse)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-blue?style=for-the-badge)](https://msahid-cse.github.io/portfolio/)

</div>
