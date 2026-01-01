const searchData = [
  {
    title: "Buttons",
    desc: "Button variants and sizes",
    icon: "fa-hand-pointer",
    url: "components/buttons.html",
  },
  {
    title: "Forms",
    desc: "Input, select, checkbox",
    icon: "fa-keyboard",
    url: "components/forms.html",
  },
  {
    title: "Layout",
    desc: "Grid and containers",
    icon: "fa-th-large",
    url: "components.html",
  },
  {
    title: "Data Display",
    desc: "Tables and lists",
    icon: "fa-table",
    url: "components.html",
  },
  {
    title: "Feedback",
    desc: "Alerts, modals, toasts",
    icon: "fa-bell",
    url: "components.html",
  },
  {
    title: "Navigation",
    desc: "Navbar, sidebar, tabs",
    icon: "fa-compass",
    url: "components.html",
  },
  {
    title: "Documentation",
    desc: "Getting started guide",
    icon: "fa-book",
    url: "docs.html",
  },
  {
    title: "Installation",
    desc: "CDN and NPM setup",
    icon: "fa-download",
    url: "docs.html#installation",
  },
  {
    title: "Customization",
    desc: "CSS variables",
    icon: "fa-paint-brush",
    url: "docs.html#customization",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initCopyButtons();
  initRippleEffect();
  initKeyboardShortcuts();
});

function initTypewriter() {
  const element = document.getElementById("typewriter");
  if (!element) return;

  const words = ["Elegant", "Powerful", "Simple"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
        return;
      }
    } else {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const typeSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typeSpeed);
  }

  type();
}

function initSearch() {
  const searchInput = document.getElementById("global-search");
  const searchResults = document.getElementById("search-results");

  if (!searchInput || !searchResults) return;

  let activeIndex = -1;

  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    if (query.length === 0) {
      searchResults.classList.remove("active");
      return;
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      searchResults.innerHTML =
        '<div class="search-no-results">No results found</div>';
    } else {
      searchResults.innerHTML = filtered
        .map(
          (item, index) => `
        <a href="${item.url}" class="search-result-item" data-index="${index}">
          <div class="search-result-icon">
            <i class="fas ${item.icon}"></i>
          </div>
          <div class="search-result-text">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
          </div>
        </a>
      `
        )
        .join("");
    }

    searchResults.classList.add("active");
    activeIndex = -1;
  });

  searchInput.addEventListener("keydown", function (e) {
    const items = searchResults.querySelectorAll(".search-result-item");

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      updateActiveItem(items, activeIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActiveItem(items, activeIndex);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      items[activeIndex].click();
    } else if (e.key === "Escape") {
      searchResults.classList.remove("active");
      searchInput.blur();
    }
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-wrapper")) {
      searchResults.classList.remove("active");
    }
  });
}

function updateActiveItem(items, activeIndex) {
  items.forEach((item, index) => {
    item.classList.toggle("active", index === activeIndex);
  });
}

function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const targetId = this.getAttribute("data-copy");
      const codeElement = document.getElementById(targetId);

      if (codeElement) {
        try {
          await navigator.clipboard.writeText(codeElement.textContent);

          const originalHTML = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Copied!';
          this.classList.add("copied");

          setTimeout(() => {
            this.innerHTML = originalHTML;
            this.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      }
    });
  });
}

function initRippleEffect() {
  document.querySelectorAll(".kvo-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function initKeyboardShortcuts() {
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const searchInput = document.getElementById("global-search");
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
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

  const icons = {
    success: "fa-check-circle",
    error: "fa-times-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };

  const backgrounds = {
    success: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    error: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    warning: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    info: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
  };

  notification.innerHTML = `
    <i class="fas ${icons[type] || icons.info}"></i>
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
    background: backgrounds[type] || backgrounds.info,
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

window.KvoLib = {
  showNotification,
};
