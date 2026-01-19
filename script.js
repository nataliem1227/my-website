document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for navigation links with proper centering
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate the position to center the section
        const targetPosition = targetSection.offsetTop;
        const targetHeight = targetSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calculate scroll position to center the section
        const scrollTo = targetPosition - windowHeight / 2 + targetHeight / 2;

        window.scrollTo({
          top: scrollTo,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const animatedElements = document.querySelectorAll(
    ".section, .project-card, .skill-category",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Add active state to navigation on scroll
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Check if section is in the middle of viewport
      if (
        window.pageYOffset >= sectionTop - window.innerHeight / 2 &&
        window.pageYOffset < sectionTop + sectionHeight - window.innerHeight / 2
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Add parallax effect to hero background
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg-effect");

  if (hero && heroBg) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }

  // Dynamic particle effects
  const bgEffects = document.querySelector(".bg-effects");

  if (bgEffects) {
    // Add more particles dynamically
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      bgEffects.appendChild(particle);
    }
  }

  // Add typing effect to hero tagline (optional)
  const tagline = document.querySelector(".hero-tagline");
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = "";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add glow effect on mouse move for project cards
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // Console Easter Egg
  console.log(
    "%c⚡ Welcome! ⚡",
    "color: #00ff9f; font-size: 20px; font-weight: bold;",
  );
  console.log(
    "%cLooking for something? The code is open source!",
    "color: #9d4dff; font-size: 14px;",
  );
  console.log(
    "%cMay your deploys be successful and your bugs be few.",
    "color: #00ff9f; font-size: 12px;",
  );

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "1";
    }, 100);
  });

  // Logo click - scroll to top
  const logo = document.querySelector(".logo-circle");
  if (logo) {
    logo.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Mobile menu adjustments
window.addEventListener("resize", () => {
  // Adjust nav links for mobile if needed
  const nav = document.querySelector(".side-nav");
  if (window.innerWidth <= 768) {
    nav.style.height = "auto";
  } else {
    nav.style.height = "100vh";
  }
});
