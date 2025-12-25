// API Configuration - Production Vercel Backend
const API_URL = 'https://sopner-faridganj-api.vercel.app/api';

// API Helper Functions
const api = {
    // Generic fetch function with error handling
    async fetch(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    },

    // Hero Images
    async getHeroImages() {
        return this.fetch('/hero');
    },

    // Statistics
    async getStatistics() {
        return this.fetch('/stats');
    },

    // Advisors
    async getAdvisors() {
        return this.fetch('/advisors');
    },

    // Committee Members
    async getCommitteeMembers(year) {
        return this.fetch(`/committee${year ? `?year=${year}` : ''}`);
    },

    // Gallery
    async getGalleryCategories(year) {
        return this.fetch(`/gallery/categories${year ? `?year=${year}` : ''}`);
    },

    async getGalleryCategory(slug) {
        return this.fetch(`/gallery/categories/${slug}`);
    },

    // Activities
    async getActivities() {
        return this.fetch('/activities');
    },

    // Sponsors
    async getSponsors() {
        return this.fetch('/sponsors');
    },

    // Blood Donors
    async getBloodDonors(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.fetch(`/blood-donors?${params}`);
    },

    // Schools
    async getSchools() {
        return this.fetch('/schools');
    },

    // Madrasas
    async getMadrasas() {
        return this.fetch('/madrasas');
    },

    // Markets
    async getMarkets() {
        return this.fetch('/markets');
    },

    // Upazila Data
    async getUpazilaData(category) {
        return this.fetch(`/upazila${category ? `?category=${category}` : ''}`);
    },

    // Founding Members
    async getFoundingMembers() {
        return this.fetch('/founding-members');
    }
};

// Load Hero Images
async function loadHeroImages() {
    try {
        const response = await api.getHeroImages();
        if (response.success && response.data.length > 0) {
            const heroSection = document.querySelector('.hero-section');

            // Clear existing backgrounds
            const existingBgs = heroSection.querySelectorAll('.hero-bg');
            existingBgs.forEach(bg => bg.remove());

            // Add new backgrounds from API
            response.data.forEach((image, index) => {
                const bgDiv = document.createElement('div');
                bgDiv.className = 'hero-bg';
                bgDiv.id = `heroBg${index + 1}`;
                bgDiv.style.backgroundImage = `url('${image.image_url}')`;
                if (image.alt_text) {
                    bgDiv.setAttribute('aria-label', image.alt_text);
                }
                heroSection.insertBefore(bgDiv, heroSection.firstChild);
            });

            // Reinitialize hero carousel
            if (typeof initHeroCarousel === 'function') {
                initHeroCarousel();
            }
        }
    } catch (error) {
        console.error('Failed to load hero images:', error);
        // Keep static images as fallback
    }
}

// Load Statistics
async function loadStatistics() {
    try {
        const response = await api.getStatistics();
        if (response.success && response.data.length > 0) {
            const statsContainer = document.querySelector('.py-16.bg-secondary .grid');
            if (!statsContainer) return;

            statsContainer.innerHTML = '';

            response.data.forEach(stat => {
                const statCard = document.createElement('div');
                statCard.className = `stat-card border-${stat.color || 'emerald'}-300 dark:border-${stat.color || 'emerald'}-600`;
                statCard.innerHTML = `
          <div class="text-4xl font-bold text-${stat.color || 'emerald'}-500">${stat.value}</div>
          <div class="text-sm text-secondary mt-2">${stat.title}</div>
        `;
                statsContainer.appendChild(statCard);
            });
        }
    } catch (error) {
        console.error('Failed to load statistics:', error);
        // Keep static data as fallback
    }
}

// Load Advisors
async function loadAdvisors() {
    try {
        const response = await api.getAdvisors();
        if (response.success && response.data.length > 0) {
            // Desktop carousel
            const desktopTrack = document.getElementById('advisorsTrack');
            // Mobile carousel
            const mobileTrack = document.getElementById('mobileAdvisorsTrack');

            if (desktopTrack) {
                desktopTrack.innerHTML = '';
                response.data.forEach(advisor => {
                    const advisorCard = createAdvisorCard(advisor, false);
                    desktopTrack.appendChild(advisorCard);
                });
            }

            if (mobileTrack) {
                mobileTrack.innerHTML = '';
                response.data.forEach(advisor => {
                    const advisorCard = createAdvisorCard(advisor, true);
                    mobileTrack.appendChild(advisorCard);
                });
            }

            // Update carousel controls
            if (typeof updateAdvisorCarousel === 'function') {
                updateAdvisorCarousel(response.data.length);
            }
        }
    } catch (error) {
        console.error('Failed to load advisors:', error);
        // Keep static data as fallback
    }
}

