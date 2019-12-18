
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import { store } from './store/store.js'
import './helpers/filters.js'
import Unicon from 'vue-unicons'
import { uniHeart, uniBoombox, uniSearch, uniUser, uniCog, uniMusic, uniImport, uniExport, uniSignOutAlt, uniSilentSquint, uniClock, uniSort, uniMusicNote, uniDocument, uniExpandArrows, uniAngleDown } from 'vue-unicons/src/icons'

Unicon.add([uniHeart, uniBoombox, uniSearch, uniUser, uniCog, uniMusic, uniImport, uniExport, uniSignOutAlt, uniSilentSquint, uniClock, uniSort, uniMusicNote, uniDocument, uniExpandArrows, uniAngleDown])
Vue.use(Unicon)

Vue.prototype.$axios = axios

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
