<template>
  <a-collapse v-model="activeKey" class="filter">
    <a-collapse-panel key="1" ref="my">
      <div class="filter-row">
        <div class="filter-col1">
          <a-form-item label="Lot raqami">
            <a-input placeholder="Yozing"></a-input>
          </a-form-item>
        </div>
        <div class="filter-col1">
          <a-form-item label="Shaxsiy hisobvaraq">
            <a-input placeholder="Yozing"></a-input>
          </a-form-item>
        </div>
        <div class="filter-col1">
          <a-form-item label="Yuborilgan sana">
            <a-date-picker placeholder="Yozing">
              <template #suffixIcon><i class="icon-calendar"></i></template>
            </a-date-picker>
          </a-form-item>
        </div>
        <div class="filter-col1">
          <a-form-item label="Lot raqami">
            <a-select>
              <template #suffixIcon><i class="icon-angle-down"></i></template>
            </a-select>
          </a-form-item>
        </div>
        <div class="filter-col2">
          <a-button type="primary" class="blue">
            <i class="icon-search2"></i>
            Izlash</a-button
          >
        </div>
        <div class="filter-col2">
          <a-button type="primary" class="grey">
            <i class="icon-rubbish"></i>
            Tozalash</a-button
          >
        </div>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
export default {
  props: {
    isFilter: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      activeKey: [],
    };
  },
  methods: {
    custom() {
      this.activeKey.push("1");
    },
  },
  watch: {
    isFilter(val) {
      if (val) {
        this.activeKey.push("1");
      } else {
        this.activeKey = [];
      }
    },
  },
};
</script>

<style>
</style>