<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login-panel" tag="button">Login</router-link>
      </div>
    <!-- Render the content of the current page view -->
    <router-view/>
    </div>
</template>

<script>
// import UserLogo from './components/UserLogo.vue'
export default {
  el: '#app',
  components: {
    // Define the name of the component here
    // 'user-Logo': UserLogo,
    // 'login-view': LoginView
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
