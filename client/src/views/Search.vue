<template>
  <div>
    <div>
  <!-- As a link -->
  <b-navbar class="fixed-top" variant="dark" type="dark">
    <b-navbar-brand to="/search">Ridely.</b-navbar-brand>
    <b-nav-form>
      <b-form-input class="mr-sm-2" input type="text" v-model="search"
      placeholder="Search"></b-form-input>
    </b-nav-form>
     <b-button variant="outline-success" class="my-2 my-sm-0" @click="showModal">Add
          <BIconPlusCircle/></b-button>&nbsp;&nbsp;
          <b-button to="/login-panel" variant="success" class="my-2 my-sm-0">Login</b-button>
  </b-navbar>
</div>
<div class="map">
  <map-page/>
</div>
<div>
    <b-modal ref="addLocation-modal" hide-footer title="Add a new location">
      <div class="d-block text-center">
          <b-form>
              <b-form-group>

          <b-form-input
          v-model="form.bikeshopName"
            placeholder="Location name"
            required
          ></b-form-input>
      </b-form-group>
          </b-form>
      </div>
      <b-button class="mt-3" variant="success" block @click="addLocation">Add</b-button>
      <b-button class="mt-2" block @click="toggleModal">Cancel</b-button>
    </b-modal>
</div>
<div id="bikeshop" v-for="bikeshop in filteredBikeshops" v-bind:key="bikeshop._id">
            <bikeshop-item v-bind:bikeshop="bikeshop"/>
        </div>
         <div>
    <p align="left">{{message}}</p>
    </div>
        </div>
</template>

<script>
import BikeshopItem from '../components/BikeshopItem.vue'
import { BIconPlusCircle } from 'bootstrap-vue'
import Map from '../components/Map'
import { Api } from '@/Api'
export default {
  name: 'bikeshops, testMap',
  components: {
    'map-page': Map,
    'bikeshop-item': BikeshopItem,
    BIconPlusCircle
  },

  mounted() {
    console.log('PAGE is loaded!')
    Api.get('http://localhost:3000/api/bikeshops')
      .then(response => {
        console.log(response.data)
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
      message: '',
      form: {
        bikeshopName: ''
      },
      search: ''
    }
  },
  methods: {
    showModal() {
      this.$refs['addLocation-modal'].show()
    },
    addLocation() {
      const userID = this.$route.params._id
      Api.post('http://localhost:3000/api/bikeshops',
        {
          name: this.form.bikeshopName,
          added_by: userID
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
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
          if ((Object.values(bikeshop).includes(this.search)) || Object.values(bikeshop.address).includes(this.search)) {
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
.bikeshop{
  position: relative;
  height: 40px;
}
.map{
  margin-top: 55px;
  position: fixed;
  width: 100%;
  height: 90%;
}

</style>
