// Sopner Faridganj - Main JavaScript File

// Hero Background Carousel
let currentHeroIndex = 0;
const heroBackgrounds = ['heroBg1', 'heroBg2', 'heroBg3', 'heroBg4', 'heroBg5'];

function rotateHeroBackground() {
    // Remove active class from current
    document.getElementById(heroBackgrounds[currentHeroIndex]).classList.remove('active');

    // Move to next background
    currentHeroIndex = (currentHeroIndex + 1) % heroBackgrounds.length;

    // Add active class to new background
    document.getElementById(heroBackgrounds[currentHeroIndex]).classList.add('active');
}

// Start with first image
document.getElementById(heroBackgrounds[0]).classList.add('active');

// Rotate every 5 seconds
setInterval(rotateHeroBackground, 5000);

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const themeIcon = document.getElementById('themeIcon');
const themeIconMobile = document.getElementById('themeIconMobile');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme + '-theme');
updateThemeIcon(currentTheme);

function toggleTheme() {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
    }
}

function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    themeIcon.textContent = icon;
    themeIconMobile.textContent = icon;
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerIcon = document.getElementById('hamburgerIcon');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburgerIcon.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburgerIcon.textContent = '☰';
    });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// Year Gallery Switching
function showYear(year) {
    // Hide all galleries
    document.getElementById('gallery2025').classList.add('hidden');
    document.getElementById('gallery2024').classList.add('hidden');

    // Show selected year
    document.getElementById('gallery' + year).classList.remove('hidden');

    // Update button styles
    document.getElementById('year2025Btn').classList.remove('bg-emerald-500', 'text-white');
    document.getElementById('year2025Btn').classList.add('bg-secondary', 'text-primary', 'border', 'border-custom');
    document.getElementById('year2024Btn').classList.remove('bg-emerald-500', 'text-white');
    document.getElementById('year2024Btn').classList.add('bg-secondary', 'text-primary', 'border', 'border-custom');

    document.getElementById('year' + year + 'Btn').classList.remove('bg-secondary', 'text-primary', 'border', 'border-custom');
    document.getElementById('year' + year + 'Btn').classList.add('bg-emerald-500', 'text-white');
}

let currentImageIndex = 0;

// Gallery data with descriptions
const galleryData = {
    // 2025 Gallery
    'education': {
        name: 'শিক্ষা সহায়তা',
        description: 'আমাদের শিক্ষা সহায়তা কর্মসূচি গরীব এবং মেধাবী শিক্ষার্থীদের তাদের স্বপ্ন পূরণে সাহায্য করে।',
        images: [
            'https://i.imghippo.com/files/kHx7730Ro.jpg',
            'https://i.imghippo.com/files/tun7417is.jpg',
            'https://i.imghippo.com/files/dkmy5149JQ.jpg',
            'https://i.imghippo.com/files/kP2578TAs.jpg'
        ]
    },
    'award-2025': {
        name: 'অর্জন',
        description: 'শ্রেষ্ট সামাজিক সংগঠন সম্মাননা অর্জন আমাদের জন্য একটি গর্বের বিষয়।',
        images: [
            'https://i.imghippo.com/files/UeGl2960F.jpg',
            'https://i.imghippo.com/files/gaz2073ls.jpg',
            'https://i.imghippo.com/files/iuGN8811yU.jpg'
        ]
    },
    'bitti_2025': {
        name: 'বৃত্তি পরিক্ষা কর্মসূচি',
        description: 'বৃত্তি ফর্ম বিতরণ ও সংগ্রহ কার্যক্রমের কিছু মুহূর্ত।',
        images: [
            'https://i.imghippo.com/files/hBo1030M.jpg',
            'https://i.imghippo.com/files/tPMi8672ws.jpg',
            'https://i.imghippo.com/files/Hzj3044hUM.jpg',
            'https://i.imghippo.com/files/cQle4691RFc.jpg',
            'https://i.imghippo.com/files/Dgy8081Xeo.jpg',
            'https://i.imghippo.com/files/pRJV1935Vpw.jpg'
        ]
    },
    'seminar-lawtoli': {
        name: 'সেমিনার',
        description: 'লাউতলী ডাঃ রশীদ আহমেদ উচ্চ বিদ্যালয়ে সেমিনার কার্যক্রমের কিছু ছবি।',
        images: [
            'https://i.imghippo.com/files/uyVA9986MN.jpg',
            'https://i.imghippo.com/files/UDcU1485coo.jpg',
            'https://i.imghippo.com/files/sgw2017gpI.jpg'
        ]
    },
    // 2024 Gallery
    'education2024': {
        name: 'শিক্ষা সহায়তা',
        description: '২০২৪ সালের শিক্ষা সহায়তা কর্মসূচির কিছু মুহূর্ত।',
        images: [
            'sikkha-help-1.jpg',
            'sikkha-help-2.jpg',
            'sikkha-help-3.jpg',
            'sikkha-help-4.jpg'
        ]
    },
    'award-20252024': {
        name: 'অর্জন',
        description: '২০২৪ সালের সম্মাননা ও পুরস্কার প্রাপ্তির কিছু ছবি।',
        images: [
            'award-1.jpg',
            'award-2.jpg',
            'award-3.jpg'
        ]
    }
};

