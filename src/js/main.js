import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".header-btn").onclick = function openMenu() {
    document.querySelector(".header-container").classList.toggle("open");
  };
});
