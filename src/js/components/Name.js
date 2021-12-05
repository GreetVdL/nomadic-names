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
    // this.render();
    this.events();
    // store.subscribe(this.render.bind(this));
  }
  events() {
    this.input.oninput = (e) => {
      store.dispatch(setValue(e.target.value));
    };

    this.button.onclick = () => {
      store.dispatch(getNationalities(store.getState().nationalities.input));
    };
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
      <label for="name">Try out a name:</label>
      <input type="text" id="name" placeholder="Romy"></input>
      <button>EXPLORE</button>
    `
    );
    this.label = this.holder.querySelector("label");
    this.input = this.holder.querySelector("input");
    this.button = this.holder.querySelector("button");
  }
  //   show() {
  //     this.h1_1.style.display = "block";
  //     this.h1_2.style.display = "block";
  //     this.btn.style.display = "block";
  //   }
  //   hide() {
  //     this.h1_1.style.display = "none";
  //     this.h1_2.style.display = "none";
  //     this.btn.style.display = "none";
  //   }
  //   render() {
  //     const {
  //       joke: { setup, delivery },
  //       loading
  //     } = store.getState().joke;
  //     if (loading || !setup) {
  //       this.hide();
  //     } else {
  //       this.show();
  //     }
  //     if (setup) {
  //       this.h1_1.innerText = setup;
  //       this.h1_2.innerText = delivery;
  //     }
  //   }
}

export default (holder) => new Name(holder);
