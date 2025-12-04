
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
