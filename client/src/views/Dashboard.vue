<template>
  <div class="dashboard">
    <FileList :query="queryString"/>
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
      queryString: ''  
    }
  }
}
</script>
