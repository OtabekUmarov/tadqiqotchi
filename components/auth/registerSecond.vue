<template>
  <div class="auth-wrapper">
    <div class="auth-steps">
      <ul>
        <li class="active">
          <i class="icon-check"></i>
          <span>1-qadam</span>
        </li>
        <li class="progress">
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
      <div class="auth-radio first">
        <h5>Foydalanuvchi turi</h5>
        <a-row :gutter="[12, 12]">
          <a-col span="12">
            <label class="auth-radio-item large">
              <input v-model="form.user_type" value="a" type="radio" />
              <div class="auth-radio-item-block">
                <i></i>
                <span>Buyurtmachi</span>
              </div>
            </label>
          </a-col>
          <a-col span="12">
            <label class="auth-radio-item large">
              <input v-model="form.user_type" value="b" type="radio" />
              <div class="auth-radio-item-block">
                <i></i>
                <span>Tashkilotchi</span>
              </div>
            </label>
          </a-col>
          <a-col span="12">
            <label class="auth-radio-item large">
              <input v-model="form.user_type" value="c" type="radio" />
              <div class="auth-radio-item-block">
                <i></i>
                <span>Ishtirokchi</span>
              </div>
            </label>
          </a-col>
          <a-col span="12">
            <label class="auth-radio-item large">
              <input v-model="form.user_type" value="d" type="radio" />
              <div class="auth-radio-item-block">
                <i></i>
                <span>Buyurtmachi / Tashkilotchi</span>
              </div>
            </label>
          </a-col>
        </a-row>
      </div>
      <div class="auth-radio">
        <h5>Tashkilot turi</h5>
        <a-row :gutter="[12, 12]" type="flex" justify="center">
          <a-col span="12">
            <label class="auth-radio-item large">
              <input v-model="form.organization_type" value="a" type="radio" />
              <div class="auth-radio-item-block">
                <i></i>
                <span>Buyurtmachi</span>
              </div>
            </label>
          </a-col>
          <a-col span="12">
            <label class="auth-radio-item large">
              <input v-model="form.organization_type" value="b" type="radio" />
              <div class="auth-radio-item-block">
                <i></i>
                <span>Tashkilotchi</span>
              </div>
            </label>
          </a-col>
          <a-col span="12">
            <label class="auth-radio-item large">
              <input v-model="form.organization_type" value="c" type="radio" />
              <div class="auth-radio-item-block">
                <i></i>
                <span>Ishtirokchi</span>
              </div>
            </label>
          </a-col>
        </a-row>
      </div>
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
export default {
  data() {
    return {
      form: {
        user_type: "",
        organization_type: "",
      },
    };
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