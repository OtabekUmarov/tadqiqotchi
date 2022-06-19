<template>
  <div class="card application-card">
    <div class="card-header">
      <h4 class="text-body4 black1">№{{ data && data.id }}</h4>
      <small
        :class="['status', `${data.customStatus && data.customStatus.type}`]"
      >
        {{
          data.customStatus &&
          data.customStatus.title &&
          data.customStatus.title.uz
        }}
      </small>
      <a-dropdown :trigger="['click']" placement="bottomRight" v-if="data.status == 'rejected_organizer'">
        <i class="icon-dots"></i>
        <ul class="table-dropdown" slot="overlay">
          <li class="green">
            <i class="icon-resend"></i>
            <span>Qayta yuborish</span>
          </li>
        </ul>
      </a-dropdown>
    </div>
    <div class="card-body flex-center">
      <div>
        <span class="text-caption black3"> Tashkilotchi </span>
        <h3 class="text-body1 black1">{{ data && data.organizer }}</h3>
      </div>
      <div class="ml-auto">
        <span class="text-caption black3"> Hisob raqam </span>
        <h3 class="text-body1 black1">{{ data && data.account_number }}</h3>
      </div>
    </div>
    <div class="card-footer">
      <ul style="align-items:center">
        <li>
          <span class="text-caption black3"> Yuborilgan sana </span>
          <h4 class="text-body4 black1">
            {{ data.created_at | timeFormat }} /
            {{ data.created_at | dateFormat }}
          </h4>
        </li>
        <li
          v-if="data.status == 'rejected_organizer'"
          style="width: max-content;" class="ml-auto"
          >
          <a-dropdown :trigger="['click']" placement="bottomLeft">
            <span class="text-caption black3"
              >Izoh <i class="icon-angle-down"></i>
            </span>
            <div class="card-comment" slot="overlay">
              <p>{{comment}}</p>
            </div>
          </a-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    comment() {
      return this.data && 
      this.data.rejected_tender_application && 
      this.data.rejected_tender_application[0] && 
      this.data.rejected_tender_application[0].comment || ''; 
    }
  },
};
</script>

<style scoped></style>
