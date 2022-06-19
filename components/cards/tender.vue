<template>
  <div
    class="card tender-card"
    @click="
      $router.push({
        path: data.path,
      })
    "
  >
    <div class="card-header">
      <h4 class="text-body3 black1">{{ data.number }}</h4>
      <small
        :class="['status', `_${data.status.id}`]"
        v-html="data.status.title"
      >
      </small>
    </div>
    <div class="card-body">
      <span class="text-caption black3"> Tender nomi </span>
      <h3 class="text-body1 black1">{{ data.title }}</h3>
    </div>
    <div class="card-footer">
      <ul>
        <li>
          <span class="text-caption black3"> Yaratilgan sana </span>
          <h4 class="text-body3 black1">{{ data.createdDate }}</h4>
        </li>
        <li>
          <span class="text-caption black3"> Boshlanish sana</span>
          <h4 class="text-body3 black1">{{ data.startedDate }}</h4>
        </li>
      </ul>
      <a-button type="primary" class="green _32" v-if="data.status.id == 7">
        Shartnoma yuklash
      </a-button>
      <!-- <nuxt-link to="">Batafsil <i class="icon-angle-right"></i></nuxt-link> -->
    </div>
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

<style scoped>
</style>