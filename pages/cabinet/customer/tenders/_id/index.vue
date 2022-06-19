<template>
  <layouts title="Yuborilgan arizalar" :isHeader="false" class="detail detail-tender">
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="flex-center mb-12">
          <span class="text-body4 black1 mr-24"> №{{ detail.id }} </span>
          <div class="block-text grey mr-24">
            <span>Boshlanish sanasi: {{ detail.active_lot_start_date | dateFormat }} </span>
          </div>
          <div class="block-text green mr-24">
            <span>Reyting {{ detail.participant_minimum_score && detail.participant_minimum_score.title }}</span>
            <i class="icon-question"></i>
          </div>
          <div class="block-text blue ml-auto" v-if="detail.year_to_year_project">
            <span> Yildan yilga o‘tuvchi obyekt</span>
          </div>
        </div>
        <div class="block-text green mr-24">
          <span>Reyting {{ detail.participant_minimum_score && detail.participant_minimum_score.title }}</span>
          <i class="icon-question"></i>
        </div>
        <div class="block-text blue ml-auto" v-if="detail.year_to_year_project">
          <span> Yildan yilga o‘tuvchi obyekt</span>
        </div>
      <h2 class="title mb-20">
        {{ detail.tender_name }}
      </h2>
      <a-row type="flex" class="border-bottom mb-24">
        <a-col span="8">
          <span class="text-caption black3">Boshlang‘ich narx (QQS bilan):</span>
          <h2 class="title">{{detail.starting_price | priceFormat}} UZS</h2>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">
            Tender taklifini ta’minlash kafolati foizi:
          </span>
          <h2 class="title">{{detail.guarantee_amount_percentage}}% ({{detail.guarantee_amount | priceFormat}} UZS)</h2>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">Tugash vaqti:</span>
          <h2 class="title">{{timer}} 
            <template v-if="timer > 0">
              ({{detail.active_lot_end_date | dateFormat}})
            </template>
          </h2>
        </a-col>
      </a-row>
      <CustomTab :tabs="tabs" v-model="tab" class="mb-12"/>
      <template v-if="tab.value == 1">
        <a-collapse v-model="activeKey" class="no-bg mb-32">
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
                <h3 class="text-body1 black1">{{ detail.region && detail.region.title }}</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Shahar, tuman</span>
                <h3 class="text-body1 black1">{{ detail.district && detail.district.title }}</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Obyekt manzili</span>
                <h3 class="text-body1 black1">{{ detail && detail.address }}</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Litsensiya mavjudligi haqida talab mavjudligi</span>
                <h3 class="text-body1 black1">{{ detail && detail.license_requirement == 'not_required' ? 'Ixtiyoriy' :
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
                <h3 class="text-body1 black1">{{ detail && detail.starting_price | priceFormat }} (QQS bilan)</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Yildan yilga o‘tuvchi obyekt</span>
                <h3 class="text-body1 black1">{{ detail && detail.year_to_year_project ? "Ha" : "Yo'q" }}</h3>
              </a-col>
              <a-col span="8" v-if="detail.current_year_price">
                <span class="text-caption black3">Bu yil uchun ajratilgan mablag’
                </span>
                <h3 class="text-body1 black1">{{ detail && detail.current_year_price | priceFormat }}</h3>
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
                <h3 class="text-body1 black1">{{ detail && detail.participant_minimum_score &&
                    detail.participant_minimum_score.title
                }}</h3>
              </a-col>
              <a-col span="24">
                <span class="text-caption black3">Qo‘shimcha ma’lumot</span>
                <h3 class="text-body1 black1">{{ detail && detail.description }}</h3>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </template>
      <template v-else-if="tab.value == 2">
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
                        <td>{{ item.title_uz || item.title }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </template>
      <template v-else>
          <a-collapse v-model="activeKey3" class="no-bg mb-24" expand-icon-position="right">
            <a-collapse-panel key="1" :header="tab.title">
              <a-row :gutter="[0, 20]" type="flex">
                <a-col span="24">
                  <p class="text-caption black3">Tender nomi:</p>
                  <h2 class="text-body1 black1">
                    {{ detail.tender_name }}
                  </h2>
                </a-col>
                <a-col span="8">
                  <p class="text-caption black3">G‘olib:</p>
                  <h2 class="text-body1 black1">
                    {{
                        detail.tender_protocol_participant_result_winner &&
                        detail.tender_protocol_participant_result_winner.participant_tender_application &&
                        detail.tender_protocol_participant_result_winner.participant_tender_application.participant &&
                        detail.tender_protocol_participant_result_winner.participant_tender_application.participant.organization_name
                    }}
                  </h2>
                </a-col>
                <a-col span="8">
                  <p class="text-caption black3">Tender raqami:</p>
                  <h2 class="text-body1 black1">{{ detail.tender_protocol }}</h2>
                </a-col>
                <a-col span="8">
                  <p class="text-caption black3">STIR:</p>
                  <h2 class="text-body1 black1">
                    {{
                        detail.tender_protocol_participant_result_winner &&
                        detail.tender_protocol_participant_result_winner.participant_tender_application &&
                        detail.tender_protocol_participant_result_winner.participant_tender_application.participant &&
                        detail.tender_protocol_participant_result_winner.participant_tender_application.participant.inn
                    }}
                  </h2>
                </a-col>
                <a-col span="8">
                  <p class="text-caption black3">Bayon raqami:</p>
                  <h2 class="text-body1 black1">{{detail.tendercontract && detail.tendercontract.id}}</h2>
                </a-col>
                <a-col span="8">
                  <p class="text-caption black3">Ishtirokchilar soni:</p>
                  <h2 class="text-body1 black1">{{ detail.tender_participant_application_count }}</h2>
                </a-col>
                <a-col span="8">
                  <p class="text-caption black3">Hudud:</p>
                  <h2 class="text-body1 black1">{{ detail.region && detail.region.title }} </h2>
                </a-col>
                <a-col span="24">
                  <div class="card applicant-card">
                    <div class="card-header">
                      <div class="block-text green">
                        <span>Reyting
                          {{
                              detail.tender_protocol_participant_result_winner &&
                              detail.tender_protocol_participant_result_winner.participant_tender_application &&
                              detail.tender_protocol_participant_result_winner.participant_tender_application.participant &&
                              detail.tender_protocol_participant_result_winner.participant_tender_application.participant.participant_rating_category
                          }}
                        </span>
                        <i class="icon-question"></i>
                      </div>
                      <nuxt-link :to="{
                        path: '/cabinet/customer/tenders/' + $route.params.id + '/applicants',
                        query: {
                          protocol: detail.tender_protocol
                        }
                      }" class="link-a">
                        <span>
                          Batafsil
                        </span>
                        <i class="icon-angle-right"></i>
                      </nuxt-link>
                    </div>
                    <div class="card-body">
                      <a-row type="flex" :gutter="[20, 0]">
                        <a-col span="6">
                          <p class="text-caption black3">Tender taklifi:</p>
                          <h3 class="text-body1 black1">
                            {{
                                detail.tender_protocol_participant_result_winner &&
                                detail.tender_protocol_participant_result_winner.participant_tender_application &&
                                detail.tender_protocol_participant_result_winner.participant_tender_application.amount |
                                priceFormat
                            }} UZS</h3>
                        </a-col>
                        <a-col span="6">
                          <p class="text-caption black3">Taklif bergan sana:</p>
                          <h3 class="text-body1 black1">
                            {{
                                detail.tender_protocol_participant_result_winner &&
                                detail.tender_protocol_participant_result_winner.participant_tender_application &&
                                detail.tender_protocol_participant_result_winner.participant_tender_application.created_at |
                                dateFormat
                            }}
                          </h3>
                        </a-col>
                        <a-col span="6">
                          <p class="text-caption black3">Yakuniy ball:</p>
                          <h3 class="text-body1 black1">{{
                              detail.tender_protocol_participant_result_winner &&
                              detail.tender_protocol_participant_result_winner.score
                          }}</h3>
                        </a-col>
                        <a-col span="6">
                          <p class="text-caption black3">Bayon:</p>
                          <template v-if="detail.tendercontract">
                            <a :href="detail.tendercontract && detail.tendercontract.attachment" class="green ant-btn-primary ant-btn">
                              <i class="icon-download"></i>
                              Yuklab olish
                            </a>
                          </template>
                          <a-button v-else type="primary" class="dark-grey">
                            <i class="icon-download"></i>
                            <small> Mavjud emas</small>
                          </a-button>
                        </a-col>
                      </a-row>
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-collapse-panel>
          </a-collapse>
          <template v-if="detail.status == 'trade_executed' && !detail.tendercontract">
            <h3 class="text-body1 black1 mb-12">Shartnoma</h3>
            <CustomUploaderN1 @change="handleChange" class="mb-32" />
            <a-button :loading='pending1' @click="sendContract" type="primary" class="green"> Saqlash </a-button>
          </template>
        </template>
        <a-row v-if="detail.status == 'customer_sign_waiting'" type="flex" :gutter="[16, 0]">
          <a-col>
            <a-button type="primary" @click="rejected" class="grey-reject"> Rad etish </a-button>
          </a-col>
          <a-col>
            <a-popconfirm title="Tenderni qabul qilasizmi?" ok-text="Ha" cancel-text="Yo'q" @confirm="approved()">
              <a-button :loading='pending' type="primary" class="green"> Qabul qilish </a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
        <PopupsCustomerReject :id="activeId" :isVisible="isVisible" @close="close" @fetch='fetchDetail' />
      </template>
    </template>
  </layouts>
</template>

<script>
import formList from "@/constants/formList";
import { mapActions, mapGetters } from 'vuex';
export default {
  middleware: 'customer',
  data() {
    return {
      formList,
      activeId: null,
      isVisible: false,
      pending: false,
      tabs: [
        {
          title: "Umumiy ma’lumotlar",
          value: 1,
        },
        {
          title: "Hujjatlar",
          value: 2,
        },
        // {
        //   title: "Natijalar",
        //   value: 3,
        // },
      ],
      tab: {
        title: "Umumiy ma’lumotlar",
        value: 1,
      },
      form: {
        attachment: null,
        tender: null,
      },
      activeKey: ["1", "2", "3"],
      activeKey2: ["1", "2"],
      activeKey3: ["1"],
      tender_protocol: null,
      protocol: null,
      time: null,
      interval: null,
      pending1: false,
    };
  },
  computed: {
    ...mapGetters('customer/tender', ['detail', 'loading']),
    timer() {
      if (this.time > 0) {
        let hours = Math.ceil(this.time / 3600) - 1
        let day = Math.floor(hours / 24);
        let minutes = Math.ceil((this.time - hours * 3600) / 60) - 1
        hours = hours - day * 24;
        return `${day + 'K, '}${hours + "S"}, 
          ${minutes + "DAQ"}.`
      } else {
        return "Tugagan"
      }
    },
  },
  methods: {
    ...mapActions('customer/tender', ['getDetail', 'approve', 'postContract']),
    async fetchDetail() {
      await this.getDetail({ id: this.$route.params.id });
    },
    handleChange(info) {
      this.form.attachment = info;
    },
    async sendContract() {
      this.pending1 = true;
      this.form.tender = this.$route.params.id;
      let f = new FormData()
      Object.keys(this.form).forEach((k) => {
        if (k == "attachment") {
          if (this.form[k] && this.form[k].file && this.form[k].file.extension) {
            console.log(this.form[k] && this.form[k].file && this.form[k].file.extension)
          } else {
            this.form[k] && f.append(k, this.form[k], this.form[k].name)
          }
        } else {
          f.append(k, this.form[k])
        }
      })
      await this.postContract({ form: f }).then(res => {
        if (res.status >= 200 && res.status < 400) {
          this.$message.success("Muvaffaqiyatli saqlandi");
          this.fetchDetail();
          this.close();
        }
      }).catch(error => {
        this.$message.error('Xatolik');
      })
      this.pending1 = false;
    },
    endDateTime() {
      if(this.time > 0) {
          this.interval = setTimeout(() => {
              this.time -= 1
              if (this.time == 0) clearInterval(this.interval)
              this.endDateTime()
          }, 1000)
      }
    },
    formListType(type, list) {
      let arr = this.formList[list];
      let res = arr.find(item => item.value == type)
      return res && res.title && res.title[this.$i18n.locale];
    },
    close() {
      this.isVisible = false;
      this.activeId = null;
    },
    async approved() {
      this.pending = true;
      await this.approve({ status: 'winner_sign_waiting', id: this.$route.params.id });
      this.fetchDetail()
      this.pending = false;
    },
    rejected() {
      this.activeId = this.$route.params.id;
      this.isVisible = true;
    },
  },
  async mounted() {
    await this.fetchDetail();
    this.time = 0
    clearInterval(this.interval)
    this.time = this.detail.remained_second || 0
    this.endDateTime()
    if (this.detail && this.detail.customStatus && this.detail.customStatus.value >= 6 && this.detail.status != 'trade_not_executed') {
      this.tabs.push({
        title: "Natijalar",
        value: 3,
      });
    }
  },
};
</script>
