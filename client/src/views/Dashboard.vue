<template>
  <div class="dashboard">

    <v-container fluid >

      <v-row v-if="errored">
        <h2 style="color: grey;">A problem has occured when trying to get files.</h2>
        <unicon name="silent-squint" fill="grey" />
      </v-row>

      <v-row v-else-if="loading">
        <v-text-field disabled loading justify-center value="loading..."></v-text-field>
      </v-row>

      <v-card v-else outlined flat class="pa-2" v-for="file in files" :key="file.id">
        <v-row no-gutters>
          <v-col cols="12" sm="4" xs="6">
            <div class="caption grey--text">Filename</div>
            <v-btn text light>{{ file.name }}</v-btn>
          </v-col>
          <v-col cols="12" sm="4" xs="6">
            <div class="caption grey--text">Uploader</div>
            <v-btn text light>{{ file.user }}</v-btn>
          </v-col>
          <v-col cols="12" sm="2" xs="6">
            <div class="caption grey--text">Date</div>
            <v-btn text light disabled>{{ file.date }}</v-btn>
          </v-col>
          <v-col cols="12" sm="1" xs="3">
            <div class="caption grey--text">Size</div>
            <v-btn text light disabled>{{ file.size }}</v-btn>
          </v-col>
          <v-col cols="12" sm="1" xs="3">
            <v-btn depressed block color="accent"><unicon name="import" fill="white" /></v-btn>
          </v-col>
        </v-row>
      </v-card>

    </v-container>

  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src

export default {
  name: 'dashboard',
  data() {
    return {
      files: null,
      loading: true,
      errored: false
    }
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_AUDIO_API_URL)
      .then(response => {
        this.files = response.data;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false)
  }
}
</script>
