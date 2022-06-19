<template>
  <label class="custom-radio">
    <input
      type="radio"
      :checked="isChecked"
      :value="value"
      @change="$emit('change', $event.target.value)"
    />
    <div class="custom-radio-block">
      <i></i>
      <span>{{ label }}</span>
    </div>
  </label>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    label: { type: String, default: "", required: true },
    modelValue: { default: "" },
    value: { type: String, default: undefined },
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value;
    },
  },
};
</script>

<style>
</style>