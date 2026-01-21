// dot.js
const dotContainer = document.getElementById('dot-container');
const dots = [];
const spacing = 35; // distance between dots

// Determine if screen is desktop or mobile
const isDesktop = window.innerWidth > 768;

// Create a grid of dots
const cols = Math.ceil(window.innerWidth / spacing);
const rows = Math.ceil(window.innerHeight / spacing);

for (let y = 0; y <= rows; y++) {
  for (let x = 0; x <= cols; x++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = `${x * spacing}px`;
    dot.style.top = `${y * spacing}px`;
    dotContainer.appendChild(dot);
    dots.push(dot);
  }
}

// Function to handle repulsion (desktop only)
function repulseDots(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  dots.forEach(dot => {
    const rect = dot.getBoundingClientRect();
    let dx = rect.left + rect.width / 2 - mouseX;
    let dy = rect.top + rect.height / 2 - mouseY;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) { // radius of repulsion
      let force = (100 - distance) / 100 * 15; // push distance
      let angle = Math.atan2(dy, dx);
      dot.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`;
    } else {
      dot.style.transform = `translate(0, 0)`;
    }
  });
}

// Add repulsion effect only for desktop
if (isDesktop) {
  window.addEventListener('mousemove', repulseDots);
}

// Rebuild grid safely on window resize (desktop only, debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768) {
      location.reload(); // rebuild for desktop
    }
  }, 200); // wait 200ms after resize stops
});
