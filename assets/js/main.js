document.addEventListener("DOMContentLoaded", () => {
  initMenuInteraction();
  initSearchFunctionality();
  initComponentCards();
  initNavActions();
  initAnimations();
  initKeyboardShortcuts();
});

function initMenuInteraction() {
  const menuLinks = document.querySelectorAll(".menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menuLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 100);
    });
  });
}

function initSearchFunctionality() {
  const searchBox = document.querySelector(".search-box");

  if (!searchBox) return;

  searchBox.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      const query = this.value.trim();
      if (query) {
        performSearch(query);
      }
    }
  });

  searchBox.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    filterComponents(query);
  });
}

function performSearch(query) {
  showNotification(`Searching for: "${query}"`, "info");
  console.log("Search query:", query);
}

function filterComponents(query) {
  const cards = document.querySelectorAll(".component-card");

  cards.forEach((card) => {
    const title =
      card.querySelector(".card-title")?.textContent.toLowerCase() || "";
    const description =
      card.querySelector(".card-description")?.textContent.toLowerCase() || "";

    if (title.includes(query) || description.includes(query) || query === "") {
      card.style.display = "";
      card.style.opacity = "1";
    } else {
      card.style.opacity = "0.3";
    }
  });
}

function initComponentCards() {
  const componentCards = document.querySelectorAll(".component-card");

  componentCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector(".card-title")?.textContent;

      if (title) {
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
        showNotification(`Opening ${title} component...`, "success");
      }
    });

    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
}

function initNavActions() {
  const notificationBtn = document.querySelector(".nav-btn.has-notification");
  if (notificationBtn) {
    notificationBtn.addEventListener("click", function () {
      showNotification("No new notifications", "info");
      this.classList.remove("has-notification");
    });
  }

  const helpBtn = document.querySelector(".nav-btn:not(.has-notification)");
  if (helpBtn) {
    helpBtn.addEventListener("click", function () {
      showNotification("Help & Documentation", "info");
    });
  }
}

function initAnimations() {
  const cards = document.querySelectorAll(".component-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 + index * 100);
  });

  const features = document.querySelectorAll(".feature-card");
  features.forEach((feature, index) => {
    feature.style.opacity = "0";
    feature.style.transform = "translateY(20px)";

    setTimeout(() => {
      feature.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      feature.style.opacity = "1";
      feature.style.transform = "translateY(0)";
    }, 400 + index * 100);
  });
}

function initKeyboardShortcuts() {
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const searchBox = document.querySelector(".search-box");
      if (searchBox) {
        searchBox.focus();
      }
    }

    if (e.key === "Escape") {
      const searchBox = document.querySelector(".search-box");
      if (searchBox && document.activeElement === searchBox) {
        searchBox.blur();
        searchBox.value = "";
        filterComponents("");
      }
    }
  });
}

function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".notification-toast");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification-toast notification-${type}`;
  notification.innerHTML = `
    <i class="fas ${getNotificationIcon(type)}"></i>
    <span>${message}</span>
  `;

  Object.assign(notification.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 20px",
    background: getNotificationBackground(type),
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
    color: "#ffffff",
    fontSize: "0.9rem",
    fontWeight: "500",
    zIndex: "9999",
    transform: "translateY(100px)",
    opacity: "0",
    transition: "all 0.3s ease",
  });

  document.body.appendChild(notification);

  requestAnimationFrame(() => {
    notification.style.transform = "translateY(0)";
    notification.style.opacity = "1";
  });

  setTimeout(() => {
    notification.style.transform = "translateY(100px)";
    notification.style.opacity = "0";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-times-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

function getNotificationBackground(type) {
  const backgrounds = {
    success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    warning: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    info: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  };
  return backgrounds[type] || backgrounds.info;
}

function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.KvoLib = {
  showNotification,
  scrollToElement,
  filterComponents,
};
