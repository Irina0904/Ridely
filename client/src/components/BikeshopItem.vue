<template>
    <div>
  <b-card
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      <h2>{{bikeshop.name}}</h2>
      <p>{{bikeshop.owner}}</p>
      <p>{{bikeshop.address.city}}</p>
      <p>{{bikeshop.address.street}}</p>
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
  name: 'bikeshop-item',
  props: ['bikeshop'],
  data() {
    return {
      name: 'bikeshop.name'
    }
  }
}
</script>
