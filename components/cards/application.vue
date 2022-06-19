<template>
  <div class="card application-card">
    <div class="card-header">
      <h4>{{ data.tender && data.tender.account_number }}</h4>
      <small :class="['status', `_${data.tender.status}`]">
        {{ data.tender.status == "rejected_minfin" ? "Rad etildi" : data.tender.status == "confirmed" ? "Tasdiqlandi" :
            "Ko‘rib chiqilmoqda "
        }}
        toxa
      </small>
    </div>
    <div class="card-body">
      <span> Tashkilotchi </span>
      <h3>{{ data.tender && data.tender.organizer && data.tender.organizer.organization_name }}</h3>
    </div>
    <div class="card-footer">
      <ul>
        <li>
          <span class="text-caption black3"> Yuborilgan sana </span>
          <h4>{{ data.created_at | timeFormat }} / {{ data.created_at | dateFormat }}</h4>
        </li>
      </ul>
      <nuxt-link v-if="review" :to="'/cabinet/minfin-moderator/applications/' + data.id">Batafsil <i
          class="icon-angle-right"></i></nuxt-link>
      <a-popconfirm title="Arizani rad etmoqchimisiz?" ok-text="Ha" cancel-text="Yo'q" style="color: red"
        @confirm="reject" @cancel="cancel">
        <a-icon slot="icon" type="question-circle-o" style="color: red" />
        <a href="#">Rad etish</a>
      </a-popconfirm>
      <a-popconfirm title="Arizani qabul etmoqchimisiz?" ok-text="Ha" cancel-text="Yo'q" style="color: green"
        @confirm.stop="approved" @cancel="cancel">
        <a href="#">Qabul qilish</a>
      </a-popconfirm>
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
  methods: {
    ...mapActions('minfin/applications', ['approve', 'reject']),
    async approved() {
      console.log('approve');
      console.log(this.data);
      await this.approve({ id: this.data.id, status: 'confirmed' })
    },
    cancel(e) {
      console.log(e);
      // this.$message.error('Click on No');
    },
  },
};
</script>

<style scoped>
</style>