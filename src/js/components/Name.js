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
  }
}

export default (holder) => new Name(holder);
