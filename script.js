
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const closeBtn = document.getElementById('close-btn');

menuToggle.addEventListener('click', () => navLinks.classList.add('active'));
closeBtn.addEventListener('click', () => navLinks.classList.remove('active'));

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

const typingTexts = [": Frontend Developer", ": Web Designer", ": Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.querySelector('.typing');

function type() {
  const current = typingTexts[textIndex];
  typingEl.textContent = isDeleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
  }

  setTimeout(type, isDeleting ? 60 : 120);
}

type();


const form = document.querySelector('form');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const response = await fetch('https://formspree.io/f/xaqvgrlv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      form.reset();
      successMsg.style.display = 'block';
      setTimeout(() => successMsg.style.display = 'none', 4000);
    } else {
      const data = await response.json();
      const errorMsg = data?.errors?.map(e => e.message).join(', ') || 'Something went wrong.';
      alert(`Error: ${errorMsg}`);
    }
  } catch (err) {
    console.error('Form submission error:', err);
    alert('Could not send message. Please check your connection and try again.');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => bar.style.width = width, 200);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.bar-fill').forEach(bar => barObserver.observe(bar));
