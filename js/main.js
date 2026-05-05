const nav = document.querySelector('nav');
const ham = document.getElementById('hamburger');
const navUl = document.getElementById('nav-links');

function closeMenu() {
  if (!nav || !navUl) return;
  navUl.classList.remove('open');
  nav.classList.remove('menu-open');
}

if (ham && navUl && nav) {
  ham.addEventListener('click', () => {
    const isOpen = navUl.classList.toggle('open');
    nav.classList.toggle('menu-open', isOpen);
  });

  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', event => {
    if (window.innerWidth > 820) return;
    if (!nav.contains(event.target)) closeMenu();
  });
}

if (nav) {
  const syncNavState = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  syncNavState();
  window.addEventListener('scroll', syncNavState, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

document.querySelectorAll('.milestone-head').forEach(head => {
  head.addEventListener('click', () => {
    const body = head.nextElementSibling;
    if (!body) return;
    body.classList.toggle('open');
    const arrow = head.querySelector('.arrow');
    if (arrow) arrow.textContent = body.classList.contains('open') ? '^' : 'v';
  });
});

const links = document.querySelectorAll('nav ul li a');
const page = location.pathname.split('/').pop() || 'index.html';
links.forEach(link => {
  if (link.getAttribute('href') === page) link.classList.add('active');
});

const revealTargets = document.querySelectorAll(
  '.page-header, .abstract-box, .highlight-box, .problem-box, .card, .stat-card, .comp-card, .team-card, .member-card, .sup-card, .info-card, .doc-link, .slide-card, .milestone-item, .method-step, .tech-item, .stat-pill, .timeline-bar'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal-on-scroll');
    target.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    observer.observe(target);
  });
} else {
  revealTargets.forEach(target => target.classList.add('in-view'));
}
