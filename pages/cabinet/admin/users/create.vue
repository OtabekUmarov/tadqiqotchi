<template>
  <layouts :isHeader="false">
    <template #body>
      <h2 class="title mb-32">Foydalanuvchi yaratish</h2>
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-row
          :gutter="[
            { xl: 20, sm: 16, xs: 8 },
            { xs: 8, sm: 16, xl: 16 },
          ]"
          type="flex"
          class="mb-20"
        >
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Ism">
              <a-input placeholder="Ismini kiriting" v-model="form.first_name">
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Familya">
              <a-input placeholder="Familyasini kiriting" v-model="form.last_name">
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Telefon raqami">
              <a-input
                type="number"
                placeholder="Telefon raqami"
                v-model="form.phone"
              >
              </a-input>
            </a-form-model-item>
          </a-col>
  
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item
              label="Foydalanuvchi roli"
              has-feedback
              prop="role"
            >
              <a-select v-model="form.role">
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
                <a-select-option
                  :value="item.value"
                  v-for="item in roles"
                  :key="item.value"
                  width="100%"
                >
                  {{ item.title && item.title[$i18n.locale] }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Login" has-feedback prop="username">
              <a-input placeholder="Loginni kiriting" v-model="form.username">
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Parol" has-feedback prop="password">
              <a-input
                type="password"
                placeholder="Parolni kiriting"
                v-model="form.password"
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Email">
              <a-input placeholder="Email kiriting" v-model="form.email">
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :sm="12" :xs="24">
            <a-form-model-item label="Manzil">
              <a-input placeholder="Manzilni kiriting" v-model="form.address">
              </a-input>
            </a-form-model-item>
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
  middleware: "admin",
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        role: null,
        password: "",
        username: "",
        phone: "",
        email: "",
        birth_date: "",
        address: "",
        img: null,
      },
      roles: [
        {
          id: 1,
          value: "supervisor",
          title: {
            ru: "Nazoratchi",
            uz: "Nazoratchi",
            en: "Supervisor",
          },
        },
        {
          id: 2,
          value: "advisor",
          title: {
            ru: "Ilmiy rahbar",
            uz: "Ilmiy rahbar",
            en: "Research advisor",
          },
        },
        {
          id: 3,
          value: "researcher",
          title: {
            ru: "Tadqiqotchi",
            uz: "Tadqiqotchi",
            en: "Researcher",
          },
        },
        {
          id: 4,
          value: "admin",
          title: {
            ru: "Admin",
            uz: "Admin",
            en: "Admin",
          },
        },
      ],
      rules: {
        role: [
          {
            required: true,
            trigger: "blur",
            message: "Ushbu maydon bo'sh bo'lmasligi kerak",
          },
        ],
        password: [
          {
            required: true,
            message: "Ushbu maydon bo'sh bo'lmasligi kerak",
            trigger: "blur",
          },
        ],
        login: [
          {
            required: true,
            message: "Ushbu maydon bo'sh bo'lmasligi kerak",
            trigger: "blur",
          },
        ],
      },
      pending: false,
    };
  },
  methods: {
    ...mapActions("admin/user", ["postDetail"]),
    handleChange(info) {
      this.form.img = info;
    },
    async submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.pending = true;
          let f = new FormData();
          Object.keys(this.form).forEach((k) => {
            if (k == "img") {
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
            this.$router.push("/cabinet/admin/users");
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
