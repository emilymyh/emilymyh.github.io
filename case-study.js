const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");
const backLink = document.querySelector(".case-back");

if (backLink) {
  const backLabel = backLink.textContent.trim();
  backLink.innerHTML = `<i class="fa-solid fa-left-long" aria-hidden="true"></i><span>${backLabel}</span>`;
}

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = [...gallery.querySelectorAll(".gallery-slide")];
  const caption = gallery.querySelector(".gallery-caption");
  const previous = gallery.querySelector(".prev");
  const next = gallery.querySelector(".next");
  let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

  previous.innerHTML = '<i class="fa-solid fa-circle-arrow-left" aria-hidden="true"></i>';
  next.innerHTML = '<i class="fa-solid fa-circle-arrow-right" aria-hidden="true"></i>';

  const show = (index) => {
    slides[active].classList.remove("is-active");
    active = (index + slides.length) % slides.length;
    slides[active].classList.add("is-active");
    caption.textContent = `${active + 1} / ${slides.length} — ${slides[active].dataset.caption || slides[active].alt}`;
  };

  previous.addEventListener("click", () => show(active - 1));
  next.addEventListener("click", () => show(active + 1));
  gallery.tabIndex = 0;
  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(active - 1);
    if (event.key === "ArrowRight") show(active + 1);
  });
  show(active);
});
