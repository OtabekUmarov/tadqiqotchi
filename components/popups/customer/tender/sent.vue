<template>
  <popups-layout @close="close" title="Tasdiqlash" :isVisible="isVisible">
    <template #body>
      <div class="popup-application-sent-number mb-24 mt-16">
        <span class="text-body1 black2 mb-8">So‘rov lot raqami:</span>
        <small>1478457</small>
      </div>
      <a-button class="green" type="primary" @click="onSubmit">
        MinFinga yuborish</a-button
      >
    </template>
  </popups-layout>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSubmit() {
      this.close();
      this.$emit("submitted");
    },
  },
};
</script>

<style>
</style>