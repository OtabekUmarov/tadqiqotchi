<template>
  <layouts title="Tahrirlash">
    <template #body>
      <a-row type="flex" :gutter="[{xs: 16, sm: 16, xl: 20}, {xs: 16, sm: 16, xl: 20}]">
        <a-col span="24">
          <a-row type="flex">
            <a-col :sm="24" :xs="24" :xl="16">
              <a-form-item label="Korxona nomi">
                <a-input></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :sm="12" :xs="24">
          <a-form-item label="INN">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :sm="12" :xs="24">
          <a-form-item label="Shaxsiy hisobraqam">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :sm="12" :xs="24">
          <a-form-item label="MFO">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :sm="12" :xs="24">
          <a-form-item label="PINFL">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :sm="12" :xs="24">
          <a-form-item label="Elektron pochta">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :sm="12" :xs="24">
          <a-form-item label="Telefon raqam">
            <a-input></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-button type="primary" class="green mt-32" @click="$router.go(-1)">Saqlash</a-button>
    </template>
  </layouts>
</template>

<script>
export default {
  middleware: 'participant',

};
</script>
