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

// Menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".navlinks-mobile");

  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});

// Toggle Sub Menu
function toggleSubmenu(id) {
  var submenu = document.getElementById(id);
  if (submenu.classList.contains("show")) {
    submenu.classList.remove("show");
  } else {
    submenu.classList.add("show");
  }
}

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
