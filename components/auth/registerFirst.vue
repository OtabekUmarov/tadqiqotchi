<template>
  <div class="auth-wrapper">
    <div class="auth-steps">
      <ul>
        <li class="progress">
          <i class="icon-check"></i>
          <span>1-qadam</span>
        </li>
        <li>
          <i class="icon-check"></i>
          <span>2-qadam</span>
        </li>
        <li>
          <i class="icon-check"></i>
          <span>3-qadam</span>
        </li>
      </ul>
    </div>
    <div class="auth-content">
      <h4 class="auth-title">Ro‘yhatdan o‘tish</h4>
      <a-form-item label="ERI (ЭЦП)">
        <a-select v-model="form.eds">
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
      <a-form-item label="INN">
        <a-input v-model.number="form.inn" type="number"  placeholder="INN raqami"></a-input>
      </a-form-item>
      <a-form-item label="Tashkilot">
        <a-input
          v-model="form.organization_name"
          placeholder="Tashkilot nomi"
        ></a-input>
      </a-form-item>
      <a-button @click="onSubmit" type="primary" class="green">Keyingisi</a-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
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
      form: {
        eds: "",
        inn: "",
        organization_name: "",
      },
    };
  },
  computed: {
    ...mapGetters('register', ['eriList'])
  },
  methods: {
    onSubmit() {
      this.$emit("submitted", this.form);
    },
  },

};
</script>

<style>
</style>