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

    this.initTabs(container);
    this.initCopyBoxes(container);
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

  initCopyBoxes(container) {
    container.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const targetId = this.getAttribute("data-copy-target");
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
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ComponentViewer();
  });
} else {
  new ComponentViewer();
}
