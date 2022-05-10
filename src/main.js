import Vue from "vue";
import App from "./App.vue";
import "./styles/app.css"; // Here
Vue.config.productionTip = false;
import vuetify from '@/plugins/vuetify' // path to vuetify export

import TreeView from "@ll931217/vue-treeview";

Vue.use(TreeView)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