let currentGalleryImages = [];
let currentGalleryIndex = 0;

function openGalleryModal(galleryId) {
    const data = galleryData[galleryId];
    if (!data) return;

    currentGalleryImages = data.images;
    currentGalleryIndex = 0;

    const modalHTML = `
        <div id="galleryModal" class="gallery-modal active">
            <div class="gallery-modal-content">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h2 class="text-3xl font-bold text-white mb-2">${data.name}</h2>
                        <p class="text-gray-300">${data.description}</p>
                    </div>
                    <button onclick="closeGalleryModal()" class="text-white text-4xl hover:text-gray-300 w-12 h-12 flex items-center justify-center">&times;</button>
                </div>
                <div class="grid md:grid-cols-3 gap-4">
                    ${data.images.map((img, idx) => `
                        <div class="cursor-pointer" onclick="openFullImage(${idx})">
                            <img src="${img}" alt="${data.name} ${idx + 1}" class="w-full h-64 object-cover rounded-lg hover:opacity-80 transition-opacity">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.remove();
    }
}

function openFullImage(index) {
    currentGalleryIndex = index;
    showFullImage();
}

function showFullImage() {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');

    lightboxContent.innerHTML = `
        <div class="relative inline-block max-w-full max-h-screen">
            <img src="${currentGalleryImages[currentGalleryIndex]}" alt="Gallery Image" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl">
            ${currentGalleryImages.length > 1 ? `
                <button onclick="navigateFullImage(-1); event.stopPropagation();" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white text-3xl w-14 h-14 rounded-full flex items-center justify-center transition-all" style="backdrop-filter: blur(8px);">
                    ❮
                </button>
                <button onclick="navigateFullImage(1); event.stopPropagation();" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white text-3xl w-14 h-14 rounded-full flex items-center justify-center transition-all" style="backdrop-filter: blur(8px);">
                    ❯
                </button>
            ` : ''}
        </div>
    `;

    lightbox.classList.add('active');
}

