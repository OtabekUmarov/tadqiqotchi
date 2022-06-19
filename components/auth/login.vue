<template>
  <div class="auth-wrapper">
    <div class="auth-content">
      <h4 class="auth-title">Kirish</h4>
      <!-- <a-form-item label="Kalit">
        <a-select v-model="form.key">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
          <a-select-option
            :value="item.id"
            v-for="item in organizerList"
            :key="item.id"
            width="100%"
          >
            {{ item.title }}
          </a-select-option>

        </a-select>
      </a-form-item> -->
      <a-form-item label="Login">
        <a-input v-model="form.username" placeholder="Loginni kiriting">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Parol">
        <!-- <a-input v-model="form.password" type="password">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input> -->
        <a-input-password v-model="form.password" placeholder="Parolni kiriting" />
      </a-form-item>
      <a-form-item label="Rol">
        <a-select v-model="form.role">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
          <a-select-option :value="item.id" v-for="item in organizerList" :key="item.id" width="100%">
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <p style="text-align: center; color:red">{{ user_error }}</p>
      <a-button type="primary" class="green" @click="onFinish" :loading="pending">Kirish</a-button>
      <nuxt-link to="/login">ERI (ЭЦП) kalit olish</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      pending: false,
      organizerList: [
        {
          id: 'Participant',
          title: "Ishtirokchi",
        },
        {
          id: "Organizer",
          title: "Tashkilotchi",
        },
        {
          id: "Customer",
          title: "Buyurtmachi",
        },
        {
          id: "Moderator",
          title: "Moderator",
        },
        {
          id: 'Minfin_moderator',
          title: "MinFin moderator",
        },
      ],
      form: {
        // key: "",
        username: "",
        password: "",
        role: null,
      },
    };
  },
  computed: {
    ...mapGetters("auth", ["user_error"]),
  },

  methods: {
    ...mapActions("auth", ["login"]),
    async onFinish() {
      this.pending = true;
      if (this.form.role == null) {
        delete this.form.role;
      }
      await this.login(this.form).then((res) => {
        console.log(res);
      }).catch((err) => {
        if (err) {
          // this.$message.error("Parol yoki login nomi noto'g'ri");
          console.log("Parol yoki login nomi noto'g'ri");
        }
        console.log('login error', err);
      });
      this.pending = false;
    },
    handleChange(key, arg) {
      console.log(key, arg);
      this.form[arg] = arg;
    },
  },
};
</script>

<style>
</style>
