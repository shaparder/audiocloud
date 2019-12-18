<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">

      <v-btn depressed color="anti" v-on="on">
        <span class="white--text">UPLOAD</span>
        <unicon right name="export" fill="white" />
      </v-btn>

      </template>
      <v-card>

        <v-card-title>
          <span class="headline">Upload file</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false" text color="grey" right><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            v-model="form"
          >
            <v-text-field
              v-model="trackname"
              :rules="[ rules.namelength, rules.required ]"
              counter="30"
              label="Name"
              color="anti"
              hint="Max 30 characters"
            ></v-text-field>

            <v-textarea
              v-model="description"
              :rules="[ rules.desclength ]"
              label="Description"
              auto-grow
              rows="1"
              color="anti"
            ></v-textarea>

            <v-select
              v-model="typeselect"
              :items="types"
              :rules="[ rules.required ]"
              label="Type of audio file"
              color="anti"
              item-color="anti"
            ></v-select>

            <v-file-input
              class="mt-2"
              v-model="trackfile"
              label="File"
              :loading="!trackfile"
              filled
              color="grey"
              background-color="anti"
              accept="audio/mp3, audio/mpeg"
              placeholder="Click to choose a file !"
              hint="File has to be mp3/mpeg and less than 20mb"
              :rules="[ rules.file, rules.required ]"
              clearable
              show-size
            ></v-file-input>

          </v-form>
          <v-divider></v-divider>
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="$refs.form.reset()">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!form" @click="upload" :loading="loading" class="white--text" color="accent" depressed>Submit</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      form: false,
      loading: false,
      rules: {
          required: value => !!value || 'Required.',
          namelength: v => !v || v.length <= 30 && v.length >= 1 || 'File name must be 1 to 30 characters',
          desclength: v => !v || v.length <= 100 && v.length >= 1 || 'File description must be 1 to 100 characters',
          file: v => !v || v.size < 20000000 || `File size should be less than 20 MB! ${v.size}`
      },
      types: [
        'sample',
        'track'
      ],
      trackname: null,
      description: null,
      typeselect: null,
      trackfile: null
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    upload() {
      this.loading = true;
      var message;
      let formData = new FormData();
      formData.set('username', this.user);
      formData.set('trackname', this.trackname);
      formData.set('description', this.description);
      formData.set('typefile', this.typeselect);
      formData.append('trackfile', this.trackfile);

      this.$axios
        .post(
          process.env.VUE_APP_AUDIO_API_URL + '/api/tracks/upload',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
          )
        .then(response => {
          this.$root.$emit('refreshList', 1);
          this.dialog = false;
          this.$refs.form.reset();
          message = response.data;
          })
        .catch(error => {
          message = error.response.data;
        })
        .finally(() => {
          this.loading= false;
          this.$store.commit('setMessage', message);
        })
    }
  }
}
</script>