function navigateFullImage(direction) {
    currentGalleryIndex = (currentGalleryIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
    showFullImage();
}

// Toggle Content Function for See More
function toggleContent(contentId, button) {
    const content = document.getElementById(contentId);
    const btnText = button.querySelector('.btn-text');

    content.classList.toggle('show');
    button.classList.toggle('active');

    if (content.classList.contains('show')) {
        btnText.textContent = 'কম দেখুন';
    } else {
        btnText.textContent = 'আরও পড়ুন';
    }
}

// Toggle About Content
function toggleAboutContent() {
    const content = document.getElementById('moreAboutContent');
    const btn = document.getElementById('seeMoreBtn');
    const text = document.getElementById('seeMoreText');
    const icon = document.getElementById('seeMoreIcon');

    if (content.style.maxHeight === '0px' || content.style.maxHeight === '') {
        content.style.maxHeight = content.scrollHeight + 'px';
        text.textContent = 'কম দেখুন';
        icon.textContent = '▲';
    } else {
        content.style.maxHeight = '0px';
        text.textContent = 'আরও পড়ুন';
        icon.textContent = '▼';
    }
}

// Leadership Year Switching
function showLeadershipYear(year) {
    // Hide all sections first
    document.getElementById('leadership2025').classList.add('hidden');
    document.getElementById('leadership2024').classList.add('hidden');

    // Show selected year
    document.getElementById('leadership' + year).classList.remove('hidden');

    // Reset all button styles
    document.getElementById('leaderYear2025').className = 'px-8 py-2 bg-white text-primary hover:bg-gray-100 transition-colors border border-custom rounded-lg font-semibold shadow-lg';
    document.getElementById('leaderYear2024').className = 'px-8 py-2 bg-white text-primary hover:bg-gray-100 transition-colors border border-custom rounded-lg font-semibold shadow-lg';

    // Set active button style
    document.getElementById('leaderYear' + year).className = 'px-8 py-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors rounded-lg font-semibold shadow-lg';
}

// Splash Screen Functions
function closeSplash() {
    const splashScreen = document.getElementById('splashScreen');
    splashScreen.classList.add('fade-out');

    // Remove from DOM after animation completes
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 500);
}

// Auto-close splash screen after 3 seconds
window.addEventListener('load', function () {
    setTimeout(() => {
        closeSplash();
    }, 1500);
});

// Make 2025 active by default when page loads
window.addEventListener('load', function () {
    showLeadershipYear('2025');
});

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    currentGalleryImages = [];
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card-hover, .stat-card').forEach(el => {
    observer.observe(el);
});

// Advisor Carousel Functions
let currentAdvisorIndex = 0;
const totalAdvisors = 14;
const advisorsPerView = 3;
const maxIndex = totalAdvisors - advisorsPerView; // 11 (positions: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
let advisorAutoPlayInterval = null;

function scrollAdvisors(direction) {
    const track = document.getElementById('advisorsTrack');

    if (direction === 'left') {
        currentAdvisorIndex = Math.max(0, currentAdvisorIndex - 1);
    } else if (direction === 'right') {
        currentAdvisorIndex = Math.min(maxIndex, currentAdvisorIndex + 1);
    } else if (direction === 'auto') {
        // Auto-play: loop back to start when reaching the end
        currentAdvisorIndex = (currentAdvisorIndex + 1) % (maxIndex + 1);
    }

    // Calculate the transform percentage
    const translatePercentage = -(currentAdvisorIndex * (100 / advisorsPerView));
    track.style.transform = `translateX(${translatePercentage}%)`;

    // Update dots
    updateAdvisorDots();
}

function updateAdvisorDots() {
    // Reset all dots
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (dot) {
            dot.className = 'w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600';
        }
    }

    // Highlight current dot
    const currentDot = document.getElementById(`dot${currentAdvisorIndex}`);
    if (currentDot) {
        currentDot.className = 'w-3 h-3 rounded-full bg-emerald-500';
    }
}

// Start auto-play
function startAdvisorAutoPlay() {
    // Clear any existing interval
    if (advisorAutoPlayInterval) {
        clearInterval(advisorAutoPlayInterval);
    }

    // Start new interval - change every 2 seconds
    advisorAutoPlayInterval = setInterval(() => {
        scrollAdvisors('auto');
    }, 2000);
}

// Stop auto-play
function stopAdvisorAutoPlay() {
    if (advisorAutoPlayInterval) {
        clearInterval(advisorAutoPlayInterval);
        advisorAutoPlayInterval = null;
    }
}

