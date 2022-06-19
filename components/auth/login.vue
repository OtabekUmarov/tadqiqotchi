<template>
  <div class="auth-wrapper">
    <div class="auth-content">
      <h4 class="auth-title">Kirish</h4>
      <a-form-item label="Login">
        <a-input v-model="form.username" placeholder="Loginni kiriting">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Parol">
        <a-input-password v-model="form.password" placeholder="Parolni kiriting" />
      </a-form-item>
      <p style="text-align: center; color:red">{{ user_error }}</p>
      <a-button type="primary" class="green" @click="onFinish" :loading="pending">Kirish</a-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      pending: false,
      form: {
        username: "",
        password: "",
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
          console.log("Parol yoki login nomi noto'g'ri");
        }
        console.log('login error', err);
      });
      this.pending = false;
    },
  },
};
</script>

<style>
</style>
