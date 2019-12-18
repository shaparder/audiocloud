<template>
  <v-app color="grey lighten-4">
    <NavBar />
    <v-content class="mx-8 mb-8">
        <router-view></router-view>
    </v-content>
    
    <v-snackbar v-model="snackbar" absolute bottom>
      <p>{{ message }}</p>
      <v-btn color="anti" depressed @click="snackbar = false">Close</v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: 'App',
  components: { NavBar },
  data: () => ({
    snackbar: false,
  }),
  computed: {
    message: function() {
      return this.$store.getters.getMessage
    }
  }
};
</script>