// Initialize auto-play when page loads
window.addEventListener('load', function () {
    const advisorsContainer = document.getElementById('advisorsContainer');
    if (advisorsContainer) {
        // Start auto-play
        startAdvisorAutoPlay();

        // Pause on hover
        advisorsContainer.addEventListener('mouseenter', stopAdvisorAutoPlay);

        // Resume on mouse leave
        advisorsContainer.addEventListener('mouseleave', startAdvisorAutoPlay);

        // Also add event listeners to arrow buttons to restart auto-play after manual navigation
        const leftArrow = document.querySelector('button[onclick*="scrollAdvisors(\'left\')"]');
        const rightArrow = document.querySelector('button[onclick*="scrollAdvisors(\'right\')"]');

        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                stopAdvisorAutoPlay();
                setTimeout(startAdvisorAutoPlay, 5000); // Resume after 5 seconds
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                stopAdvisorAutoPlay();
                setTimeout(startAdvisorAutoPlay, 5000); // Resume after 5 seconds
            });
        }
    }

    // Initialize mobile carousel auto-play
    const mobileAdvisorsContainer = document.getElementById('mobileAdvisorsContainer');
    if (mobileAdvisorsContainer) {
        startMobileAdvisorAutoPlay();

        // Pause on touch/hover
        mobileAdvisorsContainer.addEventListener('touchstart', stopMobileAdvisorAutoPlay);
        mobileAdvisorsContainer.addEventListener('mouseenter', stopMobileAdvisorAutoPlay);

        // Resume on touch end/mouse leave
        mobileAdvisorsContainer.addEventListener('touchend', () => {
            setTimeout(startMobileAdvisorAutoPlay, 3000);
        });
        mobileAdvisorsContainer.addEventListener('mouseleave', startMobileAdvisorAutoPlay);

        // Handle manual navigation
        const mobileLeftArrow = document.querySelector('button[onclick*="scrollMobileAdvisors(\'left\')"]');
        const mobileRightArrow = document.querySelector('button[onclick*="scrollMobileAdvisors(\'right\')"]');

        if (mobileLeftArrow) {
            mobileLeftArrow.addEventListener('click', () => {
                stopMobileAdvisorAutoPlay();
                setTimeout(startMobileAdvisorAutoPlay, 4000);
            });
        }

        if (mobileRightArrow) {
            mobileRightArrow.addEventListener('click', () => {
                stopMobileAdvisorAutoPlay();
                setTimeout(startMobileAdvisorAutoPlay, 4000);
            });
        }
    }
});

// Mobile Advisor Carousel Functions
let currentMobileAdvisorIndex = 0;
const totalMobileAdvisors = 14;
let mobileAdvisorAutoPlayInterval = null;

function scrollMobileAdvisors(direction) {
    const track = document.getElementById('mobileAdvisorsTrack');

    if (direction === 'left') {
        currentMobileAdvisorIndex = (currentMobileAdvisorIndex - 1 + totalMobileAdvisors) % totalMobileAdvisors;
    } else if (direction === 'right') {
        currentMobileAdvisorIndex = (currentMobileAdvisorIndex + 1) % totalMobileAdvisors;
    } else if (direction === 'auto') {
        currentMobileAdvisorIndex = (currentMobileAdvisorIndex + 1) % totalMobileAdvisors;
    }

    // Calculate the transform percentage
    const translatePercentage = -(currentMobileAdvisorIndex * 100);
    track.style.transform = `translateX(${translatePercentage}%)`;

    // Update dots
    updateMobileAdvisorDots();
}

function updateMobileAdvisorDots() {
    // Reset all dots
    for (let i = 0; i < totalMobileAdvisors; i++) {
        const dot = document.getElementById(`mobileDot${i}`);
        if (dot) {
            dot.className = 'w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600';
        }
    }

    // Highlight current dot
    const currentDot = document.getElementById(`mobileDot${currentMobileAdvisorIndex}`);
    if (currentDot) {
        currentDot.className = 'w-3 h-3 rounded-full bg-emerald-500';
    }
}

