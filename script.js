const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

// smooth scrolling with offset
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

window.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// active link highlighting
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(section => observer.observe(section));

// FAQ accordion
const accordionButtons = document.querySelectorAll('.accordion-item');
accordionButtons.forEach(btn => {
  btn.addEventListener('click', () => toggleAccordion(btn));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion(btn);
    }
  });
});

function toggleAccordion(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  accordionButtons.forEach(b => {
    const panel = document.getElementById(b.getAttribute('aria-controls'));
    b.setAttribute('aria-expanded', 'false');
    panel.classList.remove('open');
  });
  if (!expanded) {
    btn.setAttribute('aria-expanded', 'true');
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    panel.classList.add('open');
  }
}

// form validation
const form = document.querySelector('.form');
const successMsg = document.querySelector('.success');

function validateField(field) {
  const errorEl = field.parentElement.querySelector('.error');
  let message = '';
  if (!field.value.trim()) {
    message = 'This field is required.';
  } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
    message = 'Enter a valid email address.';
  }
  errorEl.textContent = message;
  return !message;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.textContent = '';
    const fields = form.querySelectorAll('input');
    let valid = true;
    fields.forEach(field => { if (!validateField(field)) valid = false; });
    if (valid) {
      successMsg.textContent = 'Registration received! We will be in touch.';
      form.reset();
    }
  });

  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });
}
