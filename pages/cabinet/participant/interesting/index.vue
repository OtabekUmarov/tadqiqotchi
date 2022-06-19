<template>
  <layouts-n1 class="all">
    <a-row :gutter="[20, 0]" class="transition-row">
      <a-col span="8">
        <div class="content-2 _12">
          <div class="mb-12 all-search">
            <div class="all-search-wrapper">
              <i class="icon-search2"></i>
              <a-input placeholder="Izlang"></a-input>
            </div>
            <i
              class="icon-filter"
              :class="{ active: isFilter }"
              @click="toggleFilter"
            ></i>
          </div>
          <div class="flex-center all-filter-header border-bottom">
            <span class="text-caption black1"
              >Vaqt <i class="icon-filter2 ml-4"></i
            ></span>
            <span class="text-caption black1">
              <i class="icon-filter2 mr-4"></i>
              Narx
            </span>
          </div>
          <div class="all-list">
            <div class="all-list-item active">
              <div class="all-list-item-header">
                <span>№123456789</span>
                <span>Qoldi: 22 kun</span>
              </div>
              <p>
                Surxondaryo viloyati Qumqorg‘on tumani “Arpapoya” maxallasi
                hududida 1505 o‘rinli maktabgacha ta’lim...
              </p>
              <span>Narx: <b>5 257 576 949 UZS</b></span>
            </div>
            <div class="all-list-item">
              <div class="all-list-item-header">
                <span>№123456789</span>
                <span>Qoldi: 22 kun</span>
              </div>
              <p>
                Surxondaryo viloyati Qumqorg‘on tumani “Arpapoya” maxallasi
                hududida 1505 o‘rinli maktabgacha ta’lim...
              </p>
              <span>Narx: <b>5 257 576 949 UZS</b></span>
            </div>
            <div class="all-list-item">
              <div class="all-list-item-header">
                <span>№123456789</span>
                <span>Qoldi: 22 kun</span>
              </div>
              <p>
                Surxondaryo viloyati Qumqorg‘on tumani “Arpapoya” maxallasi
                hududida 1505 o‘rinli maktabgacha ta’lim...
              </p>
              <span>Narx: <b>5 257 576 949 UZS</b></span>
            </div>
            <div class="all-list-item">
              <div class="all-list-item-header">
                <span>№123456789</span>
                <span>Qoldi: 22 kun</span>
              </div>
              <p>
                Surxondaryo viloyati Qumqorg‘on tumani “Arpapoya” maxallasi
                hududida 1505 o‘rinli maktabgacha ta’lim...
              </p>
              <span>Narx: <b>5 257 576 949 UZS</b></span>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="isFilter ? '10' : '16'">
        <div class="content-2 _20">
          <div class="flex-center mb-12">
            <span class="text-body0 mr-8">
              <i class="icon-sidebar-bookmark mr-8"></i>
              №123456789</span
            >
            <div class="block-text grey mr-8">
              <span class="text-body0"> Boshlanish sanasi: 22.02.2022 </span>
            </div>
            <div class="block-text green">
              <span class="text-body0">Reyting D</span>
              <i class="icon-question"></i>
            </div>
            <div class="block-text blue ml-auto">
              <span class="text-body0">Yildan yilga o‘tuvchi obyekt</span>
            </div>
          </div>

          <h3 class="text-body0-1 black1 mb-16">
            Surxondaryo viloyati Qumqo’rg’on tumani “Arpapoya” maxallasi
            hududida 150 o‘rinli maktabgacha ta’lim tashkilotini qurish
          </h3>
          <div class="border-bottom _20 mb-20">
            <a-row :gutter="[20, 12]" type="flex">
              <a-col :span="isFilter ? '12' : '8'">
                <span class="text-body0 black3"
                  >Boshlang‘ich narx (QQS bilan):</span
                >
                <h3 class="text-body0-2 black1">5 257 576 949 UZS</h3>
              </a-col>
              <a-col :span="isFilter ? '12' : '8'">
                <span class="text-body0 black3"
                  >Tender taklifini ta’minlash kafolati foizi:</span
                >
                <h3 class="text-body0-2 black1">1% (52 575 769 UZS)</h3>
              </a-col>
              <a-col :span="isFilter ? '12' : '8'">
                <span class="text-body0 black3">Tugash sanasi:</span>
                <h3 class="text-body0-2 black1">
                  17K, 7S, 58DAQ. (03.05.2022)
                </h3>
              </a-col>
            </a-row>
          </div>
          <div class="flex-center small-tab mb-12">
            <CustomTab :tabs="tabs" v-model="tab" />
            <a-button
              type="primary"
              class="green _32"
              @click="
                $router.push({
                  path: `/cabinet/participant/all/2/`,
                })
              "
            >
              <i class="icon-user-plus"></i>
              <span>Qatnashish</span>
            </a-button>
          </div>
          <template v-if="tab.value == 1">
            <a-collapse v-model="activeKey" class="no-bg">
              <a-collapse-panel
                class="mb-20"
                key="1"
                ref="my"
                header="Umumiy ma’lumotlar"
              >
                <a-row :gutter="[20, 16]" type="flex">
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">Obyekt sohasi:</span>
                    <h3 class="text-body3 black1">Umumqurilish</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"
                      >Ishni amalga oshirish turi:</span
                    >
                    <h3 class="text-body3 black1">Qurilish</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"
                      >ART raqami (Artitektura-rejalashtirish topshiriq):
                    </span>
                    <h3 class="text-body3 black1">3523-545326-12345</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">
                      “Shaharsozlik hujjatlari ekspertizasi” DUK xulosa raqami:
                    </span>
                    <h3 class="text-body3 black1">121345</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">
                      Obyektning xavf-xatar toifasi:
                    </span>
                    <h3 class="text-body3 black1">1-toifa</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">
                      Ishlarni yakunlash muddati:
                    </span>
                    <h3 class="text-body3 black1">60 kun</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">
                      Taklifni kiritish muddati:
                    </span>
                    <h3 class="text-body3 black1">14 ish kuni</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"> Buyurtmachi: </span>
                    <h3 class="text-body3 black1">Buyurtmachi</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"> Obyekt hududi: </span>
                    <h3 class="text-body3 black1">Toshkent shahar</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">
                      Obyekt shahri, tumani:
                    </span>
                    <h3 class="text-body3 black1">Shayxontohur tumani</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"> Obyekt manzili: </span>
                    <h3 class="text-body3 black1">Abay ko‘chasi 6-uy</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">
                      Litsensiya mavjudligi haqida talab mavjudligi:
                    </span>
                    <h3 class="text-body3 black1">Ixtiyoriy</h3>
                  </a-col>
                </a-row>
              </a-collapse-panel>
              <a-collapse-panel
                class="mb-20"
                key="2"
                ref="my"
                header="To‘lov haqida ma’lumotlar"
              >
                <a-row :gutter="[20, 16]" type="flex">
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"
                      >Moliyalashtirish manbai:</span
                    >
                    <h3 class="text-body3 black1">
                      O‘zbekiston Respublikasi davlat budjeti
                    </h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2">To‘lov valyutasi: </span>
                    <h3 class="text-body3 black1">UZS</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"
                      >Boshlang‘ichnarx (QQS bilan):</span
                    >
                    <h3 class="text-body3 black1">1 000 000 000</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"
                      >Yildan yilga o‘tovchi obyekt:</span
                    >
                    <h3 class="text-body3 black1">Ha</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"
                      >Bu yil uchun ajratilgan mablag‘:</span
                    >
                    <h3 class="text-body3 black1">200 000 000</h3>
                  </a-col>
                  <a-col :span="isFilter ? '12' : '8'">
                    <span class="text-body0 black3 _2"
                      >Tender taklifini ta’minlash kafolat foizi</span
                    >
                    <h3 class="text-body3 black1">1%</h3>
                  </a-col>
                </a-row>
              </a-collapse-panel>
            </a-collapse>
          </template>
          <template v-else>
            <a-collapse v-model="activeKey2" class="no-bg">
              <a-collapse-panel
                class="mb-20"
                key="1"
                header="Lokal resurs (ish haqi, mashina va mexanizmlar hajmi vedomostlari)"
              >
                <a-row :gutter="[20, 16]">
                  <a-col span="12">
                    <label class="text-caption mb-8 black2">
                      Jamlanma jadval:
                    </label>
                    <div class="content _8 with-icon">
                      <i class="icon-file mr-12"></i>
                      <h3 class="text-body3 black1">1 Kniga.xls</h3>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <label class="text-caption mb-8 black2">
                      Ishlarning lokal vedemostlari:
                    </label>
                    <div class="content _8 with-icon">
                      <i class="icon-file mr-12"></i>
                      <h3 class="text-body3 black1">1 Kniga.xls</h3>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <label class="text-caption mb-8 black2">
                      Asosiy narxni shakllantirivchi komponentga narxlar
                      jadvali:
                    </label>
                    <div class="content _8 with-icon">
                      <i class="icon-file mr-12"></i>
                      <h3 class="text-body3 black1">1 Kniga.xls</h3>
                    </div>
                  </a-col>
                  <a-col span="12">
                    <label class="text-caption mb-8 black2">
                      Loyiha chiazmasi:
                    </label>
                    <div class="content _8 with-icon">
                      <i class="icon-file mr-12"></i>
                      <h3 class="text-body3 black1">1 Kniga.xls</h3>
                    </div>
                  </a-col>
                </a-row>
              </a-collapse-panel>
              <a-collapse-panel
                key="2"
                header="Ishlarni bajarishning umumiy jadvali  "
              >
                <div class="table4">
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
                        <td>Montaj ishlari</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Montaj ishlari</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </template>
        </div>
      </a-col>
      <div class="my-col" :class="{ active: isFilter }">
        <div class="content-2 _12">
          <div class="flex-center all-filter-header2 mb-16">
            <h3 class="text-body3 black1">Filtr</h3>
            <i class="icon-close" @click="toggleFilter"></i>
          </div>
          <div class="all-filter-form">
            <a-row :gutter="[0, 12]">
              <a-col span="24">
                <a-form-item label="Lot raqami">
                  <a-input placeholder="Yozing"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="Boshlang‘ich narx (QQS bilan)">
                  <a-input placeholder="Yozing"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="Tugash vaqti">
                  <a-input placeholder="Yozing"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="Viloyat">
                  <a-input placeholder="Yozing"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="Sanoat qismi">
                  <a-input placeholder="Yozing"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="Ish turi">
                  <a-input placeholder="Yozing"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="Lot xolati">
                  <a-input placeholder="Yozing"></a-input>
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-row :gutter="[12, 0]">
                  <a-col span="12">
                    <a-button type="primary" class="green">
                      <i class="icon-search2"></i>
                      <span>Izlash</span>
                    </a-button>
                  </a-col>
                  <a-col span="12">
                    <a-button class="grey" type="primary">
                      <i class="icon-rubbish"></i>
                      <span> Tozalash </span>
                    </a-button>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </a-row>
  </layouts-n1>
</template>

<script>
export default {
  middleware: 'participant',

  data() {
    return {
      activeKey: ["1", "2"],
      activeKey2: ["1", "2"],
      isFilter: false,
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
    };
  },
  methods: {
    toggleFilter() {
      this.isFilter = !this.isFilter;
    },
  },
};
</script>

<style>
</style>