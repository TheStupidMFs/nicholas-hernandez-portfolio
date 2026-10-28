document.querySelector("#year").textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  document.documentElement.classList.add("motion-ready");

  const revealTargets = document.querySelectorAll(
    ".statement > *, .section-head > *, .project > *, .archive-grid figure, .record-list > div, .details > div, .contact > *",
  );
  revealTargets.forEach((element) => element.setAttribute("data-reveal", ""));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
  );
  revealTargets.forEach((element) => revealObserver.observe(element));

  const portrait = document.querySelector(".portrait img");
  const updatePortrait = () => {
    if (!portrait || window.innerWidth < 900) return;
    const distance = Math.min(window.scrollY * 0.035, 18);
    portrait.style.transform = `translateY(${distance}px) scale(1.015)`;
  };
  window.addEventListener("scroll", updatePortrait, { passive: true });
  updatePortrait();
}
