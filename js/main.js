// Hamburger toggle
const ham = document.getElementById('hamburger');
const navUl = document.getElementById('nav-links');
if(ham && navUl){
  ham.addEventListener('click', () => navUl.classList.toggle('open'));
}

// Milestone accordion
document.querySelectorAll('.milestone-head').forEach(head => {
  head.addEventListener('click', () => {
    const body = head.nextElementSibling;
    if(body) body.classList.toggle('open');
    const arrow = head.querySelector('.arrow');
    if(arrow) arrow.textContent = body.classList.contains('open') ? '▲' : '▼';
  });
});

// Active nav link
const links = document.querySelectorAll('nav ul li a');
const page = location.pathname.split('/').pop() || 'index.html';
links.forEach(l => {
  if(l.getAttribute('href') === page) l.classList.add('active');
});
