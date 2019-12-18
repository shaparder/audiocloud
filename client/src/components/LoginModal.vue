<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="anti" outlined v-on="on">Login</v-btn>
      </template>
      <v-card>

        <v-card-title>
          <span class="headline">Login</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false" text color="grey" right><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="form">

            <v-text-field
              label="Email"
              type="email"
              v-model="email"
              color="accent"
              :rules="[ rules.required, rules.email ]"
            ></v-text-field>

            <v-text-field 
              label="Password"
              v-model="password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              name="input-10-1"
              counter
              color="accent"
              @click:append="show = !show"
            ></v-text-field>

          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!form" color="accent" depressed @click="login">Submit</v-btn>
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
      show: false,
      rules: {
          required: value => !!value || 'Required.',
          email: v => /^([a-zA-Z\d._-]+)@([a-zA-Z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(v) || 'Please enter a valid email adress.',
      },
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      var message;

      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        this.dialog = false;
        message = response.data;
      })
      .catch(error => {
        message = error.response.data;
      })
      .finally(() => this.$store.commit('setMessage', message))

    //   this.$axios
    //     .post(
    //       process.env.VUE_APP_AUTH_API_URL + '/api/users/login', {
    //       email: this.email,
    //       password: this.password
    //     })
    //     .then(response => {
    //       console.log(response);
    //       this.dialog = false;
    //         // store token etc
    //       this.message = response.data;
    //     })
    //     .catch(error => {
    //       console.error(error.response);
    //       this.message = error.response.data;
    //     })
    //     .finally(() => this.snackbar = true)
    }
  }
}
</script>