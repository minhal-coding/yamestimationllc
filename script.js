const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#year");
const header = document.querySelector(".site-header");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}

const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealTargets = [
  ".statement",
  ".section-kicker",
  ".service-tile",
  ".estimate-band",
  ".visual-process",
  ".cta-panel",
  ".page-hero",
  ".section",
  ".service-matrix article",
  ".timeline article",
  ".about-layout",
  ".contact-page",
  ".feature-card",
  ".detail-list p",
  ".info-grid p"
].join(",");

document.querySelectorAll(revealTargets).forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
});

if (motionOK && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
} else {
  document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
}

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

document.querySelectorAll(".btn, .service-tile, .timeline article, .feature-card, .service-matrix article").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    item.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});
