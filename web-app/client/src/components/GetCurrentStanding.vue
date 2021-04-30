<template>
  <div class="posts">
    <h1>Ver conteo actual de votos</h1>
    <div>
      <ul>
      <li v-bind:key="b.votableId" v-for="b in ballotOptions"> {{b.votableId}} - {{b.party}}</li>
    </ul>
    </div>

    <br>
    <span v-if="response">
      <b>{{ response }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
    <div class="chart-wrapper">
      <chart :options="chartOptionsBar"></chart>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "response",
  data() {
    return {
      response: null,
      chartOptionsBar: {},
      ballotOptions: [
        { votableId: 1, party: "Partido Hackers Nacionales", candidates: ["Aday Dorado", "Jose-Pedro Tirado"]},
        { votableId: 2, party: "Partido Unidos Siempre", candidates: ["Peter Carranza", "Maria-Josefa Galvez"]},
        { votableId: 3, party: "Ahorro para la vida", candidates: ["Roxana Afonso", "Antonio Palau"]},
        { votableId: 4, party: "Materiales indestructibles", candidates: ["Felisa Rubio", "Leo Abreu"]},
        { votableId: 5, party: "Partido Hackers Nacionales", candidates: ["Aday Dorado", "Jose-Pedro Tirado"]},
        { votableId: 6, party: "Partido Unidos Siempre", candidates: ["Peter Carranza", "Maria-Josefa Galvez"]},
        { votableId: 7, party: "Ahorro para la vida", candidates: ["Roxana Afonso", "Antonio Palau"]},
        { votableId: 8, party: "Candidato Independiente", candidates: ["", ""]},
        { votableId: 9, party: "Voto Nulo", candidates: ["", ""]},
      ],
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  mounted() {
    this.getCurrentStanding();
    setTimeout(() => {
      this.chartOptionsBar = {
        xAxis: {
          data: [1,2,3,4,5,6,7,8,9]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            data: [1204,1050,640,530,59,370,222,440,200]
          }
        ],
        title: {
          text: "2020 ",
          x: "center",
          textStyle: {
            fontSize: 14
          }
        },
        color: ["#F123A4"]
      };
    }, 7000);
    setTimeout(() => {
      this.chartOptionsBar = {
        xAxis: {
          data: [1,2,3,4,5,6,7,8,9]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            data: [1404,1250,680,730,259,390,290,600,240]
          }
        ],
        title: {
          text: "2020 ",
          x: "center",
          textStyle: {
            fontSize: 14
          }
        },
        color: ["#F123A4"]
      };
    }, 9000);
  },
  methods: {
    async getCurrentStanding() {
      this.response = null;
      
      this.runSpinner();

      // console.log(`this.selected ${this.selected}`);
      // const apiResponse = await PostsService.getCurrentStanding();
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
      // console.log(apiResponse);
      // console.log(apiResponse.data[0].Record);
      // let currentStanding = [];
      // for (let i = 0; i < apiResponse.data.length; i++) {
      //   currentStanding[i] = apiResponse.data[i].Record.count;
      // }
      // console.log("curStanding: ");
      // console.log(currentStanding);
 
      const names = this.ballotOptions.map(x => x.party);
      console.log(names);

      this.chartOptionsBar = {
        xAxis: {
          data: [1,2,3,4,5,6,7,8,9]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            data: [1000,1050,600,330,548,300,222,400,20]
          }
        ],
        title: {
          text: "2020 ",
          x: "center",
          textStyle: {
            fontSize: 14
          }
        },
        color: ["#F123A4"]
      };
      // this.response = apiResponse.data;
      // this.renderChart(this.datacollection, this.options)
      this.hideSpinner();
    },
    async runSpinner() {
      this.$refs.Spinner.show();
    },
    async hideSpinner() {
      this.$refs.Spinner.hide();
    }
  }
};
</script>
