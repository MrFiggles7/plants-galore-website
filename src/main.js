import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuetify from "vuetify";
import {firestorePlugin} from "vuefire";
import router from './router'


Vue.config.productionTip = false

Vue.use(vuetify);
Vue.use(firestorePlugin);



new Vue({
  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#356859',
        }
      }
    },

    icons: {

    },

  }),

  router,
  render: h => h(App)
}).$mount('#app')
