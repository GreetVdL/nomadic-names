import store from "../data";
import { getNationalities } from "../data/nationality";

class Name {
  constructor(holder) {
    this.holder = holder;
    this.form = null;
    this.input = null;
    this.button = null;
    this.init();
    this.events();
  }

  init() {
    //   render the form
    this.holder.insertAdjacentHTML(
      "beforeend",
      `<form>
        <label for="name">Try out a name:</label>
        <br>
        <input type="text" id="name" placeholder="e.g. Romy"></input>
        <button type="submit">EXPLORE</button>
      </form>
    `
    );
    // references to the form elements
    this.form = this.holder.querySelector("form");
    this.input = this.holder.querySelector("input");
    this.button = this.holder.querySelector("button");
  }

  events() {
    //   on form submit
    this.form.onsubmit = (e) => {
      e.preventDefault();
      //   fetch the nationalities with the input value
      store.dispatch(getNationalities(this.input.value));
    };

    // on button click
    this.button.onclick = () => {
      // start the button animation
      this.button.style.animation =
        "shake-lr 0.7s cubic-bezier(0.455, 0.030, 0.515, 0.955) both";
      // and reset after the animation ended
      this.button.onanimationend = () => {
        this.button.style.animation = "none";
      };
    };
  }
}

export default (holder) => new Name(holder);
