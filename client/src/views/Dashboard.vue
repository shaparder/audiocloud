<template>
  <div class="dashboard">

    <v-container fluid class="pa-10 mys-5">

      <!-- <h1 class="subheading page-title">Dashboard</h1> -->

      <v-row v-if="errored">
        <h2 style="color: grey;">A problem has occured when trying to get files.</h2>
        <unicon name="silent-squint" fill="grey" />
      </v-row>

      <v-row v-else-if="loading">
        <v-text-field disabled loading justify-center value="loading..."></v-text-field>
      </v-row>

      <div v-else>

      <v-row class="mb-6">
        <unicon name="sort" fill="lightgrey" />
        <v-btn small text color="grey" v-for="sorting in sortings" :key="sorting.id" @click="sortBy(sorting.name)">
          <unicon :name="sorting.icon" fill="lightgrey" />
          <span class="caption text-lowercase">by {{ sorting.name }}</span>
        </v-btn>
      </v-row>

      <v-card outlined flat v-for="file in files" :key="file.id">
        <v-row no-gutters :class="`pa-3 file ${file.type}`">
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
            <v-btn text light disabled>{{ file.dDay }}</v-btn>
          </v-col>
          <v-col cols="12" sm="1" xs="3">
            <div class="caption grey--text">Size</div>
            <v-btn text light disabled>{{ file.size }}</v-btn>
          </v-col>
          <v-col cols="12" sm="1" xs="3">
            <DownloadButton :fileId="file._id"></DownloadButton>
          </v-col>
        </v-row>
      </v-card>
      <v-divider></v-divider>
      </div>

    </v-container>

  </div>
</template>

<script>
import axios from 'axios';
import DownloadButton from '@/components/DownloadButton'
// @ is an alias to /src

export default {
  name: 'dashboard',
  components: { DownloadButton },
  data() {
    return {
      files: null,
      loading: true,
      errored: false,
      sortings: [
        {icon: 'document', name: 'type', id: 3},
        {icon: 'music-note', name: 'name', id: 1},
        {icon: 'user', name: 'user', id: 2},
        {icon: 'clock', name: 'date', id: 4},
        {icon: 'expand-arrows', name: 'size', id: 5}
      ]
    }
  },
  methods: {
    sortBy(prop){
      this.files.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_AUDIO_API_URL + "/api/tracks")
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

<style span>

.file.sample {
  border-left: 4px solid orange;
}
.file.track  {
  border-left: 4px solid aqua;
}
span.v-btn__content {
  white-space: normal;
  max-width: 100%;
  text-overflow: ellipsis;
}
h1.page-title {
  color: lightgrey;
  font-weight: thin;
}

</style>
