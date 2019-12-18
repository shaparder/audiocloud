<template>
  <div class="user-profile">
    <div v-if="users.indexOf(user) > -1">
      <FileList :query="queryString" :key="listKey"/>
    </div>

    <v-row v-else class="flex-column px-10 my-5" align="center" align-content="center">
      <unicon name="silent-squint" fill="grey"/>
      <h1 class="grey--text heading">This user doesn't exist (at the moment).</h1>
      <h3 class="grey--text subheading">Maybe he changed his name ?</h3>
     </v-row>
  </div>
</template>

<script>
import FileList from '@/components/FileList'

export default {
	name: 'userProfile',
  components: { FileList },
  data() {
    return {
      user: this.$route.params.username,
      users: null,
      listKey: 0,
    }
  },
  computed: {
    queryString() {
      return '?query=' + this.user + '&profile=true'
    }
  },
  mounted() {
    this.$axios
      .get(process.env.VUE_APP_AUTH_API_URL + "/api/users/userslist")
      .then(response => {
        this.users = response.data.map(item => {
          return item.username;
        })
      })
      .catch(error => { console.log(error) });

    this.$root.$on('refreshList', (add) => {
      this.listKey += add;
    });
  }
}
</script>