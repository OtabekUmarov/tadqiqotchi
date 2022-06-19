<template>
  <div class="auth-wrapper">
    <div class="auth-steps">
      <ul>
        <li class="active">
          <i class="icon-check"></i>
          <span>1-qadam</span>
        </li>
        <li class="active">
          <i class="icon-check"></i>
          <span>2-qadam</span>
        </li>
        <li class="progress">
          <i class="icon-check"></i>
          <span>3-qadam</span>
        </li>
      </ul>
    </div>
    <div class="auth-content">
      <h4 class="auth-title">Ro‘yhatdan o‘tish</h4>
      <a-form-item label="Hudud">
        <a-select v-model="form.region">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
          <a-select-option
            :value="item.id"
            v-for="item in regionList"
            :key="item.id"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Tuman/Shahar">
        <a-select v-model="form.district">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
          <a-select-option
            :value="item.id"
            v-for="item in organizerList"
            :key="item.id"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="MFO">
        <a-input v-model="form.bank_number">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Hisob raqami">
        <a-input v-model="form.account_number">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Elektron pochta">
        <a-input v-model="form.email">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Telefon">
        <a-input v-model="form.phone">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Manzil">
        <a-input v-model="form.address">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Login">
        <a-input v-model="form.username">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <a-form-item label="Parol">
        <a-input v-model="form.password">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
        </a-input>
      </a-form-item>
      <div class="auth-footer">
        <a-button type="primary" class="grey" @click="onCancel">Ortga</a-button>
        <a-button type="primary" class="green" @click="onSubmit"
          >Keyingisi</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      form: {
        region: "",
        district: "",
        bank_number: "",
        account_number: "",
        email: "",
        phone: "",
        address: "",
        username: "",
        password: ""
      },
      organizerList: [
        {
          id: 1,
          title: "ЭЦП1",
        },
        {
          id: 2,
          title: "ЭЦП2",
        },
        {
          id: 3,
          title: "ЭЦП3",
        },
      ],
    };
  },
  computed: {
    ...mapGetters('register',["regionList"]),
  },
  methods: {
    onCancel() {
      this.$emit("cancelled");
    },
    onSubmit() {
      this.$emit("submitted", this.form);
    },
  },
};
</script>

<style>
</style>