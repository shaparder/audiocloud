<template>
  <div class="user-avatar text-center">
    <v-avatar size="100" color="anti">
      <span class="white--text headline">{{ initial }}</span>
    </v-avatar>
    <p class="anti--text subheading mt-3">{{ username }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    username: function() {
      return this.$store.getters.getUser.toUpperCase();
    },
    initial: function() {
      var username = this.$store.getters.getUser;
      return username.charAt(0).toUpperCase();
    }
  }
}
</script>
