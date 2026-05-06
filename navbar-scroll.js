document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const desktopMenu = document.querySelector("#main-header ul");
  const mobileIcon = document.querySelector("#main-header .fa-bars");
  const logo = document.querySelector("#main-header img");

  // Add transition to header for smooth effect
  if (header) {
    header.style.transition = "background-color 0.3s ease, box-shadow 0.3s ease";
  }
  if (desktopMenu) {
    desktopMenu.style.transition = "color 0.3s ease";
    Array.from(desktopMenu.children).forEach(li => {
      const a = li.querySelector("a");
      if (a) a.style.transition = "color 0.3s ease";
    });
  }
  if (mobileIcon) mobileIcon.style.transition = "color 0.3s ease";
  if (logo) logo.style.transition = "filter 0.3s ease";

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      if (header) {
        header.classList.add("bg-white", "shadow-md");
      }
      if (desktopMenu) {
        desktopMenu.classList.remove("text-white");
        desktopMenu.classList.add("text-black");
      }
      if (mobileIcon) {
        mobileIcon.classList.remove("text-white");
        mobileIcon.classList.add("text-black");
      }
      if (logo) {
        logo.style.filter = "brightness(0)";
      }
    } else {
      if (header) {
        header.classList.remove("bg-white", "shadow-md");
      }
      if (desktopMenu) {
        desktopMenu.classList.remove("text-black");
        desktopMenu.classList.add("text-white");
      }
      if (mobileIcon) {
        mobileIcon.classList.remove("text-black");
        mobileIcon.classList.add("text-white");
      }
      if (logo) {
        logo.style.filter = "none";
      }
    }
  });
});
