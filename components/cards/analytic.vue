<template>
  <div class="card-analytic">
    <span>
      {{ data.label }}
    </span>
    <h3>{{ data.title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
</style>