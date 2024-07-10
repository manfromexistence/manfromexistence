import fetch from "node-fetch";
import cheerio from "cheerio";

const url = "https://ui.aceternity.com/components/3d-card-effect";
let accertinity_ui = [
  "3d-card-effect",
  "3d-pin",
  "animated-tooltip",
  "background-beams",
  "background-boxes",
  "background-gradient",
  "bento-grid",
  "card-hover-effect",
  "card-stack",
  "container-scroll-animation",
  "direction-aware-hover",
  "evervault-card",
  "floating-navbar",
  "following-pointer",
  "github-globe-new",
  "glowing-stars",
  "google-gemini-effect-new",
  "gradient-animation",
  "grid-and-dot-backgrounds",
  "hero-parallax",
  "images-slider",
  "infinite-moving-cards",
  "lamp-effect",
  "layout-grid",
  "macbook-scroll-new",
  "meteors",
  "moving-border",
  "multi-step-loader-new",
  "navbar-menu",
  "parallax-scroll",
  "signup-form-new",
  "sparkles",
  "spotlight",
  "sticky-scroll-reveal",
  "svg-mask-effect",
  "tabs",
  "tailwind-css-buttons",
  "text-generate-effect",
  "text-reveal-card",
  "tracing-beam",
  "typewriter-effect",
  "wavy-background",
];

fetch(url)
  .then((response) => response.text())
  .then((body) => {
    const $ = cheerio.load(body);
    const preElement = $("div[data-state=closed] pre");
    console.log(preElement.html());
  })
  .catch((error) => console.error("Error:", error));
