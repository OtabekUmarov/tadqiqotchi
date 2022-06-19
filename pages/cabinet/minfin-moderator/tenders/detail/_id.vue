<template>
  <layouts title="Budjet" :isHeader="false">
    <template #body>
      <div class="flex-center mb-12">
        <span class="text-body1 black1 mr-16"> №{{ detail.id }} </span>
        <span :class="['status', 'mr-auto', `${detail.customStatus && detail.customStatus.type}`]">{{ detail &&
            detail.customStatus && detail.customStatus.title && detail.customStatus.title.uz
        }}</span>
        <div class="block-text grey">
          <span>
            {{ detail.created_at | timeFormat }} / {{ detail.created_at | dateFormat }}
          </span>
        </div>
      </div>
      <h2 class="title mb-20">
        {{ detail && detail.tender_name }}
      </h2>
      <a-row type="flex" :gutter="[20, 0]" class="border-bottom mb-24">
        <a-col span="8">
          <span class="text-caption black3">Tashkilotchi</span>
          <h3 class="title">{{ detail && detail.organizer && detail.organizer.organization_name }}</h3>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">Tender taklifini ta’minlash kafolati foizi:</span>
          <!-- <h3 class="title">1% (52 575 769 UZS)</h3> -->
          <h3 class="title">({{ detail && detail.guarantee_amount_percentage }}%) {{ detail.guarantee_amount }} UZS</h3>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">Tugash sanasi: </span>
          <h3 class="title">17K, 7S, 58DAQ. (03.05.2022)</h3>
        </a-col>
      </a-row>
      <CustomTab :tabs="tabs" v-model="tab" class="mb-24" />
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <template v-if="tab.value == 1">
          <a-collapse v-model="activeKey1" class="no-bg mb-32">
            <a-collapse-panel class="mb-40" key="1" header="Umumiy ma’lumotlar">
              <a-row type="flex" :gutter="[32, 20]">
                <a-col span="8">
                  <span class="text-caption black3">Obyekt sohasi</span>
                  <h3 class="text-body1 black1">{{ formListType(detail.tender_object_type, 'tenderObjectTypeList') }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Ishni amalga oshirish turi</span>
                  <h3 class="text-body1 black1">{{ formListType(detail.tender_work_type, 'tenderWorkTypeList') }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">ART raqami (Artitektura-rejalashtirish topshiriq)</span>
                  <h3 class="text-body1 black1">{{ detail && detail.architectural_number }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">“Shaharsozlik hujjatlari ekspertizasi” DUK xulosa
                    raqami</span>
                  <h3 class="text-body1 black1">{{ detail && detail.expert_number }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Obyektning xavf-xatar toifasi</span>
                  <h3 class="text-body1 black1">{{ formListType(detail.risk_category, 'riskCategoryList') }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Ishlarni yakunlash muddati</span>
                  <h3 class="text-body1 black1">{{ detail && detail.completion_period }} kun</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Taklifni kiritish muddati</span>
                  <h3 class="text-body1 black1">{{ detail && detail.offer_period }} ish kuni</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Buyurtmachi</span>
                  <h3 class="text-body1 black1">{{ detail && detail.customer && detail.customer.organization_name }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Obyekt hududi</span>
                  <h3 class="text-body1 black1">{{ detail && detail.region }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Shahar, tuman</span>
                  <h3 class="text-body1 black1">{{ detail && detail.district }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Obyekt manzili</span>
                  <h3 class="text-body1 black1">{{ detail && detail.address }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Litsensiya mavjudligi haqida talab mavjudligi</span>
                  <h3 class="text-body1 black1">{{ detail && detail.license_requirement == 'not_required' ? 'Ixtiyoriy'
                      :
                      'Majburiy'
                  }}</h3>
                </a-col>
              </a-row>
            </a-collapse-panel>
            <a-collapse-panel class="mb-40" key="2" header="To‘lov haqida ma’lumotlar">
              <a-row type="flex" :gutter="[32, 20]">
                <a-col span="8">
                  <span class="text-caption black3">Moliyalashtirish manbai</span>
                  <h3 class="text-body1 black1">
                    O‘zbekiston Respublikasi davlat budjeti
                  </h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">To‘lov valyutasi</span>
                  <h3 class="text-body1 black1">{{ formListType(detail.payment_currency, 'paymentCurrencyList') }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Boshlang’ich narx (QQS bilan)</span>
                  <h3 class="text-body1 black1">{{ detail && detail.starting_price }} (QQS bilan)</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Yildan yilga o‘tuvchi obyekt</span>
                  <h3 class="text-body1 black1">{{ detail && detail.year_to_year_project ? "Ha" : "Yo'q" }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Bu yil uchun ajratilgan mablag’
                  </span>
                  <h3 class="text-body1 black1">{{ detail && detail.current_year_price }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Tender taklifini ta’minlash kafolat foizi</span>
                  <h3 class="text-body1 black1">{{ detail && detail.guarantee_amount_percentage }}%</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Tender taklifini ta’minlash kafolat summasi
                  </span>
                  <h3 class="text-body1 black1">{{ detail && detail.guarantee_amount }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Tender taklifini ta’minlash kafolat summasi uchun hisob raqam
                  </span>
                  <h3 class="text-body1 black1">{{ detail && detail.operator_guarantee_account_number }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Tenderda ishtirok etish uchun operator komissiya summasi
                    uchun hisob raqam
                  </span>
                  <h3 class="text-body1 black1">{{ detail && detail.operator_commission_account_number }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">MFO</span>
                  <h3 class="text-body1 black1">{{ detail && detail.operator_bank_code }}</h3>
                </a-col>
              </a-row>
            </a-collapse-panel>
            <a-collapse-panel class="mb-32" key="3" header="Qo‘shimcha ma’lumotlar">
              <a-row type="flex" :gutter="[32, 20]">
                <a-col span="8">
                  <span class="text-caption black3">Telefon raqam</span>
                  <h3 class="text-body1 black1">+{{ detail && detail.organizer_phone }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Aloqa uchun shaxs</span>
                  <h3 class="text-body1 black1">{{ detail && detail.contact_full_name }}</h3>
                </a-col>
                <a-col span="8">
                  <span class="text-caption black3">Elektron manzil</span>
                  <h3 class="text-body1 black1">{{ detail && detail.customer_email }}</h3>
                </a-col>
                <a-col span="24">
                  <span class="text-caption black3">Ishtirokchilar uchun minimal o‘tish talabi</span>
                  <h3 class="text-body1 black1">
                    {{ detail && detail.participant_minimum_score && detail.participant_minimum_score.title }}
                    </h3>
                </a-col>
                <a-col span="24">
                  <span class="text-caption black3">Qo‘shimcha ma’lumot</span>
                  <h3 class="text-body1 black1">{{ detail && detail.description }}</h3>
                </a-col>
              </a-row>
            </a-collapse-panel>
          </a-collapse>
        </template>
        <template v-else>
          <a-collapse v-model="activeKey2" class="no-bg border-bottom mb-32">
            <a-collapse-panel class="mb-40" key="1"
              header="Lokal resurs (ish haqi, mashina va mexanizmlar hajmi vedomostlari)">
              <a-row type="flex" :gutter="[32, 24]">
               <a-col span="24">
                <DetailFile 
                  title="Jamlanma jadval"
                  :file="detail && detail.collection_table_file"
                  :file_data="detail && detail.collection_table_file_data"
                />
              </a-col>
              <a-col span="24">
                <DetailFile 
                  title="Ishlarning lokal vedemostlari"
                  :file="detail && detail.jobs_local_statements"
                  :file_data="detail && detail.jobs_local_statements_data"
                />
              </a-col>
              <a-col span="24">
                <DetailFile 
                  title="Asosiy narxni shakllantiruvchi komponentlarga narxlar jadvali"
                  :file="detail && detail.basic_prices_table_file"
                  :file_data="detail && detail.basic_prices_table_file_data"
                />
              </a-col>
              <a-col span="24">
                <DetailFile 
                  title="Loyiha chizmasi"
                  :file="detail && detail.project_design_file"
                  :file_data="detail && detail.project_design_file_data"
                />
              </a-col>
              </a-row>
            </a-collapse-panel>
            <a-collapse-panel class="mb-8" key="2" header="Ishlarni bajarishning umumiy jadvali">
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
                        <tr v-for="(item, index) of detail && detail.statements" :key="item.id">
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.title }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </a-col>
              </a-row>
            </a-collapse-panel>
          </a-collapse>
          <!-- <div class="flex-center mb-20">
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
          </div> -->
        </template>
      </template>
      <div class="flex-center" v-if="detail.status == 'in_review_minfin'">
        <a-popconfirm title="Tenderni rad etmoqchimisiz ?" ok-text="Ha" cancel-text="Yo'q"
          @confirm="setStatus({ status: 'rejected_minfin' })">
          <a-button type="primary" class="grey-reject mr-20">Rad etish</a-button>
        </a-popconfirm>
        <a-popconfirm title="Tenderni tasdiqlamoqchimisiz?" ok-text="Ha" cancel-text="Yo'q"
          @confirm="setStatus({ status: 'active_lot' })">
          <a-button type="primary" class="green"> Tasdiqlash </a-button>
        </a-popconfirm>
      </div>
    </template>
  </layouts>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import formList from "@/constants/formList";

export default {
  middleware: 'minfinmoderator',
  data() {
    return {
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
      activeKey1: ["1", "2", "3"],
      activeKey2: ["1", "2"],
      form: {
        status: ""
      }
    };
  },
  computed: {
    ...mapGetters('minfin/tender', ['detail', 'loading'])
  },
  methods: {
    ...mapActions('minfin/tender', ['getDetail', 'putStatus']),
    formListType(type, list) {
      let arr = this.formList[list];
      let res = arr.find(item => item.value == type)
      return res && res.title && res.title[this.$i18n.locale];
    },

    async setStatus({ status }) {
      await this.putStatus({ status, id: this.$route.params.id });
      await this.getDetail({ id: this.$route.params.id });
    }
  },
  async mounted() {
    await this.getDetail({ id: this.$route.params.id })
  },
};
</script>
