document.addEventListener('DOMContentLoaded', function () {
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const carouselInner = document.querySelector('.carousel-inner');
    const leftBtn = document.querySelector('.nav-arrow.left');
    const rightBtn = document.querySelector('.nav-arrow.right');
    const heroBackground = document.querySelector('.hero-background');

    let activeIndex = 0;

    // Helper function to calculate modular index (handles wrapping around array)
    function getModularIndex(index, length) {
        return (index % length + length) % length;
    }

    // Function to update carousel item positions with 3D transforms
    function updateCarousel() {
        const numItems = items.length;
        const halfNumItems = Math.floor(numItems / 2);
        const visibleRange = 4; // *** CHANGED: Now consider positions from -3 to +3, so 4 is the cutoff for hiding ***

        items.forEach((item, i) => {
            let position = i - activeIndex;

            // Adjust position for circular looping:
            if (position > halfNumItems) {
                position -= numItems;
            } else if (position < -halfNumItems) {
                position += numItems;
            }

            item.removeAttribute('data-position');

            // Apply data-position attribute for styling based on circular proximity to activeIndex
            // Now, we are explicitly applying data-position for all items that should be visible or just outside
            // and relying on the CSS to hide anything beyond 'visibleRange' if needed.
            // The previous conditional `if (Math.abs(position) <= visibleRange)` is removed here
            // because we want *all* items to get a data-position so CSS can manage them.
            item.setAttribute('data-position', position);

            // Reset explicit styles that might have been set by previous `else` blocks in old JS
            // (These lines are mostly for robustness if old inline styles linger, CSS should override)
            item.style.opacity = '';
            item.style.pointerEvents = '';
            item.style.transform = '';
            item.style.zIndex = '';
        });

        // Parallax Effect for Background
        const parallaxAmount = activeIndex * 20; // Adjust the '20' multiplier for intensity
        heroBackground.style.transform = `translateX(-${parallaxAmount}px)`;
        heroBackground.style.transition = `transform 0.8s ease-in-out`;
    }

    // Event listeners for navigation buttons
    leftBtn.addEventListener('click', () => {
        activeIndex = getModularIndex(activeIndex - 1, items.length);
        updateCarousel();
    });

    rightBtn.addEventListener('click', () => {
        activeIndex = getModularIndex(activeIndex + 1, items.length);
        updateCarousel();
    });

    // Event listeners for clicking on individual carousel items
    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            // Allow clicking on any item that is not the currently active one
            // We can also allow clicking on items within +/- 3 range for better UX
            const clickedPosition = parseInt(item.getAttribute('data-position'));
            if (clickedPosition !== 0 && Math.abs(clickedPosition) <= 3) { // Allow clicking visible side items
                activeIndex = i;
                updateCarousel();
            }
        });
    });

    // Optional: Autoplay functionality
    let autoScroll = setInterval(() => {
        rightBtn.click();
    }, 3500);

    // Optional: Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            rightBtn.click();
        }, 3500);
    });

    // Initial update when the page loads
    updateCarousel();

    // Re-calculate carousel position on window resize
    window.addEventListener('resize', updateCarousel);
});