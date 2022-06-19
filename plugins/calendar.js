import Vue from 'vue';
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '../node_modules/@fullcalendar/daygrid'

Vue.component('FullCalendar', FullCalendar);
Vue.use(dayGridPlugin);
