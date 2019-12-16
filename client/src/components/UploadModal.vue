<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">

      <v-btn text class="white--text" v-on="on">
        <span class="white--text">UPLOAD</span>
        <unicon right name="export" fill="white" />
      </v-btn>

      </template>
      <v-card>

        <v-card-title>
          <span class="headline">Upload file</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false" text color="grey" ><v-icon right>mdi-close</v-icon></v-btn>
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
          <v-btn :disabled="!form" @click="upload" class="white--text" color="anti" depressed>Submit</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" absolute bottom>
      <p>Your file was sucessfully uploaded !</p>
      <v-btn color="accent" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      form: false,
      snackbar: false,
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
  methods: {
    upload() {
      let formData = new FormData();
      formData.set('username', 'getuserfromjwt');
      formData.set('trackname', this.trackname);
      formData.set('description', this.description);
      formData.set('typefile', this.typeselect);
      formData.append('trackfile', this.trackfile);

     // this.$axios
       // .get(process.env,VUE_APP_AUTH_API_URL + '/api/users/verify',
        //{ headers: { 'auth-token': jwt } }
        //)
      this.$axios
        .post(
          process.env.VUE_APP_AUDIO_API_URL + '/api/tracks/upload',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
          )
        .then(response => {
          console.log(response);
          if ( response.status == 201 ){
            this.$root.$emit('refreshList', 1);
            this.dialog = false;
            this.$refs.form.reset();
            this.snackbar = true;
          }
          })
        .catch(error => { console.error(error) })
    }
  }
}
</script>