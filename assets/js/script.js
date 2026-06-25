document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  if (slides.length > 1) {
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showNextSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }

    setInterval(showNextSlide, slideInterval);
  }
});

// document.addEventListener("DOMContentLoaded", function() {
//     const heroSection = document.querySelector('.hero-section');
//     const images = [
//         'assets/images/shutterstock_2168518333.jpg',
//         'assets/images/shutterstock_274681841.jpg',
//         // 'assets/images/image4.jpg',
//         // 'assets/images/image5.jpg'
//     ];

//     let currentIndex = 0;

//     function changeBackground() {
//         heroSection.classList.remove('fade-in');
//         setTimeout(() => {
//             heroSection.style.backgroundImage = `url(${images[currentIndex]})`;
//             heroSection.classList.add('fade-in');
//             currentIndex = (currentIndex + 1) % images.length;
//         }, 50); // Small delay to trigger reflow and ensure animation
//     }

//     setInterval(changeBackground, 5000);
//     changeBackground(); // Initial call to set the first image
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const heroSection = document.querySelector('.hero-section');
//     const images = [
//         'assets/images/shutterstock_2168518333.jpg',
//         'assets/images/shutterstock_274681841.jpg',
//         // 'assets/images/image3.jpg',
//         // 'assets/images/image4.jpg',
//         // 'assets/images/image5.jpg'
//     ];

//     let currentIndex = 0;
//     let nextIndex = 1;

//     function changeBackground() {
//         const before = getComputedStyle(heroSection, '::before');
//         const after = getComputedStyle(heroSection, '::after');

//         if (before.getPropertyValue('opacity') == 1) {
//             heroSection.style.setProperty('--before-image', `url(${images[nextIndex]})`);
//             heroSection.style.setProperty('--after-image', `url(${images[currentIndex]})`);
//             heroSection.querySelector('::before').style.opacity = '0';
//             heroSection.querySelector('::after').style.opacity = '1';
//         } else {
//             heroSection.style.setProperty('--after-image', `url(${images[nextIndex]})`);
//             heroSection.style.setProperty('--before-image', `url(${images[currentIndex]})`);
//             heroSection.querySelector('::before').style.opacity = '1';
//             heroSection.querySelector('::after').style.opacity = '0';
//         }

//         currentIndex = (currentIndex + 1) % images.length;
//         nextIndex = (nextIndex + 1) % images.length;
//     }

//     setInterval(changeBackground, 5000);
//     changeBackground(); // Initial call to set the first image
// });

// Robust Menu Toggle and Accordion Logic
function initNavigationMenu() {
  const openBtn = document.getElementById("open-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const closeBtn = document.getElementById("close-menu-btn");

  if (!openBtn || !navMenu) return;

  // Prevent duplicate listener binding
  if (openBtn.dataset.bound) return;
  openBtn.dataset.bound = "true";

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    navMenu.classList.toggle("active");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.remove("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !openBtn.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });
}

function initSubmenuAccordion() {
  const submenuToggles = document.querySelectorAll(".toggle-submenu");
  submenuToggles.forEach(toggle => {
    if (toggle.dataset.bound) return;
    toggle.dataset.bound = "true";

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentLi = toggle.closest(".has-submenu");
      const submenu = parentLi.querySelector(".nav-submenu");
      
      // Close other submenus first (accordion behavior)
      document.querySelectorAll(".nav-submenu").forEach(sub => {
        if (sub !== submenu) sub.classList.remove("open");
      });
      document.querySelectorAll(".has-submenu").forEach(li => {
        if (li !== parentLi) li.classList.remove("active");
      });
      
      submenu.classList.toggle("open");
      parentLi.classList.toggle("active");
    });
  });
}

// Initialize instantly
initNavigationMenu();
initSubmenuAccordion();

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initNavigationMenu();
  initSubmenuAccordion();
});

// Initialize on Window Load
window.addEventListener("load", () => {
  initNavigationMenu();
  initSubmenuAccordion();
});

let backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

backToTopBtn.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// --- Image Preloader ---
document.addEventListener("DOMContentLoaded", function () {
  const imageUrls = new Set();

  // 1. Get all <img> tags
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.src) imageUrls.add(img.src);
  });

  // 2. Get all elements with background-image
  const allElements = document.querySelectorAll("*");
  allElements.forEach((el) => {
    const bg = window.getComputedStyle(el).backgroundImage;
    if (bg && bg !== "none") {
      // Extract URL from "url('...')"
      const urlMatch = bg.match(/url\(['"]?(.*?)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        imageUrls.add(urlMatch[1]);
      }
    }
  });

  // Remove duplicate/data URIs
  const urls = Array.from(imageUrls).filter(
    (url) => !url.startsWith("data:")
  );
  let loadedCount = 0;
  const total = urls.length;
  let isDone = false;

  function hideLoader() {
    if (isDone) return;
    isDone = true;
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");
    if (loader) loader.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
    console.log(`Preloaded ${total} images/bg-images.`);
  }

  if (total === 0) {
    hideLoader();
  } else {
    urls.forEach((url) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= total) hideLoader();
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= total) hideLoader();
      };
      img.src = url;
    });
  }

  // Fallback: hide loader after 8 seconds anyway to prevent infinite loading
  setTimeout(hideLoader, 8000);
});

// Sync hero wrapper padding with navbar height
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".energlobix__navbar");
  const heroWrappers = document.querySelectorAll(".hero-content-wrapper");
  if (navbar && heroWrappers.length > 0) {
    function syncNavbarPadding() {
      const navHeight = navbar.getBoundingClientRect().height;
      heroWrappers.forEach(wrapper => {
        wrapper.style.paddingTop = navHeight + "px";
      });
    }
    // Sync on initial load
    syncNavbarPadding();
    // Sync on window resize
    window.addEventListener("resize", syncNavbarPadding);
    // Sync if navbar content dynamically wraps/sizes using a ResizeObserver
    const navResizeObserver = new ResizeObserver(syncNavbarPadding);
    navResizeObserver.observe(navbar);
  }
});