// Start mobile auto-play
function startMobileAdvisorAutoPlay() {
    if (mobileAdvisorAutoPlayInterval) {
        clearInterval(mobileAdvisorAutoPlayInterval);
    }

    // Change every 2 seconds
    mobileAdvisorAutoPlayInterval = setInterval(() => {
        scrollMobileAdvisors('auto');
    }, 2000);
}

// Stop mobile auto-play
function stopMobileAdvisorAutoPlay() {
    if (mobileAdvisorAutoPlayInterval) {
        clearInterval(mobileAdvisorAutoPlayInterval);
        mobileAdvisorAutoPlayInterval = null;
    }
}

// Mobile "Show More Advisors" Toggle (deprecated but kept for compatibility)
function toggleMoreAdvisors() {
    // This function is no longer needed but kept for compatibility
    console.log('Mobile carousel is now active');
}

// Committee 2025 Carousel Functions (Desktop)
let currentCommittee2025Index = 0;
const totalCommittee2025Members = 15;
const committee2025PerView = 3;
const maxCommittee2025Index = totalCommittee2025Members - committee2025PerView; // 12 (positions: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
let committee2025AutoPlayInterval = null;

function scrollCommittee2025(direction) {
    const track = document.getElementById('committee2025Track');

    if (direction === 'left') {
        currentCommittee2025Index = Math.max(0, currentCommittee2025Index - 1);
    } else if (direction === 'right') {
        currentCommittee2025Index = Math.min(maxCommittee2025Index, currentCommittee2025Index + 1);
    } else if (direction === 'auto') {
        // Auto-play: loop back to start when reaching the end
        currentCommittee2025Index = (currentCommittee2025Index + 1) % (maxCommittee2025Index + 1);
    }

    // Calculate the transform percentage
    const translatePercentage = -(currentCommittee2025Index * (100 / committee2025PerView));
    track.style.transform = `translateX(${translatePercentage}%)`;

    // Update dots
    updateCommittee2025Dots();
}

function updateCommittee2025Dots() {
    // Reset all dots
    for (let i = 0; i <= maxCommittee2025Index; i++) {
        const dot = document.getElementById(`committee2025Dot${i}`);
        if (dot) {
            dot.className = 'w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600';
        }
    }

    // Highlight current dot
    const currentDot = document.getElementById(`committee2025Dot${currentCommittee2025Index}`);
    if (currentDot) {
        currentDot.className = 'w-3 h-3 rounded-full bg-emerald-500';
    }
}

// Start committee 2025 auto-play
function startCommittee2025AutoPlay() {
    if (committee2025AutoPlayInterval) {
        clearInterval(committee2025AutoPlayInterval);
    }

    // Change every 2 seconds
    committee2025AutoPlayInterval = setInterval(() => {
        scrollCommittee2025('auto');
    }, 2000);
}

// Stop committee 2025 auto-play
function stopCommittee2025AutoPlay() {
    if (committee2025AutoPlayInterval) {
        clearInterval(committee2025AutoPlayInterval);
        committee2025AutoPlayInterval = null;
    }
}

// Mobile Committee 2025 Carousel Functions
let currentMobileCommittee2025Index = 0;
const totalMobileCommittee2025Members = 15;
let mobileCommittee2025AutoPlayInterval = null;

function scrollMobileCommittee2025(direction) {
    const track = document.getElementById('mobileCommittee2025Track');

    if (direction === 'left') {
        currentMobileCommittee2025Index = (currentMobileCommittee2025Index - 1 + totalMobileCommittee2025Members) % totalMobileCommittee2025Members;
    } else if (direction === 'right') {
        currentMobileCommittee2025Index = (currentMobileCommittee2025Index + 1) % totalMobileCommittee2025Members;
    } else if (direction === 'auto') {
        currentMobileCommittee2025Index = (currentMobileCommittee2025Index + 1) % totalMobileCommittee2025Members;
    }

    // Calculate the transform percentage
    const translatePercentage = -(currentMobileCommittee2025Index * 100);
    track.style.transform = `translateX(${translatePercentage}%)`;

    // Update dots
    updateMobileCommittee2025Dots();
}

