<template>
  <layouts title="Shahsiy ma'lumotlar">
    <template #headerItems>
      <a-button class="green" type="primary" @click="$router.push({
        path: '/cabinet/supervisor/profile/update/' + detail.id
      })">
        <i class="icon-user-plus"></i> Tahrirlash
      </a-button>
    </template>
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        {{detail}}
      </template>
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  middleware: 'supervisor',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('profile', ['detail', 'loading']),
  },
  methods: {
    ...mapActions("profile", ["getDetail"]),
    async fetchDetail() {
      await this.getDetail()
    }
  },
  async mounted() {
    await this.fetchDetail();
  },
};
</script>
