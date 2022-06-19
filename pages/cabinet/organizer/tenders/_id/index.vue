<template>
  <layouts title="Budjet" :isHeader="false">
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="flex-center mb-24">
        <span class="text-body1 black1 mr-16"> №{{detail.id}} </span>
        <span :class="['status', 'mr-auto', `${detail.customStatus && detail.customStatus.type}`]">
          {{detail.customStatus && detail.customStatus.title && detail.customStatus.title[$i18n.locale] }}
        </span>
        <div class="block-text grey">
          <span>
            {{detail.created_at | timeFormat}} / {{detail.created_at | dateFormat}}
          </span>
        </div>
      </div>
      <div class="mb-24 border-bottom">
        <a-row type="flex" :gutter="[20, 0]">
          <a-col span="8">
            <span class="text-caption black3">Tashkilotchi</span>
            <h3 class="text-body1 black1">{{detail.tender_application && detail.tender_application.organizer}}</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Obyekt</span>
            <h3 class="text-body1 black1">Obyekt</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Shaxsiy hisobvaraq</span>
            <h3 class="text-body1 black1">{{detail.account_number}}</h3>
          </a-col>
        </a-row>
      </div>
      <CardsOrganizerTenderForm :detail='detail'/>
      </template>
    </template>
  </layouts>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  middleware: 'organizer',
  computed: {
    ...mapGetters('organizer/tender', ['detail', 'loading'])
  },
  methods: {
    ...mapActions('organizer/tender', ['getDetail']),
  },
  async mounted () {
    await this.getDetail({id: this.$route.params.id})
  },
};
</script>
