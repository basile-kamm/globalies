import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  // mobile header menu toggle
  document.querySelector(".header-btn").onclick = function openMenu() {
    document.querySelector(".header-container.mobile").classList.toggle("open");
  };

  // archive filter auto submit
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", function () {
      this.form.submit();
    });
  });
  const input = document.querySelector('input[type="text"]');
  if (input) {
    const form = input.form;
    const storageKey = "savedInputValue";
    // Load the saved value from localStorage
    const savedValue = localStorage.getItem(storageKey) || "";
    input.value = savedValue;

    // Restore focus after page reload
    window.addEventListener("load", () => {
      if (input.value) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length); // Move cursor to the end
      }
    });

    // Listen for changes
    let timeout;
    input.addEventListener("input", function () {
      if (this.value !== localStorage.getItem(storageKey)) {
        localStorage.setItem(storageKey, this.value); // Save only if changed

        clearTimeout(timeout);
        if (this.value.trim() !== "") {
          timeout = setTimeout(() => {
            form.submit(); // Submit the form
          }, 500); // Debounce (waits 500ms)
        }
      }
    });
  }

  // BackgroundImage CSS push from html attribute
  const singleLogo = document.querySelector(".single-hero-tiles");

  if (singleLogo) {
    const singleLogoUrl = singleLogo.getAttribute("data-logo-url");

    if (singleLogoUrl) {
      singleLogo.style.backgroundImage = `url(${singleLogoUrl})`;
    }
  }

  // Window resize listener for mobile/desktop header to display & filterbox
  let windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const mobileHeader = document.querySelector(".header-container.mobile");
  const desktopHeader = document.querySelector(".header-container.desktop");
  const filterCont = document.querySelector(".filters-cont");
  const filterMobile = document.querySelector(".filters-box.mobile-open");
  window.addEventListener("resize", () => {
    windowWidthChange();
  });

  function windowWidthChange() {
    windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    if (windowWidth < 768) {
      mobileHeader.style.display = "flex";
      desktopHeader.style.display = "none";

      if (filterMobile || filterCont) {
        filterMobile.classList.remove("hidden");
        filterCont.classList.add("hidden");
      }
    } else {
      mobileHeader.style.display = "none";
      desktopHeader.style.display = "flex";

      if (filterMobile || filterCont) {
        filterMobile.classList.add("hidden");
        filterCont.classList.remove("hidden");
      }
    }
  }

  if (filterMobile || filterCont) {
    filterMobile.onclick = function openFilter() {
      filterCont.classList.remove("hidden");
    };
  }

  windowWidthChange();

  // Mouse tracker for gradient changes
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const xRatio = clientX / innerWidth;
      const yRatio = clientY / innerHeight;

      const color1 = `rgb(${255 * xRatio}, 40, 14)`;
      const color2 = `rgb(0, ${255 * yRatio}, 47)`;
      const color3 = `rgb(0, 0, ${255 * (1 - xRatio)})`;

      document.documentElement.style.setProperty(
        "--gradientColors",
        `${color1} 0%, ${color2} 52%, ${color3} 100%`
      );
    });
  }

  {
    // card random placement
    const randomXElem = document.querySelectorAll(".random-x");
    const randomYElem = document.querySelectorAll(".random-y");
    const cardsScore = document.querySelectorAll(".showcase-card-score-cont");

    gsap.set(randomXElem, {
      translateX: () => Math.random() * 60 - 30,
    });
    gsap.set(randomYElem, {
      translateY: () => Math.random() * 60 - 30,
    });
    // if (window.innerWidth < 768) {
    //   gsap.set(randomXElem, {
    //     translateX: () => Math.random() * 60 - 30,
    //   });
    // } else {
    //   gsap.set(randomXElem, {
    //     translateX: () => Math.random() * 400 - 200,
    //   });
    // }

    gsap.set(cardsScore, {
      rotate: () => Math.random() * 40 - 20,
    });

    // alternative random placement

    const alternative = document.querySelectorAll(".single-alternative");

    if (alternative) {
      if (window.innerWidth < 768) {
        gsap.set(alternative, {
          translateX: () => Math.random() * 100 - 50,
          translateY: () => Math.random() * 40 - 20,
        });
      } else {
        gsap.set(alternative, {
          translateX: () => Math.random() * 100 - 50,
          translateY: () => Math.random() * 60 - 30,
        });
      }
    }
  }

  // Main scrollTrigger
  {
    const hero = document.querySelector(".hero-section");
    const searchbar = document.querySelector(".showcase-searchbar");
    const scrollBg = document.querySelector(".showcase-background");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "center top",

        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onLeave: () => {
          hero.style.visibility = "hidden";
        },
        onEnterBack: () => {
          hero.style.visibility = "visible";
        },
      },
    });

    if (window.innerWidth < 768) {
      tl.to(scrollBg, {
        scale: 1.1,
        duration: 0.2,
      });
      tl.to(
        hero,
        {
          scale: 7,
          rotate: "20deg",
          duration: 2,
        },
        "<"
      );
      tl.fromTo(
        searchbar,
        {
          y: 0,
          scale: 0.6,
          opacity: 0.7,
        },
        {
          // y: -100,
          duration: 3,
          scale: 3,
          opacity: 1,
        },
        "<"
      );
    } else {
      tl.from(scrollBg, {
        scale: 0.8,
        duration: 0.2,
      });
      tl.to(
        hero,
        {
          scale: 7,
          rotate: "20deg",
          duration: 2,
        },
        "<"
      );
      tl.fromTo(
        searchbar,
        {
          y: 0,
          scale: 0.6,
          opacity: 0.7,
        },
        {
          // y: -100,
          duration: 3,
          scale: 3,
          opacity: 1,
        },
        "<"
      );
    }
  }

  // Changing background scrolltrigger
  {
    const footerCont = document.querySelector(".footer-cont");

    gsap.to(footerCont, {
      scrollTrigger: {
        trigger: ".utopia-img-transition.tractor",
        start: "bottom top",
        end: "bottom bottom",
        // markers: true,
        scrub: true,
      },
      display: "block",
    });
  }

  // title size full width
  const title = document.querySelector(".single-hero-title");

  let fontSize = 1; // Taille initiale en vw
  const maxFontSize = 30; // Taille maximale en vw

  // Applique une taille initiale très basse pour éviter un effet de clignotement
  title.style.fontSize = fontSize + "vw";

  // Ajustement progressif
  while (fontSize <= maxFontSize) {
    title.style.fontSize = fontSize + "vw";

    // Vérifie si l'élément dépasse la largeur de la fenêtre
    if (title.offsetWidth >= windowWidth) {
      fontSize -= 2; // Revenir à la dernière taille correcte
      title.style.fontSize = fontSize + "vw";
      break;
    }

    fontSize += 0.1;
  }
});
