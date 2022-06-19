<template>
  <div class="pagination">
    <div class="pagination-limit" v-if="countLimit">
      <a-dropdown>
        <a-button class="_32 counter">
          {{ currentLimit }}
          <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item, index) in limits" :key="index" @click="changeLimit(item)">
            {{ item }}
          </a-menu-item>
        </a-menu>

      </a-dropdown>
    </div>
    <div class="pagination-controls" v-if="count">
      <button :disabled="!currentPage || (currentPage == 1)" @click="prev" class="pagination-item">&lt;</button>
      <template v-for="item in allPages">
        <button :key="item" @click="clickBtn(item)" :disabled="currentPage == item" class="pagination-item"
          :class="{ active: currentPage == item }"
          v-if="item == 1 || item == allPages || (+currentPage - 2 <= item && +currentPage + 2 >= item)">{{ item
          }}</button>
        <button :key="item + '1'" class="pagination-item" disabled="ture"
          v-else-if="(currentPage + 2 < item && currentPage + 3 >= item) || (currentPage - 2 > item && currentPage - 3 <= item)">...</button>
      </template>
      <button :disabled="!currentPage || currentPage >= allPages" @click="next" class="pagination-item">&gt;</button>
    </div>
    <div class="pagination-info">
      <span class="text-body3 black1">Jami: {{ count }}</span>
    </div>
    <!-- <button :disabled="!currentPage || (currentPage == 1)" @click="currentPage--"> prev </button>
        <input type="number" min="1" v-model="currentPage">
        <button :disabled="!currentPage || currentPage >= allPages" @click="currentPage++"> next </button>
        <p>All pages: {{ allPages }}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: [String, Number],
      default() {
        return 1
      }
    },
    limit: {
      type: [String, Number],
      default() {
        return 1
      }
    },
    page: {
      type: [String, Number],
      default() {
        return 1
      }
    },
    countLimit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: 1,
      limits: ['10', '15', '20'],
      currentLimit: '10'
    }
  },
  computed: {
    allPages() {
      return Math.ceil(this.count / this.limit)
    }
  },
  mounted() {
    this.currentPage = this.page
    this.currentLimit = this.limit + ''
  },
  methods: {
    changeLimit(val) {
      this.currentLimit = val;
      this.$emit('onChangeLimit', this.currentLimit);
      this.currentPage = 1;
    },
    next() {
      this.currentPage++
      (this.currentPage <= this.allPages) && this.$emit('paginate', this.currentPage)
    },
    prev() {
      this.currentPage--
      (this.currentPage <= this.allPages) && this.$emit('paginate', this.currentPage)
    },
    clickBtn(arg) {
      if (arg <= this.allPages) {
        this.currentPage = arg
        this.$emit('paginate', arg)
      }
    }
  }
}
</script>

<style scoped>
</style>
