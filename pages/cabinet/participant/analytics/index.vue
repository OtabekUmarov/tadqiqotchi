<template>
  <layouts-n1>
    <div class="content-2 mb-16 flex-center">
      <h3 class="text-body1 black1 mr-16">
        УП Toshkent ko‘priklardan foydalanish unitar korxonasi
      </h3>
      <div class="block-text blue mr-auto">
        <span>BBB</span>
      </div>
    </div>
    <div class="content-2 mb-32">
      <a-row type="flex" :gutter="[{ xs: 0, sm: 16, xl: 20 }, { xs: 16, sm: 16, xl: 0 }]">
        <a-col :xs="24" :sm="12" :xl="6" v-for="(item, index) in list" :key="index">
          <CardsAnalytic :data="item" />
        </a-col>
      </a-row>
    </div>
    <div class="full-calendar">
      <div class="full-calendar-select">
        <a-select v-model="activity" class="_36">
          <template #suffixIcon> <i class="icon-angle-down"></i></template>
          <a-select-option value="year"> Yillik </a-select-option>
          <a-select-option value="month"> Oylik </a-select-option>
          <a-select-option value="weak"> Haftalik </a-select-option>
          <a-select-option value="day"> Kunlik </a-select-option>
          <a-select-option value="hour"> Soatlik </a-select-option>
        </a-select>
      </div>
      <FullCalendar :options="calendarOptions" />
    </div>
  </layouts-n1>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
export default {
  middleware: 'participant',

  components: {
    FullCalendar,
  },
  data() {
    return {
      activity: null,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: [
          { title: "event 1", date: "2019-04-01" },
          { title: "event 2", date: "2019-04-02" },
        ],
      },
      list: [
        {
          label: "Yakunlangan lotlar:",
          title: "391",
        },
        {
          label: "Faol lotlar:",
          title: "0",
        },
        {
          label: "Diskvalifitsirovanniye lotlar:",
          title: "-",
        },
        {
          label: "Ish obyomi(limit):",
          title: "54397058549",
        },
      ],
    };
  },
};
</script>

<style>
</style>