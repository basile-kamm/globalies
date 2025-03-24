import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".header-btn").onclick = function openMenu() {
    document.querySelector(".header-container").classList.toggle("open");
  };

  const singleLogo = document.querySelector(".single-hero-tiles");

  console.log(singleLogo);
  if (singleLogo) {
    const singleLogoUrl = singleLogo.getAttribute("data-logo-url");

    if (singleLogoUrl) {
      singleLogo.style.backgroundImage = `url(${singleLogoUrl})`;
    } else {
      console.log("L'attribut data-logo-url est manquant !");
    }
  } else {
    console.log("Élément .single-hero-tiles introuvable !");
  }

  let windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const mobileHeader = document.querySelector(".header-container.mobile");
  const desktopHeader = document.querySelector(".header-container.desktop");
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
    } else {
      mobileHeader.style.display = "none";
      desktopHeader.style.display = "flex";
    }
  }

  windowWidthChange();

  {
    // card random placement
    const randomXElem = document.querySelectorAll(".random-x");
    const cardsScore = document.querySelectorAll(".showcase-card-score");

    if (window.innerWidth < 768) {
      gsap.set(randomXElem, {
        translateX: () => Math.random() * 60 - 30,
      });
    } else {
      gsap.set(randomXElem, {
        translateX: () => Math.random() * 400 - 200,
      });
    }

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
          translateY: () => Math.random() * 100 - 50,
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

    // if (window.innerWidth < 768) {
    //   tl.to(hero, {
    //     scale: 8,
    //     rotate: "20deg",
    //     duration: 2,
    //     onComplete: () => {
    //       hero.style.display = "none";
    //     },
    //   });
    // } else {

    // }
    tl.from(scrollBg, {
      scale: 0.8,
      duration: 0.2,
    });
    tl.to(
      hero,
      {
        scale: 6,
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
        opacity: 0.5,
      },
      {
        y: -500,
        duration: 3,
        scale: 3,
        opacity: 1,
      },
      "<"
    );
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
});
