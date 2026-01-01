document.querySelectorAll("[data-magnetic]").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

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
