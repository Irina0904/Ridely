<template>
  <div>
    <div>
  <!-- As a link -->

  <b-navbar variant="dark" type="dark">
    <b-navbar-brand to="/search">Ridely.</b-navbar-brand>
    <b-nav-form>
      <b-form-input class="mr-sm-2" input type="text" v-model="search"
      placeholder="Search"></b-form-input>
    </b-nav-form>
    <b-button id="filter-button" variant="primary" v-b-toggle.collapse-2 class="m-1">Filter <font-awesome-icon icon="filter" /></b-button>&nbsp;
     <b-button id="add-location" variant="outline-success" class="my-2 my-sm-0" @click="showModal">Add
          <BIconPlusCircle/></b-button>&nbsp;&nbsp;
          <b-button id="login-button" to="/login-panel" variant="success" class="my-2 my-sm-0">Login</b-button>
  </b-navbar>
  <b-collapse id="collapse-2">
    <b-card class="col-2" id="entity-card">
    <b-form-checkbox-group
      v-model="filterSelected"
      :options="filterOptions"
      class="mb-3"
      value-field="item"
      text-field="name"
    ></b-form-checkbox-group>
    </b-card>
    </b-collapse>
     <div class="map">
  <map-page v-bind:latitude="coordinates.lat" v-bind:longitude="coordinates.lng"/>
</div>
</div>
<div>
    <b-modal ref="addLocation-modal"
    @show="resetModal"
      @hidden="resetModal" hide-footer title="Add a new location">
      <div v-if="locationAdded === false" class="d-block text-center">
          <b-form>
              <b-form-radio-group
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
    ></b-form-radio-group>

              <b-form-group>

          <b-form-input v-if="selected === 'bikeshop'"
          v-model="form.locationName"
            placeholder="Location name"
            required
          ></b-form-input>
      </b-form-group>
      <b-form-group>

          <b-form-input
          v-model="form.address.city"
            placeholder="Location city"
            required
          ></b-form-input>
      </b-form-group>
          </b-form>
      <b-button class="mt-3" variant="success" block @click="addLocation">Add</b-button>
      <b-button class="mt-2" block @click="closeModal">Cancel</b-button>
       </div>
       <p align="center" v-else>{{addLocationMessage}}</p>
    </b-modal>
</div>
<div class="overflow-auto">
<div v-for="item in filteredLocations" v-bind:key="item._id">
            <bikeshop-item v-if="isABikeshop(item._id)" v-bind:bikeshop="item" @show-location="setCoordinates(item.lat, item.lng)"/>
            <parking-item  v-else v-bind:bikeshop="item"/>
        </div>

</div>

         <div>
    <p align="left">{{message}}</p>
    </div>
        </div>
</template>

