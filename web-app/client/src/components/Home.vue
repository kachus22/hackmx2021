<template>
  <div class="posts">
    <h1>2020 Presidential Election</h1>
    <h3>If you are a registered voter, enter your voterId below</h3>
    <!--span><b>{{ response }}</b></span><br /-->
    <form v-on:submit="validateVoter">
      <input type="text" v-model="loginData.voterId" placeholder="Enter VoterId">
      <br>

      <input type="submit" value="Login">
      <br>
      <br>
      <span v-if="loginReponse">
        <b>{{ loginReponse.data }}</b>
      </span>
      <br>
    </form>

    <br>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

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
      }
    };
  },
  components: {
    VueInstantLoadingSpinner
  },
  methods: {
    async validateVoter() {
      await this.runSpinner();

      if (!this.loginData.voterId) {
        console.log("!thislogin");
        let response = 'Please enter a VoterId';
        this.loginReponse.data = response;
        await this.hideSpinner();
      } else {
        const apiResponse = await PostsService.validateVoter(
          this.loginData.voterId
        );
        console.log("apiResponse");
        console.log(apiResponse.data);

        if (apiResponse.data.error) {
          // console.log(apiResponse);
          console.log(apiResponse.data.error);
          this.loginReponse = apiResponse.data.error;
        } else {
          // TODO: Validate that Registrar Id matches the one that we are in.
          this.$router.push("castBallot");
        }

        console.log(apiResponse);
        this.loginReponse = apiResponse;
        // this.$router.push('castBallot')
        await this.hideSpinner();
      }
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
