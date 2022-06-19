<template>
  <popups-layout
    Width="500px"
    @close="close"
    title="Rad etish"
    :isVisible="isVisible"
    :isFooter="true"
  >
    <template #body>
      <div class="popup-uploader mb-20">
        <label for="file">
          <input type="file" id="file" />
          <span>Fayl yuklash</span>
          <div class="popup-uploader-block">
            <h3 class="text-body3">
              Click or drag file to this area to upload
            </h3>
            <span>Fayl yuklang</span>
          </div>
        </label>
      </div>
      <a-form-item label="Izoh" class="mb-0">
        <a-textarea placeholder="Basic usage" :rows="4" />
      </a-form-item>
    </template>
    <template #footer>
      <a-row :gutter="[20, 0]">
        <a-col span="12">
          <a-button class="grey" type="primary" @click="close">
            Orqaga
          </a-button>
        </a-col>
        <a-col span="12">
          <a-button class="green" type="primary" @click="submit">
            Yuborish
          </a-button>
        </a-col>
      </a-row>
    </template>
  </popups-layout>
</template>

<script>
export default {
  props: {
    id: Number,
    isVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$message.success("Harakat muvaffaqiyatli bajarildi");
      this.close();
    },
  },
};
</script>

<style>
</style>