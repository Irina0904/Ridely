<template>
<div class="columns" id="login-panel">
    <div class="column is-two-thirds">
      <section class="section">
        <h1 class="title">Login</h1>
        <hr>
        <!-- form starts here -->
        <section class="form">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="email" class="input" :bind:key="email" type="text" placeholder="Text input">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="password" v:bind:key="password" class="input" type="text" placeholder="Text input">
            </div>
          </div>
          <button type="submit" class="btn btn-primary" @click="Submit()">Submit</button>
          <div>
      <h3>Data retrieved from server:</h3>
            <pre>{{ response }}</pre>
      </div>
        </section>
    </section>
      </div>
      </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      succes: '',
      password: '',
      Verified: false,
      response: ''
    }
  },
  methods: {
    Submit() {
      axios.post('http://localhost:3000/api/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if (res.status === 200) {
          this.verified = true
          this.response = 'Login successful'
          this.$router.push({ name: 'users', params: { id: res._id } })
        }
      })
        .catch((error) => {
          console.log(error)
        }).finally(() => {
        })
    }
  }
}
</script>
