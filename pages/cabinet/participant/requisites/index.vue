<template>
  <layouts title="Rekvizitlar">
    <template #headerItems> </template>
    <template #body>
      <a-row type="flex" :gutter="[16, 16]">
        <a-col span="24">
          <span class="text-caption">Korxona nomi:</span>
          <h3 class="text-body1 black1">
            УП Toshkent ko‘priklardan foydalanish unitar korxonasi
          </h3>
        </a-col>
        <a-col :xl="8" :sm="12" :xs="24">
          <span class="text-caption black3">INN:</span>
          <h3 class="text-body1 black1">200662191</h3>
        </a-col>
        <a-col :xl="8" :sm="12" :xs="24">
          <span class="text-caption black3">Reyting:</span>
          <p class="text-body1 green1">BBB <i class="icon-question"></i></p>
        </a-col>
        <a-col :xl="8" :sm="12" :xs="24">
          <span class="text-caption black3"> Shaxsiy hisobraqam: </span>
          <p class="text-body1 black1">20210000600129315001</p>
        </a-col>
        <a-col :xl="8" :sm="12" :xs="24">
          <span class="text-caption black3">MFO:</span>
          <p class="text-body1 black1">00930</p>
        </a-col>
        <a-col :xl="8" :sm="12" :xs="24">
          <span class="text-caption black3">PINFL:</span>
          <p class="text-body1 black1">
            31211841110027 <i class="icon-eye"></i>
          </p>
        </a-col>
        <a-col :xl="8" :sm="12" :xs="24">
          <span class="text-caption black3"> Elektron pochta: </span>
          <p class="text-body1 black1">Toshkfuk@mail.ru</p>
        </a-col>
        <a-col :xl="8" :sm="12" :xs="24">
          <span class="text-caption black3"> Telefon raqami: </span>
          <p class="text-body1 black1">712304060</p>
        </a-col>
      </a-row>
      <a-button type="primary" class="green mt-32" @click="
        $router.push({
          path: '/cabinet/participant/requisites/update',
        })
      ">
        <i class="icon-edit"></i>
        <span>Tahrirlash</span>
      </a-button>
    </template>
  </layouts>
</template>

<script>
export default {
  middleware: 'participant',

};
</script>
