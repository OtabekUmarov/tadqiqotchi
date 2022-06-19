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
        <h3 class="body-text1 black1 mb-12">Umumiy ma’lumotlar</h3>
        <a-row class="mb-32" type="flex" :gutter="[20, 20]">
          <a-col span="16">
            <a-form-item label="Tender nomi">
              <a-input placeholder="Yozing"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Obyekt sohasi">
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Ishlarni amalaga oshirish turi">
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item
              label="ART raqami (Artitektura-rejalashtirish topshiriq)"
            >
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="ART olingan sana">
              <a-date-picker placeholder="Yozing">
                <template #suffixIcon><i class="icon-calendar"></i></template>
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item
              label="“Shaharsozlik hujjatlari ekspertizasi” DUK xulosa raqami"
            >
              <a-input placeholder="Yozing"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Obyektning xavf-xatar toifasi">
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Ishlarni yakunlash muddati">
              <a-input placeholder="Yozing" addon-after="Kun"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Taklifni kiritish muddati">
              <a-input placeholder="Yozing" addon-after="Ish kuni"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Buyurtmachi">
              <a-input disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Obyekt hududi">
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Shahar, tuman">
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Obyekt manzili">
              <a-input></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Litsensiya mavjudligi haqida talab mavjudligi">
              <a-radio-group v-model="value" class="mt-12 mb-12">
                <a-radio :value="1" class="mr-32"> Ixtiyoriy </a-radio>
                <a-radio :value="2"> Majburiy </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <h3 class="body-text1 black1 mb-12">To‘lov haqida ma’lumotlar</h3>
        <a-row type="flex" :gutter="[20, 20]">
          <a-col span="8">
            <a-form-item label="Moliyalashtirish manbai">
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="To‘lov valyutasi">
              <a-select>
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Boshlang’ich narx (QQS bilan)">
              <a-input placeholder="Yozing"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="" class="mb-12">
              <a-radio-group v-model="value2">
                <a-radio :value="1" class="mr-32">
                  Yildan yilga o‘tuvchi obyekt
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Tender taklifini ta’minlash kafolat foizi">
              <a-input placeholder="Yozing" addon-after="%"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8"> </a-col>
          <a-col span="8">
            <a-form-item label="Tender taklifini ta’minlash kafolat summasi ">
              <a-input disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item
              label="Tender taklifini ta’minlash kafolat summasi uchun hisob raqam"
            >
              <a-input disabled></a-input>
            </a-form-item>
          </a-col>

          <a-col span="8">
            <a-form-item
              label="Tenderda ishtirok etish uchun operator komissiya summasi uchun hisob raqam"
            >
              <a-input disabled></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <h3 class="body-text1 black1 mb-12">Qo‘shimcha ma’lumotlar</h3>
        <a-row class="mb-20" type="flex" :gutter="[20, 20]">
          <a-col span="8">
            <a-form-item label="Telefon raqam">
              <a-input placeholder="Yozing"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Aloqa uchun shaxs">
              <a-input placeholder="Yozing"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Elektron manzil">
              <a-input placeholder="Yozing"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8">
            <a-form-item label="Ishtirokchilar uchun minimal reyting talabi">
              <a-input placeholder="Yozing"></a-input>
            </a-form-item>
          </a-col>
          <a-col span="8"></a-col>
          <a-col span="16">
            <a-form-item label="Qo‘shimcha ma’lumot">
              <a-textarea style="min-height: 150px" placeholder="Yozing">
              </a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
        <div class="collapse-radio">
          <label for="collapse-radio">
            <input type="checkbox" v-model="value3" id="collapse-radio" />
            <i></i>
          </label>
        </div>
      </template>
      <template v-else>
        <a-row type="flex" class="mb-24">
          <a-col span="16">
            <div class=" mb-32">
              <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
              <CustomUploaderN2 />
            </div>
            <div class=" mb-32">
              <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
              <CustomUploaderN2 />
            </div>
            <div class=" mb-32">
              <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
              <CustomUploaderN2 />
            </div>
          </a-col>
          <a-col span="24">
            <a-form-item label="Vedmost">
              <a-select
                v-model="select"
                mode="multiple"
                style="width: 100%"
                placeholder="select one country"
                option-label-prop="label"
                :showArrow="true"
                :allowClear="true"
                size="large"
              >
                <template #suffixIcon>
                  <i class="icon-angle-down"></i
                ></template>
                <template #clearIcon>
                  <i class="icon-close"></i>
                </template>
                <a-select-option value="china" label="China">
                  <span role="img" aria-label="China"> 🇨🇳 </span>
                  China (中国)
                </a-select-option>
                <a-select-option value="usa" label="USA">
                  <span role="img" aria-label="USA"> 🇺🇸 </span>
                  USA (美国)
                </a-select-option>
                <a-select-option value="japan" label="Japan">
                  <span role="img" aria-label="Japan"> 🇯🇵 </span>
                  Japan (日本)
                </a-select-option>
                <a-select-option value="korea" label="Korea">
                  <span role="img" aria-label="Korea"> 🇰🇷 </span>
                  Korea (韩国)
                </a-select-option>
              </a-select>
              <a-button @click="openVedmost" type="primary" class="green ml-20">
                Vedmost qo'shish
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <div class="flex-center">
        <a-button @click="$router.go(-1)" type="primary" class="grey-blue mr-20"
          >Bekor qilish</a-button
        >
        <a-button type="primary" class="green"> Saqlash </a-button>
      </div>
      <PopupsVedmostAdd @close="closeVedmost" :isVisible="isVedmost" />
    </template>
  </layouts>
</template>

<script>
export default {
  middleware: 'organizer',

  data() {
    return {
      isVedmost: false,

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
      value: null,
      value2: null,
      value3: false,
      select: [],
    };
  },
  methods: {
    openVedmost() {
      this.isVedmost = true;
    },
    closeVedmost() {
      this.isVedmost = false;
    },
  },
};
</script>
