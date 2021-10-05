<template>
<div id="userInfo">
<div class="container bootstrap snippets bootdey">
  <b-button class="btn_message" variant="primary" @click="dataTransfer">Home</b-button>
    <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Edit Profile</h1>
        <hr>
    <div class="row" v:bind="user">
        <!-- left column -->
        <div class="col-md-3">
        <div class="text-center">
            <img src="//placehold.it/100" class="avatar img-circle" alt="avatar">
            <h6>Upload a different photo...</h6>
            <input type="file" class="form-control">
            </div>
            </div>
            <!-- edit form column -->
            <div class="col-md-9 personal-info">
            <div class="alert alert-info alert-dismissable">
            <a class="panel-close close" data-dismiss="alert">×</a>
            <i class="fa fa-coffee"></i>
            <strong></strong>Don't forget to confirm changes.
            </div>
            <h3>Personal info</h3>

        <form class="form-horizontal" role="form">
            <div class="form-group" >
            <label class="col-lg-3 control-label">{{ user.firstName }}</label>
            <div class="col-lg-8">
            <input v-model="user.firstName" class="form-control" type="text" value='first name'>
            </div>
            </div>
            <div class="form-group">
            <label class="col-lg-3 control-label">{{ user.lastName }}</label>
            <div class="col-lg-8">
              <input v-model="user.lastName"  class="form-control" type="text" value="last name">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label" value="email">{{ user.email }}</label>
            <div class="col-lg-8">
              <input v-model="user.email" class="form-control" type="text" value="">
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Password:</label>
            <div class="col-lg-8">
              <input v-model="user.password"  class="form-control" type="text">
            </div>
          </div>
                <b-button class="btn_message" variant="primary" @click="Updateprofile()">Confirm changes</b-button>
                <b-button class="btn_message" variant="danger" @click="deletAccount()">Delete Account</b-button>
                <b-button class="btn_message" variant="danger" @click="resetAccount()">Reset Account</b-button>

                <div v-if="deleted"><h1>User Account Deleted</h1></div>
                <div v-if="updated"><h1>User Account Updated</h1></div>
                <div v-if="reseted"><h1>User Account Reseted</h1></div>

        </form>

        <b-button class="btn_message" variant="primary" @click="getAdditions()" >Show additions</b-button>
        <p>{{additions}}</p>
      </div>
  </div>
</div>
</div>

</template>

<script>

// @ is an alias to /src
import axios from 'axios'
import { Api } from '@/Api'
// import { serverBus } from '../main.js'

export default {
  props: ['userInfos'],
  data: function () {
    return {
      user: {
      },
      deleted: false,
      additions: [],
      updated: false,
      reseted: false
    }
  },
  methods: {
    Updateprofile() {
      const id = this.$route.params._id
      axios.patch('http://localhost:3000/api/users/' + id, {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password
      })
        .then(response => {
          if (response.status === 200) {
            this.updated = true
            this.created()
          }
        })
        .catch(error => {
          this.message = error
        })
    },
    deletAccount() {
      axios.delete('http://localhost:3000/api/users', { params: { _id: this.$route.params._id } })
        .then(response => {
          this.deleted = true
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    dataTransfer: function () {
      console.log(this.user)
      this.$router.push({ name: 'search_id', params: { _id: this.user._id } })
    },
    getAdditions() {
      const userID = this.$route.params._id
      Api.get('http://localhost:3000/api/users/' + userID + '/additions')
        .then(response => {
          console.log(response.data)
          this.additions = response.data
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    resetAccount() {
      const userID = this.$route.params._id
      Api.put('http://localhost:3000/api/users/' + userID, {
        _id: userID,
        email: this.user.email,
        password: this.user.password
      })
        .then(response => {
          this.reseted = true
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    }
  },
  created: function () {
    const id = this.$route.params._id
    axios.get('http://localhost:3000/api/users/' + id)
      .then(response => {
        this.user = response.data[0]
      })
      .catch(error => {
        console.log('failed to get user data', error)
      })
  }
}

</script>

<style scoped>
body{
    margin-top: 20px;
}
</style>
