import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import UserProfile from '../views/UserProfile.vue'
import UrlError from '../views/UrlError.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/:username',
    name: 'user-profile',
    component: UserProfile
  },
  {
    path: '/*',
    name: 'error-page',
    component: UrlError
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
