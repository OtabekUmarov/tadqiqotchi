<template>
  <perfect-scrollbar class="pages">
    <div class="pages-wrapper">
      <div class="pages-header" v-if="isHeader">
        <h2 class="title">{{ title }}</h2>
        <slot name="headerItems"></slot>
      </div>

      <div class="pages-body">
        <slot name="body"></slot>
      </div>
      <div class="pages-footer" v-if="isFooter">
        <slot name="footer"> </slot>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "First title";
      },
    },
    isFooter: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isHeader: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
};
</script>

<style>
</style>