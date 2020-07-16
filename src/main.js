import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";
import moment from "moment";
import "@/plugins/apexcharts";

Vue.prototype.moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(Donut);
