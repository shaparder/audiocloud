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

    <v-navigation-drawer v-model="drawer" app color="grey lighten-4" class="flex-column">

      <v-row class="flex-column mt-12 mb-3" align="center">
        <div v-if="loggedIn" class="text-center">
          <UserAvatar />
          <LogoutModal />
        </div>

        <div v-else class="text-center">
          <LoginModal />
          <RegisterModal />
        </div>

      </v-row>

      <!-- <v-row class="flex-column align-center"> -->
          
        <v-list nav>
          <v-list-item v-for="(link, idx) in links" :key="idx" router :to="link.route" class="white--text">
            <v-list-item-icon>
              <unicon :name="link.icon" fill="#5AF67F" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="accent--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="white--text">
            <v-list-item-icon>
              <unicon name="cog" fill="#5AF67F" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="accent--text">Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      <!-- </v-row> -->

    </v-navigation-drawer>
  </nav>
</template>

<script>
import LoginModal from '@/components/LoginModal'
import LogoutModal from '@/components/LogoutModal'
import RegisterModal from '@/components/RegisterModal'
import UploadModal from '@/components/UploadModal'
import UserAvatar from '@/components/UserAvatar'

export default {
  components: { LoginModal, LogoutModal, RegisterModal, UploadModal, UserAvatar },
  data: () => {
    return {
      drawer: false,
      links: [
        { icon: 'music', text: 'Dashboard', route: '/'},
        { icon: 'user', text: 'Profile', route: '/' + 'yourusername'},
        // { icon: 'cog', text: 'Settings', route: '/settings'},
      ]
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    } 
  }
}
</script>

<style scoped>
  .v-app-bar{
    background: linear-gradient(45deg,#95FD48,#19E9A6);

  }
</style>