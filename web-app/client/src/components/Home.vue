<template>
  <div class="posts">
    <h1>Elecciones IBM 2021</h1>
    <br>
    <h3 v-if="showInput">Ingrese la clave de elector</h3>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="validateVoter" v-if="showInput">
      <!-- <input type="submit" value="Login"> -->
      <div style="width: 50%; margin: 0 auto;">
        <v-text-field
            v-model="loginData.voterId"
            label="CLAVE DE ELECTOR"
            placeholder="CLAVE DE ELECTOR"
            solo
      ></v-text-field>
      <v-btn class="white--text" block color="rgb(241 35 164)" @click="validateVoter">
        Buscar
      </v-btn>
      </div>
    </form>

    <div v-if="showIne" style="margin-bottom: 15px;">
      <v-alert
        dense
        text
        type="success"
        style="margin-top:15px;"
      >
        La persona con la clave de elector <strong>GMVLMR80070501M100</strong> si puede votar aquí
      </v-alert>
      <v-btn class="white--text" block color="rgb(241 35 164)" @click="assignUrn" v-if="showIne && !voterAssigned" >
        Asignar urna
      </v-btn>
    </div>

    <div v-if="showInfo == 'casilla'">
      <v-alert
        dense
        text
        type="warning"
        style="margin-top:15px;"
      >
        La persona con la clave de elector <strong>{{loginData.voterId}}</strong> no puede votar aquí
        <br>
        A la persona le corresponde en:
      </v-alert>
      <v-btn class="white--text" block color="rgb(241 35 164)" @click="resetForm" v-if="!showInput && voterAssigned" style="margin-top: 15px; margin-bottom: 15px;">
        Siguiente persona
      </v-btn>
      <img src="../assets/location.png" alt="">
    </div>

    <div v-if="showInfo == 'existe'">
      <v-alert
      dense
      text
      type="error"
      style="margin-top:15px;"
    >
      La persona con la clave de elector <strong>{{loginData.voterId}}</strong> no existe
    </v-alert>
    <v-btn class="white--text" block color="rgb(241 35 164)" @click="resetForm" v-if="!showInput && voterAssigned" style="margin-top: 15px; margin-bottom: 15px;">
        Siguiente persona
      </v-btn>
    </div>

    <div v-if="showInfo == 'voto'">
      <v-alert
      dense
      text
      type="error"
      style="margin-top:15px;"
    >
      La persona con la clave de elector <strong>{{loginData.voterId}}</strong> ya realizó su voto
    </v-alert>
    <v-btn class="white--text" block color="rgb(241 35 164)" @click="resetForm" v-if="!showInput && voterAssigned" style="margin-top: 15px; margin-bottom: 15px;">
        Siguiente persona
      </v-btn>
    </div>

    <div class="INE" v-if="showIne">
      <img class="INE-photo" src="../assets/person.png" alt="INE photo">
      <img class="INE-photo2" src="../assets/person.png" alt="INE photo2">
      <div class="INE-sex">
        <p>SEXO: F</p>
      </div>
      <div class="INE-name">
        <p><b>NOMBRE</b></p>
        <p>GOMEZ</p>
        <p>VELAZQUEZ</p>
        <p>MARGARITA</p>
      </div>
      <div class="INE-address">
        <p><b>DOMICILIO</b></p>
        <p>VIADUCTO TLALPAN NO 100</p>
        <p>COL. ARENAL TEPEPAN, ALCADIA</p>
        <p>TLALPAN, C.P. 14610, CIUDAD DE MEXICO</p>
      </div>
      <div class="INE-codes">
        <p><b style="margin-right: 5px;">CLAVE DE ELECTOR</b> GMVLMR80070501M100</p>
        <p><b>CURP</b></p>
        <p>GOVM800705MCLMR01</p>
      </div>
      <div class="INE-extra">
        <div class="INE-extra-dob">
          <p><b>FECHA DE NACIMIENTO</b></p>
          <p>20/20/2020</p>
        </div>
        <div class="INE-extra-section">
          <p><b>SECCIÓN</b></p>
          <p>20/20/2020</p>
        </div>
        <div class="INE-extra-validity">
          <p><b>VIGENCIA</b></p>
          <p>2016-2020</p>
        </div>
      </div>
    </div>

    <div v-if="showInfo == 'urna'">
      <v-alert
      dense
      text
      type="info"
      style="margin-top:15px;"
    >
      La persona con la clave de elector <strong>{{loginData.voterId}}</strong> puede realizar su voto <br>
      en la <strong>urna #2</strong>
    </v-alert>
    <v-btn class="white--text" block color="rgb(241 35 164)" @click="resetForm" v-if="!showInput && voterAssigned" style="margin-top: 15px; margin-bottom: 15px;">
        Siguiente persona
      </v-btn>
    </div>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<style scoped>
  .INE {
    margin: 0 auto;
    width: 920px;
    height: 536px;
    background-image: url("../assets/INE.png");
    background-size: contain;
    position: relative;
    /* testing */
    /* transform: scale(0.65); */
    /* margin-left: -150px;  */
  }
  .INE .INE-photo {
    height: 230px;
    position: absolute;
    left: 32px;
    bottom: 100px;
  }
  .INE .INE-photo2 {
    height: 130px;
    position: absolute;
    right: 65px;
    top: 235px;
  }

  .INE .INE-sex {
    position: absolute;
    top: 175px;
    right: 60px;
  }

  .INE .INE-name p {
    display: flex;
    width: 350px;
    margin: 0px;
    padding: 0px;
    font-size: 17px;
  }

  .INE .INE-name {
    position: absolute;
    top: 175px;
    left: 200px;
  }

  .INE .INE-name p {
    display: flex;
    width: 350px;
    margin: 0px;
    padding: 0px;
    font-size: 17px;
  }

  .INE .INE-address {
    position: absolute;
    bottom: 165px;
    left: 200px;
  }

  .INE .INE-address p {
    display: flex;
    width: 350px;
    margin: 0px;
    padding: 0px;
    font-size: 17px;
  }

  .INE .INE-codes {
    position: absolute;
    bottom: 90px;
    left: 200px;
  }

  .INE .INE-codes p {
    display: flex;
    width: 550px;
    margin: 0px;
    padding: 0px;
    font-size: 17px;
  }

  .INE .INE-extra {
    position: absolute;
    bottom: 35px;
    left: 200px;
    display: flex;
  }

  .INE .INE-extra div.INE-extra-dob {
    width: 230px;
  }

  .INE .INE-extra div.INE-extra-section {
    width: 230px;
  }

  .INE .INE-extra div.INE-extra-validity {
    width: 230px;
  }

  .INE .INE-extra div p {
    text-align: left;
    margin: 0px;
    padding: 0px;
    font-size: 17px;
  }