<script>
import BikeshopItem from '../components/BikeshopItem.vue'
import ParkinglotItem from '../components/ParkingItem.vue'
import { BIconPlusCircle } from 'bootstrap-vue'
import Map from '../components/Map'
import { Api } from '@/Api'
export default {
  name: 'bikeshops, testMap',
  components: {
    'map-page': Map,
    'bikeshop-item': BikeshopItem,
    'parking-item': ParkinglotItem,
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
    Api.get('http://localhost:3000/api/parkinglots')
      .then(response => {
        console.log(response.data)
        this.parkinglots = response.data
        console.log(this.parkinglots)
        this.allLocations = this.bikeshops.concat(this.parkinglots)
        this.allLocations = this.allLocations.sort(() => Math.random() - 0.5)
        console.log(this.allLocations)
      })
      .catch(error => {
        this.parkinglots = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      allLocations: [],
      bikeshops: [],
      parkinglots: [],
      message: '',
      addLocationMessage: '',
      form: {
        locationName: '',
        address: {
          city: '',
          street: '',
          zip_code: ''
        }
      },
      search: '',
      selected: 'bikeshop',
      options: [
        { item: 'bikeshop', name: 'Bikeshop' },
        { item: 'bike_parkinglot', name: 'Bike parkinglot' }
      ],
      filterSelected: [],
      filterOptions: [
        { item: 'bikeshops', name: 'Bikeshops' },
        { item: 'parkinglots', name: 'Bike parkinglots' }
      ],
      locationAdded: false,
      coordinates: {
        lat: 58,
        lng: 11
      }
    }
  },
  methods: {
    showModal() {
      this.$refs['addLocation-modal'].show()
    },
    closeModal() {
      this.$refs['addLocation-modal'].hide()
    },
    addBikeshop() {
      const userID = this.$route.params._id
      Api.post('http://localhost:3000/api/bikeshops',
        {
          name: this.form.locationName,
          added_by: userID
        })
        .then(response => {
          console.log(response.data)
          this.locationAdded = true
          this.addLocationMessage = 'New bikeshop added!'
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    addParkinglot() {
      const userID = this.$route.params._id
      Api.post('http://localhost:3000/api/parkinglots',
        {
          address:
          { city: this.form.address.city },
          added_by: userID
        })
        .then(response => {
          console.log(response.data)
          this.locationAdded = true
          this.addLocationMessage = 'New bike parkinglot added!'
        })
        .catch(error => {
          console.log('failed to get user data', error)
        })
    },
    addLocation() {
      if (this.selected === 'bikeshop') {
        this.addBikeshop()
      } else if (this.selected === 'bike_parkinglot') {
        this.addParkinglot()
      }
    },
    resetModal() {
      this.form.address.city = ''
      this.form.bikeshopName = ''
      this.locationAdded = false
    },
    isABikeshop(itemID) {
      let isBikeshop = false
      this.bikeshops.forEach((bikeshop) => {
        if (bikeshop._id === itemID) {
          isBikeshop = true
        }
      })
      return isBikeshop
    },
    arrayEquals(array1, array2) {
      const result = array1.every(function (element) {
        return array2.includes(element)
      })
      return result
    },
    filteredAllLocations(searchResults) {
      if (this.search) {
        this.allLocations.forEach((bikeshop) => {
          if (Object.values(bikeshop).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (bikeshop.address &&
              Object.values(bikeshop.address).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (searchResults.length === 0) {
            this.message = 'Nothing found'
          }
        })
      }
    },
    filteredBikeshops(searchResults) {
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
    },
    filteredParkinglots(searchResults) {
      if (this.search) {
        this.parkinglots.forEach((bikeshop) => {
          if (Object.values(bikeshop).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (bikeshop.address &&
              Object.values(bikeshop.address).includes(this.search)) {
            searchResults.push(bikeshop)
            this.message = ''
          } else if (searchResults.length === 0) {
            this.message = 'Nothing found'
          }
        })
      }
    },
    setCoordinates(latitude, longitude) {
      this.coordinates.lat = latitude
      this.coordinates.lng = longitude
      console.log(this.coordinates.lat, this.coordinates.lng)
    },
    clicked() {
      this.coordinates.lat = 57
      this.coordinates.lng = 11
      console.log(this.coordinates.lat, this.coordinates.lng)
    }
  },
  computed: {
    filteredLocations: function () {
      const bikeshopsSelected = this.arrayEquals(this.filterSelected, ['bikeshops'])
      const parkinglotsSelected = this.arrayEquals(this.filterSelected, ['parkinglots'])
      if (!this.search && (this.filterSelected.length === 0 || this.filterSelected.length === 2)) {
        return this.allLocations
      } else if (!this.search && bikeshopsSelected) {
        return this.bikeshops
      } else if (!this.search && parkinglotsSelected) {
        return this.parkinglots
      }
      const searchResults = []
      if (this.search && (this.filterSelected.length === 0 || this.filterSelected.length === 2)) {
        this.filteredAllLocations(searchResults)
      } else if (this.search && bikeshopsSelected) {
        this.filteredBikeshops(searchResults)
      } else if (this.search && parkinglotsSelected) {
        this.filteredParkinglots(searchResults)
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
@media screen and (max-width: 600px) {
  .my-2
    { display: none;}
}

.bikeshop{
  position: relative;
  overflow:scroll
}
.map{
  margin-top: 0px;
  position: fixed;
  width: 100%;
  height: 100%;
}
.mysidebar{
  margin-top: 50px
}
div.overflow-auto {
  width: 240px;
  height:90vh;
  overflow: auto;
  border: none;
  position: fixed;
}
@media screen and (max-width: 768) {#entity-card{ display: none ;}}
</style>
