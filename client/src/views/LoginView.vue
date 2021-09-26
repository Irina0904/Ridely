<template>
<div id="view">
<button class="btn btn-primary" type="button" data-toggle="modal" data-target="login-panel" v-on:click="ModalTrue()">Login</button>
<div v-if="modal==true"><login-panel></login-panel></div>
</div>
</template>

<script>
// import axios from 'axios';
import router from '../router'
import { Api } from '../Api'
import LoginPanel from './LoginPanel.vue'

export default {
  el: '#view',
  components: {
    'login-panel': LoginPanel
  },
  data() {
    return {
      email: '',
      password: '',
      modal: false
    }
  },
  methods: {
    SubmitLoginRequest() {
      Api.get('/login', this.form)
        .then((res) => {
          this.isLoggedIn = this.email
          if (res.data._id) {
            router.push('users')
          } else {
            console.log('Did not found user')
          }
        })
        .catch((error) => {
          console.log(error)
        // error.response.status Check status code
        }).finally(() => {
          console.log(this.res.status)
        })
    },
    ModalTrue() {
      router.push('logan-panel')
      this.modal = true
    }
  }
}
</script>

<style>

</style>
