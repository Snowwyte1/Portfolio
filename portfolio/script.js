// Theme handling and small enhancements

(function () {
    const STORAGE_KEY = "theme-preference";
    const html = document.documentElement;
    const toggleButton = document.getElementById("theme-toggle");
    const iconEl = document.getElementById("theme-toggle-icon");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenuIcon = document.getElementById("mobile-menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
  
    function getPreferredTheme() {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        return stored;
      }
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      return mql.matches ? "dark" : "light";
    }
  
    function applyTheme(theme) {
      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
      window.localStorage.setItem(STORAGE_KEY, theme);
      updateToggleIcon(theme);
    }
  
    function updateToggleIcon(theme) {
      if (!iconEl) return;
      const isDark = theme === "dark";
      iconEl.setAttribute("data-lucide", isDark ? "sun" : "moon");
  
      // Recreate Lucide icon for this element
      iconEl.innerHTML = "";
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    }
  
    // Initialize on DOMContentLoaded so elements exist
    document.addEventListener("DOMContentLoaded", () => {
      const initialTheme = getPreferredTheme();
      applyTheme(initialTheme);
  
      // Render all Lucide icons on the page
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
  
      if (toggleButton) {
        toggleButton.addEventListener("click", () => {
          const current = html.classList.contains("dark") ? "dark" : "light";
          const next = current === "dark" ? "light" : "dark";
          applyTheme(next);
        });
      }

      if (mobileMenuToggle && mobileMenu && mobileMenuIcon) {
        mobileMenuToggle.addEventListener("click", () => {
          const isOpen = !mobileMenu.classList.contains("hidden");
          if (isOpen) {
            mobileMenu.classList.add("hidden");
            mobileMenuIcon.setAttribute("data-lucide", "menu");
          } else {
            mobileMenu.classList.remove("hidden");
            mobileMenuIcon.setAttribute("data-lucide", "x");
          }

          if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
          }
        });
      }
  
      // Set current year in footer
      const yearSpan = document.getElementById("year");
      if (yearSpan) {
        yearSpan.textContent = String(new Date().getFullYear());
      }
    });
  })();