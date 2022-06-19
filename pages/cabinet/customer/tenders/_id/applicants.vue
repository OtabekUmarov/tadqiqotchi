<template>
  <layouts title="Talabgorlar">
    <template #headerItems>
      <a-button type="primary" @click="$router.push({
        path: '/cabinet/customer/tenders/' + $route.params.id 
      })" class="blue">
        <small>Orqaga</small>
      </a-button>
    </template>
    <template #body>
      <a-spin size="large" class="loader-list" v-if="protocolLoading" />
      <template v-else>
        <a-row :gutter="[0, 24]">
        <a-col v-for="item in list" :key="item.id">
          <CardsApplicant 
          @openModal="openModal"
          :item='item'/>
        </a-col>
      </a-row>
      <PopupsCustomerTenderApplicant 
        :isVisible="isVisible"
        :detail="modalItem"
        @close="close" />
      </template>
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  middleware: 'customer',
  data() {
    return {
      isVisible: false,
      list: [],
      modalItem: {},
    };
  },
  computed: {
    ...mapGetters('customer/tender', [ 'protocolLoading']),
  },
  methods: {
    ...mapActions('customer/tender', ['getProtocolList', 'getDetailProtocolParticipant']),
    close() {
      this.isVisible = false;
      this.modalItem = {};
    },
    async openModal(id) {
      try {
        let res = await this.getDetailProtocolParticipant({ id });
        this.modalItem = res;
        this.isVisible = true;
      } catch (error) {
        console.log(error);        
      }
    },
    async fetchList(){
      try {
        let res = await this.getProtocolList({id: this.$route.query.protocol})
        this.list = res.tender_protocol_participant_result
      } catch (error) {
        console.log(error);        
      }
    }
  },
  async mounted() {
    await this.fetchList();
  },
};
</script>
