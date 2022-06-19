<template>
  <layouts title="Yuborilgan arizalar" :isHeader="false" class="detail detail-tender">
    <template #body>
      <div class="flex-center mb-12">
        <span class="text-body4 black1 mr-24">
          <i class="icon-sidebar-bookmark"></i> №{{ detail.id }}
        </span>
        <div class="block-text grey mr-24">
          <span>Boshlanish sanasi: {{ detail.created_at | dateFormat }}</span>
        </div>
        <div class="block-text green mr-24">
          <span>Reyting {{ detail.participant_minimum_score && detail.participant_minimum_score.title }}</span>
          <i class="icon-question"></i>
        </div>
        <div class="block-text blue ml-auto" v-if="detail.year_to_year_project">
          <span>Yildan yilga o‘tuvchi obyekt</span>
        </div>
      </div>
      <h2 class="title mb-20">
        {{ detail.tender_name }}
      </h2>
      <div class="border-bottom mb-24">
        <a-row type="flex">
          <a-col span="8">
            <span class="text-caption black3">Boshlang‘ich narx (QQS bilan):</span>
            <h2 class="text-body4 black1">{{ detail.starting_price | priceFormat }} UZS</h2>
          </a-col>
        </a-row>
      </div>
      <CustomTab :tabs="tabs" v-model="tab" class="mb-12" />
      <div v-show="tab.value == 1">
        <FormTenderTab1 @submit="submitFormEmit" :price="detail.starting_price" />
      </div>
      <div v-show="tab.value == 2">
        <FormTenderTab2 @submit="submitFormEmit" :detail="detail" />
      </div>
      <div v-show="tab.value == 3">
        <FormTenderTab3 :statements="detail.statements" @submit="submitFormEmit" />
      </div>
      <div v-if="tab.value == 4">
        <!-- <a-button @click="isInvoice = true">invoice</a-button> -->
        <FormTenderTab4 
          :endDate='detail.active_lot_end_date'
          :complete_days="+form.complete_days"
          :participant_amount="+form.amount" 
          @finish="finishAndSend" />
      </div>
      <PopupsInvoice :isVisible="isInvoice" @close="close" :invoicedata="invoicedata" />
    </template>
  </layouts>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'participant',
  data() {
    return {
      tabs: [
        {
          title: "Tender predmeti bo‘yicha ishlarni bajarishga narx taklifi",
          value: 1,
        },
        {
          title:
            "Hujjatlar",
          value: 2,
        },
        {
          title: "Ishlarni bajarishning umumiy jadvali",
          value: 3,
        },
        {
          title: "Moliyalashtirish jadvali",
          value: 4,
        },
      ],
      tab: {
        title: "Tender predmeti bo‘yicha ishlarni bajarishga narx taklifi",
        value: 1,
      },
      form: {},
      isInvoice: false,
      invoicedata: [],
    };
  },
  computed: {
    ...mapGetters('participant/tender', ['detail', 'loading','formLoading']),
  },
  methods: {
    ...mapActions('participant/tender', ['getDetail', 'postDetail']),
    submitFormEmit(form, tab) {
      this.form = { ...this.form, ...form };
      this.tab = this.tabs[tab - 1];
      console.log(this.form);
    },
    async finishAndSend(form) {
      this.$store.commit('participantTender/setState', { key: "formLoading", payload: true });
      this.form.tender = this.detail.id;
      this.form = { ...this.form, ...form };
      let f = new FormData()
      Object.keys(this.form).forEach((k) => {
        if (k == "collection_table_file" || k == "basic_prices_table_file" || k == "jobs_local_statements" || k == "project_design_file") {
          if (this.form[k] && this.form[k].file && this.form[k].file.extension) {
            console.log(this.form[k].file && this.form[k].file.extension)
          } else {
            this.form[k] && f.append(k, this.form[k], this.form[k] && this.form[k].name)
          }
        } else if (k == 'tender_statement' || k == 'project_finance_plan') {
          f.append(k, JSON.stringify(this.form[k]))
        } else {
          f.append(k, this.form[k])
        }
      })
      await this.postDetail({ form: f })
        .then((res) => {
          console.log(res)
          if (res.status >= 200 && res.status < 300) {
            this.isInvoice = true;
            this.invoicedata = res.data && res.data.participant_payment;
          }
          // this.$message.success('Harakat muvaffaqiyatli bajarildi')
          // this.$router.push({path:'/cabinet/participant/tenders'})
        })
        .catch(() => {
          this.$message.error('Xatolik')
        })
      this.$store.commit('participantTender/setState', { key: "formLoading", payload: false });
    },
    close() {
      this.isInvoice = false;
    },
  },
  async mounted() {
    await this.getDetail({ id: this.$route.params.id })
  },
};
</script>
