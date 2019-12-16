import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Unicon from 'vue-unicons'
import { uniHeart, uniBoombox, uniSearch, uniUser, uniCog, uniMusic, uniImport, uniExport, uniSignOutAlt, uniSilentSquint, uniClock, uniSort, uniMusicNote, uniDocument, uniExpandArrows, uniAngleDown } from 'vue-unicons/src/icons'

Unicon.add([uniHeart, uniBoombox, uniSearch, uniUser, uniCog, uniMusic, uniImport, uniExport, uniSignOutAlt, uniSilentSquint, uniClock, uniSort, uniMusicNote, uniDocument, uniExpandArrows, uniAngleDown])
Vue.use(Unicon)

Vue.prototype.$axios = axios

import './helpers/filters.js';

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
