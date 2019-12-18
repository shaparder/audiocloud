<template>
  <div class="dlbutton">
    <v-btn @click="download" depressed color="anti"><unicon name="import" fill="white" /></v-btn>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    fileId: {
      required: true,
      type: String
    }
  },
  methods: {
    download() {
      var message;
      
      this.$axios
        .get(process.env.VUE_APP_AUDIO_API_URL + '/api/tracks/download/' + this.fileId)
        .then(response => {
          console.log(response);
          message = response.data;
        })
        .catch(error => { 
          console.error(error);
          message = error.response.data;
        })
        .finally(() => this.$store.commit('setMessage', message))
    }
  }
}
</script>

<style>

</style>