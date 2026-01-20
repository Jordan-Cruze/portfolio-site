const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
navLinks.classList.toggle('show');
hamburger.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    hamburger.classList.remove('active');
});
});
