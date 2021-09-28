<template>
<div class="columns" v:bind:key="login-panel">
    <div class="column is-two-thirds">
      <section class="section">
        <h1 class="title">Login</h1>
        <hr>
        <!-- form starts here -->
        <section class="form">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="email" class="input" v:bind:key="email" type="text" placeholder="Text input">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="password" v:bind:key="password" class="input" type="text" placeholder="Text input">
            </div>
          </div>
          <button type="submit" class="btn btn-primary" @click="Submit()">Submit</button>
          </section>
    </section><p>
      {{ response }}</p>
      <div>
        <h1 v-if="Verified"><button type="button" @click="dataTransfer">Go to user page</button></h1>
      </div>
      </div>
      </div>
</template>

<script>
import axios from 'axios'
import { serverBus } from '../serverBus.js'
export default {
  el: '#login-panel',
  components: {
  },
  props: ['userInfo'],
  data() {
    return {
      email: '',
      succes: '',
      password: '',
      Verified: false,
      response: '',
      user: {}
    }
  },
  methods: {
    Submit() {
      axios.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.status === 200) {
          this.Verified = true
          this.response = res.data
          this.user = res.data
        } else {
          this.response = 'Login Failed. Please try again'
          console.log(this.response)
        }
      })
        .catch((error) => {
          this.response = 'Login Failed. Please try again'
          console.log(error)
        }).finally(() => {
        })
    },
    dataTransfer: function () {
      console.log(this.user)
      serverBus.$emit('userSelected', this.user)
      this.$router.push({ name: 'users' })
    }
  }
}
</script>
