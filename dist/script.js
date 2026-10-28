const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightbox.showModal();
  });
});

lightbox?.querySelector('button')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();
