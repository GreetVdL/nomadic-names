import Chart from "chart.js/auto";

import store from "../data";
// import { getNationalities } from "../data/name";
// import { setValue } from "../data/name";

class Graph {
  constructor(holder) {
    this.holder = holder;
    this.myChart = null;
    store.subscribe(this.render.bind(this));
  }

  render() {
    // if no country results are found
    if (
      !store.getState().nationalities.nationalities.country ||
      (store.getState().nationalities.nationalities.country &&
        !store.getState().nationalities.nationalities.country.length)
    ) {
      if (this.myChart) {
        this.myChart.destroy();
      }
      if (!document.querySelector("#sad")) {
        const sad = new URL("../../images/sad.svg", import.meta.url);
        this.holder.insertAdjacentHTML(
          "afterbegin",
          `
          <img src="${sad}" alt="sad smiley" id="sad">
        `
        );
      }
    }
    // if country results are there
    if (
      store.getState().nationalities.nationalities.country &&
      store.getState().nationalities.nationalities.country.length
    ) {
      if (document.querySelector("#sad")) {
        document.querySelector("#sad").remove();
      }
      const codes = store
        .getState()
        .nationalities.nationalities.country.map((c) => c.country_id);
      const probabilities = store
        .getState()
        .nationalities.nationalities.country.map((c) => c.probability);

      if (this.myChart) {
        this.myChart.destroy();
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: codes,
          datasets: [
            {
              label: "Nationality probability",
              data: probabilities,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}

export default (holder) => new Graph(holder);