<template>
  <div class="card application-card">
    <div class="card-header">
      <h4>№{{ data.id }}</h4>
      <small :class="['status', `${data.customStatus && data.customStatus.type}`]">
        {{ data.customStatus && data.customStatus.title && data.customStatus.title.uz }}
      </small>
      <a-dropdown :trigger="['click']" placement="bottomRight" v-if="data.customStatus.key == 'confirmed' || data.customStatus.key == 'approved_organizer'">
        <i class="icon-dots"></i>
        <ul class="table-dropdown" slot="overlay">
          <li v-if="data.customStatus.key != 'approved_organizer'" class="green" @click="approved">
            <i class="icon-accept"></i>
            <span>Qabul qilish</span>
          </li>
          <li v-if="data.customStatus.key != 'approved_organizer'" class="red" @click="rejected">
            <i class="icon-reject"></i>
            <span>Rad etish</span>
          </li>
          <li v-if="data.customStatus.key == 'approved_organizer'" class="green" @click="$router.push(
            { path: `/cabinet/organizer/tenders/` + data.tender }
          )">
            <i class="icon-accept"></i>
            <span>Hujjatlarni to'ldirish</span>
          </li>
        </ul>
      </a-dropdown>
    </div>
    <div class="card-body">
      <span> Tashkilotchi </span>
      <h3>{{ data.organizer }}</h3>
    </div>
    <div class="card-footer">
      <ul>
        <li>
          <span class="text-caption black3"> Yuborilgan sana </span>
          <h4>{{ data.created_at | timeFormat }} / {{ data.created_at | dateFormat }}</h4>
        </li>
      </ul>
      <nuxt-link
        v-if="data.customStatus.key != 'approved_organizer'"
        :to="{ path: `/cabinet/organizer/${data.status == 'approved_organizer' ? 'tenders' : 'budget'}/` + data.id }">
        Batafsil <i class="icon-angle-right"></i></nuxt-link>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    review: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
    }
  },
  computed: {

  },
  methods: {
    ...mapActions('organizer/applications', ['approve', 'reject']),
    async approved() {
      await this.approve({ id: this.data.id, status: 'approved_organizer' });
      // this.$emit("fetch");
      this.$router.push({ path: '/cabinet/organizer/tenders' });
    },
    rejected() {
      this.$emit('reject', this.data.id);
    },
  },

};
</script>

<style scoped>
</style>