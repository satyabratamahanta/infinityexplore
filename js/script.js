// ✅ Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ✅ Auto Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.getElementById("dots-container");

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
  });
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function autoSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(autoSlide, 3000);
}

// ✅ Animated Counter Logic (Single & Correct)
const statsSection = document.querySelector('.stats');
let hasAnimated = false;

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');

    const update = () => {
      const current = +counter.innerText.replace(/,/g, '');
      const increment = target / 200;

      if (current < target) {
        const newCount = Math.ceil(current + increment);
        counter.innerText = newCount.toLocaleString("en-IN");
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString("en-IN");
      }
    };

    update();
  });
}

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !hasAnimated) {
    animateCounters();
    hasAnimated = true;
  }
}, { threshold: 0.3 });

if (statsSection) {
  observer.observe(statsSection);
}


// ✅ Map Pin Tooltip & Click Logic
document.addEventListener('DOMContentLoaded', () => {
  const pins = document.querySelectorAll('.pin');
  const tooltip = document.getElementById('tooltip');
  const mapWrapper = document.querySelector('.map-wrapper');

  if (!pins.length || !tooltip || !mapWrapper) return;

  pins.forEach(pin => {
    const placeName = pin.getAttribute('data-place');
    const url = pin.getAttribute('data-link');

    pin.addEventListener('mouseover', () => {
      tooltip.textContent = placeName;
      tooltip.style.display = 'block';
    });

    pin.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });

    pin.addEventListener('mousemove', (e) => {
      const rect = mapWrapper.getBoundingClientRect();
      tooltip.style.left = `${e.clientX - rect.left + 15}px`;
      tooltip.style.top = `${e.clientY - rect.top + 15}px`;
    });

    pin.addEventListener('click', () => {
      if (url) {
        window.open(url, '_blank');
      }
    });
  });
});

