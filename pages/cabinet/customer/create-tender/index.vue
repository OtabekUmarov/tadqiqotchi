<template>
  <layouts :isHeader="false">
    <template #body>
      <h2 class="title mb-8">Tender yaratish</h2>
      <h3 class="text-body4 black2 mb-24">
        Tender yaratish uchun quyidagi ma’lumotlarni kiriting
      </h3>
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-row :gutter="[{ xl: 20, sm: 16, xs: 8 }, { xs: 8, sm: 16, xl: 16 }]" type="flex" class="mb-20">
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Tashkilotchi" has-feedback prop="organizer">
              <a-select v-model="form.organizer" show-search option-filter-prop="children" width="100%"
                :filter-option="filterOption" @change="handleChange" dropdownClassName="ant-select-pagination"
                class="ant-select-pagination-dropdown">
                <template #suffixIcon> <i class="icon-angle-down"></i></template>
                <a-select-option :value="item.id" v-for="item in organizerList" :key="item.id">
                  <span> {{ item.organization_name }} </span>
                  <div class="ant-select-pagination-buttons" v-if="params.offset > count">
                    <button @click.stop="onPaginate"> <small>Yana ko'rish</small><i
                        class="icon-angle-down"></i></button>
                    <button @click.stop="clearPaginate"> <small>Tozalash</small><i class="icon-bin"></i></button>
                  </div>
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Shaxsiy hisobvaraq" has-feedback prop="account_number">
              <a-input type="number" v-model="form.account_number">
              </a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item prop="payment_source" class="mb-32">
          <a-row :gutter="[{ xl: 20, sm: 16, xs: 8 }, { xs: 8, sm: 16, xl: 16 }]" type="flex">
            <a-col>
              <CustomRadio v-model="form.payment_source" label="Davlat byudjeti" value="state_budget" />
            </a-col>
            <a-col>
              <CustomRadio v-model="form.payment_source" label="Korporativ mablag‘lar " value="corparate_funds" />
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-form-model>
      <a-button class="green" type="primary" @click="submitForm" :loading="pending">
        {{ form.payment_source == "corparate_funds" ? "Hujjat to'ldirishga yuborish" : 'MinFinga yuborish' }}
      </a-button>
      <!-- <PopupsCustomerTenderConfirm :isVisible="isConfirm" @close="closeConfirm" @submitted="openSent" />
      <PopupsCustomerTenderSent :isVisible="isSent" @close="closeSent" /> -->
    </template>
  </layouts>
</template>

<script>
import { mapActions } from "vuex"
export default {
  middleware: "customer",
  data() {
    return {
      form: {
        organizer: null,
        account_number: '',
        payment_source: null,
      },
      rules: {
        organizer: [{ required: true, trigger: 'blur', message: "Ushbu maydon bo'sh bo'lmasligi kerak" }],
        account_number: [{ required: true, message: "Ushbu maydon bo'sh bo'lmasligi kerak", trigger: 'blur' }],
        payment_source: [{ required: true, message: "Iltimos tanlang", trigger: 'blur' }],
      },
      accountList: [],
      organizerList: [],
      isConfirm: false,
      isSent: false,
      pagination: {
        limit: 10,
        offset: 0,
        page: 1,
        search: '',
      },
      count: 0,
      pending: false,
    };
  },
  computed: {
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
        search: this.pagination.search
      }
      return params
    }
  },
  methods: {
    ...mapActions("customer/tender", ["postDetail", "getOrganizerList"]),
    openConfirm() {
      this.isConfirm = true;
    },
    closeConfirm() {
      this.isConfirm = false;
    },
    openSent() {
      this.isSent = true;
    },
    closeSent() {
      this.isSent = false;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    async clearPaginate() {
      this.pagination.limit = 10
      this.pagination.offset = 0
      this.pagination.page = 1
      this.pagination.search = ""
      await this.fetchOrganizerListSearch()

    },
    async filterOption(input, option) {
      if (input != this.pagination.search) {
        this.pagination.search = input
        await this.fetchOrganizerListSearch()
      }
      return (
        option.componentOptions.children[0].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    clearForm() {
      this.form.organizer = null
      this.form.organizer = ''
      this.form.organizer = ''
    },
    async searchFetch(value) {
      this.pagination.search = value
      await this.fetchOrganizerListSearch()
    },
    async onPaginate() {
      this.pagination.page += 1;
      await this.fetchOrganizerList()

    },
    async submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.pending = true
          await this.postDetail({ form: this.form });
          this.clearForm();
          this.$router.push('/cabinet/customer/applications')
          this.pending = false;
          this.$message.success(
            'Tender muvaffaqiyatli yaratildi.', 10,
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    async fetchOrganizerList() {
      const { results, count } = await this.getOrganizerList({ params: this.params })
      this.count = count
      this.organizerList = this.organizerList.concat(results)
    },
    async fetchOrganizerListSearch() {
      const { results, count } = await this.getOrganizerList({ params: this.params })
      this.count = count
      this.organizerList = results
    }
  },
  async mounted() {
    await this.fetchOrganizerList()
  }

};
</script>
