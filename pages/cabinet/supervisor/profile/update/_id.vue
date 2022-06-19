<template>
  <layouts title="Shahsiy ma'lumotlarni o'zgartirish">
    <template #headerItems>
    </template>
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <a-row
          :gutter="[
            { xl: 20, sm: 16, xs: 8 },
            { xs: 8, sm: 16, xl: 16 },
          ]"
          type="flex"
          class="mb-20"
        >
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-item label="Ism">
              <a-input placeholder="Ismini kiriting" v-model="form.first_name">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-item label="Familya">
              <a-input placeholder="Familyasini kiriting" v-model="form.last_name">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-item label="Telefon raqami">
              <a-input
                type="number"
                placeholder="Telefon raqami"
                v-model="form.phone"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-item label="Email">
              <a-input placeholder="Email kiriting" v-model="form.email">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-item label="Manzil">
              <a-input placeholder="Manzilni kiriting" v-model="form.address">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-item label="Tug'ilgan sana">
              <a-date-picker
                format="DD.MM.YYYY"
                valueFormat="YYYY-MM-DD"
                v-model="form.birth_date"
                placeholder="Tug'ilgan sana"
              >
                <template #suffixIcon><i class="icon-calendar"></i></template>
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :lg="16" :xs="24" class="mb-24">
            <a-form-item class="my" label="Rasm yuklang">
              <CustomUploaderN1 accept="image/*" @change="handleChange" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-button
        class="green"
        type="primary"
        @click="submitForm"
        :loading="pending"
      >
        Saqlash
      </a-button>
      </template>
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  middleware: 'supervisor',
  data() {
    return {
      form: {},
      pending: false,
      img: null
    };
  },
  computed: {
    ...mapGetters('profile', ['detail', 'loading']),
  },
  methods: {
    ...mapActions("profile", ["getDetail", "postDetail"]),
    async fetchDetail() {
      await this.getDetail()
    },
    handleChange(info) {
      this.form.image = info;
    },
    async submitForm() {
      this.pending = true;
      let f = new FormData();
      Object.keys(this.form).forEach((k) => {
        if (k == "image") {
          if (
            this.form[k] &&
            this.form[k].file &&
            this.form[k].file.extension
          ) {
            console.log(
              this.form[k] &&
                this.form[k].file &&
                this.form[k].file.extension
            );
          } else {
            this.form[k] && f.append(k, this.form[k], this.form[k].name);
          }
        } else {
          f.append(k, this.form[k]);
        }
      });
      let res = await this.postDetail({ form: f, id: this.detail.id });
      if (res.status >= 200 && res.status < 300) {
        this.$message.success("Muvaffaqiyatli yaratildi.", 10);
        this.pending = false;
        this.$router.push("/cabinet/supervisor/profile");
      } else {
        this.$message.error("Xatolik", 10);
        this.pending = false;
      }
    },
  },
  async mounted() {
    await this.fetchDetail();
    this.form = JSON.parse(JSON.stringify(this.detail))
    this.img = this.form.image
    delete this.form.image

  },
};
</script>

<style>
.my .ant-form-item-children {
  display: block !important;
}</style>