// Helper function to create advisor card
function createAdvisorCard(advisor, isMobile) {
    const div = document.createElement('div');
    div.className = isMobile ? 'flex-shrink-0 w-full px-4' : 'flex-shrink-0 w-1/3 px-3';

    div.innerHTML = `
    <div class="advisor-card-container text-center p-8 bg-secondary rounded-xl hover:shadow-lg transition-all border border-custom border-emerald-300 dark:border-emerald-600">
      <img src="${advisor.image_url || 'https://via.placeholder.com/150'}" 
           alt="${advisor.name}"
           class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-3 border-amber-400">
      <div class="advisor-card-content">
        <div class="text-sm text-secondary mb-1">${advisor.is_chief ? 'প্রধান উপদেষ্টা' : 'উপদেষ্টা'}</div>
        <div class="font-bold text-xl text-primary mb-2">${advisor.name}</div>
        ${advisor.position ? `<div class="advisor-position">${advisor.position}</div>` : ''}
        ${advisor.institution ? `<div class="advisor-institution text-sm text-emerald-600">${advisor.institution}</div>` : ''}
      </div>
    </div>
  `;

    return div;
}

// Load Committee Members
async function loadCommitteeMembers(year = 2025) {
    try {
        const response = await api.getCommitteeMembers(year);
        if (response.success && response.data.length > 0) {
            const members = response.data;

            // Separate top 3 leadership from other members
            const leadership = members.filter(m => m.role === 'নেতৃত্ব').slice(0, 3);
            const otherMembers = members.filter(m => m.role !== 'নেতৃত্ব');

            // Update top 3 leadership if container exists
            const leadershipContainer = document.querySelector('#leadership2025 .grid.md\\:grid-cols-3');
            if (leadershipContainer && leadership.length > 0) {
                leadershipContainer.innerHTML = '';
                leadership.forEach((member, index) => {
                    const borderColors = ['emerald', 'blue', 'purple'];
                    const color = borderColors[index] || 'emerald';
                    const leaderCard = document.createElement('div');
                    leaderCard.className = `text-center p-8 bg-secondary rounded-xl border border-custom border-${color}-300 dark:border-${color}-600`;
                    leaderCard.innerHTML = `
                        <img src="${member.image_url || 'https://via.placeholder.com/150'}" 
                             alt="${member.name}"
                             class="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-${color}-500">
                        <div class="font-bold text-lg text-primary mb-1">${member.position}</div>
                        <div class="text-secondary font-semibold">${member.name}</div>
                    `;
                    leadershipContainer.appendChild(leaderCard);
                });
            }

            // Desktop carousel for other members
            const desktopTrack = document.getElementById('committee2025Track');
            if (desktopTrack && otherMembers.length > 0) {
                desktopTrack.innerHTML = '';
                otherMembers.forEach(member => {
                    const memberCard = createCommitteeMemberCard(member, false);
                    desktopTrack.appendChild(memberCard);
                });
            }

            // Mobile carousel - include ALL members
            const mobileTrack = document.getElementById('mobileCommittee2025Track');
            if (mobileTrack && members.length > 0) {
                mobileTrack.innerHTML = '';
                members.forEach(member => {
                    const memberCard = createCommitteeMemberCard(member, true);
                    mobileTrack.appendChild(memberCard);
                });
            }

            // Update carousel controls
            if (typeof updateCommittee2025Carousel === 'function') {
                updateCommittee2025Carousel(otherMembers.length);
            }
            if (typeof updateMobileCommittee2025Carousel === 'function') {
                updateMobileCommittee2025Carousel(members.length);
            }
        }
    } catch (error) {
        console.error('Failed to load committee members:', error);
        // Keep static data as fallback
    }
}