</style>

<script>
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "response",
  data() {
    return {
      loginData: {},
      loginReponse: {
        data: ""
      },
      showInput: true,
      showIne: false,
      showInfo: '',
      voterAssigned: false
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    resetForm() {
      this.loginData.voterId = '';
      this.showIne = false;
      this.showInfo = '';
      this.showInput = true;
      this.voterAssigned = false;
    },
    async assignUrn() {
      await this.runSpinner();
      setTimeout(async () => {
          this.showIne = false;
          this.showInfo = 'urna';
          this.showInput = false;
          this.voterAssigned = true;
          await this.hideSpinner();
        }, 1200);
    },
    async validateVoter() {
      await this.runSpinner();

      if(this.loginData.voterId == 'GMVLMR80070501M100') {
        setTimeout(async () => {
          // this.$router.push('voting')
          this.showIne = true;
          this.showInfo = '';
          this.showInput = false;
          await this.hideSpinner();
        }, 1200);
      } else if(this.loginData.voterId == 'EAERTSC90070501K222') {
        setTimeout(async () => {
          this.showIne = false;
          this.showInfo = 'casilla';
          this.showInput = false;
          this.voterAssigned = true;
          await this.hideSpinner();
        }, 1200);
      } else if(this.loginData.voterId == 'FFGGART60163850H123') {
        setTimeout(async () => {
          this.showIne = false;
          this.showInfo = 'voto';
          this.showInput = false;
          this.voterAssigned = true;
          await this.hideSpinner();
        }, 1200);
      } else {
        setTimeout(async () => {
          this.showIne = false;
          this.showInfo = 'existe';
          this.showInput = false;
          this.voterAssigned = true;
          await this.hideSpinner();
        }, 1200);
      }
      // if (!this.loginData.voterId) {
      //   console.log("!thislogin");
      //   let response = 'Please enter a VoterId';
      //   this.loginReponse.data = response;
      //   await this.hideSpinner();
      // } else {
      //   const apiResponse = await PostsService.validateVoter(
      //     this.loginData.voterId
      //   );
      //   console.log("apiResponse");
      //   console.log(apiResponse.data);

      //   if (apiResponse.data.error) {
      //     // console.log(apiResponse);
      //     console.log(apiResponse.data.error);
      //     this.loginReponse = apiResponse.data.error;
      //   } else {
      //     // TODO: Validate that Registrar Id matches the one that we are in.
      //     this.$router.push("castBallot");
      //   }

      //   console.log(apiResponse);
      //   this.loginReponse = apiResponse;
      //   this.$router.push('voting')
      //   await this.hideSpinner();
      // }
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
