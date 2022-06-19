<template>
  <div>
    <!-- oy
    {{endMonth}}
    yil {{year}}
    <br>
    tender tugash sanasi {{endDate}}
    <br>
    yilning tugash sanasi {{yearEndDate}}
    <br>
    farqi 
    {{differenceDay}}
    ishtirokchi bergan kun
    <br>
    {{complete_days}}
    ishtirokchi summasi 
    {{participant_amount | priceFormat}}
    <br>
    15 % summa ||| {{fifteen_price | priceFormat}} <br>
    80 % summa ||| {{eighty_price | priceFormat}} -->
    <span v-if="differenceDay == 'error'" class="text-body3 red1">
      Moliyalashtirish jadvalini ko'rish uchun tender predmeti bo‘yicha ishlarni vaqt taklifini kiriting
    </span>
    <template v-else>
      <h3 class="text-body1 blue1 mb-16">Moliyalashtirish jadvali</h3>
      <!-- v-if="differenceDay == 'table1'" -->
      <template v-for="(item, index) in formError">
        <span :key="index" class="text-body3 red1" v-if="item.type == 'table1'" style="text-align: right;">{{ item.error
        }}</span>
      </template>
      <div class="table3 mb-24">
        <table>
          <thead>
            <tr>
              <th rowspan="2">Moliyalashtirish shartlari</th>
              <th colspan="12">
                Tender predmeti bo‘yicha 2022 kalendar yil ichida
                moliyalashtirishning oyma-oy taqsimoti
              </th>
            </tr>
            <tr rowspan="1">
              <th rowspan="1" colspan="1" v-for="(item, index) in project_finance_plan_fifteen" :key="index">
                {{ item.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15% miqdorda bo‘nak</td>
              <td v-for="(item, index) in project_finance_plan_fifteen" :key="index">
                <a-input-number class="ant-input__number"
                  :formatter="value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="value => value.replace(/\$\s?|( *)/g, '')" @blur="calculateMonth('fifteen', 'table1')"
                  v-model="item.amount">
                </a-input-number>
              </td>
            </tr>
            <tr>
              <td>80% miqdorda keyingi moliyalashtirish</td>
              <td v-for="(item, index) in project_finance_plan_eighty" :key="index">
                <a-input-number class="ant-input__number"
                  :formatter="value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="value => value.replace(/\$\s?|( *)/g, '')" @blur="calculateMonth('eighty', 'table1')"
                  v-model="item.amount"> </a-input-number>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="block-text grey mb-32">
        <span>{{ fivePrice }}</span>
      </div>
      <template v-for="(item, index) in formError">
        <span :key="index" class="text-body3 red1" v-if="item.type == 'table2'" style="text-align: right;">{{ item.error
        }}</span>
      </template>
      <div class="table3 mb-32" v-if="differenceDay == 'table2'">
        <table>
          <thead>
            <tr>
              <th rowspan="2">Moliyalashtirish shartlari</th>
              <th colspan="12">
                Tender predmeti bo‘yicha 2022 kalendar yil ichida
                moliyalashtirishning oyma-oy taqsimoti
              </th>
            </tr>
            <tr rowspan="1">
              <th rowspan="1" colspan="1" v-for="(item, index) in project_finance_plan_fifteen2" :key="index">
                {{ item.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15% miqdorda bo‘lak</td>
              <td v-for="(item, index) in project_finance_plan_fifteen2" :key="index">
                <a-input-number class="ant-input__number"
                  :formatter="value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="value => value.replace(/\$\s?|( *)/g, '')" @blur="calculateMonth('fifteen', 'table2')"
                  v-model="item.amount">
                </a-input-number>
              </td>
            </tr>
            <tr>
              <td>80% miqdorda keyingi moliyalashtirish</td>
              <td v-for="(item, index) in project_finance_plan_eighty2" :key="index">

                <a-input-number class="ant-input__number"
                  :formatter="value => value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                  :parser="value => value.replace(/\$\s?|( *)/g, '')" @blur="calculateMonth('eighty', 'table2')"
                  v-model="item.amount">
                </a-input-number>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <template v-for="(item, index) in formError">
        <span :key="index" class="text-body3 red1" v-if="item.type == 'error'">{{ item.error }}</span>
      </template>
      <a-button type="primary" :loading="formLoading"  :disabled="formError.length > 0" class="green" @click="send()">Yakunlash </a-button>
    </template>
  </div>
</template>

<script>
import month from "@/constants/month";
import { mapGetters } from "vuex";
export default {
  props: {
    endDate: {
      // tender tugash sanasi
      type: String,
      default: '2022-09-01'
    },
    complete_days: {
      // ishtirokchi bergan muddat
      type: Number,
      default: 0
    },
    participant_amount: {
      // ishtirokchi bergan narh
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters('participant/tender', ['formLoading']),
    endMonth() {
      return +this.endDate.split('-')[1]
    },
    year() {
      return +this.endDate.split('-')[0]
    },
    yearEndDate() {
      return this.year + '-12-31'
    },
    differenceDay() {
      if (!this.complete_days) {
        console.log(this.complete_days)
        return 'error'
      }
      let date1 = new Date(this.yearEndDate);
      let date2 = new Date(this.endDate);
      let difference = this.dateDiffInDays(date1, date2);
      return difference < this.complete_days ? 'table2' : 'table1';
    },
    finance_list() {
      return this.project_finance_plan_fifteen.concat(this.project_finance_plan_eighty, this.project_finance_plan_fifteen2, this.project_finance_plan_eighty2)
    },
    fivePrice() {
      let year = +this.endDate.split('-')[0];
      let month = +this.endDate.split('-')[1];
      month = this.month[month - 1];
      let title = {
        uz: `5% miqdoridagi pulni ${year + 1} yil ${month && month.title && month.title[this.$i18n.locale]} oyida olasiz`,
        oz: `5% miqdoridagi pulni ${year + 1} yil ${month && month.title && month.title[this.$i18n.locale]} oyida olasiz`,
        ru: `5% miqdoridagi pulni ${year + 1} yil ${month && month.title && month.title[this.$i18n.locale]} oyida olasiz`,
        en: `5% miqdoridagi pulni ${year + 1} yil ${month && month.title && month.title[this.$i18n.locale]} oyida olasiz`,
      }
      return title[this.$i18n.locale];
    }
  },
  data() {
    return {
      formError: [{}],
      form: {
        project_finance_plan: [],
      },
      project_finance_plan_fifteen: [],
      project_finance_plan_eighty: [],
      project_finance_plan_fifteen2: [],
      project_finance_plan_eighty2: [],
      month,
      fifteen_price: 0,
      eighty_price: 0,
    }
  },
  mounted() {
    this.fifteen_price = this.participant_amount * 0.15;
    this.eighty_price = this.participant_amount * 0.8;
    let month = JSON.parse(JSON.stringify(this.month))
    let startMonth = month.splice(this.endMonth - 1, 12)
    // if (this.differenceDay == 'table1') {
    this.project_finance_plan_fifteen = startMonth.map(item => {
      return {
        date: `${this.year}` + '-' + `${item.value}` + '-' + '01',
        amount: 0,
        title: item.title && item.title[this.$i18n.locale],
        type: 'fifteen',
      }
    })
    this.project_finance_plan_eighty = startMonth.map(item => {
      return {
        date: `${this.year}` + '-' + `${item.value}` + '-' + '01',
        amount: 0,
        type: 'eighty',
      }
    })
    // }
    if (this.differenceDay == 'table2') {
      this.project_finance_plan_fifteen2 = this.month.map(item => {
        return {
          date: `${this.year + 1}` + '-' + `${item.value}` + '-' + '01',
          amount: 0,
          title: item.title && item.title[this.$i18n.locale],
          type: 'fifteen',
        }
      })
      this.project_finance_plan_eighty2 = this.month.map(item => {
        return {
          date: `${this.year + 1}` + '-' + `${item.value}` + '-' + '01',
          amount: 0,
          title: item.title && item.title[this.$i18n.locale],
          type: 'eighty',
        }
      })
    }
  },
  methods: {
    send() {
      this.senConfirm()
      if (!this.formError.length) {
        this.form.project_finance_plan = this.project_finance_plan_fifteen.concat(this.project_finance_plan_eighty, this.project_finance_plan_fifteen2, this.project_finance_plan_eighty2)
        this.form.project_finance_plan.forEach(item => {
          item.amount = item.amount ? item.amount : 0
          delete item.title
        })
        console.log('finish')
        this.$emit('finish', this.form)
      }
    },
    dateDiffInDays(a, b) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    },
    senConfirm() {
      this.formError = [];
      let summaFifteen = 0;
      let summaEighty = 0;
      this.finance_list.forEach(item => {
        if (item.type == 'fifteen') {
          summaFifteen += +item.amount;
        } else summaEighty += +item.amount;
      })
      if (this.fifteen_price != summaFifteen) {
        this.formError.push({
          type: 'error',
          error: "Sizning kiritayotgan summa 15% miqdoridagi bo'lakka teng bo'lishi kerak"
        })
        return false
      } else if (this.eighty_price != summaEighty) {
        this.formError.push({
          type: 'error',
          error: "Sizning kiritayotgan summa 80% miqdoridagi bo'lakka teng bo'lishi kerak"
        })
        return false
      } else {
        return true
      }
    },
    calculateMonth(type, table) {
      let summa = 0;
      console.log(this.fifteen_price)
      this.formError = [];
      console.log(this.finance_list)
      this.finance_list.forEach(item => {
        if (item.type == type) {
          summa += +item.amount
        }
      })
      this.writing_summa = summa
      if (summa > this.fifteen_price && type == 'fifteen') {
        this.formError.push({
          type: table,
          error: '15% miqdorda bo‘laklarning narxi umumiy summaning 15% dan katta bo‘lmasligi kerak'
        })
        return false
      } else if (summa > this.eighty_price && type == 'eighty') {
        this.formError.push({
          type: table,
          error: '80% miqdorda keyingi moliyalashtirishning narxi umumiy summaning 80% dan katta bo‘lmasligi kerak'
        })
        return false
      } else {
        console.log("Ok")
        return true
      }
    }
  },
}
</script>

<style>
</style>