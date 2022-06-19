<template>
  <layouts title="Tenderlar">
    <template #headerItems>
      <CustomSearch @onFilter="onFilter" />
      <FiltersApplications :isFilter="isFilter" />
    </template>
    <template #body>
      <div class="tab-wrapper">
        <CustomTab :tabs="statusList" v-model="tab" @change="changeTab" />
        <div class="tab-layout">
          <i class="icon-layout1" :class="{ active: layoutId == 1 }" @click="changeLayout(1)"></i>
          <i class="icon-layout2" :class="{ active: layoutId == 2 }" @click="changeLayout(2)"></i>
        </div>
      </div>
      <a-spin size="large" class="loader-list" v-if="listLoading" />
      <template v-else>
        <a-row :gutter="[{ xl: 24, sm: 16, xs: 8 }, { xs: 8, sm: 16, xl: 24 }]" v-if="layoutId == 1" type="flex">
          <a-col :sm="24" :xs="24" :md="12" v-for="item in list" :key="item.id">
            <CardsParticipantTender @winner="winnerModal" :data="item" />
          </a-col>
        </a-row>
        <div class="table" v-else>
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <!-- <th>Lot raqami</th> -->
                <th>Tender nomi</th>
                <th>Tashkilotchi</th>
                <th>Yaratilgan sana</th>
                <!-- <th>Boshlanish sanasi</th> -->
                <th width="220px">Holati</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) of list" :key="item.id" @click="
                $router.push({
                  path: '/cabinet/participant/tenders/' + item.id,
                })
              ">
                <td>{{ item.id }}</td>
                <td>{{ item.tender_name }}</td>
                <td>
                  {{ item.organizer && item.organizer.organization_name }}
                </td>
                <td>
                  {{ item.participant_tender_application_created_at | timeFormat }} /
                  {{ item.participant_tender_application_created_at | dateFormat }}
                </td>
                <td>
                  <div class="table-status" @click.stop>
                    <span :class="['status', `${item.customStatus && item.customStatus.type}`]">
                      {{ item.customStatus && item.customStatus.title && item.customStatus.title[$i18n.locale] }}
                    </span>
                    <a-dropdown :trigger="['click']" v-if="item.is_winner" placement="bottomRight">
                      <i class="icon-dots"></i>
                      <ul class="table-dropdown" slot="overlay">
                        <li class="green" @click="winnerModal(item.id)">
                          <i class="icon-accept"></i>
                          <span>Go'lib imzosi</span>
                        </li>
                      </ul>
                    </a-dropdown>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <CustomPagination @onChangeLimit="onChangeLimit" @paginate="paginate" :limit="pagination.limit" :count="count"
        :page="pagination.page" />
      <popupsWinner :isVisible="isWinner" @close="close" @fetch="fetchList" :winnerId='winnerId' />
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: 'participant',
  data() {
    return {
      tab: {
        title: "Barchasi",
        value: 0,
        key: null
      },
      layoutId: 1,
      isFilter: false,
      winnerId: null,
      pagination: {
        limit: 10,
        page: 1,
      },
      isWinner: false
    };
  },
  computed: {
    ...mapGetters('participant/tender', ['list', 'count', 'listLoading', 'statusList']),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
        // participant_tender_application: true
        status: this.tab.key,
      }
      return params
    }
  },
  methods: {
    ...mapActions('participant/tender', ['getList']),
    changeTab() {
      this.pagination.page = 1;
      this.fetchList();
    },
    onFilter() {
      this.isFilter = !this.isFilter;
    },
    paginate(arg) {
      this.pagination.page = arg
      this.fetchList()
    },
    winnerModal(id) {
      this.winnerId = id;
      this.isWinner = true;
    },
    onChangeLimit(arg) {
      this.pagination.limit = arg
      this.pagination.page = 1
      this.fetchList()
    },
    changeLayout(id) {
      this.layoutId = id;
    },
    close() {
      this.isWinner = false;
    },
    async fetchList() {
      await this.getList({ params: this.params, myList: true });
    },
  },
  mounted() {
    this.fetchList();
  },
};
</script>
