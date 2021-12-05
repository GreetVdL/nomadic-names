import "../css/index.scss";
import store from "./data";
import { getNationalities } from "./data/name";
import name from "./components/Name";
import axios from "axios";

// Intro animation

const title = document.querySelector("h1");

title.style.animation = "tilt 2.5s both";

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
    }, 800);
  };
};
