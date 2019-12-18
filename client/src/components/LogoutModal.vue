<template>
  <v-row justify="center">

    <v-dialog v-model="dialog" persistent max-width="360">
      <template v-slot:activator="{ on }">
        <v-btn color="anti" outlined v-on="on">Logout</v-btn>
      </template>
      <v-card>
        <v-card-title class="subheading">Are you sure you want to log out ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="anti" outlined @click="logout">Yes</v-btn>
          <v-btn color="anti" class="white--text" depressed @click="dialog = false">No</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
  
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.dialog = false
      })
    }
  }
}
</script>
