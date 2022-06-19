<template>
  <a-modal
    v-model="isVisible"
    :title="title"
    :centered="centered"
    :width="Width"
    @ok="submit"
    @cancel="close"
    :footer="null"
    :maskClosable="false"
    :wrapClassName="wrapClassName"
    
  >
    <template #closeIcon>
      <i @click.stop="close" class="icon-close"></i>
    </template>
    <div class="popup-body">
      <slot name="body"> </slot>
    </div>
    <div class="popup-footer" v-if="isFooter">
      <slot name="footer"> </slot>
    </div>
  </a-modal>
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
    title: {
      type: String,
      default() {
        return null;
      },
    },
    Width: {
      type: String,
      default() {
        return "400px";
      },
    },
    isFooter: {
      type: Boolean,
      default() {
        return false;
      },
    },
    wrapClassName: {
      type: String,
      default() {
        return ""
      }
    },
    centered: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style>
</style>