import store from "../data";
import { getNationalities } from "../data/name";
import { setValue } from "../data/name";

class Name {
  constructor(holder) {
    this.holder = holder;
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
      `
      <label for="name">Try out a name:</label>
      <input type="text" id="name" placeholder="e.g. Romy"></input>
      <button>EXPLORE</button>
    `
    );
    this.label = this.holder.querySelector("label");
    this.input = this.holder.querySelector("input");
    this.button = this.holder.querySelector("button");
  }
  events() {
    // this.input.oninput = (e) => {
    //   store.dispatch(setValue(e.target.value));
    // };

    this.button.onclick = () => {
      //   store.dispatch(getNationalities(store.getState().nationalities.input));
      store.dispatch(getNationalities(this.input.value));
    };
  }
}

export default (holder) => new Name(holder);
