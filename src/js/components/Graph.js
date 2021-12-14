import Chart from "chart.js/auto";
import countryCodes from "country-codes-list";
import store from "../data";

class Graph {
  constructor(holder) {
    this.holder = holder;
    this.myChart = null;
    store.subscribe(this.render.bind(this));
  }

  render() {
    // if no country results are found or there's an error
    if (
      (store.getState().nationalities.nationalities.country &&
        !store.getState().nationalities.nationalities.country.length &&
        !store.getState().nationalities.loading) ||
      store.getState().nationalities.error
    ) {
      // remove the previous chart
      if (this.myChart) {
        this.myChart.destroy();
      }
      // render a sad smiley if it wasn't already there
      if (!document.querySelector("#sad")) {
        const sad = new URL("../../images/sad.svg", import.meta.url);
        this.holder.insertAdjacentHTML(
          "afterbegin",
          `
          <img src="${sad}" alt="sad smiley" id="sad">
        `
        );
      }
      // remove the info paragraph
      if (document.querySelector("#likely")) {
        document.querySelector("#likely").remove();
      }
    }
    // if there are country results
    if (
      store.getState().nationalities.nationalities.country &&
      store.getState().nationalities.nationalities.country.length &&
      !store.getState().nationalities.loading
    ) {
      // remove the sad smiley icon
      if (document.querySelector("#sad")) {
        document.querySelector("#sad").remove();
      }
      // remove the previous info paragraph
      if (document.querySelector("#likely")) {
        document.querySelector("#likely").remove();
      }
      // destroy any previously existing chart
      if (this.myChart) {
        this.myChart.destroy();
      }
      // this is the object containing the country codes info
      const countryCodesObject = countryCodes.customList(
        "countryCode",
        "{countryNameEn}"
      );
      // make an array of the fetched country codes
      const codes = store
        .getState()
        .nationalities.nationalities.country.map((c) => c.country_id);
      // convert that array to an array of full country names
      const fullCountryNames = codes.map((c) => countryCodesObject[c]);
      // make an array of the fetched probabilities
      const probabilities = store
        .getState()
        .nationalities.nationalities.country.map((c) => c.probability);
      // retrieve the input value
      const value = document.querySelector("input").value;
      // make a capitalised version of the input name
      const capitalizedValue = value
        .split("-")
        .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1).toLowerCase())
        .join("-");
      // store the age
      const age = store.getState().age.age.age;
      // store the gender
      const gender = store.getState().gender.gender.gender;
      // render the info paragraph with the capitalised name
      this.holder.insertAdjacentHTML(
        "afterbegin",
        `
        <p id="likely">Most likely, <span class="${
          gender === "male" ? "blue" : gender === "female" ? "pink" : "black"
        }">${capitalizedValue}</span> is ${
          age
            ? gender
              ? "a " + age + " year old " + gender
              : "a " + age + " year old "
            : ""
        } from ${fullCountryNames[0]}!</p>
      `
      );
      // render the chart
      const ctx = document.getElementById("myChart").getContext("2d");
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: fullCountryNames,
          datasets: [
            {
              label: "Nationality probability",
              data: probabilities,
              backgroundColor: [
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              ticks: {
                precision: 1,
                format: {
                  style: "percent",
                },
              },
            },
          },
        },
      });
    }
  }
}

export default (holder) => new Graph(holder);
