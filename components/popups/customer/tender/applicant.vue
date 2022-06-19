<template>
  <popups-layout
    Width="750px"
    @close="close"
    title="Ishtirokchi haqida batafsil ma’lumot"
    :isVisible="isVisible"
  >
    <template #body>
      <a-row :gutter="[20, 16]" class="mb-16">
        <a-col span="24">
          <p class="text-caption black3">Tashkilot nomi:</p>
          <h3 class="text-body3 black1">{{detail.organization_name}}</h3>
        </a-col>
        <a-col span="8">
          <a-row :gutter="[0, 16]">
            <a-col span="24">
              <p class="text-caption black3">STIR:</p>
              <h3 class="text-body3 black1">{{detail.inn}}</h3>
            </a-col>
            <a-col span="24">
              <p class="text-caption black3">Umumiy ball:</p>
              <h3 class="text-body3 black1">{{detail.score}}</h3>
            </a-col>
            <a-col span="24">
              <p class="text-caption black3">Fayl 1:</p>
              <a :href="detail.collection_table_file" download target="_blank" type="primary" class="blue ant-btn-primary ant-btn">
              <template v-if="detail.collection_table_file">
                <i class="icon-download"></i>
                <small>Yuklab olish</small>
              </template>
              <template v-else>
                <small>Yuklanmagan</small>
              </template>
              </a>
            </a-col>
            <a-col span="24">
              <p class="text-caption black3">Fayl 4:</p>
              <a :href="detail.project_design_file" download target="_blank" type="primary" class="blue ant-btn-primary ant-btn">
                <template v-if="detail.project_design_file">
                <i class="icon-download"></i>
                <small>Yuklab olish</small>
              </template>
              <template v-else>
                <small>Yuklanmagan</small>
              </template>
              </a>
            </a-col>
          </a-row>
        </a-col>
        <a-col span="8">
          <a-row :gutter="[0, 16]">
            <a-col span="24">
              <p class="text-caption black3">Taklif narxi:</p>
              <h3 class="text-body3 black1">{{detail.amount | priceFormat}} UZS</h3>
            </a-col>
            <a-col span="24">
              <p class="text-caption black3">Taklif qilgan kun:</p>
              <h3 class="text-body3 black1">{{detail.complete_days}} kun</h3>
            </a-col>
            <a-col span="24">
              <p class="text-caption black3">Fayl 2:</p>
              <a :href="detail.jobs_local_statements" download target="_blank" type="primary" class="blue ant-btn-primary ant-btn">
                <template v-if="detail.jobs_local_statements">
                <i class="icon-download"></i>
                <small>Yuklab olish</small>
              </template>
              <template v-else>
                <small>Yuklanmagan</small>
              </template>
              </a>
            </a-col>
          </a-row>
        </a-col>
        <a-col span="8">
          <a-row :gutter="[0, 16]">
            <a-col span="24">
              <p class="text-caption black3">Reyting:</p>
              <h3 class="text-body3 black1">B</h3>
            </a-col>
            <a-col span="24" class="invisible">
              <p class="text-caption black3">Reyting:</p>
              <h3 class="text-body3 black1">B</h3>
            </a-col>
            <a-col span="24">
              <p class="text-caption black3">Fayl: 3</p>
              <a :href="detail.basic_prices_table_file" download target="_blank" type="primary" class="blue ant-btn-primary ant-btn">
                <template v-if="detail.basic_prices_table_file">
                <i class="icon-download"></i>
                <small>Yuklab olish</small>
              </template>
              <template v-else>
                <small>Yuklanmagan</small>
              </template>
              </a>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <div class="table2 mb-24">
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
            <tr v-for="(item, index) in detail.participant_tender_statements" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.statement && item.statement.title }}</td>
              <td>{{ item.start_date | dateFormat}}</td>
              <td>{{ item.end_date | dateFormat}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DetailTableMonth v-if="isVisible" :detail="detail && detail.participant_project_financial_plans"/>
    </template>
    <template #footer>
      <a-button class="green" type="primary" @click="close"> Yopish </a-button>
    </template>
  </popups-layout>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: {}
    },
    isVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>