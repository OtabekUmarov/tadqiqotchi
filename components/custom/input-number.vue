<template>
  <div class="custom-input__number" :class="position">
    <template v-if="addon">
      <div class="custom-number__addon" v-if="position == 'left'">
        <span> {{ addon }} </span>
      </div></template
    >
    <a-input-number
      :formatter="(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
      :parser="(value) => value.replace(/\$\s?|( *)/g, '')"
      @input="handleInput($event)"
    >
    </a-input-number>
    <template v-if="addon">
      <div class="custom-number__addon" v-if="position == 'right'">
        <span> {{ addon }} </span>
      </div>
      <!-- <a-form-model-item label="Narx taklifi" has-feedback prop="amount">
        <CustomInputNumber
          v-model="form.amount"
          position="right"
          addon="So'm"
        />
      </a-form-model-item> -->
    </template>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: "left",
    },
    addon: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e && e.target && e.target.value);
    },
  },
};
</script>

<style></style>
