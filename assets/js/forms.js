document.querySelectorAll(".code-tab").forEach((tab) => {
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
    parent.querySelector(`[data-content="${tabType}"]`).classList.add("active");
  });
});
