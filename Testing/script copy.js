document.addEventListener('DOMContentLoaded', function () {
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const carouselInner = document.querySelector('.carousel-inner');
    const leftBtn = document.querySelector('.nav-arrow.left');
    const rightBtn = document.querySelector('.nav-arrow.right');
    let activeIndex = 0;

    // Helper function to calculate modular index (handles wrapping around array)
    function getModularIndex(index, length) {
        return (index % length + length) % length;
    }

    // Function to update carousel item positions with 3D transforms
    function updateCarousel() {
        const numItems = items.length;
        const halfNumItems = Math.floor(numItems / 2); // Used for circular positioning

        items.forEach((item, i) => {
            // Calculate the raw difference in index
            let position = i - activeIndex;

            // Adjust position for circular looping:
            // If an item is far to the right, but closer by looping left, adjust its position.
            if (position > halfNumItems) {
                position -= numItems;
            }
            // If an item is far to the left, but closer by looping right, adjust its position.
            else if (position < -halfNumItems) {
                position += numItems;
            }

            // Remove previous data-position attributes
            item.removeAttribute('data-position');

            // Apply data-position attribute for styling based on circular proximity to activeIndex
            // We now apply a data-position to *all* items,
            // even if it's beyond -3 or 3, so they are always accounted for by CSS.
            item.setAttribute('data-position', position);

            // Also, reset explicit styles that might have been set by the previous "else" block
            // to ensure CSS rules take precedence.
            item.style.opacity = ''; // Reset to default (or what CSS defines)
            item.style.pointerEvents = ''; // Reset to default (or what CSS defines)
            item.style.transform = ''; // Reset to default (or what CSS defines)
            item.style.zIndex = ''; // Reset to default (or what CSS defines)
        });
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
            if (i !== activeIndex) {
                activeIndex = i;
                updateCarousel();
            }
        });
    });


    // Optional: Autoplay functionality
    let autoScroll = setInterval(() => {
        rightBtn.click(); // Simulate a click on the right button
    }, 3500); // Change slide every 3.5 seconds

    // Optional: Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScroll); // Stop autoplay
    });
    carouselContainer.addEventListener('mouseleave', () => {
        // Resume autoplay
        autoScroll = setInterval(() => {
            rightBtn.click();
        }, 3500);
    });

    // Initial update when the page loads to set the first item in view
    updateCarousel();

    // Re-calculate carousel position on window resize for responsiveness
    window.addEventListener('resize', updateCarousel);
});