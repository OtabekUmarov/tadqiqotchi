<template>
  <div>
    <h3 class="text-body1 blue1 mb-16">
      Lokal resurs (ish haqi, mashina va mexanizmlar hajmi vedomostlari)
    </h3>
    <a-row type="flex" :gutter="[0, 32]" class="mb-32">
      <a-col span="16">
        <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
        <CustomUploaderN3 
          @change="handleFile1"
          accept=".xlsx, .xls"
          example_name="Jamlanma jadvali"
          :example_url="detail.collection_table_file"
          />
      </a-col>
      <a-col span="16">
        <h3 class="text-body3 mb-8 black1">Ishlarning lokal vedemostlari</h3>
        <CustomUploaderN3 
          @change="handleFile2"
          accept=".xlsx, .xls"
          example_name="Ishlarning lokal vedemostlari"
          :example_url="detail.jobs_local_statements"
          />
      </a-col>
      <a-col span="16">
        <h3 class="text-body3 mb-8 black1">Asosiy narxni shakllantiruvchi komponentlarga narxlar jadvali</h3>
        <CustomUploaderN3 
          @change="handleFile3"
          accept=".xlsx, .xls"
          example_name="Asosiy narxni shakllantiruvchi komponentlarga narxlar jadvali"
          :example_url="detail.basic_prices_table_file"
          />
      </a-col>
      <a-col span="16">
        <h3 class="text-body3 mb-8 black1">Loyiha chizmasi</h3>
        <CustomUploaderN3 
          @change="handleFile4"
          example_name="Loyiha chizmasi"
          :example_url="detail.project_design_file"
        />
      </a-col>
    </a-row>
    <a-button type="primary" class="green" @click="send()"> Keyingi </a-button>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: {}
    },
  },
  data(){
    return {
      form:{
        collection_table_file: null,
        jobs_local_statements: null,
        basic_prices_table_file: null,
        project_design_file: null,
      }
    }
  },
  methods: {
    send(){
      this.$emit('submit', this.form,3)
    },
    handleFile1(file) {
      this.form.collection_table_file = file;
    },
    handleFile2(file) {
      this.form.jobs_local_statements = file;
    },
    handleFile3(file) {
      this.form.basic_prices_table_file = file;
    },
    handleFile4(file) {
      this.form.project_design_file = file;
    },
  },
}
</script>

<style>

</style>