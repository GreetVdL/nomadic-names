import "../css/index.scss";
import store from "./data";
import { getNationalities } from "./data/name";
import name from "./components/Name";
import graph from "./components/Graph";

// Intro animation

const title = document.querySelector("h1");

title.style.animation = "tilt 3.5s both";

title.onanimationend = () => {
  const introText = document.querySelector(".intro__text");
  introText.style.animation =
    "typing 4s steps(33), blink 0.5s step-end infinite alternate";
  introText.style.width = "33ch";
  introText.style.borderRight = "3px solid";
  introText.onanimationend = () => {
    introText.style.borderRight = "none";
    // Render de name search elements
    setTimeout(() => {
      name(document.getElementById("search"));
      graph(document.getElementById("results"));
    }, 800);
  };
};