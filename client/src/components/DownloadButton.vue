<template>
  <div class="dlbutton">
    <v-btn @click="download" :loading="loading" depressed color="anti"><unicon name="import" fill="white" /></v-btn>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
    }
  },
  props: {
    fileId: {
      required: true,
      type: String
    },
    fileName: {
      required: true,
      type: String
    }
  },
  methods: {
    download() {
      this.loading = true;
      var message;
      
      this.$axios({
          method: 'GET',
          url: process.env.VUE_APP_AUDIO_API_URL + '/api/tracks/download/' + this.fileId,
          responseType: 'arraybuffer'
        })
        .then(response => {
          message = 'The file download should start';
          var blob = new Blob([response.data], {type: response.headers['content-type']})
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = this.fileName + '.mp3';
          link.click()
        })
        .catch(error => { 
          console.error(error);
          message = error.response.data;
        })
        .finally(() => {
          this.loading = false;
          this.$store.commit('setMessage', message);
        })
    }
  }
}
</script>

<style>

</style>