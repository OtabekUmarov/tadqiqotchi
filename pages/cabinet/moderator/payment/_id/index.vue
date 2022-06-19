<template>
  <layouts
    title="Yuborilgan arizalar"
    :isHeader="false"
    class="detail detail-tender"
  >
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="flex-center mb-12">
          <span class="text-body4 black1 mr-24">
            <i class="icon-sidebar-bookmark"></i> №{{ detail.id }}
          </span>
          <!-- <div class="block-text green mr-24">
            <span>Reyting D</span>
            <i class="icon-question"></i>
          </div> -->
          <div class="block-text blue ml-auto" v-if="detail.year_to_year_project">
            <span>Yildan yilga o‘tuvchi obyekt</span>
          </div>
        </div>
        <h2 class="title mb-20">
          {{detail.tender_name}}
        </h2>
        <div class="border-bottom mb-24">
          <a-row type="flex" :gutter="[24,12]">
            <a-col span="8">
              <span class="text-caption black3"
                >Boshlang‘ich narx (QQS bilan):</span
              >
              <h2 class="text-body4 black1">{{detail.starting_price | priceFormat}} UZS</h2>
            </a-col>
            <a-col span="8">
              <span class="text-caption black3">Xizmat turi:</span>
              <h3 class="text-body1 black1">
                {{detail.type == 'guarantee_amount' ? 'Elektron tenderda ishtirok etish uchun taklifni ta’minlash kafolati' : 'Elektron tender operator vositachilik yig‘imi uchun to‘lov'}}
              </h3>
            </a-col>
            <a-col span="8">
              <span class="text-caption black3">Ariza raqami:</span>
              <h3 class="text-body1 black1">{{detail.participant_tender_application}}/708/1</h3>
            </a-col>
            <a-col span="8">
              <span class="text-caption black3">MFO:</span>
              <h3 class="text-body1 black1">00974</h3>
            </a-col>
            <a-col span="8">
              <span class="text-caption black3">H/r:</span>
              <h3 class="text-body1 black1">{{acc_number}}</h3>
            </a-col>
            <a-col span="8">
              <span class="text-caption black3">Qabul qiluvchi:</span>
              <h3 class="text-body1 black1">Shaffof yo'l axborot markazi</h3>
            </a-col>
          </a-row>
        </div>
        <div class="flex-center mb-16">
          <span class="text-body1 blue1 mr-auto">
            {{detail.type == 'guarantee_amount' ? 'Tender taklifini ta’minlash kafolati' : 'Kommissiya to\'lovi'}}
          </span>
          <span :class="['status', `${detail.customStatus && detail.customStatus.type}`]"> 
            {{detail.customStatus && detail.customStatus.title && detail.customStatus.title[$i18n.locale]}}
          </span>
        </div>
        <div class="table4">
          <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Umumiy summa</th>
              <th>To'lov summasi</th>
              <th>To'lov sanasi</th>
              <th>Hujjat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) of detail.participant_pay_amount" :key="item.id">
              <td>{{index + 1}}</td>
              <td>{{detail.amount | priceFormat}} UZS</td>
              <td>{{item.amount | priceFormat}} UZS</td>
              <td>{{item.date | dateFormat}}</td>
              <td>
                <a :href="item.attachment" download target="_blank" type="primary" class="blue _36">
                  <i class="icon-download"> </i>
                  <span> Yuklab olish </span>
                </a>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      </template>
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: 'moderator',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('moderator/payment', ['detail', 'loading']),
  acc_number() {
      return this.detail.type == 'guarantee_commission' ? this.detail.operator_commission_account_number : this.detail.operator_guarantee_account_number
    }
  },
  methods: {
    ...mapActions('moderator/payment', ['getDetail']),
    fetchDetail() {
      this.getDetail({id:this.$route.params.id});
    }
  },
  async mounted () {
    await this.fetchDetail();
  },
};
</script>
