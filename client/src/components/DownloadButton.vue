<template>
  <v-btn @click="download" depressed color="anti"><unicon name="import" fill="white" /></v-btn>
</template>

<script>

export default {
  props: {
    fileId: {
      required: true,
      type: String
    }
  },
  methods: {
    download() {
      this.$axios
        .get(process.env.VUE_APP_AUDIO_API_URL + '/api/tracks/download/' + this.fileId)
        .then(response => { console.log(response) })
        .catch(error => { console.error(error) })
    }
  }
}
</script>

<style>

</style>