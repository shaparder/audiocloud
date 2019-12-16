<template>
  <div class="dashboard">
    <v-container fluid class="mt-12 contain">
      <!-- <v-combobox
        placeholder="Search ..."
        v-model="queryString"
        :items="autocomplete"
        item-color="anti"
        outlined
        solo
        prepend-inner-icon="mdi-magnify"
        flat
        color="anti"
        hide-no-data
        hide-details
      ></v-combobox> -->
      <v-text-field
        placeholder="Search ..."
        v-model="queryString"
        prepend-inner-icon="mdi-magnify"
        color="anti"
        outlined
        solo
      ></v-text-field>
    </v-container>
    <FileList :query="queryString" :key="listKey"/>
  </div>
</template>

<script>
import FileList from '@/components/FileList'
// @ is an alias to /src

export default {
  name: 'dashboard',
  components: { FileList },
  data() {
    return {
      queryString: '',
      listKey: 0,
      autocomplete: null
    }
  },
  watch: {
    queryString: function() {
      this.$root.$emit('refreshList', 1);
    }
  },
  mounted() {
    this.$axios
      .get(process.env.VUE_APP_AUTH_API_URL + "/api/users/autocomplete")
      .then(response => {
        this.autocomplete = response.data.map(item => {
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

<style scoped>

.contain{
  width: 50%;
}

</style>
