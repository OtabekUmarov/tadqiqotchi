<template>
  <div :class="['card', 'applicant-card', `${color}`]">
    <div class="card-header">
      <div >
        <span :class="['status', `${color}`]" style="font-weight:600">
          {{
            item.status == 'winner' ? "Go'lib" 
            : item.status == 'reserve_winner' ? "Zahira g‘olib" 
            : item.status == 'disclassified' ? "Chetlatilgan" 
            : item.status == 'rejected_winner' ? "G'olib rad etdi" 
            : "Ishtirokchi"}}
        </span>
        <!-- <i class="icon-question"></i> -->
      </div>
      <a @click.prevent="open()" class="link-a">
        <span>
          Batafsil
        </span>
        <i class="icon-angle-right"></i>
      </a>
    </div>
    <div class="card-body">
      <a-row type="flex" :gutter="[20, 0]">
        <a-col span="5">
          <p class="text-caption black3">Tashkilot nomi:</p>
          <h3 class="text-body1 black1">{{item.participant_tender_application && item.participant_tender_application.participant_organization_name}}</h3>
        </a-col>
        <a-col span="5">
          <p class="text-caption black3">STIR:</p>
          <h3 class="text-body1 black1">{{item.participant_tender_application && item.participant_tender_application.participant_organization_inn}}</h3>
        </a-col>
        <a-col span="4">
          <p class="text-caption black3">Tenderda olgan ball:</p>
          <h3 class="text-body1 black1">{{item.score}}</h3>
        </a-col>
        <a-col span="5">
          <p class="text-caption black3">Taklif narxi:</p>
          <h3 class="text-body1 black1">
            {{item.participant_tender_application && item.participant_tender_application.amount | priceFormat}} UZS
            </h3>
        </a-col>
        <a-col span="5">
          <p class="text-caption black3">Ishlarni yakunlash muddati:</p>
          <!-- <a-button type="primary" class="dark-grey">
            <i class="icon-download"></i>
            <small> Mavjud emas</small>
          </a-button> -->
          <h3 class="text-body1 black1">
            {{item.participant_tender_application && item.participant_tender_application.complete_days }} kun
            </h3>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    color() {
      return this.item.status === 'reserve_winner' ? '_blue' 
            : this.item.status == 'winner' ?  '_orange' 
            : this.item.status == 'rejected_winner' ? '_red' 
            : this.item.status == 'disclassified' ? '_red' 
            : '_grey' 
    }
  },
  methods: {
    open() {
      this.$emit('openModal', this.item.participant_tender_application.id)
    }
  },
};
</script>

<style>
</style>