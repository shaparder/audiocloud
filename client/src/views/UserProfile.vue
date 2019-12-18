<template>
  <div class="user-profile">
    <FileList :query="user" :key="listKey"/>
    
  </div>
</template>

<script>
import FileList from '@/components/FileList'

export default {
	name: 'userProfile',
  components: { FileList },
  data() {
    return {
      queryString: '',
      listKey: 0,
    }
  },
  computed: {
    user: function() {
      return this.$store.getters.getUser;
    }
  },
  mounted() {
    this.$root.$on('refreshList', (add) => {
      this.listKey += add;
    });
  }
}
</script>