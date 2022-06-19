<template>
  <layouts-n1>
    <a-button
      type="primary"
      class="white _44 mb-16"
      :class="{ active: isActive }"
      @click="toggleActive"
    >
      Avtomobil yo‘llari va mostlar
    </a-button>
    <div class="content-2" v-if="!isActive">
      <a-row type="flex" :gutter="[20, 16]">
        <a-col span="24">
          <span class="text-caption black3">Korxona nomi:</span>
          <h3 class="text-body1 black1">-</h3>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">Reyting:</span>
          <h3 class="text-body1 black1">-</h3>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">Faoliyat:</span>
          <h3 class="text-body1 black1">-</h3>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">Umumiy ball:</span>
          <h3 class="text-body1 black1">-</h3>
        </a-col>
      </a-row>
    </div>
    <template v-else>
      <div class="content-2 mb-16">
        <a-row type="flex" :gutter="[20, 16]">
          <a-col span="24">
            <span class="text-caption black3">Korxona nomi:</span>
            <h3 class="text-body1 black1">{{ rating.title }}</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Reyting:</span>
            <h3 class="text-body1 black1">{{ rating.rating }}</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Faoliyat:</span>
            <h3 class="text-body1 black1">{{ rating.activity }}</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Umumiy ball:</span>
            <h3 class="text-body1 black1">{{ rating.overall }}</h3>
          </a-col>
        </a-row>
      </div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Korxona nomi</th>
              <th>Axborot manbai</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rating.list" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.source }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </layouts-n1>
</template>

<script>
export default {
  middleware: 'participant',

  data() {
    return {
      isActive: false,
      rating: {
        title:
          "“Toshkent Ko‘priklardan foydalanish unitar korxonasi” unitar korxonasi",
        rating: "BBB",
        activity: "Avtomobil yo‘llari va mostlar",
        overall: "55.122000",
        list: [
          {
            id: 1,
            title:
              "Tashkilot rahbarining mutaxassislikbo yicha oliy ma’lumotga egaligi",
            source: "Axborot manbai",
          },
          {
            id: 2,
            title:
              "Tashkilot rahbarining mutaxassislikbo yicha oliy ma’lumotga egaligi",
            source: "Axborot manbai",
          },
          {
            id: 3,
            title:
              "Tashkilot rahbarining mutaxassislikbo yicha oliy ma’lumotga egaligi",
            source: "Axborot manbai",
          },
        ],
      },
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style>
</style>