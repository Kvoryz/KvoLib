const navbarHTML = `<nav class="navbar">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <img src="/assets/img/icon.png" alt="KvoLib" width="24" height="24" />
      <span>KvoLib</span>
    </a>
    <div class="search-wrapper">
      <i class="fas fa-search search-icon"></i>
      <input
        type="text"
        class="search-input"
        id="global-search"
        placeholder="Search components..."
      />
      <span class="search-kbd">⌘K</span>
      <div class="search-results" id="search-results"></div>
    </div>
    <div class="nav-links">
      <a href="/" class="nav-link">Home</a>
      <a href="/components.html" class="nav-link">Components</a>
      <a href="/template.html" class="nav-link">Templates</a>
      <a
        href="/changelog.html"
        class="nav-link"
      >
        <i class="fas fa-history"></i>
      </a>
    </div>
  </div>
</nav>`;

document.write(navbarHTML);
