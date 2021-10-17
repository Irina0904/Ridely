<template>
  <div>
    <GmapMap
      :center="coordinates"
      :zoom="16"
      :options="options"
      style="width: 100%; height: 96vh; margin: 0px auto"
    ><GmapMarker
        :key="index"
        v-for="(gmp, index) in markers"
        :position="gmp"
        @click="center=gmp"
      ></GmapMarker>
    </GmapMap>
  </div>
</template>
<script>
module.exports = {

  data() {
    return {
      markers: this.coordinates,
      currentPlace: null,
      coordinates: {
        lat: 0,
        lng: 0
      },
      options: {
        mapId: '14b7289127689dad',
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }
    }
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place
    },
    mapFunction(lat, lng) {
      this.markers = [
        lat,
        lng
      ]
    }
  },
  created() {
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates
        this.markers = [
          this.coordinates
        ]
      })
      .catch((error) => alert(error))
  }
}
</script>
