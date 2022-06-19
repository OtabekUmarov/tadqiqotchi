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
            <i class="icon-filter" :class="{ active: isFilter }" @click="toggleFilter"></i>
          </div>
          <div class="flex-center all-filter-header border-bottom">
            <span class="text-caption black1">Vaqt <i class="icon-filter2 ml-4"></i></span>
            <span class="text-caption black1">
              <i class="icon-filter2 mr-4"></i>
              Narx
            </span>
          </div>
          <div class="all-list">
            <a-spin size="large" class="loader-list" v-if="listLoading" />
            <template v-else>
              <div :class="[{ active: item.id == activeTenderId }, 'all-list-item']" v-for="item of list" :key="item.id"
                @click="tenderActiveClick(item.id)">
                <div class="all-list-item-header">
                  <span>№{{item.id}}</span>
                  <span>Qoldi: {{item.remained_day}} kun</span>
                </div>
                <p>
                  {{ item.tender_name }}
                </p>
                <span>Narx: <b>{{item.starting_price | priceFormat}} UZS</b></span>
              </div>
              <!-- <a-button @click="more()" type="primary" class="green _32" style="margin: auto">Yana ko'rish</a-button> -->
            </template>
          </div>
        </div>
      </a-col>
      <a-col :span="isFilter ? '10' : '16'" v-if="list && list.length">
        <div class="content-2 _20">
          <a-spin size="large" class="loader-list" v-if="detailLoading" />
          <template v-else>
            <div class="flex-center mb-12">
              <span class="text-body0 mr-8">
                <i class="icon-sidebar-bookmark mr-8"></i>
                №{{detail.id}}</span>
              <div class="block-text grey mr-8">
                <span class="text-body0"> Boshlanish sanasi: 07.06.2022 </span>
              </div>
              <div class="block-text green">
                <span class="text-body0">Reyting {{detail.participant_minimum_score && detail.participant_minimum_score.title}}</span>
                <i class="icon-question"></i>
              </div>
              <div class="block-text blue ml-auto" v-if="detail.year_to_year_project">
                <span class="text-body0">Yildan yilga o‘tuvchi obyekt</span>
              </div>
            </div>
            <h3 class="text-body0-1 black1 mb-16">
              {{ detail.tender_name }}
            </h3>
            <div class="border-bottom _20 mb-20">
              <a-row :gutter="[20, 12]" type="flex">
                <a-col :span="isFilter ? '12' : '8'">
                  <span class="text-body0 black3">Boshlang‘ich narx (QQS bilan):</span>
                  <h3 class="text-body0-2 black1">{{detail.starting_price | priceFormat}} UZS</h3>
                </a-col>
                <a-col :span="isFilter ? '12' : '8'">
                  <span class="text-body0 black3">Tender taklifini ta’minlash kafolati foizi:</span>
                  <h3 class="text-body0-2 black1">{{detail.guarantee_amount_percentage}}% ({{detail.guarantee_amount | priceFormat}} UZS)</h3>
                </a-col>
                <a-col :span="isFilter ? '12' : '8'">
                  <span class="text-body0 black3">Tugash sanasi:</span>
                  <h3 class="text-body0-2 black1">
                    {{timer}} ({{detail.active_lot_end_date | dateFormat}})
                  </h3>
                </a-col>
              </a-row>
            </div>
            <div class="flex-center small-tab mb-12">
              <CustomTab :tabs="tabs" v-model="tab" />
              <a-button 
                v-if="detail.remained_second != 0 && !detail.participant_tender_application" 
                type="primary" class="green _32" @click="
                $router.push({
                  path: `/cabinet/participant/all/` + activeTenderId,
                })
              ">
                <i class="icon-user-plus"></i>
                <span>Qatnashish</span>
              </a-button>
            </div>
            <template v-if="tab.value == 1">
              <a-collapse v-model="activeKey" class="no-bg">
                <a-collapse-panel class="mb-20" key="1" ref="my" header="Umumiy ma’lumotlar">
                  <a-row :gutter="[20, 16]" type="flex">
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">Obyekt sohasi:</span>
                      <h3 class="text-body3 black1">Umumqurilish</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">Ishni amalga oshirish turi:</span>
                      <h3 class="text-body3 black1"> {{ formListType(detail.tender_work_type, 'tenderWorkTypeList') }}
                      </h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">ART raqami (Arxitektura-rejalashtirish topshiriq):
                      </span>
                      <h3 class="text-body3 black1">{{ detail && detail.architectural_number }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">
                        “Shaharsozlik hujjatlari ekspertizasi” DUK xulosa raqami:
                      </span>
                      <h3 class="text-body3 black1">{{ detail && detail.expert_number }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">
                        Obyektning xavf-xatar toifasi:
                      </span>
                      <h3 class="text-body3 black1">{{ formListType(detail.risk_category, 'riskCategoryList') }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">
                        Ishlarni yakunlash muddati:
                      </span>
                      <h3 class="text-body3 black1">{{ detail && detail.completion_period }} kun</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">
                        Taklifni kiritish muddati:
                      </span>
                      <h3 class="text-body3 black1">{{ detail && detail.offer_period }} ish kuni</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2"> Buyurtmachi: </span>
                      <h3 class="text-body3 black1">{{ detail && detail.customer && detail.customer.organization_name }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2"> Obyekt hududi: </span>
                      <h3 class="text-body3 black1">{{ detail && detail.region }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">
                        Obyekt shahri, tumani:
                      </span>
                      <h3 class="text-body3 black1">{{ detail && detail.district }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2"> Obyekt manzili: </span>
                      <h3 class="text-body3 black1">{{ detail && detail.address }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">
                        Litsensiya mavjudligi haqida talab mavjudligi:
                      </span>
                      <h3 class="text-body3 black1"> {{ detail && detail.license_requirement == 'not_required' ?
                          'Ixtiyoriy' :
                          'Majburiy'
                      }} </h3>
                    </a-col>
                  </a-row>
                </a-collapse-panel>
                <a-collapse-panel class="mb-20" key="2" ref="my" header="To‘lov haqida ma’lumotlar">
                  <a-row :gutter="[20, 16]" type="flex">
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">Moliyalashtirish manbai:</span>
                      <h3 class="text-body3 black1">
                        {{detail.payment_source == 'corparate_funds' ? 'Korporativ mablag‘lar' :'O‘zbekiston Respublikasi davlat budjeti'}}
                        
                      </h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">To‘lov valyutasi: </span>
                      <h3 class="text-body3 black1">{{ formListType(detail.payment_currency, 'paymentCurrencyList') }}
                      </h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">Boshlang‘ichnarx (QQS bilan):</span>
                      <h3 class="text-body3 black1">{{ detail && detail.starting_price | priceFormat }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">Yildan yilga o‘tovchi obyekt:</span>
                      <h3 class="text-body3 black1"> {{ detail && detail.year_to_year_project ? "Ha" : "Yo'q" }} </h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">Bu yil uchun ajratilgan mablag‘:</span>
                      <h3 class="text-body3 black1">{{ detail && detail.current_year_price | priceFormat }}</h3>
                    </a-col>
                    <a-col :span="isFilter ? '12' : '8'">
                      <span class="text-body0 black3 _2">Tender taklifini ta’minlash kafolat foizi</span>
                      <h3 class="text-body3 black1">{{ detail && detail.guarantee_amount_percentage }}%</h3>
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
            </template>
            <template v-else>
              <a-collapse v-model="activeKey2" class="no-bg">
                <a-collapse-panel class="mb-20" key="1"
                  header="Lokal resurs (ish haqi, mashina va mexanizmlar hajmi vedomostlari)">
                  <a-row type="flex" :gutter="[20, 16]">
                    <a-col span="24">
                      <label class="text-caption mb-8 black2">
                        Jamlanma jadval:
                      </label>
                      <div class="content _8" v-if="detail && detail.collection_table_file">
                        <a :href="detail && detail.collection_table_file" target="_blank"
                          class="text-body3 black1 with-icon">
                          <i class="icon-file mr-12"></i>

                          {{ detail && detail.collection_table_file_data && detail.collection_table_file_data.name }}{{
                              detail
                              &&
                              detail.collection_table_file_data && detail.collection_table_file_data.format
                          }}
                        </a>
                      </div>
                      <div class="content _8" v-else>
                        <h3 class="text-body4 black1">Yuklanmagan</h3>
                      </div>
                    </a-col>
                    <a-col span="24">
                      <label class="text-caption mb-8 black2">
                        Ishlarning lokal vedemostlari:
                      </label>
                      <div class="content _8" v-if="detail && detail.jobs_local_statements">
                        <a :href="detail && detail.jobs_local_statements" target="_blank"
                          class="text-body3 black1 with-icon">
                          <i class="icon-file mr-12"></i>

                          {{ detail && detail.jobs_local_statements_data && detail.jobs_local_statements_data.name }}{{
                              detail
                              &&
                              detail.jobs_local_statements_data && detail.jobs_local_statements_data.format
                          }}
                        </a>
                      </div>
                      <div class="content _8" v-else>
                        <h3 class="text-body4 black1">Yuklanmagan</h3>
                      </div>
                    </a-col>
                    <a-col span="24">
                      <label class="text-caption mb-8 black2">
                        Asosiy narxni shakllantiruvchi komponentlarga narxlar
                        jadvali:
                      </label>
                      <div class="content _8 " v-if="detail && detail.basic_prices_table_file">
                        <a :href="detail && detail.basic_prices_table_file" target="_blank"
                          class="text-body3 black1 with-icon">
                          <i class="icon-file mr-12"></i>

                          {{ detail && detail.basic_prices_table_file_data &&
                              detail.basic_prices_table_file_data.name
                          }}{{ detail && detail.basic_prices_table_file_data &&
    detail.basic_prices_table_file_data.format
}}
                        </a>
                      </div>
                      <div class="content _8" v-else>
                        <h3 class="text-body4 black1">Yuklanmagan</h3>
                      </div>
                    </a-col>
                    <a-col span="24">
                      <label class="text-caption mb-8 black2">
                        Loyiha chizmasi:
                      </label>
                      <div class="content _8" v-if="detail && detail.project_design_file">
                        <a :href="detail && detail.project_design_file" target="_blank"
                          class="text-body3 black1 with-icon">
                          <i class="icon-file mr-12"></i>
                          {{ detail && detail.project_design_file_data && detail.project_design_file_data.name }}{{
                              detail
                              &&
                              detail.project_design_file_data && detail.project_design_file_data.format
                          }}
                        </a>
                      </div>
                      <div class="content" v-else>
                        <h3 class="text-body4 black1">Yuklanmagan</h3>
                      </div>
                    </a-col>
                  </a-row>
                </a-collapse-panel>
                <a-collapse-panel key="2" header="Ishlarni bajarishning umumiy jadvali  ">
                  <div class="table4">
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
                </a-collapse-panel>
              </a-collapse>
            </template>
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
import { mapGetters, mapActions } from 'vuex'
import formList from "@/constants/formList";

export default {
  middleware: 'participant',
  data() {
    return {
      formList,
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
      pagination: {
        limit: 12,
        page: 1,  
      },
      time: 0,
      activeTenderId: null,
      interval: null,
    };
  },
  computed: {
    ...mapGetters('participant/tender', ['list', 'count', 'detailLoading', 'listLoading', 'statusList', 'detail']),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
        // status: this.tab.key,
      }
      return params
    },
    timer() {
      if (this.time > 0) {
        // let day = Math.floor(this.time / (3600*24));
        let hours = Math.ceil(this.time / 3600) - 1
        let day = Math.floor(hours / 24);
        let minutes = Math.ceil((this.time - hours * 3600) / 60) - 1
        // let seconds = this.time - hours * 3600 - minutes * 60 - 1
        hours = hours - day * 24;
        return `${day + 'K, '}${hours + "S"}, 
          ${minutes + "DAQ"}.`
      } else {
        return "Tugagan"
      }
    }
  },
  methods: {
    ...mapActions('participant/tender', ['getList', 'getDetail']),
    toggleFilter() {
      this.isFilter = !this.isFilter;
    },
    async tenderActiveClick(id) {
      this.activeTenderId = id;
      await this.fetchDetail();
    },
    async more() {
      this.pagination.page++;
      await this.fetchList();
    },
    async fetchList() {
      await this.getList({ params: this.params });
      this.activeTenderId = this.list && this.list[0] && this.list[0].id;
      await this.fetchDetail();
    },
    endDateTime() {
      if(this.time > 0) {
          this.interval = setTimeout(() => {
              this.time -= 1
              // console.log(this.time)
              if (this.time == 0) clearInterval(this.interval)
              this.endDateTime()
          }, 1000)
      }
    },
    async fetchDetail() {
      if (this.list.length) {
        this.time = 0
        clearInterval(this.interval)
        await this.getDetail({ id: this.activeTenderId });
        this.time = this.detail.remained_second || 0
        this.endDateTime()
      }
    },
    formListType(type, list) {
      let arr = this.formList[list];
      let res = arr.find(item => item.value == type)
      return res && res.title && res.title[this.$i18n.locale];
    },
  },
  async mounted() {
    await this.fetchList();
    
  },
};
</script>

<style>
</style>