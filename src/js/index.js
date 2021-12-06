import "../css/index.scss";
import name from "./components/Name";
import graph from "./components/Graph";

// Intro animation

// animate the header
const title = document.querySelector("h1");
title.style.animation = "tilt 2s both";

// after the header animation
title.onanimationend = () => {
  // animate the intro paragraph
  const introText = document.querySelector(".intro__text");
  introText.style.animation =
    "typing 4s steps(33), blink 0.5s step-end infinite alternate";
  introText.style.width = "33ch";
  introText.style.borderRight = "3px solid";
  //   when the intro text animation has finished
  introText.onanimationend = () => {
    //   remove the blinking cursor
    introText.style.borderRight = "none";
    // and after some time, render the form and initialise the Graph component
    setTimeout(() => {
      name(document.getElementById("search"));
      graph(document.getElementById("results"));
    }, 800);
  };
};
