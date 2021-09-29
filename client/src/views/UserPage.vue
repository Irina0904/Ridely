<template>
  <div id="userInfo">
    <div class="container bootstrap snippets bootdey">
      <h1 class="text-primary">
        <span class="glyphicon glyphicon-user"></span>Edit Profile
      </h1>
      <hr />
      <div class="row">
        <!-- left column -->
        <div class="col-md-3">
          <div class="text-center">
            <img
              src="//placehold.it/100"
              class="avatar img-circle"
              alt="avatar"
            />
            <h6>Upload a different photo...</h6>
            <input type="file" class="form-control" />
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
            <div class="form-group">
              <label v:bind:key="user" class="col-lg-3 control-label">{{
                user
              }}</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" value="first name" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">last name:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" value="last name" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Email:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" value="" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-lg-3 control-label">Password:</label>
              <div class="col-lg-8">
                <input
                  class="form-control"
                  type="text"
                  value="janesemail@gmail.com"
                />
              </div>
            </div>
            <b-button
              class="btn_message"
              variant="primary"
              v-on:click="getMessage()"
              >Confirm changes</b-button
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from 'axios'
import { serverBus } from '../serverBus.js'

export default {
  components: {},
  props: ['userInfo'],
  data() {
    return {
      user: {}
    }
  },
  methods: {
    Updateprofile() {
      axios
        .patch('/users/:id')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
const created = function (user) {
  this.user = user
}
serverBus.$on('userSelected', created)
</script>

<style scoped>
body {
  margin-top: 20px;
}
</style>
