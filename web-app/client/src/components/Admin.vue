<template>
  <div class="posts">
    <h3>Fill out the form below to register!</h3>
    <form v-on:submit.prevent="registerVoter()">
      <input type="text" v-model="registerData.voterId" placeholder="Ingresar CURP">
      <br>
      <input type="text" v-model="registerData.registrarId" placeholder="Ingresar ID de casilla">
      <br>
      <input type="text" v-model="registerData.firstName" placeholder="Ingresar nombre(s)">
      <br>
      <input type="text" v-model="registerData.lastName" placeholder="Ingresar apellido(s)">
      <br>
      <input type="password" v-model="adminPassword" placeholder="Contraseña">
      <input type="submit" value="Register">
    </form>
    <br>
    <span v-if="registerReponse">
      <b>{{ registerReponse.data }}</b>
    </span>
    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  
  </div>
</template>

<script>
import AuthService from "@/services/auth";
import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: 'admin',
  data() {
    return {
      adminPassword: '',
      registerData: {},
      registerReponse: {
        data: ''
      }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async registerVoter() {
      await this.runSpinner();
      const authResponse = await AuthService.login(this.adminPassword);
      if (authResponse.data.error) {
        console.log(authResponse.data.error);
      } else {
        localStorage.setItem('user-token', authResponse.data.token);
        const resgisterResponse = await PostsService.registerVoter(
          this.registerData.voterId,
          this.registerData.registrarId,
          this.registerData.firstName,
          this.registerData.lastName
        );
        this.registerReponse = resgisterResponse;
      }
      localStorage.removeItem('user-token')
      await this.hideSpinner();
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
