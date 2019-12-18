<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent max-width="600px">

      <template v-slot:activator="{ on }">
        <v-btn color="anti white--text" depressed v-on="on">Register</v-btn>
      </template>

      <v-card>

        <v-card-title>
          <span class="headline">Register</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false" text color="grey" right><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="form">
            <v-row>
            <v-col cols="6">
            <v-text-field
              cols="6"
              label="First name"
              v-model="firstname"
              :rules="[rules.name]"
              color="accent"
            ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field
              cols="6"
              label="Last name"
              v-model="lastname"
              :rules="[rules.name]"
              color="accent"
            ></v-text-field>
            </v-col>
            </v-row>
            <v-text-field
              label="Username"
              v-model="username"
              :rules="[ rules.required, rules.username ]"
              color="accent"
            ></v-text-field>
            <v-text-field
              label="Email"
              type="email"
              v-model="email"
              color="accent"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-text-field 
              label="Password"
              v-model="password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.complex]"
              name="input-10-1"
              hint="8+ characters with uppercases, lowercases and numbers" 
              counter
              color="accent"
              @click:append="show = !show"
              ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!form" color="accent" depressed @click="register">Submit</v-btn>
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
          name: v => /[a-zA-Z]{2,30}/.test(v) || 'Characters only.',
          username: v => /[a-zA-Z\d\s_-]{1,30}/.test(v) || 'Characters and digits only.',
          email: v => /^([a-zA-Z\d._-]+)@([a-zA-Z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(v) || 'Please enter a valid email adress.',
          min: v => v.length >= 8 || 'Min 8 characters',
          complex: v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])/.test(v) || 'Must contain uppercases, lowercases and numbers.',
      },
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      var message;
      this.$axios
        .post(
          process.env.VUE_APP_AUTH_API_URL + '/api/users/register',{
            'firstname': this.firstname,
            'lastname': this.lastname,
            'username': this.username,
            'email': this.email,
            'password': this.password,
          }
        )
        .then(response => {
          console.log(response);
          message = response.data;
          // log user in
          this.dialog = false;
        })
        .catch(error => {
          console.error(error.response);
          message = error.response.data;
        })
        .finally(() => this.$store.commit('setMessage', message))
    }
  }
}
</script>

<style>

</style>