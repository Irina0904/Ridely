<template>
<div>
    <b-navbar variant="dark" type="dark">
    <b-navbar-brand :to="{ name: 'search_id', params: { _id: this.$route.params._id } }">Ridely.</b-navbar-brand>
  </b-navbar>
    <div v-for="addition in additions" v-bind:key="addition._id">
            <addition-item v-bind:addition="addition"/>
        </div>
</div>
</template>
<script>
import { Api } from '@/Api'
import AdditionItem from '../components/AdditionItem.vue'

export default {
  components: {
    'addition-item': AdditionItem
  },
  data() {
    return {
      additions: []
    }
  },
  mounted() {
    const userID = this.$route.params._id
    Api.get('http://localhost:3000/api/bikeshops/' + userID)
      .then(response => {
        console.log(response.data)
        this.additions = response.data
        console.log(this.additions)
      })
      .catch(error => {
        console.log('failed to get user data', error)
      })
  }
}
</script>
