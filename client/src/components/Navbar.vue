<template>
  <nav>
    <v-app-bar absolute flat app elevate-on-scroll>

      <v-app-bar-nav-icon color="white" @click="drawer=!drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title large class="white--text">
        <unicon left name="boombox" fill="white" />
        <span class="font-weight-light">AUDIO</span>
        <span>CLOUD</span>
      </v-toolbar-title>

<!--  
      <v-text-field
        outlined
        hide-details
        rounded
        dense
        label="Search ..."
        append-icon="search"
        light></v-text-field> -->

      <v-spacer></v-spacer>

      <v-btn text class="white--text">
        <span style="color: white;">SIGN OUT</span>
        <unicon right name="sign-out-alt" fill="white" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="white">
      <v-list nav>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route" class="white--text">
          <v-list-item-icon>
            <unicon :name="link.icon" fill="#5AF67F" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="accent--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: false,
      links: [
        { icon: 'music', text: 'Dashboard', route: '/'},
        { icon: 'user', text: 'Profile', route: '/user/:username'},
        { icon: 'cog', text: 'Settings', route: '/settings'},
      ]
    }
  }
}
</script>

<style scoped>
  .v-app-bar{
    background: linear-gradient(45deg,#95FD48,#19E9A6);

  }
</style>