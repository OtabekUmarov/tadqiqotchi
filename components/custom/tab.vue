<template>
  <perfect-scrollbar class="tab">
    <a-button
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ active: item.value == tab.value }"
      @click="$emit('change', item)"
    >
      {{ item.title && item.title[$i18n.locale] || item.title }}
      <!-- <small class="tab-count" v-if="count"> {{ count }} </small> -->
    </a-button>
  </perfect-scrollbar>
</template>

<script>
export default {
  model: {
    event: "change",
    prop: "tab",
  },
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    count: {
      type: Number,
      default() {
        return 0;
      },
    },
    tab: {
      type: Object,
      default() {
        return {
          title: "",
          value: 0,
        };
      },
    },
  },
};
</script>

<style>
</style>