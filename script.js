/**
 * Editorial Portfolio — Vanilla JavaScript
 * Author: [YOUR NAME]
 * Zero external libraries or frameworks.
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. Interactive 01 / 06 Hero Counter Widget (Matches reference image)
  // =========================================================================
  const showcaseProjects = [
    { num: "01", name: "[PROJECT 01 NAME]" },
    { num: "02", name: "[PROJECT 02 NAME]" },
    { num: "03", name: "[PROJECT 03 NAME]" },
    { num: "04", name: "[PROJECT 04 NAME]" },
    { num: "05", name: "[PROJECT 05 NAME]" },
    { num: "06", name: "[PROJECT 06 NAME]" },
  ];

  let currentIndex = 0;
  const activeNumEl = document.getElementById("hero-active-num");
  const projectNameEl = document.getElementById("hero-project-name");
  const lineProgressEl = document.getElementById("hero-line-progress");
  const prevBtn = document.getElementById("hero-prev-btn");
  const nextBtn = document.getElementById("hero-next-btn");

  const syncHeroWidget = (idx) => {
    currentIndex = (idx + showcaseProjects.length) % showcaseProjects.length;
    const current = showcaseProjects[currentIndex];

    if (activeNumEl) activeNumEl.textContent = current.num;
    if (projectNameEl) projectNameEl.textContent = current.name;
    if (lineProgressEl) {
      const pct = ((currentIndex + 1) / showcaseProjects.length) * 100;
      lineProgressEl.style.width = `${pct}%`;
    }
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => syncHeroWidget(currentIndex - 1));
    nextBtn.addEventListener("click", () => syncHeroWidget(currentIndex + 1));
  }

  // =========================================================================
  // 2. Fullscreen Mobile Navigation
  // =========================================================================
  const navToggle = document.getElementById("nav-toggle");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (navToggle && mobileOverlay) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileOverlay.classList.toggle("active");
      navToggle.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      mobileOverlay.setAttribute("aria-hidden", String(!isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileOverlay.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        mobileOverlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
  }

  // =========================================================================
  // 3. Scroll Tracking & Right-Edge Pip Tracker
  // =========================================================================
  const sections = document.querySelectorAll("section[id]");
  const trackerPips = document.querySelectorAll(".tracker-pip");
  const desktopNavLinks = document.querySelectorAll(".nav-link");

  const handleScroll = () => {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        // Desktop nav active indicator
        desktopNavLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });

        // Right tracker pips
        trackerPips.forEach((pip) => {
          pip.classList.toggle("active", pip.getAttribute("data-target") === id);
        });
      }
    });

    // Back to top visibility
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
      if (scrollPos > 500) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Click tracker pips to smooth-scroll
  trackerPips.forEach((pip) => {
    pip.addEventListener("click", () => {
      const targetId = pip.getAttribute("data-target");
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Back to top action
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =========================================================================
  // 4. Subtle IntersectionObserver Scroll Reveals
  // =========================================================================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("active"));
  }

  // =========================================================================
  // 5. Contact Form Client-Side Validation
  // =========================================================================
  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  if (contactForm && formFeedback) {
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    const nameErr = document.getElementById("name-error");
    const emailErr = document.getElementById("email-error");
    const messageErr = document.getElementById("message-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset error states
      [nameInput, emailInput, messageInput].forEach((inp) => inp.classList.remove("has-error"));
      [nameErr, emailErr, messageErr].forEach((err) => err.classList.remove("show"));
      formFeedback.style.display = "none";

      if (!nameInput.value.trim()) {
        nameInput.classList.add("has-error");
        nameErr.classList.add("show");
        isValid = false;
      }

      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add("has-error");
        emailErr.classList.add("show");
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        messageInput.classList.add("has-error");
        messageErr.classList.add("show");
        isValid = false;
      }

      if (isValid) {
        // Honest student submission message without pretending email was sent
        formFeedback.style.display = "block";
        formFeedback.innerHTML = `
          <strong>Thanks! Your message has been prepared successfully.</strong><br />
          Because this is a static university assignment, please reach out directly at 
          <a href="mailto:[YOUR EMAIL]" style="text-decoration: underline; color: inherit;">[YOUR EMAIL]</a>.
        `;
        contactForm.reset();
      }
    });
  }
});
