<template>
  <div>
    <h2 class="title mb-16">E’lon joylashtirish</h2>
    <CustomTab :tabs="tabs" v-model="tab" class="mb-32" />
    <template v-if="tab.value == 1">
      <a-form-model ref="form" :model="form" :rules="rules">
      <h3 class="body-text1 black1 mb-12">Umumiy ma’lumotlar</h3>
      <a-row class="mb-32" type="flex" :gutter="[20, 20]">
        <a-col span="16">
          <a-form-item label="Tender nomi">
            <a-input v-model="form.tender_name" placeholder="Yozing"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Obyekt sohasi">
            <a-select v-model="form.tender_object_type">
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <a-select-option :value="item.value" v-for="item in formList.tenderObjectTypeList" :key="item.value"
                width="100%">
                {{ item.title && item.title[$i18n.locale] }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Ishlarni amalaga oshirish turi">
            <a-select v-model="form.tender_work_type">
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <a-select-option :value="item.value" v-for="item in formList.tenderWorkTypeList" :key="item.value"
                width="100%">
                {{ item.title && item.title[$i18n.locale] }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="ART raqami (Artitektura-rejalashtirish topshiriq)">
            <a-input v-model="form.architectural_number" placeholder="Yozing"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="ART olingan sana">
            <a-date-picker 
              format="DD.MM.YYYY"
              valueFormat="YYYY-MM-DD"
              v-model="form.architectural_date"
              placeholder="Yozing">
              <template #suffixIcon><i class="icon-calendar"></i></template>
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="“Shaharsozlik hujjatlari ekspertizasi” DUK xulosa raqami">
            <a-input v-model="form.expert_number" placeholder="Yozing"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Obyektning xavf-xatar toifasi">
            <a-select v-model="form.risk_category" @change="formMinimumScore">
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <a-select-option :value="item.value" v-for="item in formList.riskCategoryList" :key="item.value"
                width="100%">
                {{ item.title && item.title[$i18n.locale] }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Ishlarni yakunlash muddati">
            <a-input v-model="form.completion_period" type="number" placeholder="Yozing" addon-after="Kun"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-model-item has-feedback label="Taklifni kiritish muddati" prop="offer_period">
            <a-input v-model="form.offer_period" type="number" placeholder="Yozing" addon-after="Ish kuni"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Buyurtmachi">
            <a-input v-model="user_name" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Obyekt hududi">
            <a-select v-model="form.region" @change="changeRegion">
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <a-select-option :value="item.id" v-for="item in regionList" :key="item.id" width="100%">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Shahar, tuman">
            <a-select v-model="form.district" :disabled="!form.region">
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <a-select-option :value="item.id" v-for="item in districtList" :key="item.id" width="100%">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Obyekt manzili">
            <a-input v-model="form.address" placeholder="Yozing"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Litsensiya mavjudligi haqida talab mavjudligi">
            <a-radio-group v-model="form.license_requirement" class="mt-12 mb-12">
              <a-radio value="not_required" class="mr-32"> Ixtiyoriy </a-radio>
              <a-radio value="required"> Majburiy </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <h3 class="body-text1 black1 mb-12">To‘lov haqida ma’lumotlar</h3>
      <a-row type="flex" :gutter="[20, 20]">
        <a-col span="8">
          <!-- <a-form-item label="Moliyalashtirish manbai">
            <a-input disabled></a-input>
          </a-form-item> -->
          <a-form-item label="Moliyalashtirish manbai">
            <a-select v-model="detail.payment_source" disabled>
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <a-select-option :value="item.key" v-for="item in paymentList" :key="item.key" width="100%">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="To‘lov valyutasi">
            <a-select v-model="form.payment_currency" disabled>
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
                <a-select-option :value="item.value" v-for="item in formList.paymentCurrencyList" :key="item.value"
                width="100%">
                {{ item.title && item.title[$i18n.locale] }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Boshlang’ich narx (QQS bilan)">
            <a-input type="number" v-model="form.starting_price" @blur="formMinimumScore" placeholder="Yozing"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="" class="mb-12">
            <a-checkbox v-model="form.year_to_year_project">
              Yildan yilga o'tuvchi obyekt
            </a-checkbox>
            <!-- <a-radio-group v-model="form.year_to_year_project">
              <a-radio :value="true" class="mr-32">
                Yildan yilga o‘tuvchi obyekt
              </a-radio>
            </a-radio-group> -->
          </a-form-item>
        </a-col>
        <a-col span="8" v-if="form.year_to_year_project">
          <a-form-item label="Bu yil uchun ajratilgan mablag'">
            <a-input v-model="form.current_year_price" placeholder="Yozing" type="number">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-model-item label="Tender taklifini ta’minlash kafolat foizi" has-feedback prop="guarantee_amount_percentage">
            <a-input v-model="form.guarantee_amount_percentage" placeholder="Yozing (0-2)" addon-after="%" type="number">
            </a-input>
          </a-form-model-item>
        </a-col>
        <a-col span="8" v-if="!form.year_to_year_project"> </a-col>
        <a-col span="8">
          <a-form-item label="Tender taklifini ta’minlash kafolat summasi ">
            <a-input v-model="tenderSumma" disabled></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Tender taklifini ta’minlash kafolat summasi uchun hisob raqam">
            <a-input v-model="form.operator_guarantee_account_number" ></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Tenderda ishtirok etish uchun operator komissiya summasi uchun hisob raqam">
            <a-input v-model="form.operator_commission_account_number" ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <h3 class="body-text1 black1 mb-12 mt-12">Qo‘shimcha ma’lumotlar</h3>
      <a-row class="mb-20" type="flex" :gutter="[20, 20]">
        <a-col span="8">
          <a-form-model-item label="Telefon raqam" has-feedback prop="organizer_phone"> 
            <a-input addon-before="+998" v-model="form.organizer_phone" type="number" placeholder="Yozing"></a-input>
          </a-form-model-item>  
        </a-col>
        <a-col span="8">
          <a-form-item label="Aloqa uchun shaxs">
            <a-input v-model="form.contact_full_name" placeholder="Yozing"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-model-item label="Elektron manzil" has-feedback prop="customer_email"> 
            <a-input v-model="form.customer_email" placeholder="Yozing"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Ishtirokchilar uchun minimal reyting talabi">
            <a-select v-model="form.participant_minimum_score" disabled>
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <a-select-option :value="item.id" v-for="item in minScoreList" :key="item.id"
                width="100%">
                {{ item.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-model-item label="MFO" has-feedback prop="operator_bank_code">
            <a-input v-model="form.operator_bank_code" type="number"  placeholder="Yozing"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col span="16">
          <a-form-item label="Qo‘shimcha ma’lumot">
            <a-textarea v-model="form.description" style="min-height: 150px" placeholder="Yozing">
            </a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <div class="collapse-radio">
        <label for="collapse-radio">
          <input type="checkbox" v-model="value3" id="collapse-radio" />
          <i></i>
        </label>
        <a-collapse v-model="activeKey" class="no-bg mb-24" expand-icon-position="right">
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
      <a-button type="primary" :disabled="!value3" :loading="pending1" class="green" @click="send()">Keyingisi</a-button>
      </a-form-model>
    </template>
    <template v-else>
      <a-row type="flex">
        <a-col span="16">
          <div class="mb-32">
            <h3 class="text-body3 mb-8 black1">Jamlanma jadval</h3>
            <CustomUploaderN3 
              @change="handleFile1"
              accept=".xlsx, .xls"
              example_name="Jamlanma jadvali"
              example_url="https://shaffof-api.mdg.uz/media/shablon_file/Jamlanma_jadval.xlsx"
              />
            <div v-if="detail.collection_table_file" class="uploader-header _2 mb-12">
              <a :href="detail.collection_table_file" download target="_blank" class="uploader-header-item _2">
                <!-- <img src="/excel.svg" alt="excel" /> -->
                <span class="text-caption black1">
                  {{detail.collection_table_file_data && detail.collection_table_file_data.name}}
                  {{detail.collection_table_file_data && detail.collection_table_file_data.format}}
                </span>
                <i class="icon-download"></i>
              </a>
            </div>
          </div>
          <div class="mb-32">
            <h3 class="text-body3 mb-8 black1">Ishlarning lokal vedemostlari</h3>
            <CustomUploaderN3 
              @change="handleFile2"
              accept=".xlsx, .xls"
              example_name="Ishlarning lokal vedemostlari"
              example_url="https://shaffof-api.mdg.uz/media/shablon_file/Ishlarning_local_vedomostlari.xls"
              />
            <div v-if="detail.jobs_local_statements" class="uploader-header _2 mb-12">
              <a :href="detail.jobs_local_statements" download target="_blank" class="uploader-header-item _2">
                <!-- <img src="/excel.svg" alt="excel" /> -->
                <span class="text-caption black1">
                  {{detail.jobs_local_statements_data && detail.jobs_local_statements_data.name}}
                  {{detail.jobs_local_statements_data && detail.jobs_local_statements_data.format}}
                </span>
                <i class="icon-download"></i>
              </a>
            </div>
          </div>
          <div class="mb-32">
            <h3 class="text-body3 mb-8 black1">Asosiy narxni shakllantiruvchi komponentlarga narxlar jadvali</h3>
            <CustomUploaderN3 
              @change="handleFile3"
              accept=".xlsx, .xls"
              example_name="Asosiy narxni shakllantiruvchi komponentlarga narxlar jadvali"
              example_url="https://shaffof-api.mdg.uz/media/shablon_file/Asosiy_narxni_shakllantiruvchi_komponentlarga_narxlar_jadvali.xlsx"
              />
            <div v-if="detail.basic_prices_table_file" class="uploader-header _2 mb-12">
              <a :href="detail.basic_prices_table_file" download target="_blank" class="uploader-header-item _2">
                <!-- <img src="/excel.svg" alt="excel" /> -->
                <span class="text-caption black1">
                  {{detail.basic_prices_table_file_data && detail.basic_prices_table_file_data.name}}
                  {{detail.basic_prices_table_file_data && detail.basic_prices_table_file_data.format}}
                </span>
                <i class="icon-download"></i>
              </a>
            </div>
          </div>
          <div class="mb-32">
            <h3 class="text-body3 mb-8 black1">Loyiha chizmasi</h3>
            <CustomUploaderN3 
              @change="handleFile4"
              :example='false'
            />
            <div v-if="detail.project_design_file" class="uploader-header _2 mb-12">
              <a :href="detail.project_design_file" download target="_blank" class="uploader-header-item _2">
                <span class="text-caption black1">
                  {{detail.project_design_file_data && detail.project_design_file_data.name}}
                  {{detail.project_design_file_data && detail.project_design_file_data.format}}
                </span>
                <i class="icon-download"></i>
              </a>
            </div>
          </div>
        </a-col>
        <a-col span="24">
          <a-form-item label="Vedmost">
            <a-select v-model="formFile.statements" mode="multiple" style="width: 100%" placeholder="Vedmostni tanlang"
              option-label-prop="label" :showArrow="true" :allowClear="true" size="large">
              <template #suffixIcon>
                <i class="icon-angle-down"></i></template>
              <template #clearIcon>
                <i class="icon-close"></i>
              </template>
              <a-select-option 
                v-for="item of stateList"
                :key="item.id"
                :value="item.id"
                :label="item.title">
                <!-- <span role="img" aria-label="China"> 🇨🇳 </span> -->
                <!-- <span :aria-label="item.title"> -->
                  {{item.title}}
                <!-- </span> -->
              </a-select-option>
            </a-select>
            <a-button @click="openVedmost" type="primary" class="green ml-20">
              Vedmost qo'shish
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    <div class="flex-center">
      <a-button @click="sendFile(false)" :loading="pending3" type="primary" class="green mt-32 mr-auto">
        Qoralamaga saqlash 
      </a-button>
      <a-button @click="sendFile(true)" :loading="pending2" type="primary" class="blue mt-32">
        Keyingi bosqichga o'tish
      </a-button>
    </div>
    </template>
    <PopupsVedmostAdd @close="closeVedmost" @fetchState="StateListFunc" :isVisible="isVedmost" />
  </div>
</template>

<script>
import formList from "@/constants/formList";
import { mapActions } from "vuex";
export default {
  middleware: 'organizer',
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      formError:[],
      rules: {
        offer_period: [{ validator: this.offerPeriodValidate, trigger: 'blur', message:'Muddat 5-12 kun oralig`ida' }],
        guarantee_amount_percentage: [{ validator: this.formPercentageValidate, trigger: 'blur', message:'Kafolat foizi 0.1% - 2% gacha bo‘lishi kerak' }],
        operator_bank_code: [{ max: 5, message: 'MFO raqam 5tadan oshmasligi kerak', trigger: 'change'}],
        organizer_phone: [{ max: 9, min:9, message: "Telefon raqam noto'g'ri kiritildi", trigger: 'blur'}],
        customer_email: [{ type: 'email', message: "Pochta noto'g'ri kiritildi", trigger: 'blur'}],
      },
      form: {
        tender_name: '',
        tender_object_type: null,
        tender_work_type: null,
        architectural_number: '',
        architectural_date: '',
        expert_number: '',
        completion_period: '',
        offer_period: '',
        region: '',
        district: '',
        address: '',
        license_requirement: null,
        risk_category: null,
        payment_currency: 'uzs',
        starting_price: null,
        year_to_year_project: false,
        current_year_price: '',
        guarantee_amount_percentage: null,
        guarantee_amount: '',
        operator_guarantee_account_number: null,
        operator_commission_account_number: 595955,
        operator_bank_code: 123423,
        organizer_phone: '',
        contact_full_name: '',
        customer_email: '',
        participant_minimum_score: null,
        description: '',
      },
      formFile: {
        collection_table_file: null,
        jobs_local_statements: null,
        basic_prices_table_file: null,
        project_design_file: null,
        statements: []
      },
      isVedmost: false,
      formList,
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
      value3: false,
      activeKey: ["1"],
      regionList: [],
      districtList: [],
      stateList: [],
      paymentList: [
        {
          id: 1,
          key: 'state_budget',
          title: 'Davlat byudjeti'
        },
        {
          id: 1,
          key: 'corparate_funds',
          title: 'Korporativ mablag‘lar'
        }
      ],
      salary: null,
      minScoreList: [],
      pending1: false,
      pending2: false,
      pending3: false,
    };
  },
  computed: {
    user_name(){
      return this.detail.customer && this.detail.customer.user_name;
    },
    tenderSumma() {
      return (this.form.starting_price * this.form.guarantee_amount_percentage )/ 100 || 0;
    },
  },
  methods: {
    ...mapActions('organizer/tender', ['getRegionList', 'getDistrictList', 'postDetail', "StateList", "minimumScoreList", "salaryValue"]),
    async send() {
      this.pending1 = true;
      try {
        this.form.guarantee_amount = this.tenderSumma;
        let res = await this.postDetail({ form: this.form, id: this.detail.id });
        if (res.status == 200) {
          this.$message.success('Ma\'lumotlar muvaffaqqiyatli saqlandi');
          this.tab.value = 2
        }
        console.log(res)
      } catch (error) {
        console.log(error);
      }
      this.pending1 = false;
    },
    openVedmost() {
      this.isVedmost = true;
    },
    async changeRegion(value) {
      this.districtList = []
      let res = await this.getDistrictList({ id: value });
      this.districtList = res;
    },
    closeVedmost() {
      this.isVedmost = false;
    },
    handleFile1(file) {
      this.formFile.collection_table_file = file;
    },
    handleFile2(file) {
      this.formFile.jobs_local_statements = file;
    },
    handleFile3(file) {
      this.formFile.basic_prices_table_file = file;
    },
    handleFile4(file) {
      this.formFile.project_design_file = file;
    },
    offerPeriodValidate(rule, value, callback) {
          if (value < 5 || value > 12) {
            // this.$refs.ruleForm.validateField('age');
            callback(new Error());
          } else {
            callback();
          }
    },
    formPercentageValidate(rule, value, callback){
      if(value < 0.1 || value > 2) {
        callback(new Error());
      } else {
        callback();
      }
    },
    formMinimumScore(){
      if(!this.form.risk_category || !this.form.starting_price) {
        this.$message.error('Ishtirokchilar uchun minimal reyting talabini hisoblash uchun xavf-xatar toifasi va boshlang`ich narxi to`ldirilishi kerak', 15);
        return false;
      }
      let equal = this.form.starting_price / this.salary
      let raiting = ''
      if(this.form.risk_category == 'category_1') {
        if (equal < 20000) raiting = 'D'
          else raiting = 'C'
      } else if (this.form.risk_category == 'category_2') {
          if(equal < 20000  ) raiting = 'D'
            else if (equal >= 20000 && equal < 40000 ) raiting = 'C'
              else if (equal >= 40000 && equal < 80000) raiting = 'CC'
                else raiting = 'CCC'
      } else if (this.form.risk_category == 'category_3') {
          if (equal < 40000) raiting = 'C'
            else if (equal >= 40000 && equal < 80000) raiting = 'CC'
              else if (equal >= 80000 && equal < 240000) raiting = 'CCC'
                else raiting = 'B'
      } else if (this.form.risk_category == 'category_4') {
          if (equal < 240000) raiting = 'CCC'
            else if (equal >= 240000 && equal < 400000) raiting = 'B'
              else raiting = 'BB'
      } else raiting = ''
      let value = this.minScoreList.find(item => item.title == raiting)
      this.form.participant_minimum_score = value.id
    },
    async sendFile(type) {
      if (type ) this.pending2 = true 
        else this.pending3 = true
      // let confirm = false
      // if (type) {
      //   Object.keys(this.formFile).forEach(key => {
      //     if (!this.formFile[key] || this.formFile[key].length == 0) {
      //       confirm = true
      //       return false
      //     } else confirm = false
      //   });
      //   Object.keys(this.form).forEach(key => {
      //     if (!this.form[key]) {
      //       confirm = true
      //       return false
      //     } else confirm = false
      //   });
      //   if (confirm) {
      //     this.$message.error('Iltimos barcha ma’lumotlarni to‘ldiring');
      //     return false
      //   }
      // } else {
        this.formFile.change_status = type;
        let f = new FormData()
        Object.keys(this.formFile).forEach((k) => {
          if (k == "collection_table_file" || k == "basic_prices_table_file" || k == "project_design_file" || k == "jobs_local_statements") {
            if (this.formFile && this.formFile[k] && this.formFile[k].file && this.formFile[k].file.extension) {
              console.log(this.formFile[k].file && this.formFile[k].file.extension)
            } else {
              this.formFile[k] && f.append(k, this.formFile[k], this.formFile[k] && this.formFile[k].name)
            }
          } else if (k == 'statements') {
            this.formFile[k].forEach((item) => {
              f.append(k, item)
            })
          } else {
            f.append(k, this.formFile[k])
          }
        })
        try {
          let res = await this.postDetail({ form: f, id: this.detail.id });
          if (res.status == 200) {
            this.$message.success('Malumotlar muvaffaqqiyatli saqlandi');
            this.tab.value = 2
            if (type) {
              this.$router.push({ path: '/cabinet/organizer/tenders' })
            }
          }
        } catch (error) {
          console.log(error);
        }
        this.pending2 = false;
        this.pending3 = false;
      // }
    },
    async StateListFunc() {
      let states = await this.StateList();
      this.stateList = states;
    }
  },
  async mounted() {
    let scores = await this.minimumScoreList();
    this.minScoreList = scores;
    let value = await this.salaryValue();
    this.salary = value.amount;
    let detail = this.detail
    Object.keys(this.form).forEach((k) => {
      if(k == 'participant_minimum_score') {
        this.form[k] = detail[k] && detail[k].level || null
      } else this.form[k] = detail[k];
    });
    this.form.region = detail.region && detail.region.id || null;
    this.form.district = detail.district && detail.district.id || null;
    this.form.payment_currency = 'uzs';
    this.changeRegion(this.form.region);
    // Object.keys(this.formFile).forEach((k) => {
    //   if(k == 'statements'){
    //     this.formFile[k] = detail && detail[k].map((item) => {
    //       return item.id
    //     })
    //   } else {
    //     this.formFile[k] = this.detail[k];
    //   }
    // });
    if (!this.form.operator_guarantee_account_number) {
      this.form.operator_guarantee_account_number = this.detail && this.detail.account_number
    } 
    if (!this.form.operator_commission_account_number) {
      this.form.operator_commission_account_number = this.detail && this.detail.account_number
    } 
    let res = await this.getRegionList();
    this.regionList = res;
    
    this.StateListFunc();
  },
};
</script>
