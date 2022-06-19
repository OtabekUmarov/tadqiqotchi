<template>
  <layouts title="Korporativ">
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
      <a-spin size="large" class="loader-list" v-if="loading" />

      <template v-else>
        <a-row :gutter="[20, 24]" v-if="layoutId == 1" type="flex">
          <a-col span="12" v-for="item in list" :key="item.id">
            <CardsOrganizerApplication :data="item" :review='false' @fetch="fetchList" @reject="openReject" />
          </a-col>
        </a-row>
        <div class="table" v-else>
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>Tashkilotchi</th>
                <th>Shaxsiy hisobvaraq</th>
                <th>Yuborilgan sana</th>
                <th width="220px">Holati</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item.id"
                @click.stop="item.customStatus.key != 'approved_organizer' ? $router.push({ path: `/cabinet/organizer/budget/${item.id}` }) : null">
                <td>{{ item.id }}</td>
                <td>{{ item.organizer }}</td>
                <td>{{ item.account_number }}</td>
                <td>{{ item.created_at | timeFormat }} / {{ item.created_at | dateFormat }}</td>
                <td>
                  <div class="table-status" @click.stop>
                    <span :class="['status', `${item.customStatus && item.customStatus.type}`]">
                      {{ item.customStatus && item.customStatus.title && item.customStatus.title.uz }}
                    </span>
                    <a-dropdown :trigger="['click']" placement="bottomRight" v-if="item.status == 'approved_organizer' || item.status == 'confirmed'">
                      <i class="icon-dots"></i>
                      <ul class="table-dropdown" slot="overlay">
                        <li v-if="item.customStatus.key != 'approved_organizer'" class="green" @click="setStatus({ status: 'approved_organizer', id: item.id })">
                          <i class="icon-accept"></i>
                          <span>Qabul qilish</span>
                        </li>
                        <li v-if="item.customStatus.key != 'approved_organizer'" class="red" @click="openReject(item.id)">
                          <i class="icon-reject"></i>
                          <span>Rad etish</span>
                        </li>
                        <li v-if="item.customStatus.key == 'approved_organizer'" class="green" @click="$router.push(
                          { path: `/cabinet/organizer/tenders/` + item.id }
                        )">
                          <i class="icon-accept"></i>
                          <span>Hujjatlarni to'ldirish</span>
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
      <PopupsOrganizerReject :id="activeId" :isVisible="isReject" @close="closeReject" @fetch="fetchList" />
      <!-- <PopupsTenderReject :id="activeId" :isVisible="isReject" @close="closeReject" /> -->
      <CustomPagination @onChangeLimit="onChangeLimit" @paginate="paginate" :limit="pagination.limit" :count="count"
        :page="pagination.page" />
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  middleware: 'organizer',
  data() {
    return {
      tab: {
        title: "Barchasi",
        value: 0,
        key: null
      },
      layoutId: 1,
      isFilter: false,
      isReject: false,
      isAccept: false,
      activeId: null,
      pagination: {
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters('organizer/applications', ['list', 'count', 'loading', 'statusList']),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
        payment_source: 'corparate_funds',
        status: this.tab.key,
      }
      return params
    }
  },
  methods: {
    ...mapActions('organizer/applications', ['getList','approve']),
    changeTab() {
      this.pagination.page = 1;
      this.fetchList();
    },
    paginate(arg) {
      this.pagination.page = arg
      this.fetchList()
    },
    onChangeLimit(arg) {
      this.pagination.limit = arg
      this.pagination.page = 1
      this.fetchList()
    },
    onFilter() {
      this.isFilter = !this.isFilter;
    },
    changeLayout(id) {
      this.layoutId = id;
    },
    openReject(id) {
      console.log(id)
      this.activeId = id;
      this.isReject = true;
    },
    closeReject() {
      this.isReject = false;
    },
    async setStatus({status, id}) {
      await this.approve({status, id});
      this.fetchList();
    },
    async fetchList() {
      await this.getList({ params: this.params });
    }
  },
  async mounted() {
    await this.fetchList();
  },
};
</script>
