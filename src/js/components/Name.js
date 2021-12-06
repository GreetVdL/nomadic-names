import store from "../data";
import { getNationalities } from "../data/name";
import { setValue } from "../data/name";

class Name {
  constructor(holder) {
    this.holder = holder;
    this.form = null;
    this.label = null;
    this.input = null;
    this.button = null;
    this.init();
    this.events();
    // store.subscribe(this.render.bind(this));
  }

  init() {
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
    this.form = this.holder.querySelector("form");
    this.label = this.holder.querySelector("label");
    this.input = this.holder.querySelector("input");
    this.button = this.holder.querySelector("button");
  }
  events() {
    // this.input.oninput = (e) => {
    //   store.dispatch(setValue(e.target.value));
    // };

    this.form.onsubmit = (e) => {
      e.preventDefault();
      //   store.dispatch(getNationalities(store.getState().nationalities.input));
      store.dispatch(getNationalities(this.input.value));
    };
    this.button.onclick = () => {
      this.button.style.animation =
        "shake-lr 0.7s cubic-bezier(0.455, 0.030, 0.515, 0.955) both";
      this.button.onanimationend = () => {
        this.button.style.animation = "none";
      };
    };
  }
}

export default (holder) => new Name(holder);
