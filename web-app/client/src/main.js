import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "@/plugins/echarts";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  vuetify,
  router
}).$mount('#app')

