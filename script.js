// script.js - Infinity Explore Website

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Confetti effect using canvas-confetti
function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Subscribe button animation
const subscribeBtn = document.getElementById("subscribe-btn");
if (subscribeBtn) {
  subscribeBtn.addEventListener("click", () => {
    subscribeBtn.innerText = "Subscribed ✅";
    subscribeBtn.classList.add("subscribed");
    launchConfetti();
  });
}

// Simple slider logic
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

if (nextBtn && prevBtn && slides.length > 0) {
  showSlide(currentSlide);

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
}
