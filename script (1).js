document.addEventListener("DOMContentLoaded", function () {

  function initNavToggle() {
    const toggleBtn = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");

    if (!toggleBtn || !nav) return;

    // Toggle menu on burger click
    toggleBtn.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a link (mobile)
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Reset menu on resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        nav.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function loadFragment(targetId, filePath, callback) {
    const target = document.getElementById(targetId);
    if (!target) return;

    fetch("./" + filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Kunne ikke loade " + filePath);
        }
        return response.text();
      })
      .then(html => {
        target.innerHTML = html;
        if (typeof callback === "function") callback();
      })
      .catch(error => {
        console.error(error);
      });
  }

  loadFragment("site-header", "header.html", initNavToggle);
  loadFragment("site-footer", "footer.html");

});
