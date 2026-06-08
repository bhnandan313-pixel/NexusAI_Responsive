const revealItems = document.querySelectorAll("[data-reveal]");
const navShell = document.querySelector(".nav-shell");
const navToggle = document.querySelector(".nav-toggle");
const speakerTrack = document.querySelector(".speaker-track");
const tabs = document.querySelectorAll(".tab");
const sessions = document.querySelectorAll(".session");
const faqItems = document.querySelectorAll(".faq-item");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach(item => revealObserver.observe(item));

navToggle.addEventListener("click", () => {
  const isOpen = navShell.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navShell.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  });
});

document.querySelectorAll("[data-carousel]").forEach(button => {
  button.addEventListener("click", () => {
    const card = speakerTrack.querySelector(".speaker-card");
    const distance = card.offsetWidth + 18;
    const direction = button.dataset.carousel === "next" ? 1 : -1;
    speakerTrack.scrollBy({ left: distance * direction, behavior: "smooth" });
  });
});

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    tabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");

    sessions.forEach(session => {
      const show = filter === "all" || session.dataset.period === filter;
      session.classList.toggle("is-hidden", !show);
    });
  });
});

faqItems.forEach(item => {
  const button = item.querySelector("button");
  const icon = button.querySelector("span");

  button.addEventListener("click", () => {
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    icon.textContent = isOpen ? "-" : "+";
  });
});