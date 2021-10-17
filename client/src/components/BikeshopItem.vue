<template>
  <div>
    <b-card class="mb-2" style="max-width: 20rem; margin-left: 5px; top: 60px">
      <b-card-text>
        <h2>{{ bikeshop.name }}</h2>
        <p>{{ bikeshop.owner }}</p>
        <p v-if="bikeshop.address && bikeshop.address.city">
          {{ bikeshop.address.city }}
        </p>
        <p v-else></p>
        <p v-if="bikeshop.address && bikeshop.address.street">
          {{ bikeshop.address.street }}
        </p>
        <p v-else></p>
        <p>Rating: {{ bikeshop.rating }}</p>
      </b-card-text>
      <div>
        <b-form-rating v-model="value"></b-form-rating>
        <p class="mt-2">Value: {{ bikeshop.rating }}</p>
      </div>

      <b-button id="ID" href="#" v-on:click="bikeFunction()" variant="primary">See location</b-button>
    </b-card>
  </div>
</template>

<script>

export default {
  mixins: [
    require('../components/Map.vue')
  ],
  name: 'bikeshop-item',
  props: ['bikeshop'],
  data() {
    return {
      name: 'bikeshop.name',
      city: 'bikeshop.address.city',
      ID: 'bikeshop._id'
    }
  }

}

</script>
<style scoped>
</style>
