<template>
  <div class="search" :class="{ isFilter: isFilter }">
    <i class="icon-search2" @click="onSubmit"></i>
    <a-input placeholder="Izlash" class="text-body4"></a-input>
    <i class="icon-filter" @click="onFilter"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFilter: false,
    };
  },
  methods: {
    onFilter() {
      this.isFilter = !this.isFilter;
      this.$emit("onFilter");
    },
    onSubmit() {
      this.$emit("onSubmit");
    },
  },
};
</script>

<style>
</style>