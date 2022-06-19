<template>
  <layouts title="Budjet" :isHeader="false">
    <template #body>
      <div class="flex-center mb-24">
        <span class="text-body1 black1 mr-16"> №{{detail.account_number}} </span>
        <span :class="['status', 'mr-auto', `${detail.customStatus && detail.customStatus.type}`]">
          {{ detail.customStatus && detail.customStatus.title && detail.customStatus.title[$i18n.locale] }}
        </span>
        <div class="block-text grey">
          <span>
            {{ detail.created_at | timeFormat }} / {{ detail.created_at | dateFormat }}
          </span>
        </div>
      </div>
      <div class="mb-24 border-bottom">
        <a-row type="flex" :gutter="[20, 0]">
          <a-col span="8">
            <span class="text-caption black3">Tashkilotchi</span>
            <h3 class="text-body1 black1">{{ detail.organizer }}</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Obyekt</span>
            <h3 class="text-body1 black1">Obyekt</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Shaxsiy hisobvaraq</span>
            <h3 class="text-body1 black1">{{ detail.account_number }}</h3>
          </a-col>
        </a-row>
      </div>
      <!-- v-if="detail.status == 'in_add_info_organizer'" -->
      <!-- <template v-if="!detail.tender_application">
        <CardsOrganizerTenderForm :detail='detail' />
      </template> -->
      <template v-if="detail && detail.status == 'rejected_organizer'">
        <h2 class="title mb-16">{{ detail.customStatus && detail.customStatus.title && detail.customStatus.title[$i18n.locale] }}</h2>
        <div class="content mb-12">
          <a 
          :href="detail && detail.rejected_tender_application_info && detail.rejected_tender_application_info && detail.rejected_tender_application_info[0].file" 
          download
          target="_blank"
          class="text-body3 black1 with-icon"><i class="icon-file mr-12"></i>
            Reject{{detail && detail.rejected_tender_application_info && detail.rejected_tender_application_info && detail.rejected_tender_application_info[0].data_attachment && detail.rejected_tender_application_info[0].data_attachment.format  }}
          </a>
        </div>
        <div class="content">
          <p class="text-body3 black1 mb-8">
            {{detail && detail.rejected_tender_application_info && detail.rejected_tender_application_info && detail.rejected_tender_application_info[0].comment}}
          </p>
          <span class="text-caption ml-auto black3 mb-0 width-max">12:24 / 22.02.2022</span>
        </div>
      </template>
      <template v-else-if="detail.status == 'confirmed'">
        <div class="flex-center mt-24">
          <a-button type="primary" class="grey-reject mr-20" @click="rejected">Rad etish</a-button>
          <a-button type="primary" class="green" @click="approved">
            Hujjatlarni to‘ldirish
          </a-button>
        </div>
      </template>
      <PopupsOrganizerReject :id="detail.id" :isVisible="isReject" @close="closeReject" @fetch="fetchDetail"/>
    </template>
  </layouts>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: 'organizer',
  computed: {
    ...mapGetters('organizer/applications', ['detail'])
  },
  data() {
    return {
      isReject: false
    }
  },
  methods: {
    ...mapActions('organizer/applications', ['getDetail','approve']),
    rejected() {
      this.isReject = true;
    },
    async approved() {
      await this.approve({ id: this.detail.id, status: 'approved_organizer' });
      this.$message.success('Harakat muvaffaqiyatli bajarildi');
      this.$router.push({ path: '/cabinet/organizer/tenders' });
    },
    async fetchDetail() {
      await this.getDetail({id:this.$route.params.id});
    },
    closeReject() {
      this.isReject = false;
    },
  },
  async mounted() {
    await this.fetchDetail();
  },
};
</script>
