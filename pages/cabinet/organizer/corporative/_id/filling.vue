<template>
  <layouts title="Budjet" :isHeader="false" class="budget-filling">
    <template #body>
      <div class="flex-center mb-24">
        <span class="text-body3 black1 mr-auto">№278</span>
        <div class="block-text grey">
          <span>15:22 / 22.02.2022</span>
        </div>
      </div>
      <div class="border-bottom mb-24">
        <a-row type="flex" :gutter="[20, 0]">
          <a-col span="8">
            <span class="text-caption black3"> Tashkilotchi </span>
            <h3 class="text-body1 black1">Consult</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3"> Obyekt </span>
            <h3 class="text-body1 black1">1-sonli BUSM perevipolneniya</h3>
          </a-col>
          <a-col span="8">
            <span class="text-caption black3"> Shaxsiy hisobvaraq </span>
            <h3 class="text-body1 black1">123456789123456789123456789</h3>
          </a-col>
        </a-row>
      </div>
      <h2 class="title mb-16">E’lon joylashtirish</h2>
      <CustomTab :tabs="tabs" v-model="tab" class="mb-32" />
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
          <a-collapse
            v-model="activeKey"
            class="no-bg mb-24"
            expand-icon-position="right"
          >
            <a-collapse-panel key="1" header="Bitim (oferta)">
              <p class="text-body3 black1">
                Mazkur Ofertaning aksepti «my.gov.uz» tizimi orqali
                avtorizasiyadan o‘tib, «my.gov.uz/ru/e-pay» sayti orqali pullik
                xizmatni olish orqali amalga oshiriladi. <br />
                2.2. Mazkur Shartnomani tuzish orqali foydalanuvchi yetkazib
                beruvchiga amaldagi shaxsga doir ma'lumotlar to‘g‘risidagi qonun
                hujjatlari talablariga muvofiq o‘zining shaxsga doir
                ma'lumotlariga (shu jumladan, biroq chiqarib tashlamagan holda:
                “UPAY” va “PAYSYS” to‘lov xizmatlarida joriy etilgan
                servislardan foydalanish uchun zarur bo‘lgan to‘lovning hisob
                ma'lumotlari, mobil' telefon raqami, bank kartalarining
                raqamlari, F.I.Sh., ro‘yxatdan o‘tish bilan bog‘liq ma'lumotlar,
                shuningdek, boshqa har hil shaxsga doir ma'lumotlar) ishlov
                berishga muddatsiz roziligini beradi, shu jumladan, ularni
                yig‘ish, tizimlashtirish, saqlash, aniqlashtirish (yangilash,
                o‘zgartirish), ko‘chirish, foydalanish, ularni berish
                (tarqatish, taqdim etish, dostup berish) ularni egasizlantirish,
                ularni taqiqlash, ularni o‘chirish va ularni yo‘q qilish,
                avtomatizasiya vositalaridan foydalangan yoki ulardan
                foydalanmagan holda, ushbu shartnomani bajarish maqsadida.
                <br />
                Shuningdek, ushbu orqali foydalanuvchi mazkur shartnoma bo‘yicha
                yetkazib beruvchiga taqdim etilgan shaxsga doir ma'lumotlarni
                ushbu shartnomani bajarish maqsadida uchinchi shaxslarga taqdim
                etishga rozilik beradi. <br />
                2.3. Yetkazib beruvchi Foydalanuvchining shaxsga doir
                ma'lumotlarning maxfiyligi bo‘yicha O‘zbekiston Respublikasi
                amaldagi qonun hujjatlari talablariga muvofiq barcha zarur
                bo‘lgan choralarni ko‘rishini Foydalanuvchiga kafolatlaydi.
                Foydalanuvchi uning shaxsga doir ma'lumotlariga ishlov berishga
                roziligi (shu jumladan uchuinchi shaxslarga ham) muddatsiz
                hisoblanib, mazkur shartnomaning 7.3-bandiga muvofiq
                Foydalanuvchi istagan paytda shaxsga doir ma'lumotlariga ishlov
                berishga roziligini qaytarib olishi mumkin.
              </p>
            </a-collapse-panel>
          </a-collapse>
        </div>
        <a-button type="primary" class="green">Keyingisi</a-button>
      </template>
      <template v-else>
        <a-row type="flex" :gutter="[0, 32]">
          <a-col span="16">
            <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
            <CustomUploaderN2 />
          </a-col>
          <a-col span="16">
            <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
            <CustomUploaderN2 />
          </a-col>
          <a-col>
            <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
            <CustomUploaderN2 />
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
      value: null,
      value2: null,
      value3: false,
      activeKey: ["1"],
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
