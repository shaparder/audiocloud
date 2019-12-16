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

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="white" class="white--text">
            <unicon name="angle-down" fill="white" />
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(link,idx) in links" :key="idx" :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <UploadModal />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="white">
      <v-row class="flex-column mt-12 mb-3" align="center">
        <v-avatar size="100" color="accent">
          <span class="white--text headline">USER</span>
        </v-avatar>
        <p class="accent--text subheading mt-3">USERNAME</p>
        <LoginModal />
      </v-row>
      <v-list nav>
        <v-list-item v-for="(link, idx) in links" :key="idx" router :to="link.route" class="white--text">
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
import LoginModal from '@/components/LoginModal'
import UploadModal from '@/components/UploadModal'

export default {
  components: { LoginModal, UploadModal },
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