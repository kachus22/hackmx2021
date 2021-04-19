<template>
  <div class="">
    <div class="voting-header">
      <div class="voting-image">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAAB0dHRxcXFtbW16enp/f39nZ2eDg4Py8vKWlpaTk5OIiIjZ2dnPz89BQUEdHR0JCQk5OTnw8PDk5OS3t7e+vr5jY2Pe3t6wsLAwMDBcXFz4+PjExMSqqqoPDw+fn59QUFBHR0dXV1cXFxczMzPKysrQyNPUAAAEjklEQVR4nO2ca3eiMBCGQbno1trdWi+taO1e+v9/4lZUhExiJh5Bes7zfAyZCS+XZJIJRBEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwLdjoGY4KQ0KvUVJNnmdvtjbLlJ/o6NLJ58p2o9iPc+l13GARcXbaGo5wfEvhenKLfBF03SIwif9aVl43xZC4U+F3cSt8Iem3e4UxvHP7TUKn90K3zStdqkwjj+aL6RKYfzoEvioarOj97Bi3lCouljOvmakajEaqklOfaneRLKu35Ei1ZikToWqFp3POADA7dB3g6e+dJjobezkn4e2i1TlKhmMLSeeKxvrejyse4rG78r6CylwoW2r25imYnNwpYppvkikwqW2qTspXIYpjGXQrr3991IYz8IUzk2F6oe087j0xDbsRnxc/ZDG7c/x7b52h75UWz83BOotB/IVBgBoldc8MVg6VjqDLMYDs9JXtY1Zay5cNQ1m56ovl6vmYvSssCx8OJeBDjxoLGa2YU+chcVVg925qm8V8YfzfCctKbSFLiKY9p12bVXx6VsoFGvg3uXd6vFf+Wr2Q6GY8nkVPlxoVKuwrffQFqtrXDV5P9X0LnW7Fc7TzGDg6UsXwiKVFsXIrJSlO4Ur0+bYm84GvoqWCTMAQGeEx6WeYNIVOM6uc7X8ChOm/mptx6UKMqUrEZ2lUTQ0yz5CxsObxDR+3qyuLDHNVpRE47/+SvdXaH/yLQqnv82Sz41Z8mTJdd9b4afdlUXh484sGQzMkl2Qwk7eQzH1dbuaKjbMzKYhCl9FKij39aWheajcecnmIpn01fjE4z/JopW0Iy4FgHsS3pcutNn0yqFtF2aJtS+Nou2F3jTZ5+iC+tLw8VC1//H68TDypEL3voLGw/CY5gqFch3R6WpfsxCBaI2onwoD4tJ9uYjTzgz7qlA9tygVfrodbYIVdvIexvr5YamwcG9niIIV9myOvzxsYt852sh35eHVMmCODwDQPttlbrD25fGlhfyKZzw0K+XLhxBX87VwkK9PwedKHFz2I4+vcXWK76xJ39O1bzmmaTcHXEWwYlWxltbvrUJNHr+qI1YVa1szeqtQsxejUmhZVazCopbj0uvz+Jr9NOf7LDIYf6pDQQrn2cjAkpVvsNBYFBOz0miUiaf0oquNcTA7z6NXqfDNeikAdE3A/vpb7tUvO3TPjvuk3i2vktqBR8cBG/f63mJXuvJ8nFIfURrp7fotsoyHDe71zUx5e3zfzDTGzPRcnn0DhYdvYIIUTv3lVu6kcBGuMKoe039FWwpv//1hwHtYmxc0/yPhVZjqOczLiwALB4PjqReji9WGzRD3ZXi0bhavhpcbiwAA2kefgr/Nv03qI4Dn3yZiE8FsX2h+9Czz+E16/X8asdLxXF+gOdKvmOZ32D+GhMJtHL/2WeHf0P9ECYWz2ipi/xT+Cv/Xl9y18bQWRT2JS99Gtn2zwe9htJVJF6/CgHn5sS/NLsecJtnDtf/cSyxLr3IHgHeODwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw7fgPl+Jg6CPChGwAAAAASUVORK5CYII=" 
        alt="">
      </div>
      <div>
        <h1>Proceso electoral ordinario 2021</h1>
        <h3>Presidencia</h3>
      </div>
    </div>

    <div class="voting-info">
      <div>
        <p>País: <span>{{registrar.country}}</span></p>
        <p>Estado: <span>{{registrar.state}}</span></p>
        <p>Localidad: <span>{{registrar.locality}}</span></p>
      </div>
      <div>
        <p>Distrito: <span>{{registrar.district}}</span></p>
        <p>Casilla: <span>{{registrar.name}}</span></p>
      </div>
    </div>

    <ballot :options="ballotOptions" v-on:vote="onVote"></ballot>
    <vue-instant-loading-spinner id='loader' ref="Spinner"></vue-instant-loading-spinner>
  </div>
</template>

<style scoped>
  .voting-header {
    height: 130px;
    width: 80%;
    padding: 0px 20px;
    background-color: wheat;
    border-bottom-right-radius: 18px;
    border-bottom-left-radius: 18px;
    display: inline-block;
    position: relative;
  }

  .voting-header .voting-image img{
    position: absolute;
    height: 90%;
    left: 20px;
    top: 5%;
  }

  .voting-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .voting-info p {
    margin: 2px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .voting-info p span {
    font-weight: normal;
    font-size: 1.2rem;
  }
</style>

<script>
import PostsService from "@/services/apiService";
import Ballot from "./Ballot";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";

export default {
  name: "voting",
  data() {
    return {
      registrar: { 
        country: 'Mexico',
        state: 'Nuevo Leon',
        locality: 'Monterrey',
        district: 1,
        name: 'Parque Tecnologico',
        address: 'Por alla'
      },
      ballotOptions: [
        { votableId: 1, party: "Partido Frente Nacional", candidates: ["Joe Biden", "John Biden"]},
        { votableId: 2, party: "Partido asdasd Nacional", candidates: ["Joe Biden", "John Biden"]}
      ],
      selected: null
    };
  },
  components: {
    Ballot,
    VueInstantLoadingSpinner
  },
  methods: {
    onVote(e) {
      // TODO: Post this vote.
      console.log(e);
    } 
  }
};
</script>
