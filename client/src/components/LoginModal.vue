<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="orange white--text" depressed v-on="on">Account</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="First name"
                  v-model="firstname"
                  :rules="[rules.name]">
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Last name"
                  v-model="lastname"
                  :rules="[rules.name]">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Username"
                  v-model="username"
                  :rules="[rules.required, rules.username]">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  type="email"
                  v-model="email"
                  :rules="[rules.required, rules.email]"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field 
                  label="Password"
                  v-model="password"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min, rules.complex]"
                  name="input-10-1"
                  hint="8+ characters with uppercases, lowercases and numbers" 
                  counter
                  @click:append="show = !show">
                  </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" text @click="dialog = false">Close</v-btn>
          <v-btn color="accent" text @click="register">Submit</v-btn>
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
      show: false,
      rules: {
          required: value => !!value || 'Required.',
          name: v => v.match(/[a-zA-Z]{2,30}/) || 'Characters only.',
          username: v => v.match(/[a-zA-Z\d\s_-]{1,30}/) || 'Characters and digits only.',
          email: v => v.match(/^([a-zA-Z\d._-]+)@([a-zA-Z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/) || 'Please enter a valid email adress.',
          min: v => v.length >= 8 || 'Min 8 characters',
          complex: v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])/.test(v) || 'Must contain uppercases, lowercases and numbers.',
          emailMatch: () => ('The email and password you entered don\'t match')
      },
      firstname: null,
      lastname: null,
      username: null,
      email: null,
      password: null
    }
  },
  methods: {
    register() {
      this.$axios
        .post(process.env.VUE_APP_AUTH_API_URL + '/api/users/register', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => { console.log(response) })
        .catch(error => { console.error(error) })
    }
  }
}
</script>

<style>

</style>