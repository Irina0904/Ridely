<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group>
        <b-col sm="2">
          <b-form-input
            v-model="form.firstName"
            placeholder="First name"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>

      <b-form-group>
        <b-col sm="2">
          <b-form-input
            v-model="form.lastName"
            placeholder="Last name"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>

      <b-form-group>
        <b-col sm="2">
          <b-form-input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>

      <b-form-group>
        <b-col sm="2">
          <b-form-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
          ></b-form-input>
        </b-col>
      </b-form-group>

      <b-btn-toolbar>
        &nbsp;<b-button type="submit" variant="primary">Submit</b-button>&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-btn-toolbar>
    </b-form>
  </div>
</template>

<script>
// import axios from 'axios'
import { Api } from '@/Api'
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      console.log(this.form.email)
      event.preventDefault()
      alert(JSON.stringify(this.form))
      Api.post('http://localhost:3000/api/users', {
        email: this.form.email,
        password: this.form.password,
        firstName: this.form.firstName,
        lastName: this.form.lastName
      })
        .then(res => {
          if (res.status === 201) {
            console.log('Account created')
            console.log(res.data._id)
          } else {
            console.log('Please try again')
          }
        })
        .catch(error => {
          console.log('Please try again')
          console.log(error)
        })
        .finally(() => {})
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style scoped>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
