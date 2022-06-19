<template>
  <div>
      <h3 class="text-body1 blue1 mb-16">
        Tender predmeti bo‘yicha ishlarni bajarishga narx taklifi
      </h3>
      <div class="table4">
        <table>
          <thead>
            <tr>
              <th>T/r</th>
              <th>Obyektning lokal vedmostlari bo‘yicha</th>
              <th>Ishlarni boshlash sanasi</th>
              <th>Ishlarni tugatish sanasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) of form.tender_statement" :key="item.id">
              <td>{{index + 1}}</td>
              <td>{{item.title}}</td>
              <td>
                <a-date-picker 
                  format="DD.MM.YYYY"
                  valueFormat="YYYY-MM-DD"
                  v-model="item.start_date"
                  placeholder="Tanlang">
                  <template #suffixIcon
                    ><i class="icon-calendar"></i
                  ></template>
                </a-date-picker>
              </td>
              <td>
                <a-date-picker 
                  format="DD.MM.YYYY"
                  valueFormat="YYYY-MM-DD"
                  v-model="item.end_date"
                  placeholder="Tanlang">
                  <template #suffixIcon
                    ><i class="icon-calendar"></i
                  ></template>
                </a-date-picker>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
			<span
        v-for="(item, index) in formError"
        :key="index"
				class="text-body3 red1"
      >{{item.error}}</span>
      <a-button type="primary" class="green mt-32" @click="send()"> Keyingi </a-button>
  </div>
</template>

<script>
export default {
  props: {
    statements: {
      type: Array,
      default() {
        return []
      } 
    },
  },
  data() {
    return {
      formError:[],
      form: {
        tender_statement: [],
      }
    }
  },
  methods: {
    send() {
			let confirm = false
			this.formError = []
      this.form.tender_statement.forEach((item) => {
				confirm = false
				if (new Date(item.start_date) > new Date(item.end_date)) {
          this.formError.push({error: `Vedemost - ${item.title}: boshlanish sana tugash sanasidan kichik bo'lishi kerak`})
					return
				} else if (!item.start_date) {
          this.formError.push({error: `Vedemost - ${item.title}: boshlanish sanalari bo‘sh bo‘lmasin`})
          return 
        } else if (!item.end_date) {
          this.formError.push({error: `Vedemost - ${item.title}: tugash sanalari bo‘sh bo‘lmasin`})
          return 
        } else { 
					if (this.formError.length <= 0) {
						confirm = true
					}
        }
      });
			console.log(this.formError)
      if (this.formError && this.formError.length <= 0 && confirm) {
        this.form.tender_statement.forEach((item) => {
          item.statement = item.id
          delete item.title
          delete item.id
        });
        this.$emit('submit', this.form, 4)
      } else {
        return
      }
    }
  },
  mounted () {
    this.form.tender_statement = JSON.parse(JSON.stringify(this.statements))
  },
}
</script>

<style>

</style>