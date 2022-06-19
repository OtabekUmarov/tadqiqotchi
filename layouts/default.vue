<template>
  <div class="wrapper" :class="{ isSidebar: isSidebar }">
    <Sidebar />
    <div class="wrapper-inner">
      <Header />
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("functions", ["isSidebar"]),
  },
 
};
</script>

<style scoped>
</style>