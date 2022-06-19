<template>
  <div class="card payment-card">
    <div class="card-header">
      <div class="block-text green">
        <span>Reyting D</span>
        <i class="icon-question"></i>
      </div>
      <a class="link-a" @click.prevent="$router.push({})">
        <span
          @click="
            $router.push({
              path: data.path,
            })
          "
        >
          Batafsil
        </span>
        <i class="icon-angle-right"></i>
      </a>
    </div>
    <div class="card-body">
      <a-row type="flex" :gutter="[20, 12]">
        <a-col span="24">
          <p class="text-caption black3">Lot raqami:</p>
          <h3 class="text-body1 black1">22411006008417</h3>
        </a-col>
        <a-col span="12">
          <p class="text-caption black3">Summa:</p>
          <h3 class="text-body1 black1">221 876 668 UZS</h3>
        </a-col>
        <a-col span="12">
          <p class="text-caption black3">To'lov turi:</p>
          <h3 class="text-body1 black1">Xavfsizlik kafolatini taklif qilish</h3>
        </a-col>
      </a-row>
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

<style>
</style>