<template>
  <div class="lang-switcher">
    <span ref="uz" v-for="item of list" :key="item.id" :class="{ active: isLang == item.value }"
      @click="onClickLang(item)">{{ item.title }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: 'UZ',
          value: 'uz',
          id: 1,
        },
        {
          title: 'OZ',
          value: 'oz',
          id: 2,
        },
        {
          title: 'RU',
          value: 'ru',
          id: 3,
        },
        {
          title: 'EN',
          value: 'en',
          id: 4,
        },
      ],
      isLang: 'uz',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit("changed", this.isLang);
    });
  },
  methods: {
    onClickLang(item) {
      this.isLang = item.value
      this.$emit("changed", item.value);
    },
  },
};
</script>

<style>
</style>