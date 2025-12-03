# Add infinite scroll CSS animation
css_to_add = '''
/* Founding Members Infinite Scroll Animation */
.founding-scroll-container {
    padding: 20px 0;
}

.founding-scroll-track {
    animation: founding-scroll 30s linear infinite;
}

.founding-scroll-track:hover {
    animation-play-state: paused;
}

@keyframes founding-scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

.founding-member-card {
    transition: transform 0.3s ease;
}

.founding-member-card:hover {
    transform: scale(1.05);
}
'''

with open('styles.css', 'a', encoding='utf-8') as f:
    f.write(css_to_add)

print("Successfully added infinite scroll CSS!")
