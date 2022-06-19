<template>
  <popups-layout @close="close" title="Tasdiqlash" :isVisible="isVisible">
    <template #body>
      <p class="text-body4 black2 mb-16">Kalitni kiriting</p>
      <a-form-item label="Kalit">
        <a-select v-model="key">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
          <a-select-option
            :value="item.id"
            v-for="item in keyList"
            :key="item.id"
            width="100%"
          >
            {{ item.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-button class="green" type="primary" @click="onSubmit">
        Tasdiqlash</a-button
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
    return {
      key: null,
      keyList: [
        {
          id: 1,
          title: "test1",
        },
        {
          id: 2,
          title: "test2",
        },
        {
          id: 3,
          title: "test3",
        },
      ],
    };
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