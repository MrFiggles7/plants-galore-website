import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {firestorePlugin} from "vuefire";
import router from './router'


Vue.config.productionTip = false

Vue.use(firestorePlugin);



new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


import "../public/sass/abstract/_base.scss";
import "../public/sass/abstract/_typography.scss";
import "../public/sass/abstract/_variables.scss";

import "../public/sass/layout/_basil.scss";

import "../public/sass/components/_btn.scss";
