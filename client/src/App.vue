<template>
  <v-app color="grey lighten-4">
    <Navbar />
    <v-content class="mx-8 mb-8">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>
