
// ============================================
// GALLERY MODAL SYSTEM
// ============================================

// Gallery data with all images for each event
const galleryData = {
    'education': {
        title: 'শিক্ষা সহায়তা',
        images: [
            'https://i.imghippo.com/files/kP2578TAs.jpg',
            'https://i.imghippo.com/files/kHx7730Ro.jpg',
            'https://i.imghippo.com/files/Ryb2861Bbo.jpg',
            'https://i.imghippo.com/files/HxDT4530dk.jpeg'
        ]
    },
    'award-2025': {
        title: 'অর্জন ২০২৫',
        images: [
            'https://i.imghippo.com/files/gaz2073ls.jpg',
            'https://i.imghippo.com/files/Qt5845YE.jpg',
            'https://i.imghippo.com/files/Edk6771q.jpg'
        ]
    },
    'bitti_2025': {
        title: 'বৃত্তি পরীক্ষা কর্মসূচি',
        images: [
            'https://i.imghippo.com/files/pRJV1935Vpw.jpg',
            'https://i.imghippo.com/files/VT4736eUU.jpg',
            'https://i.imghippo.com/files/eLIb3834UM.jpeg',
            'https://i.imghippo.com/files/fC3640AUU.jpeg',
            'https://i.imghippo.com/files/Eey2067zFM.png',
            'https://i.imghippo.com/files/ckA8494gwk.jpg'
        ]
    },
    'seminar-lawtoli': {
        title: 'সেমিনার - লাউতলী ডাঃ রশীদ আহমেদ উচ্চ বিদ্যালয়',
        images: [
            'https://i.imghippo.com/files/sgw2017gpI.jpg',
            'https://i.imghippo.com/files/eOu3608Gw.jpg',
            'https://i.imghippo.com/files/wcFZ5992Ok.jpeg'
        ]
    },
    'education2024': {
        title: 'শিক্ষা সহায়তা ২০২৪',
        images: [
            'https://i.imghippo.com/files/kHx7730Ro.jpg',
            'https://i.imghippo.com/files/kP2578TAs.jpg',
            'https://i.imghippo.com/files/WU6194xI.jpeg',
            'https://i.imghippo.com/files/MaFI3982lM.jpg'
        ]
    },
    'award-20252024': {
        title: 'অর্জন ২০২৪',
        images: [
            'award-1.jpg',
            'https://i.imghippo.com/files/gaz2073ls.jpg',
            'https://i.imghippo.com/files/Qt5845YE.jpg'
        ]
    }
};

// Current lightbox state
let currentGalleryImages = [];
let currentImageIndex = 0;

// Open gallery modal and show all images for the event
function openGalleryModal(eventId) {
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryModalTitle');
    const grid = document.getElementById('galleryGrid');

    const eventData = galleryData[eventId];
    if (!eventData) return;

    // Set title
    title.textContent = eventData.title;

    // Clear previous images
    grid.innerHTML = '';

    // Store current gallery images
    currentGalleryImages = eventData.images;

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

    currentImageIndex = index;

    // Set image
    image.src = currentGalleryImages[index];

    // Update counter
    counter.textContent = `${index + 1} / ${currentGalleryImages.length}`;

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
    currentImageIndex += direction;

    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = currentGalleryImages.length - 1;
    } else if (currentImageIndex >= currentGalleryImages.length) {
        currentImageIndex = 0;
    }

    // Update image
    const image = document.getElementById('lightboxImage');
    const counter = document.getElementById('imageCounter');

    image.src = currentGalleryImages[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
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
