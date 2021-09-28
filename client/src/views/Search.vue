<template>
  <div>
    <div>
  <!-- As a link -->
  <b-navbar variant="dark" type="dark">
    <b-navbar-brand to="/home">Home</b-navbar-brand>
    <b-nav-form>
      <b-form-input class="mr-sm-2" input type="text" v-model="search"
      placeholder="Search"></b-form-input>
      <b-button variant="outline-success" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
  </b-navbar>
</div>
<div v-for="bikeshop in filteredBikeshops" v-bind:key="bikeshop._id">
            <bikeshop-item v-bind:bikeshop="bikeshop"/>
        </div>
         <div>
    <p align="left">{{message}}</p>
    </div>
        </div>
</template>

<script>
import BikeshopItem from '../components/BikeshopItem.vue'
import { Api } from '@/Api'
export default {
  name: 'bikeshops',
  components: {
    'bikeshop-item': BikeshopItem
  },
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/bikeshops')
      .then(response => {
        console.log(response)
        this.bikeshops = response.data
        console.log(this.bikeshops)
      })
      .catch(error => {
        this.bikeshops = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      bikeshops: [],
      search: '',
      message: ''
    }
  },
  computed: {
    filteredBikeshops: function () {
      if (!this.search) {
        return this.bikeshops
      }
      const searchResults = []
      if (this.search) {
        this.bikeshops.forEach((bikeshop) => {
          if (Object.values(bikeshop).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (Object.values(bikeshop.address).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (searchResults.length === 0) {
            this.message = 'Nothing found'
          }
        })
      }
      return searchResults
    }
  }

}
</script>
<style scoped>
p {
    margin-left: 30px;
    margin-right: auto;
    margin-top: 20vh;
}
</style>
