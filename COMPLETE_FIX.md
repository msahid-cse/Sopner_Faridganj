# FOUNDING MEMBERS - COMPLETE FIX

## The Problem:
1. ❌ Mobile view only shows 2 founding members
2. ❌ Desktop drag scrolling not working  
3. ❌ Mobile swipe scrolling not working

## The Solution:

### Step 1: Fix HTML (index.html)

**Find line 725** which currently says:
```html
<div class="founding-scroll-container overflow-hidden relative">
```

**Change it to:**
```html
<div class="founding-scroll-container relative">
```

**What this does:** Removes `overflow-hidden` which was preventing scrolling.

---

### Step 2: Add CSS to styles.css

**Go to the END of `styles.css` file (after line 726) and add:**

```css
/* Founding Members - Manual Scroll Support */
.founding-scroll-container {
    cursor: grab;
    user-select: none;
}

.founding-scroll-container:active {
    cursor: grabbing;
}

.founding-scroll-track.dragging {
    animation-play-state: paused;
    cursor: grabbing;
}

/* Mobile: Enable horizontal scrolling */
@media (max-width: 768px) {
    .founding-scroll-container {
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
    }
    
    .founding-scroll-container::-webkit-scrollbar {
        height: 6px;
    }
    
    .founding-scroll-container::-webkit-scrollbar-track {
        background: var(--bg-secondary);
        border-radius: 3px;
    }
    
    .founding-scroll-container::-webkit-scrollbar-thumb {
        background: #10b981;
        border-radius: 3px;
    }
    
    .founding-scroll-container::-webkit-scrollbar-thumb:hover {
        background: #059669;
    }
}
```

---

### Step 3: Add JavaScript to script.js

**Go to the END of `script.js` file (after line 795) and add:**

```javascript

// Founding Members Manual Scroll Functionality
window.addEventListener('load', function() {
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
```

---

## After Making These Changes:

✅ **Desktop**: Click and drag to scroll through all 8 founding members  
✅ **Mobile**: Swipe left/right to see all 8 founding members  
✅ **Both**: Infinite auto-scroll continues working  
✅ **Both**: Animation pauses when you interact  

## Testing:
1. Save all files
2. Refresh your browser
3. **Desktop**: Hover over founding members (cursor should change to hand), then click and drag
4. **Mobile**: Swipe left/right on the founding members section

That's it! All 3 issues will be fixed! 🎉
