<template>
    <div>
  <b-card
    style="max-width: 15rem;"
    class="mb-2"
  >
    <b-card-text>
    <font-awesome-icon icon="parking" size="3x" />
      <p v-if="bikeshop.address && bikeshop.address.city">{{bikeshop.address.city}}</p>
      <p v-else></p>
      <p v-if="bikeshop.address && bikeshop.address.street">{{bikeshop.address.street}}</p>
      <p v-else></p>
      <p>Rating: {{ bikeshop.rating }}</p>
    </b-card-text>
    <div>
    <b-form-rating v-model="value"></b-form-rating>
    <p class="mt-2">Value: {{ bikeshop.rating }}</p>
  </div>

    <b-button href="#" variant="primary">See location</b-button>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'parking-item',
  props: ['bikeshop'],
  data() {
    return {
      name: 'bikeshop.name',
      city: 'bikeshop.address.city'
    }
  }
}
</script>
