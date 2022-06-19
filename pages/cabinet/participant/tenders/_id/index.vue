<template>
  <layouts
    title="Yuborilgan arizalar"
    :isHeader="false"
    class="detail detail-tender"
  >
    <template #body>
      <a-spin size="large" class="loader-list" v-if="detailLoading" />
      <template v-else>
        <div class="flex-center mb-12">
        <span class="text-body4 black1 mr-24">
          №{{ detail.account_number }}
        </span>
        <div class="block-text grey mr-24">
          <span>Boshlanish sanasi: {{ detail.active_lot_end_date | dateFormat }} </span>
        </div>
        <div class="block-text green mr-24">
          <span
            >Reyting
            {{
              detail.participant_minimum_score &&
              detail.participant_minimum_score.title
            }}</span
          >
          <i class="icon-question"></i>
        </div>
        <div class="block-text blue ml-auto" v-if="detail.year_to_year_project">
          <span> Yildan yilga o‘tuvchi obyekt</span>
        </div>
      </div>
      <h2 class="title mb-20">
        {{ detail.tender_name }}
      </h2>
      <a-row type="flex" class="border-bottom mb-24">
        <a-col span="8">
          <span class="text-caption black3"
            >Boshlang‘ich narx (QQS bilan):</span
          >
          <h2 class="title">{{ detail.starting_price | priceFormat }} UZS</h2>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">
            Tender taklifini ta’minlash kafolati foizi:
          </span>
          <h2 class="title">
            {{ detail.guarantee_amount_percentage }}% ({{
              detail.guarantee_amount | priceFormat
            }}
            UZS)
          </h2>
        </a-col>
        <a-col span="8">
          <span class="text-caption black3">Tugash sanasi:</span>
          <h2 class="title">
            {{ timer }} ({{ detail.active_lot_end_date | dateFormat }})
          </h2>
        </a-col>
        <a-col span="24" v-if="detail.is_winner && detail.status == 'winner_sign_waiting'">
          <div class="card applicant-card _orange mt-16">
            <div class="card-body flex-center">
              <div class="card-title">
                <h3>Siz ushbu lotning g‘olibisiz. </h3>
                <p>G'olib imzosini qoldiring</p>
              </div> 
            <a-button @click="winnerModal()"  type="primary" class="orange ml-auto">
              Tasdiqlash
            </a-button>
            </div>
          </div>
        </a-col>
      </a-row>
      <CustomTab :tabs="tabs" v-model="tab" class="mb-12" />
      <template v-if="tab.value == 1">
        <a-collapse v-model="activeKey" class="no-bg mb-32">
          <a-collapse-panel class="mb-40" key="1" header="Umumiy ma’lumotlar">
            <a-row type="flex" :gutter="[32, 20]">
              <a-col span="8">
                <span class="text-caption black3">Obyekt sohasi</span>
                <h3 class="text-body1 black1">
                  {{
                    formListType(
                      detail.tender_object_type,
                      "tenderObjectTypeList"
                    )
                  }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Ishni amalga oshirish turi</span
                >
                <h3 class="text-body1 black1">
                  {{
                    formListType(detail.tender_work_type, "tenderWorkTypeList")
                  }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >ART raqami (Artitektura-rejalashtirish topshiriq)</span
                >
                <h3 class="text-body1 black1">
                  {{ detail && detail.architectural_number }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >“Shaharsozlik hujjatlari ekspertizasi” DUK xulosa
                  raqami</span
                >
                <h3 class="text-body1 black1">
                  {{ detail && detail.expert_number }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Obyektning xavf-xatar toifasi</span
                >
                <h3 class="text-body1 black1">
                  {{ formListType(detail.risk_category, "riskCategoryList") }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Ishlarni yakunlash muddati</span
                >
                <h3 class="text-body1 black1">
                  {{ detail && detail.completion_period }} kun
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Taklifni kiritish muddati</span
                >
                <h3 class="text-body1 black1">
                  {{ detail && detail.offer_period }} ish kuni
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Buyurtmachi</span>
                <h3 class="text-body1 black1">
                  {{
                    detail &&
                    detail.customer &&
                    detail.customer.organization_name
                  }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Obyekt hududi</span>
                <h3 class="text-body1 black1">{{ detail && detail.region }}</h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Shahar, tuman</span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.district }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Obyekt manzili</span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.address }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Litsensiya mavjudligi haqida talab mavjudligi</span
                >
                <h3 class="text-body1 black1">
                  {{
                    detail && detail.license_requirement == "not_required"
                      ? "Ixtiyoriy"
                      : "Majburiy"
                  }}
                </h3>
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
                <h3 class="text-body1 black1">
                  {{
                    formListType(detail.payment_currency, "paymentCurrencyList")
                  }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Boshlang’ich narx (QQS bilan)</span
                >
                <h3 class="text-body1 black1">
                  {{ detail && detail.starting_price | priceFormat }} (QQS
                  bilan)
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Yildan yilga o‘tuvchi obyekt</span
                >
                <h3 class="text-body1 black1">
                  {{ detail && detail.year_to_year_project ? "Ha" : "Yo'q" }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Bu yil uchun ajratilgan mablag’
                </span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.current_year_price | priceFormat }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tender taklifini ta’minlash kafolat foizi</span
                >
                <h3 class="text-body1 black1">
                  {{ detail && detail.guarantee_amount_percentage }}%
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tender taklifini ta’minlash kafolat summasi
                </span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.guarantee_amount }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tender taklifini ta’minlash kafolat summasi uchun hisob raqam
                </span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.operator_guarantee_account_number }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3"
                  >Tenderda ishtirok etish uchun operator komissiya summasi
                  uchun hisob raqam
                </span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.operator_commission_account_number }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">MFO</span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.operator_bank_code }}
                </h3>
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
                <h3 class="text-body1 black1">
                  +{{ detail && detail.organizer_phone }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Aloqa uchun shaxs</span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.contact_full_name }}
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Elektron manzil</span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.customer_email }}
                </h3>
              </a-col>
              <a-col span="24">
                <span class="text-caption black3"
                  >Ishtirokchilar uchun minimal o‘tish talabi</span
                >
                <h3 class="text-body1 black1">
                  {{
                    detail &&
                    detail.participant_minimum_score &&
                    detail.participant_minimum_score.title
                  }}
                </h3>
              </a-col>
              <a-col span="24">
                <span class="text-caption black3">Qo‘shimcha ma’lumot</span>
                <h3 class="text-body1 black1">
                  {{ detail && detail.description }}
                </h3>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </template>
      <template v-else-if="tab.value == 2">
        <a-collapse v-model="activeKey2" class="no-bg border-bottom mb-32">
          <a-collapse-panel
            class="mb-40"
            key="1"
            header="Lokal resurs (ish haqi, mashina va mexanizmlar hajmi vedomostlari)"
          >
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
                      <tr
                        v-for="(item, index) of detail && detail.statements"
                        :key="item.id"
                      >
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
      <template v-else-if="tab.value == 3">
        <a-collapse v-model="activeKey4" class="no-bg mb-32">
          <a-collapse-panel
            class="mb-32"
            key="1"
            header="Tender predmeti bo‘yicha ishlarni bajarishga narx taklifi"
          >
            <a-row type="flex" :gutter="[32, 20]">
              <a-col span="8">
                <span class="text-caption black3">Narx taklifi </span>
                <h3 class="text-body1 black1">
                  {{ application.amount | priceFormat }} UZS
                </h3>
              </a-col>
              <a-col span="8">
                <span class="text-caption black3">Vaqt taklifi </span>
                <h3 class="text-body1 black1">
                  {{ application.complete_days }} kun
                </h3>
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel class="mb-32" key="2" header="Hujjatlar">
            <a-row type="flex" :gutter="[32, 24]">
              <a-col span="24">
                <DetailFile
                  title="Jamlanma jadval"
                  :file="application && application.collection_table_file"
                  :file_data="
                    application && application.collection_table_file_data
                  "
                />
              </a-col>
              <a-col span="24">
                <DetailFile
                  title="Ishlarning lokal vedemostlari"
                  :file="application && application.jobs_local_statements"
                  :file_data="
                    application && application.jobs_local_statements_data
                  "
                />
              </a-col>
              <a-col span="24">
                <DetailFile
                  title="Asosiy narxni shakllantiruvchi komponentlarga narxlar jadvali"
                  :file="application && application.basic_prices_table_file"
                  :file_data="
                    application && application.basic_prices_table_file_data
                  "
                />
              </a-col>
              <a-col span="24">
                <DetailFile
                  title="Loyiha chizmasi"
                  :file="application && application.project_design_file"
                  :file_data="
                    application && application.project_design_file_data
                  "
                />
              </a-col>
            </a-row>
          </a-collapse-panel>
          <a-collapse-panel
            class="mb-32"
            key="3"
            header="Ishlarni bajarishning umumiy jadvali"
          >
            <div class="table2">
              <table>
                <thead>
                  <tr>
                    <th width="1%">№</th>
                    <th>Obyektning lokal vedmostlari bo‘yicha</th>
                    <th>Ishlarni boshlash sanasi</th>
                    <th>Ishlarni tugatish sanasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      item, index
                    ) in application.participant_tender_statement"
                    :key="item.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.statement && item.statement.title }}</td>
                    <td>{{ item.start_date | dateFormat }}</td>
                    <td>{{ item.end_date | dateFormat }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a-collapse-panel>
          <a-collapse-panel
            class="mb-32"
            key="4"
            header="Moliyalashtirish jadvali"
          >
            <DetailTableMonth
              :detail="application.participant_project_finance_plan"
            />
          </a-collapse-panel>
          <a-collapse-panel
            class="mb-32"
            key="5"
            header="To'lov kvitansiyalari"
          >
            <CustomTab :tabs="invoiceTabs" v-model="invoiceTab" class="mb-12" />
            <template v-if="invoiceTab.value == 1">
              <CardsParticipantInvoice1 :indata="guaranteeAmount" />
            </template>
            <template v-else>
              <CardsParticipantInvoice2 :indata="guaranteeCommission" />
            </template>
          </a-collapse-panel>
          <div></div>
        </a-collapse>
      </template>
      <template v-else>
        <a-collapse
          v-model="activeKey3"
          class="no-bg mb-24"
          expand-icon-position="right"
        >
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
                  {{detail.tender_protocol_participant_result_winner && 
                    detail.tender_protocol_participant_result_winner.participant_tender_application && 
                    detail.tender_protocol_participant_result_winner.participant_tender_application.participant && 
                    detail.tender_protocol_participant_result_winner.participant_tender_application.participant.organization_name
                  }}
                </h2>
              </a-col>
              <a-col span="8">
                <p class="text-caption black3">Tender raqami:</p>
                <h2 class="text-body1 black1">
                  {{
                    detail.id
                  }}
                </h2>
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
                <h2 class="text-body1 black1">
                  {{
                    detail.tendercontract && detail.tendercontract.id
                  }}
                </h2>
              </a-col>
              <a-col span="8">
                <p class="text-caption black3">Ishtirokchilar soni:</p>
                <h2 class="text-body1 black1">2</h2>
              </a-col>
              <a-col span="8">
                <p class="text-caption black3">Hudud:</p>
                <h2 class="text-body1 black1">{{ detail.region }}</h2>
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
                            detail.tender_protocol_participant_result_winner.participant_tender_application.participant.participant_rating_category}}
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
                            detail.tender_protocol_participant_result_winner.participant_tender_application.amount | priceFormat}} UZS</h3>
                        </a-col>
                        <a-col span="6">
                          <p class="text-caption black3">Taklif bergan sana:</p>
                          <h3 class="text-body1 black1">
                            {{
                              detail.tender_protocol_participant_result_winner &&
                              detail.tender_protocol_participant_result_winner.participant_tender_application && 
                              detail.tender_protocol_participant_result_winner.participant_tender_application.created_at | dateFormat
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
      </template>
      </template>
      <popupsWinner :isVisible="isWinner" @fetch="fetchDetail" @close="close" :winnerId='winnerId'/>
    </template>
  </layouts>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import formList from "@/constants/formList";

export default {
  middleware: "participant",
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
        {
          title: "Mening ma'lumotlarim",
          value: 3,
        },
        {
          title: "Natijalar",
          value: 4,
        },
      ],
      tab: {
        title: "Umumiy ma'lumotlar",
        value: 1,
      },
      invoiceTabs: [
        {
          title: "Kafolat summa uchun",
          value: 1,
        },
        {
          title: "Komissiya uchun",
          value: 2,
        },
      ],
      invoiceTab: {
        title: "Faktura",
        value: 1,
      },
      activeKey: ["1", "2", "3"],
      activeKey2: ["1", "2"],
      activeKey3: ["1"],
      activeKey4: ["1", "2", "3", "4"],
      time: null,
      interval: null,
      application: {},
      winnerId: null,
      isWinner: false,
    };
  },
  computed: {
    ...mapGetters("participant/tender", ["detail", "detailLoading"]),
    timer() {
      if (this.time > 0) {
        // let day = Math.floor(this.time / (3600*24));
        let hours = Math.ceil(this.time / 3600) - 1;
        let day = Math.floor(hours / 24);
        let minutes = Math.ceil((this.time - hours * 3600) / 60) - 1;
        // let seconds = this.time - hours * 3600 - minutes * 60 - 1
        hours = hours - day * 24;
        return `${day + "K, "}${hours + "S"}, 
          ${minutes + "DAQ"}.`;
      } else {
        return "Tugagan";
      }
    },
    guaranteeCommission() {
      return (
        this.detail.participant_tender_application &&
        this.detail.participant_tender_application.participant_payment.find(
          (item) => item.type == "guarantee_commission"
        )
      );
    },
    guaranteeAmount() {
      return (
        this.detail.participant_tender_application &&
        this.detail.participant_tender_application.participant_payment.find(
          (item) => item.type == "guarantee_amount"
        )
      );
    },
  },
  methods: {
    ...mapActions("participant/tender", ["getDetail"]),
    endDateTime() {
      if (this.time > 0) {
        this.interval = setTimeout(() => {
          this.time -= 1;
          // console.log(this.time)
          if (this.time == 0) clearInterval(this.interval);
          this.endDateTime();
        }, 1000);
      }
    },
    winnerModal() {
      this.winnerId = +this.$route.params.id;
      this.isWinner = true;
    },
    close() {
      this.isWinner = false;
    },
    formListType(type, list) {
      let arr = this.formList[list];
      let res = arr.find((item) => item.value == type);
      return res && res.title && res.title[this.$i18n.locale];
    },
    async fetchDetail() {
      await this.getDetail({ id: this.$route.params.id, myDetail: true });
    }
  },
  async mounted() {
    await this.fetchDetail();
    this.application = this.detail.participant_tender_application;
    this.time = 0;
    clearInterval(this.interval);
    this.time = this.detail.remained_second || 0;
    this.endDateTime();
  },
};
</script>
