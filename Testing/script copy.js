const icons = document.querySelectorAll('.icon');
const tooltip = document.getElementById('tooltip');

icons.forEach(el => {
  const text = el.getAttribute('data-text');
  const url = el.getAttribute('data-link');

  el.addEventListener('mouseover', e => {
    tooltip.textContent = text;
    const r = el.getBoundingClientRect();
    tooltip.style.top = (window.scrollY + r.top - 30) + 'px';
    tooltip.style.left = (window.scrollX + r.left + r.width / 2) + 'px';
    tooltip.classList.add('visible');
  });

  el.addEventListener('mouseout', () => {
    tooltip.classList.remove('visible');
  });

  el.addEventListener('click', () => {
    window.open(url, '_blank');
  });
});


