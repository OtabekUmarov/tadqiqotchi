<template>
  <layouts title="Tahrirlash">
    <template #body>
      <a-row type="flex" :gutter="[20, 20]">
        <a-col span="24">
          <a-row type="flex">
            <a-col span="16">
              <a-form-item label="Korxona nomi">
                <a-input></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col span="8">
          <a-form-item label="INN">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Shaxsiy hisobraqam">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="MFO">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="PINFL">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Elektron pochta">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Telefon raqam">
            <a-input></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-button type="primary" class="green mt-32">Saqlash</a-button>
    </template>
  </layouts>
</template>

<script>
export default {
  middleware: 'organizer',

};
</script>