function updateMobileCommittee2025Dots() {
    // Reset all dots
    for (let i = 0; i < totalMobileCommittee2025Members; i++) {
        const dot = document.getElementById(`mobileCommittee2025Dot${i}`);
        if (dot) {
            dot.className = 'w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600';
        }
    }

    // Highlight current dot
    const currentDot = document.getElementById(`mobileCommittee2025Dot${currentMobileCommittee2025Index}`);
    if (currentDot) {
        currentDot.className = 'w-3 h-3 rounded-full bg-emerald-500';
    }
}

// Start mobile committee 2025 auto-play
function startMobileCommittee2025AutoPlay() {
    if (mobileCommittee2025AutoPlayInterval) {
        clearInterval(mobileCommittee2025AutoPlayInterval);
    }

    // Change every 2 seconds
    mobileCommittee2025AutoPlayInterval = setInterval(() => {
        scrollMobileCommittee2025('auto');
    }, 2000);
}

// Stop mobile committee 2025 auto-play
function stopMobileCommittee2025AutoPlay() {
    if (mobileCommittee2025AutoPlayInterval) {
        clearInterval(mobileCommittee2025AutoPlayInterval);
        mobileCommittee2025AutoPlayInterval = null;
    }
}

// Initialize committee 2025 carousel when page loads
window.addEventListener('load', function () {
    const committee2025Container = document.getElementById('committee2025Container');
    if (committee2025Container) {
        // Start auto-play
        startCommittee2025AutoPlay();

        // Pause on hover
        committee2025Container.addEventListener('mouseenter', stopCommittee2025AutoPlay);

        // Resume on mouse leave
        committee2025Container.addEventListener('mouseleave', startCommittee2025AutoPlay);
    }

    // Initialize mobile committee 2025 carousel auto-play
    const mobileCommittee2025Container = document.getElementById('mobileCommittee2025Container');
    if (mobileCommittee2025Container) {
        startMobileCommittee2025AutoPlay();

        // Pause on touch/hover
        mobileCommittee2025Container.addEventListener('touchstart', stopMobileCommittee2025AutoPlay);
        mobileCommittee2025Container.addEventListener('mouseenter', stopMobileCommittee2025AutoPlay);

        // Resume on touch end/mouse leave
        mobileCommittee2025Container.addEventListener('touchend', () => {
            setTimeout(startMobileCommittee2025AutoPlay, 3000);
        });
        mobileCommittee2025Container.addEventListener('mouseleave', startMobileCommittee2025AutoPlay);
    }
});


