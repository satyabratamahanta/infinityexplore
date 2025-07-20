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

        items.forEach((item, i) => {
            let position = i - activeIndex;

            // Adjust position for circular looping:
            if (position > halfNumItems) {
                position -= numItems;
            } else if (position < -halfNumItems) {
                position += numItems;
            }

            item.removeAttribute('data-position');
            item.setAttribute('data-position', position);

            // Reset explicit styles that might have been set by previous `else` blocks in old JS
            item.style.opacity = '';
            item.style.pointerEvents = '';
            item.style.transform = '';
            item.style.zIndex = '';
        });

        // Parallax Effect for Background
        // Adjust the '20' multiplier for intensity if needed
        const parallaxAmount = activeIndex * 20; 
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
            const clickedPosition = parseInt(item.getAttribute('data-position'));
            // Only allow clicking on items that are not active and are within visible range
            if (clickedPosition !== 0 && Math.abs(clickedPosition) <= 3) { 
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