// External JS file or <script> at end of body
const dotContainer = document.getElementById('dot-container');
const dots = [];
const spacing = 35; // distance between dots

// Create a grid
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

// Repel dots from cursor
window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  dots.forEach(dot => {
    const rect = dot.getBoundingClientRect();
    let dx = rect.left + rect.width/2 - mouseX;
    let dy = rect.top + rect.height/2 - mouseY;
    let distance = Math.sqrt(dx*dx + dy*dy);

    if (distance < 100) { // radius of repulsion
      let force = (100 - distance) / 100 * 15; // how far to push
      let angle = Math.atan2(dy, dx);
      dot.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`;
    } else {
      dot.style.transform = `translate(0, 0)`;
    }
  });
});

// Rebuild grid on resize
window.addEventListener('resize', () => location.reload());