// Helper function to create committee member card
function createCommitteeMemberCard(member, isMobile) {
    const div = document.createElement('div');
    div.className = isMobile ? 'flex-shrink-0 w-full px-4' : 'flex-shrink-0 w-1/3 px-3';

    // Random border colors for variety
    const colors = ['amber', 'rose', 'violet', 'pink', 'teal', 'cyan', 'indigo', 'lime', 'emerald', 'sky', 'orange', 'fuchsia'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    div.innerHTML = `
    <div class="text-center p-6 bg-secondary rounded-xl hover:shadow-lg transition-all border border-custom border-${randomColor}-300 dark:border-${randomColor}-600">
      <img src="${member.image_url || 'https://via.placeholder.com/150'}" 
           alt="${member.name}"
           class="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-${randomColor}-500">
      <div class="font-bold text-lg text-primary mb-0">${member.position || member.role}</div>
      <div class="text-secondary font-semibold">${member.name}</div>
      ${member.institution && member.institution !== 'স্বপ্নের ফরিদগঞ্জ' ? `<div class="text-xs text-secondary mt-1">${member.institution}</div>` : ''}
    </div>
  `;

    return div;
}

// Load Founding Members
async function loadFoundingMembers() {
    try {
        const response = await api.getFoundingMembers();
        if (response.success && response.data.length > 0) {
            const members = response.data;
            const scrollTrack = document.querySelector('.founding-scroll-track');

            if (scrollTrack) {
                scrollTrack.innerHTML = '';

                // Add members twice for seamless infinite scroll
                const colors = ['emerald', 'blue', 'purple', 'amber', 'teal', 'cyan', 'pink', 'rose', 'indigo', 'orange'];

                // First set
                members.forEach((member, index) => {
                    const color = colors[index % colors.length];
                    const memberCard = createFoundingMemberCard(member, color);
                    scrollTrack.appendChild(memberCard);
                });

                // Duplicate for seamless loop
                members.forEach((member, index) => {
                    const color = colors[index % colors.length];
                    const memberCard = createFoundingMemberCard(member, color);
                    scrollTrack.appendChild(memberCard);
                });
            }
        }
    } catch (error) {
        console.error('Failed to load founding members:', error);
        // Keep static data as fallback
    }
}

// Helper function to create founding member card
function createFoundingMemberCard(member, color) {
    const div = document.createElement('div');
    div.className = 'founding-member-card flex-shrink-0';

    div.innerHTML = `
        <div class="text-center p-6 bg-secondary rounded-xl shadow-lg border border-custom border-${color}-300 dark:border-${color}-600 w-48">
            <img src="${member.image_url || 'https://via.placeholder.com/150'}" 
                 alt="${member.name}"
                 class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-${color}-500">
            <div class="text-secondary font-semibold text-sm">${member.name}</div>
        </div>
    `;

    return div;
}




// Load Gallery Categories
async function loadGalleryCategories(year = 2025) {
    try {
        const response = await api.getGalleryCategories(year);
        if (response.success && response.data.length > 0) {
            // Update gallery data object
            window.galleryDataFromAPI = {};

            for (const category of response.data) {
                const categoryData = await api.getGalleryCategory(category.slug);
                if (categoryData.success) {
                    window.galleryDataFromAPI[category.slug] = {
                        name: category.name,
                        description: category.description || '',
                        images: categoryData.data.images.map(img => img.image_url)
                    };
                }
            }

            // Update gallery grid if needed
            updateGalleryGrid(year);
        }
    } catch (error) {
        console.error('Failed to load gallery categories:', error);
        // Keep static data as fallback
    }
}

// Update gallery grid with dynamic data
function updateGalleryGrid(year) {
    const galleryContainer = document.getElementById(`gallery${year}`);
    if (!galleryContainer || !window.galleryDataFromAPI) return;

    // This function can be expanded to dynamically create gallery cards
    console.log('Gallery data loaded from API:', window.galleryDataFromAPI);
}

// Initialize API data loading
async function initializeAPIData() {
    console.log('🔄 Loading data from API...');

    try {
        // Load all data in parallel
        await Promise.all([
            loadHeroImages(),
            loadStatistics(),
            loadAdvisors(),
            loadCommitteeMembers(2025),
            loadFoundingMembers(),
            loadGalleryCategories(2025)
        ]);

        console.log('✅ API data loaded successfully');
    } catch (error) {
        console.error('❌ Failed to load API data:', error);
        console.log('📌 Using static fallback data');
    }
}

// Load data when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAPIData);
} else {
    initializeAPIData();
}

// Export for use in other scripts
window.api = api;
