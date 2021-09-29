import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserPage from './views/UserPage.vue'
import LoginPanel from './views/LoginPanel.vue'
import CreateAccount from './views/CreateAccount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: UserPage
    },
    {
      path: '/login-panel',
      component: LoginPanel
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: CreateAccount
    }

  ]
})
