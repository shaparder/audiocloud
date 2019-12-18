import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#95FD48',
        secondary: '#19E9A6',
        drawer: '#F1F8E9',
        accent: '#5AF67F',
        anti: '#F070A1'
      }
    }
  }
});
