<template>
  <layouts title="Budjet" :isHeader="false">
    <template #body>
      <div class="flex-center mb-24">
        <span class="text-body1 black1 mr-16"> №278 </span>
        <span class="status _8 mr-auto">Tekshiruvdan o‘tdi</span>
        <div class="block-text grey">
          <span>15:22 / 22.02.2022</span>
        </div>
      </div>
      <div class="mb-24 border-bottom">
        <a-row type="flex" :gutter="[20, 0]" class="">
          <a-col span="8">
            <span class="text-caption black3">Tashkilotchi</span>
            <h3 class="text-body1 black1">Consult</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Obyekt</span>
            <h3 class="text-body1 black1">1-sonli BUSM perevipolneniya</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3">Shaxsiy hisobvaraq</span>
            <h3 class="text-body1 black1">123456789123456789123456789</h3>
          </a-col>
        </a-row>
      </div>

      <h2 class="title mb-16">Rad etildi / Tashkilotchi</h2>
      <div class="content mb-12">
        <span class="text-body3 black1 with-icon"
          ><i class="icon-file mr-12"></i> 1 Kniga.xls</span
        >
      </div>
      <div class="content">
        <p class="text-body3 black1 mb-8">
          bu davlat va mahalliy oʻz-oʻzini boshqarish vazifalari va
          funksiyalarini moliyaviy taʼminlash uchun moʻljallangan pul
          mablagʻlari jamgʻarmalarini toʻplash va sarflash shaklidir. Byudjet
          defitsiti daromadlarni oshib ketganda va mamlakatning moliyaviy
          sog'lig'ini ko'rsatganda paydo bo'ladi . Hukumat odatda byudjet
          tanqisligi so'zlarini tadbirkorlik yoki jismoniy shaxslarga emas,
          balki xarajatlarni nazarda tutadi. Hisoblangan defitsitlar davlat
          qarzini shakllantiradi. Byudjet defitsitining asosiy xavf-xatarlaridan
          biri inflyatsiya bo'lib , u narx darajasining doimiy o'sishi
          hisoblanadi. Qo'shma Shtatlarda byudjet taqchilligi Federal Rezervning
          inflyatsiya darajasini pasaytiradigan iqtisodiyotga ko'proq pul
          tushirishiga olib kelishi mumkin. Natijada, iqtisodiy faoliyatning
          kamida olti oy davom etadigan pasayishini anglatadigan turg'unlik yuz
          beradi.
        </p>
        <span class="text-caption ml-auto black3 mb-0 width-max"
          >12:24 / 22.02.2022</span
        >
      </div>

      <div class="flex-center mt-24">
        <a-button type="primary" class="grey-reject mr-20">Rad etish</a-button>
        <a-button
          type="primary"
          class="green"
          @click="
            $router.push({
              path: `/cabinet/organizer/corporative/1/filling/`,
            })
          "
        >
          Hujjatlarni to‘ldirish
        </a-button>
      </div>
    </template>
  </layouts>
</template>

<script>
export default {
  middleware: 'organizer',

};
</script>
