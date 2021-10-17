<template>
    <div>
        <b-row class="justify-content-sm-center mt-5 ml-4">
  <b-card
    style="width: 15rem;"
    class="mb-2"
    align="center"
  >
    <b-card-text>
      <h2>{{addition.name}}</h2>
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
