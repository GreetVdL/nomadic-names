import "../css/index.scss";

// Intro animation

const title = document.querySelector("h1");

title.style.animation = "tilt 2.5s both";

title.onanimationend = () => {
  const introText = document.querySelector(".intro__text");
  introText.style.animation =
    "typing 4s steps(37), blink 0.5s step-end infinite alternate";
  introText.style.width = "37ch";
  introText.style.borderRight = "3px solid";
  introText.onanimationend = () => {
    introText.style.borderRight = "none";
  };
};
