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

          <v-list-item to="/">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <div v-if="loggedIn">

          <v-list-item :to="user">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          </div>

        </v-list>
      </v-menu>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="grey lighten-4" class="flex-column">

      <v-row class="flex-column mt-12 mb-3" align="center">
        <div v-if="loggedIn" class="text-center">
          <UserAvatar />
          <LogoutModal class="mb-2"/>
          <UploadModal />
        </div>

        <div v-else class="text-center">
          <LoginModal class="mb-2" />
          <RegisterModal />
        </div>

      </v-row>

<!--           
        <v-list nav>

          <v-list-item router to="/" class="white--text">
            <v-list-item-icon>
              <unicon name="music" fill="#F070A1" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="anti--text">Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <div v-if="loggedIn">

          <v-list-item router :to="user" class="white--text">
            <v-list-item-icon>
              <unicon name="user" fill="#F070A1" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="anti--text">Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="white--text">
            <v-list-item-icon>
              <unicon name="cog" fill="#F070A1" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="anti--text">Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          </div>

        </v-list> -->

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
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
}
</script>

<style scoped>
  .v-app-bar{
    background: linear-gradient(45deg,#95FD48,#19E9A6);

  }
</style>