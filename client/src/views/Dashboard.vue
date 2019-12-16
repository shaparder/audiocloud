<template>
  <div class="dashboard">
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
      listKey: 0
    }
  },
  mounted: function() {
    this.$root.$on('refreshList', (add) => {
      this.listKey += add;
    })
  }
}
</script>
