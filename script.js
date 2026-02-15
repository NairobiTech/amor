/* ═══════════════════════════════════════════
   LOVE DEDICATION SPA - JavaScript
   For My Pinky, My Empress, My Queen
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Floating Hearts ─── */
  const heartsContainer = document.getElementById('heartsContainer');
  const heartSymbols = ['\u2665', '\u2764', '\u2661', '\u2763', '\u2766'];

  function createHeart() {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 24 + 12) + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';

    const colors = ['#ff6b8a', '#e74c6f', '#bf55ec', '#c39bd3', '#f1c40f'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    heartsContainer.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());
  }

  // Create hearts periodically
  setInterval(createHeart, 800);
  // Initial burst
  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 200);
  }

  /* ─── Navigation ─── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.7) {
      nav.classList.add('visible');
    } else {
      nav.classList.remove('visible');
    }
  });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  /* ─── Love Counter ─── */
  const startDate = new Date(2020, 8, 12); // Sept 12, 2020

  function updateCounter() {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    document.getElementById('counterYears').textContent = years;
    document.getElementById('counterMonths').textContent = months;
    document.getElementById('counterDays').textContent = days;
  }

  updateCounter();
  setInterval(updateCounter, 60000);

  /* ─── Scroll Animations ─── */
  const fadeElements = document.querySelectorAll(
    '.poem-card, .timeline-card, .song-card, .vows-card, .counter-card, .gallery-item'
  );

  fadeElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
  );

  fadeElements.forEach(el => observer.observe(el));

  /* ─── Gallery Lightbox ─── */
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <img src="" alt="Our love" />
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && img.src) {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
      }
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });

  /* ─── Smooth scroll for all anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
