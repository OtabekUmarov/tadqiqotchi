<template>
  <layouts title="Budjet" :isHeader="false">
    <template #body>
      <div class="flex-center mb-12">
        <span class="text-body1 black1 mr-16"> №278 </span>
        <span class="status _8 mr-auto">Rad etildi / Moliya vazirligi</span>
        <div class="block-text grey">
          <span>15:22 / 22.02.2022</span>
        </div>
      </div>
      <h2 class="title mb-20">
        Surxondaryo viloyati Qumqo’rg’on tumani “Arpapoya” maxallasi hududida
        150 o‘rinli maktabgacha ta’lim tashkilotini qurish
      </h2>
      <a-row type="flex" :gutter="[20, 0]" class="border-bottom mb-24">
        <a-col span="8">
          <span class="text-caption black3">Tashkilotchi</span>
          <h3 class="title">5 257 576 949 UZS</h3>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3"
            >Tender taklifini ta’minlash kafolati foizi:</span
          >
          <h3 class="title">1% (52 575 769 UZS)</h3>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">17K, 7S, 58DAQ. (03.05.2022) </span>
          <h3 class="title">17K, 7S, 58DAQ. (03.05.2022)</h3>
        </a-col>
      </a-row>
      <CustomTab :tabs="tabs" v-model="tab" class="mb-24" />
      <template v-if="tab.value == 1">
        <a-collapse v-model="activeKey1" class="no-bg mb-32">
          <a-collapse-panel class="mb-40" key="1" header="Umumiy ma’lumotlar">
            <a-row type="flex" :gutter="[32, 20]">
              <a-col span="8">
                <span class="text-caption black3">Obyekt sohasi</span>
                <h3 class="text-body1 black1">Obyekt sohasi</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Ishni amalga oshirish turi</span
                >
                <h3 class="text-body1 black1">Qurilish</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >ART raqami (Artitektura-rejalashtirish topshiriq)</span
                >
                <h3 class="text-body1 black1">3523-545326-12345</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >“Shaharsozlik hujjatlari ekspertizasi” DUK xulosa
                  raqami</span
                >
                <h3 class="text-body1 black1">121345</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Obyektning xavf-xatar toifasi</span
                >
                <h3 class="text-body1 black1">1-toifa</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Ishlarni yakunlash muddati</span
                >
                <h3 class="text-body1 black1">60 kun</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Taklifni kiritish muddati</span
                >
                <h3 class="text-body1 black1">14 ish kuni</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Buyurtmachi</span>
                <h3 class="text-body1 black1">Buyurtmachi</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Obyekt hududi</span>
                <h3 class="text-body1 black1">Toshkent shahar</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Shahar, tuman</span>
                <h3 class="text-body1 black1">Shayxontohur tumani</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Obyekt manzili</span>
                <h3 class="text-body1 black1">Abay ko‘chasi 6-uy</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Litsensiya mavjudligi haqida talab mavjudligi</span
                >
                <h3 class="text-body1 black1">Ixtiyoriy</h3>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel
            class="mb-40"
            key="2"
            header="To‘lov haqida ma’lumotlar"
          >
            <a-row type="flex" :gutter="[32, 20]">
              <a-col span="8">
                <span class="text-caption black3">Moliyalashtirish manbai</span>
                <h3 class="text-body1 black1">
                  O‘zbekiston Respublikasi davlat budjeti
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">To‘lov valyutasi</span>
                <h3 class="text-body1 black1">UZS</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Boshlang’ich narx (QQS bilan)</span
                >
                <h3 class="text-body1 black1">Boshlang’ich narx (QQS bilan)</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Yildan yilga o‘tuvchi obyekt</span
                >
                <h3 class="text-body1 black1">Ha</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Bu yil uchun ajratilgan mablag’
                </span>
                <h3 class="text-body1 black1">200 000 000</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tender taklifini ta’minlash kafolat foizi</span
                >
                <h3 class="text-body1 black1">1%</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tender taklifini ta’minlash kafolat summasi
                </span>
                <h3 class="text-body1 black1">10 000 000</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tender taklifini ta’minlash kafolat summasi uchun hisob raqam
                </span>
                <h3 class="text-body1 black1">142525275</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tenderda ishtirok etish uchun operator komissiya summasi
                  uchun hisob raqam
                </span>
                <h3 class="text-body1 black1">117557338383</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">MFO</span>
                <h3 class="text-body1 black1">7844 615 11 14</h3>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel
            class="mb-32"
            key="3"
            header="Qo‘shimcha ma’lumotlar"
          >
            <a-row type="flex" :gutter="[32, 20]">
              <a-col span="8">
                <span class="text-caption black3">Telefon raqam</span>
                <h3 class="text-body1 black1">+9989 90 992 99 06</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Aloqa uchun shaxs</span>
                <h3 class="text-body1 black1">Murod Xayrullayev</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Elektron manzil</span>
                <h3 class="text-body1 black1">murod@gmail.com</h3>
              </a-col>
              <a-col span="24">
                <span class="text-caption black3"
                  >Ishtirokchilar uchun minimal o‘tish talabi</span
                >
                <h3 class="text-body1 black1">BBB</h3>
              </a-col>
              <a-col span="24">
                <span class="text-caption black3">Qo‘shimcha ma’lumot</span>
                <h3 class="text-body1 black1">Qo‘shimcha ma’lumot</h3>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </template>
      <template v-else>
        <a-collapse v-model="activeKey2" class="no-bg border-bottom mb-32">
          <a-collapse-panel
            class="mb-40"
            key="1"
            header="Lokal resurs (ish haqi, mashina va mexanizmlar hajmi vedomostlari)"
          >
            <a-row type="flex" :gutter="[32, 24]">
              <a-col span="12">
                <span class="text-body3 black2 mb-8">Jamlanma jadval</span>
                <div class="content">
                  <span class="text-body3 black1 with-icon"
                    ><i class="icon-file mr-12"></i> 1 Kniga.xls</span
                  >
                </div>
              </a-col>
              <a-col span="12">
                <span class="text-body3 black2 mb-8">Jamlanma jadval</span>
                <div class="content">
                  <span class="text-body3 black1 with-icon"
                    ><i class="icon-file mr-12"></i> 1 Kniga.xls</span
                  >
                </div>
              </a-col>
              <a-col span="12">
                <span class="text-body3 black2 mb-8">Jamlanma jadval</span>
                <div class="content">
                  <span class="text-body3 black1 with-icon"
                    ><i class="icon-file mr-12"></i> 1 Kniga.xls</span
                  >
                </div>
              </a-col>
              <a-col span="12">
                <span class="text-body3 black2 mb-8">Jamlanma jadval</span>
                <div class="content">
                  <span class="text-body3 black1 with-icon"
                    ><i class="icon-file mr-12"></i> 1 Kniga.xls</span
                  >
                </div>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel
            class="mb-8"
            key="2"
            header="Ishlarni bajarishning umumiy jadvali"
          >
            <a-row>
              <a-col span="12">
                <div class="table2">
                  <table>
                    <thead>
                      <tr>
                        <th width="1%">№</th>
                        <th>Obyektning lokal vedmostlari bo‘yicha</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Montaj ishlari</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Vedmost 2</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Vedmost 3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
        <div class="flex-center mb-20">
          <h3 class="body-text1 black1 mr-16">Moderator izohi</h3>
          <span class="status _8">
            Rad etildi / Moliya vazirligi / Moderator
          </span>
        </div>
        <div class="content mb-32">
          <p class="text-body3 black1 mb-8">
            Mazkur Shartnomani tuzish orqali foydalanuvchi yetkazib beruvchiga
            amaldagi shaxsga doir ma'lumotlar to‘g‘risidagi qonun hujjatlari
            talablariga muvofiq o‘zining shaxsga doir ma'lumotlariga (shu
            jumladan, biroq chiqarib tashlamagan holda: “UPAY” va “PAYSYS”
            to‘lov xizmatlarida joriy etilgan servislardan foydalanish uchun
            zarur bo‘lgan to‘lovning hisob ma'lumotlari, mobil' telefon raqami,
            bank kartalarining raqamlari, F.I.Sh., ro‘yxatdan o‘tish bilan
            bog‘liq ma'lumotlar, shuningdek, boshqa har hil shaxsga doir
            ma'lumotlar) ishlov berishga muddatsiz roziligini beradi, shu
            jumladan, ularni yig‘ish, tizimlashtirish, saqlash, aniqlashtirish
            (yangilash, o‘zgartirish), ko‘chirish, foydalanish, ularni berish
            (tarqatish, taqdim etish, dostup berish) ularni
          </p>
          <span class="text-caption black3 width-max ml-auto">
            22:02 / 22.02.2022
          </span>
        </div>
      </template>
      <div class="flex-center">
        <a-button type="primary" class="grey-reject mr-20">Rad etish</a-button>
        <a-button type="primary" class="green"> Elon berish </a-button>
      </div>
    </template>
  </layouts>
</template>

<script>
export default {
  middleware: 'moderator',

  data() {
    return {
      tabs: [
        {
          title: "Umumiy ma’lumotlar",
          value: 1,
        },
        {
          title: "Hujjatlar",
          value: 2,
        },
      ],
      tab: {
        title: "Umumiy ma’lumotlar",
        value: 1,
      },
      activeKey1: ["1", "2", "3"],
      activeKey2: ["1", "2"],
    };
  },
};
</script>