// Add to Calendar Function
function addToCalendar() {
    // Event details
    const eventTitle = 'স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫';
    const eventDescription = 'স্বপ্নের ফরিদগঞ্জের ১ম প্রতিষ্ঠা বার্ষিকী উপলক্ষে বৃত্তি পরীক্ষা। বিষয়: বাংলা, ইংরেজি, গণিত, সাধারণ জ্ঞান';
    const eventLocation = 'ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ, ফরিদগঞ্জ, চাঁদপুর';
    const eventLocationUrl = 'https://maps.app.goo.gl/hzJ5J2tQ5kZ4n7XNA';

    // Date: December 19, 2025, 9:00 AM - 1:00 PM (Bangladesh Time)
    const startDate = new Date('2025-12-19T09:00:00+06:00');
    const endDate = new Date('2025-12-19T13:00:00+06:00');

    // Format dates for ICS file (YYYYMMDDTHHMMSS format in UTC)
    const formatICSDate = (date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    };

    const startDateFormatted = formatICSDate(startDate);
    const endDateFormatted = formatICSDate(endDate);
    const currentDate = formatICSDate(new Date());

    // Create ICS file content with 4 reminders
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Sopner Faridganj//Scholarship Exam//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${startDateFormatted}`,
        `DTEND:${endDateFormatted}`,
        `DTSTAMP:${currentDate}`,
        `UID:sopnerfaridganj-scholarship-2025@gmail.com`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${eventDescription}`,
        `LOCATION:${eventLocation}`,
        `URL:${eventLocationUrl}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        // Reminder 1: 3 days before
        'BEGIN:VALARM',
        'TRIGGER:-P3D',
        'ACTION:DISPLAY',
        'DESCRIPTION:🔔 ৩ দিন পর বৃত্তি পরীক্ষা - প্রস্তুতি শুরু করুন!',
        'END:VALARM',
        // Reminder 2: 1 day before
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:⏰ আগামীকাল বৃত্তি পরীক্ষা - সব প্রস্তুতি সম্পন্ন করুন!',
        'END:VALARM',
        // Reminder 3: 3 hours before
        'BEGIN:VALARM',
        'TRIGGER:-PT3H',
        'ACTION:DISPLAY',
        'DESCRIPTION:⚡ ৩ ঘণ্টা পর বৃত্তি পরীক্ষা শুরু - সময়মতো পৌঁছান!',
        'END:VALARM',
        // Reminder 4: 1 hour before
        'BEGIN:VALARM',
        'TRIGGER:-PT1H',
        'ACTION:DISPLAY',
        'DESCRIPTION:🚀 ১ ঘণ্টা পর পরীক্ষা শুরু - এখনই রওনা দিন!',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'বৃত্তি_পরীক্ষা_২০২৫.ics';

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show confirmation message
    alert('✅ পরীক্ষার তারিখ আপনার ক্যালেন্ডারে যোগ করা হয়েছে!\n\n📝 স্বপ্নের ফরিদগঞ্জ বৃত্তি পরীক্ষা ২০২৫\n📅 তারিখ: ১৯ ডিসেম্বর ২০২৫\n⏰ সময়: সকাল ৯টা\n📍 স্থান: ফরিদগঞ্জ সরকারি ডিগ্রি কলেজ\n\n🔔 রিমাইন্ডার:\n• ৩ দিন আগে\n• ১ দিন আগে\n• ৩ ঘণ্টা আগে\n• ১ ঘণ্টা আগে');
}

// ============================================
// FOUNDING MEMBERS MANUAL SCROLL FUNCTIONALITY
// ============================================

// Founding Members Manual Scroll Functionality
window.addEventListener('load', function () {
    const foundingScrollContainer = document.querySelector('.founding-scroll-container');
    const foundingScrollTrack = document.querySelector('.founding-scroll-track');

    if (!foundingScrollContainer || !foundingScrollTrack) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Mouse events for desktop drag
    foundingScrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        foundingScrollTrack.classList.add('dragging');
        startX = e.pageX - foundingScrollContainer.offsetLeft;
        scrollLeft = foundingScrollContainer.scrollLeft;
    });

    foundingScrollContainer.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            foundingScrollTrack.classList.remove('dragging');
        }
    });

    foundingScrollContainer.addEventListener('mouseup', () => {
        isDragging = false;
        foundingScrollTrack.classList.remove('dragging');
    });

    foundingScrollContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - foundingScrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        foundingScrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchScrollLeft = 0;

    foundingScrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - foundingScrollContainer.offsetLeft;
        touchScrollLeft = foundingScrollContainer.scrollLeft;
        foundingScrollTrack.classList.add('dragging');
    }, { passive: true });

    foundingScrollContainer.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - foundingScrollContainer.offsetLeft;
        const walk = (x - touchStartX) * 2;
        foundingScrollContainer.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });

    foundingScrollContainer.addEventListener('touchend', () => {
        foundingScrollTrack.classList.remove('dragging');
    });
});

// ============================================
// GALLERY MODAL SYSTEM
// ============================================

