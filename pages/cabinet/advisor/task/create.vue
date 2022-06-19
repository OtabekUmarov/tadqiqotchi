<template>
  <layouts :isHeader="false">
    <template #body>
      <h2 class="title mb-32">Yaratish</h2>
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-row
          :gutter="[
            { xl: 20, sm: 16, xs: 8 },
            { xs: 8, sm: 16, xl: 16 },
          ]"
          type="flex"
          class="mb-20"
        >
          <a-col :lg="16" :sm="16" :xs="24">
            <a-form-model-item label="Nomini kiriting" has-feedback prop="title">
              <a-input placeholder="Nomini kiriting" v-model="form.title">
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="8" :xs="24">
            <a-form-item label="Vaqti">
              <a-date-picker
                format="DD.MM.YYYY"
                valueFormat="YYYY-MM-DD"
                v-model="form.exam_date"
                placeholder="Vaqtni kiriting"
              >
                <template #suffixIcon><i class="icon-calendar"></i></template>
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col :lg="16" :sm="24" :xs="24">
             <a-form-item label="Qo‘shimcha ma’lumot">
                <a-textarea v-model="form.description" style="min-height: 150px" placeholder="Yozing">
                </a-textarea>
              </a-form-item>
          </a-col>
          <a-col :sm="24" :lg="16" :xs="24" class="mb-24">
            <a-form-item class="my" label="Fayl yuklang">
              <CustomUploaderN1 @change="handleChange" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-model>
      <a-button
        class="green"
        type="primary"
        @click="submitForm"
        :loading="pending"
      >
        Saqlash
      </a-button>
    </template>
  </layouts>
</template>
<script>
import { mapActions } from "vuex";
export default {
  middleware: "advisor",
  data() {
    return {
      form: {
        title: "",
        description: "",
        exam_date: "",
        file: null,
      },
      rules: {
        title: [
          {
            required: true,
            trigger: "blur",
            message: "Ushbu maydon bo'sh bo'lmasligi kerak",
          },
        ],
      },
      pending: false,
    };
  },
  methods: {
    ...mapActions("advisor/task", ["postDetail"]),
    handleChange(info) {
      this.form.file = info;
    },
    async submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.pending = true;
          let f = new FormData();
          Object.keys(this.form).forEach((k) => {
            if (k == "file") {
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
          let res = await this.postDetail({ form: f });
          if (res.status >= 200 && res.status < 300) {
            this.$message.success("Muvaffaqiyatli yaratildi.", 10);
            this.pending = false;
            this.$router.push("/cabinet/advisor/task");
          } else {
            this.$message.error("Xatolik", 10);
            this.pending = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async mounted() {},
};
</script>
<style>
.my .ant-form-item-children {
  display: block !important;
}
</style>
