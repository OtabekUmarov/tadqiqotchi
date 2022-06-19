<template>
  <popups-layout
    Width="750px"
    @close="close"
    title="To'lov kvitansiyalari"
    :isVisible="isVisible"
    wrapClassName="invoice-modal"
    :centered="false"
  >
    <template #body>
        <div class="card applicant-card _green mt-16 invoice">
            <div class="card-body flex-center">
              <div class="card-title">
                <h3>Sizning arizangiz qabul qilindi</h3>
                <p>Quyidagi to'lovlarni amalga oshirishingiz mumkin</p>
              </div> 
            <!-- <a-button @click="winnerModal()"  type="primary" class="orange ml-auto">
              Tasdiqlash
            </a-button> -->
            </div>
          </div>
      <CustomTab :tabs="invoiceTabs" v-model="invoiceTab" class="mb-12 mt-12" />
      <template v-if="invoiceTab.value == 1">
        <CardsParticipantInvoice1  :indata='guaranteeAmount'/>
      </template>
      <template v-else>
        <CardsParticipantInvoice2  :indata='guaranteeCommission'/>
      </template>
    </template>
  </popups-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    isVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    invoicedata: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      invoiceTabs: [
        {
          title: "Kafolat summa uchun",
          value: 1,
        },
        {
          title: "Komissiya uchun",
          value: 2,
        },
      ],
      invoiceTab: {
        title: "Faktura",
        value: 1,
      },
    };
  },
  computed: {
    guaranteeCommission() {
      return this.invoicedata.find(
        (item) => item.type == "guarantee_commission"
      );
    },
    guaranteeAmount() {
      return this.invoicedata.find(
        (item) => item.type == "guarantee_amount"
      );
    },
  },
  methods: {
    ...mapActions("organizer/applications", ["postState"]),
    close() {
      this.$emit("close");
      this.$router.push({ path: '/cabinet/participant/payment' });
    },
  },
};
</script>

<style></style>
