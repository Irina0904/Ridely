<template>
    <div>
        <b-row class="justify-content-md-center">
  <b-card
    style="max-width: 20rem;"
    class="mb-2"
    align="center"
  >
    <b-card-text>
      <h2>{{addition.name}}</h2>
      <p>{{addition.added_by}}</p>
    </b-card-text>

    <b-button href="#" variant="primary">Status</b-button>
  </b-card>
        </b-row>
</div>
</template>

<script>
export default {
  name: 'addition-item',
  props: ['addition'],
  data() {
    return {
      name: 'addition.name'
    }
  }
}
</script>
