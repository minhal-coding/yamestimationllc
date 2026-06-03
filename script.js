const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const year = document.querySelector("#year");

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
