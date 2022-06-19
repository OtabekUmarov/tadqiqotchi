<template>
  <div class="table3" v-if="detail.length">
    <table>
      <thead>
        <tr>
          <th rowspan="2">Moliyalashtirish shartlari</th>
          <th :colspan="detail.length">
            Tender predmeti bo‘yicha kalendar yil ichida
            moliyalashtirishning oyma-oy taqsimoti
          </th>
        </tr>
        <tr rowspan="1">
          <th class="nowrap" rowspan="1" colspan="1" v-for="(item, index) in fifteen"
            :key="index">
            {{  monthValue(item.date)}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>15% miqdorda bo'lak</td>
          <td v-for="(item, index) in fifteen" :key="index">
            <span class="nowrap">{{item.amount | priceFormat}}</span>
          </td>
        </tr>
        <tr>
          <td>80% miqdorda keyingi moliyalashtirish</td>
          <td v-for="(item, index) in eighty" :key="index">
              <span class="nowrap">{{item.amount | priceFormat}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import month from "@/constants/month";
  export default {
    props: {
      detail: {
        type: Array,
        default(){
          return []
        }
      },
    },
    data() {
      return {
        fifteen: [],
        eighty: [],
        month
      }
    },
    mounted(){
      this.fifteen = this.detail.filter(item => {
        return item.type == 'fifteen'
      })
      this.eighty = this.detail.filter(item => {
        return item.type == 'eighty'
      })
    },
    methods: {
      monthValue(value) {
        let year = value.split('-')[0]
        let res = value.split('-')[1]
        res = res - 1
        res = this.month && this.month[+res] && this.month[+res].title && this.month[+res].title[this.$i18n.locale]
        return res + ' ' + year
      },
    },
  }

</script>

<style>

</style>
