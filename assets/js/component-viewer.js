class ComponentViewer {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(".component-viewer").forEach((container) => {
      this.enhanceComponent(container);
    });
  }

  enhanceComponent(container) {
    if (container.classList.contains("initialized")) return;

    const previewEl = container.querySelector('[slot="preview"]');
    const htmlEl = container.querySelector('[slot="html"]');
    const cssEl = container.querySelector('[slot="css"]');

    if (!previewEl || !htmlEl) return;

    const previewContent = previewEl.innerHTML;
    const htmlCode = this.stripIndent(htmlEl.innerHTML);
    const cssCode = cssEl ? this.stripIndent(cssEl.innerHTML) : "";

    const uniqueId = "code-" + Math.random().toString(36).substr(2, 9);
    const hasCss = !!cssCode;

    const template = `
      <div class="preview-box">
        <div class="preview-area preview-dark">
          ${previewContent}
        </div>
        <details class="code-dropdown">
          <summary>
            <i class="fas fa-code"></i> View Code
            <i class="fas fa-chevron-down"></i>
          </summary>
          <div class="code-tabs">
            <button class="code-tab active" data-tab="html">HTML</button>
            ${
              hasCss
                ? `<button class="code-tab" data-tab="css">CSS</button>`
                : ""
            }
            <button class="code-tab playground-tab" data-html="${uniqueId}-html" data-css="${uniqueId}-css">
              <i class="fas fa-play"></i> Playground
            </button>
          </div>
          <div class="code-content active" data-content="html">
            <div class="code-header">
              <span>HTML</span>
              <button class="copy-btn" data-copy-target="${uniqueId}-html">
                <i class="fas fa-copy"></i> Copy
              </button>
            </div>
            <pre><code id="${uniqueId}-html" class="language-html">${this.escapeHtml(
      htmlCode
    )}</code></pre>
          </div>
          ${
            hasCss
              ? `
          <div class="code-content" data-content="css">
            <div class="code-header">
              <span>CSS</span>
              <button class="copy-btn" data-copy-target="${uniqueId}-css">
                <i class="fas fa-copy"></i> Copy
              </button>
            </div>
            <pre><code id="${uniqueId}-css" class="language-css">${this.escapeHtml(
                  cssCode
                )}</code></pre>
          </div>
          `
              : ""
          }
        </details>
      </div>
    `;

    container.innerHTML = template;
    container.classList.add("initialized");

    container.dataset.htmlCode = htmlCode;
    container.dataset.cssCode = cssCode;

    this.initTabs(container);
    this.initCopyButtons(container);
    this.initPlaygroundLinks(container);
  }

  escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  stripIndent(str) {
    str = str.replace(/^\n/, "");
    const match = str.match(/^\s+/);
    if (match) {
      const indent = match[0];
      const regex = new RegExp("^" + indent, "gm");
      return str.replace(regex, "");
    }
    return str.trim();
  }

  initTabs(container) {
    container.querySelectorAll(".code-tab").forEach((tab) => {
      tab.addEventListener("click", function () {
        const parent = this.closest(".code-dropdown");
        const tabType = this.dataset.tab;

        parent
          .querySelectorAll(".code-tab")
          .forEach((t) => t.classList.remove("active"));
        parent
          .querySelectorAll(".code-content")
          .forEach((c) => c.classList.remove("active"));

        this.classList.add("active");
        const content = parent.querySelector(
          `.code-content[data-content="${tabType}"]`
        );
        if (content) content.classList.add("active");
      });
    });
  }

  initCopyButtons(container) {
    container.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        const targetId = this.getAttribute("data-copy-target");
        const codeElement = document.getElementById(targetId);

        if (codeElement) {
          try {
            await navigator.clipboard.writeText(codeElement.textContent);

            const ripple = document.createElement("span");
            ripple.classList.add("ripple");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = e.clientX - rect.left - size / 2 + "px";
            ripple.style.top = e.clientY - rect.top - size / 2 + "px";
            this.appendChild(ripple);

            const colors = [
              "#10b981",
              "#34d399",
              "#6ee7b7",
              "#a7f3d0",
              "#fbbf24",
            ];
            for (let i = 0; i < 6; i++) {
              const confetti = document.createElement("span");
              confetti.classList.add("confetti");
              confetti.style.background =
                colors[Math.floor(Math.random() * colors.length)];
              confetti.style.left = "50%";
              confetti.style.top = "50%";
              confetti.style.setProperty(
                "--x",
                (Math.random() - 0.5) * 60 + "px"
              );
              confetti.style.setProperty(
                "--y",
                (Math.random() - 0.5) * 60 + "px"
              );
              this.appendChild(confetti);
            }

            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            this.classList.add("copied");

            setTimeout(() => {
              this.innerHTML = originalHTML;
              this.classList.remove("copied");
              this.querySelectorAll(".ripple, .confetti").forEach((el) =>
                el.remove()
              );
            }, 1500);
          } catch (err) {
            console.error("Failed to copy:", err);
          }
        }
      });
    });
  }

  initPlaygroundLinks(container) {
    const playgroundBtn = container.querySelector(".playground-tab");
    if (!playgroundBtn) return;

    playgroundBtn.addEventListener("click", () => {
      const html = container.dataset.htmlCode || "";
      const css = container.dataset.cssCode || "";

      const htmlEncoded = btoa(encodeURIComponent(html));
      const cssEncoded = btoa(encodeURIComponent(css));

      const pathParts = window.location.pathname.split("/");
      const page = pathParts[pathParts.length - 1].replace(".html", "");
      const componentName = page.charAt(0).toUpperCase() + page.slice(1);

      const section = container.closest("[id]");
      const anchor = section ? section.id : "";

      // Detect if we're in templates or components folder
      const isTemplate = window.location.pathname.includes("/templates/");
      const type = isTemplate ? "templates" : "components";

      window.location.href = `/playground.html?html=${htmlEncoded}&css=${cssEncoded}&from=${componentName}&anchor=${anchor}&type=${type}`;
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ComponentViewer();
  });
} else {
  new ComponentViewer();
}
