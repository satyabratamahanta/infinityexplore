document.addEventListener('DOMContentLoaded', () => {
    // Select all our SVG pins
    const pins = document.querySelectorAll('.pin');
    const tooltip = document.getElementById('tooltip');
    const mapWrapper = document.querySelector('.map-wrapper');

    pins.forEach(pin => {
        // Get the place name from data-place attribute
        const placeName = pin.getAttribute('data-place');
        const url = pin.getAttribute('data-link');

        // Show tooltip on hover
        pin.addEventListener('mouseover', (event) => {
            tooltip.textContent = placeName;
            tooltip.style.display = 'block';
        });

        // Hide tooltip on mouse out
        pin.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });

        // Move tooltip with the mouse for a smooth effect
        pin.addEventListener('mousemove', (event) => {
            const rect = mapWrapper.getBoundingClientRect();
            // Position tooltip relative to the map wrapper
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            tooltip.style.left = `${x + 20}px`;
            tooltip.style.top = `${y + 20}px`;
        });

        // Add the click event to open the link
        pin.addEventListener('click', () => {
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
});