// Gallery data with all images for each event
const galleryDataModal = {
    'education': {
        title: 'শিক্ষা সহায়তা',
        images: [
            'https://i.imghippo.com/files/kP2578TAs.jpg',
            'https://i.imghippo.com/files/kHx7730Ro.jpg'
        ]
    },
    'award-2025': {
        title: 'অর্জন ২০২৫',
        images: [
            'https://i.imghippo.com/files/gaz2073ls.jpg'
        ]
    },
    'bitti_2025': {
        title: 'বৃত্তি পরীক্ষা কর্মসূচি',
        images: [
            'https://i.imghippo.com/files/pRJV1935Vpw.jpg'
        ]
    },
    'seminar-lawtoli': {
        title: 'সেমিনার - লাউতলী ডাঃ রশীদ আহমেদ উচ্চ বিদ্যালয়',
        images: [
            'https://i.imghippo.com/files/sgw2017gpI.jpg'
        ]
    },
    'education2024': {
        title: 'শিক্ষা সহায়তা ২০২৪',
        images: [
            'https://i.imghippo.com/files/kHx7730Ro.jpg',
            'https://i.imghippo.com/files/kP2578TAs.jpg'
        ]
    },
    'award-20252024': {
        title: 'অর্জন ২০২৪',
        images: [
            'https://i.imghippo.com/files/gaz2073ls.jpg'
        ]
    }
};

// Current lightbox state
let currentGalleryImagesModal = [];
let currentImageIndexModal = 0;

// Open gallery modal and show all images for the event
function openGalleryModal(eventId) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryModalTitle');
    const grid = document.getElementById('galleryGrid');

    const eventData = galleryDataModal[eventId];
    if (!eventData) return;

    // Set title
    title.textContent = eventData.title;

    // Clear previous images
    grid.innerHTML = '';

    // Store current gallery images
    currentGalleryImagesModal = eventData.images;

    // Create image grid
    eventData.images.forEach((imageSrc, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105';
        imageCard.onclick = (event) => {
            event.stopPropagation(); // Prevent event bubbling
            openLightboxViewer(index);
        };

        imageCard.innerHTML = `
            <img src="${imageSrc}" alt="${eventData.title}" 
                class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <svg class="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                </svg>
            </div>
        `;

        grid.appendChild(imageCard);
    });

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close gallery modal
function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Open lightbox viewer for a specific image
function openLightboxViewer(index) {
    const lightbox = document.getElementById('imageLightbox');
    const image = document.getElementById('lightboxImage');
    const counter = document.getElementById('imageCounter');

    currentImageIndexModal = index;

    // Set image
    image.src = currentGalleryImagesModal[index];

    // Update counter
    counter.textContent = `${index + 1} / ${currentGalleryImagesModal.length}`;

    // Show lightbox (it will appear above the gallery modal due to higher z-index)
    lightbox.classList.remove('hidden');
}

// Close lightbox viewer (gallery modal stays open)
function closeLightboxViewer() {
    const lightbox = document.getElementById('imageLightbox');
    lightbox.classList.add('hidden');
    // Gallery modal remains open so user can see the grid again
}

// Navigate through images in lightbox
function navigateLightbox(direction) {
    currentImageIndexModal += direction;

    // Loop around
    if (currentImageIndexModal < 0) {
        currentImageIndexModal = currentGalleryImagesModal.length - 1;
    } else if (currentImageIndexModal >= currentGalleryImagesModal.length) {
        currentImageIndexModal = 0;
    }

    // Update image
    const image = document.getElementById('lightboxImage');
    const counter = document.getElementById('imageCounter');

    image.src = currentGalleryImagesModal[currentImageIndexModal];
    counter.textContent = `${currentImageIndexModal + 1} / ${currentGalleryImagesModal.length}`;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function (e) {
    const lightbox = document.getElementById('imageLightbox');

    // If lightbox is open, handle its keyboard events
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        } else if (e.key === 'Escape') {
            closeLightboxViewer(); // Close lightbox, gallery modal stays open
        }
        return; // Don't process other keys when lightbox is open
    }

    // If gallery modal is open (and lightbox is not), handle its keyboard events
    const galleryModal = document.getElementById('galleryModal');
    if (!galleryModal.classList.contains('hidden') && e.key === 'Escape') {
        closeGalleryModal(); // Close gallery modal
    }
});
