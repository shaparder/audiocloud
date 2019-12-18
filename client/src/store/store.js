import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const authUrl = process.env.VUE_APP_AUTH_API_URL
// const audioUrl = process.env.VUE_APP_AUDIO_API_URL

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('auth-token') || null,
    username: localStorage.getItem('username') || null,
    message: null
  },

  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.username;
    },
    getMessage(state) {
      return state.message;
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    setUser(state, username) {
      state.username = username;
    },
    destroyUser(state) {
      state.username = null;
    },
    setMessage(state, message) {
      state.message = message;
    }
  },
  
  actions: {
    login(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post(
            authUrl + '/api/users/login', {
            email: credentials.email,
            password: credentials.password
         })
        .then(response => {
            const token = response.headers.token;
            const username = response.headers.username;
            localStorage.setItem('auth-token', token);
            localStorage.setItem('username', username);
            context.commit('setToken', token);
            context.commit('setUser', username);
            context.commit('setMessage', response.data);
            resolve(response);
        })
        .catch(error => {
            context.commit('setMessage', error.response.data);
            reject(error)
        })
      }) 
    },
    logout(context) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('username');
      context.commit('destroyToken');
      context.commit('destroyUser');
      context.commit('setMessage', 'Successfully logged out');
    } 
  } 
})