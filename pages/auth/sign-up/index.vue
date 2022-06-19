<template>
  <div class="pages-wrapper auth">
    <AuthRegisterFirst v-if="step == 1" @submitted="submitFirst" />
    <AuthRegisterSecond v-else-if="step == 2" @cancelled="cancelSecond" @submitted="submitSecond" />
    <AuthRegisterThird v-else @cancelled="cancelThird" @submitted="submitThird" />
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  layout: 'auth',
  data() {
    return {
      step: 1,
      form: {
        
      }
    };
  },
  methods: {
    ...mapActions("register", ["getRegionList"]),
    submitFirst(form) {
      this.form = {...this.form, ...form};
      this.step = 2;
    },
    cancelSecond() {
      this.step = 1;
    },
    submitSecond(form) {
      this.form = {...this.form, ...form};
      this.step = 3;
    },
    cancelThird() {
      this.step = 2;
    },
    submitThird(form) {
      this.form = {...this.form, ...form};
      console.log(this.form);
      this.$message.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz");
      this.$router.push({
        path: '/'
      })
    },
  },
  async mounted () {
    await this.getRegionList()
  },
};
</script>

<style>
</style>