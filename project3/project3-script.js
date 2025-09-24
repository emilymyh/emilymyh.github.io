
  /* Hamburger menu */
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('is-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });


  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      menu.classList.remove('open');
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });


  /* Slide show*/
/* Slide show — supports multiple .slider instances */
(function () {
  const sliders = document.querySelectorAll('.slider');
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsWrap = slider.querySelector('.dots');
    const captionEl = slider.querySelector('.caption');
    if (!slides.length) return;

    let index = slides.findIndex(s => s.classList.contains('is-active'));
    if (index < 0) index = 0;

    // Build dots for this slider
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === index) b.setAttribute('aria-selected', 'true');
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    function setCaption(i) {
      const text = slides[i].getAttribute('data-caption') || slides[i].alt || '';
      if (captionEl) captionEl.textContent = text;
    }

    function go(to) {
      slides[index].classList.remove('is-active');
      if (dots[index]) dots[index].setAttribute('aria-selected', 'false');

      index = (to + slides.length) % slides.length;

      slides[index].classList.add('is-active');
      if (dots[index]) dots[index].setAttribute('aria-selected', 'true');
      setCaption(index);
    }

    // Init
    setCaption(index);

    // Controls
    prevBtn?.addEventListener('click', () => go(index - 1));
    nextBtn?.addEventListener('click', () => go(index + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));

    // Keyboard support (per slider)
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    });
    slider.tabIndex = 0; // focusable for arrow keys

    
    let startX = null;
    slider.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
    slider.addEventListener('touchend', (e) => {
      if (startX == null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
  });
})();


