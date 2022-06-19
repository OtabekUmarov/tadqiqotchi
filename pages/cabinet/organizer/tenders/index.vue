<template>
  <layouts title="Mening tenderlarim">
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
            <CardsOrganizerTender :data="item" :url='urlGenerator(item)'/>
          </a-col>
        </a-row>
        <div class="table" v-else>
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <!-- <th>Lot raqami</th> -->
                <th>Tashkilotchi</th>
                <th>Shaxsiy hisobvaraq</th>
                <th>Yuborilgan sana</th>
                <!-- <th>Boshlanish sanasi</th> -->
                <th width="220px">Holati</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in list" :key="item.id" @click="
                $router.push({
                  path: urlGenerator(item),
                })
              ">
                <td>{{ item.id }}</td>
                <td>{{ item.organizer && item.organizer.organization_name }}</td>
                <td>{{ item.account_number }}</td>
                <td>
                  {{ item.created_at | timeFormat }} /
                  {{ item.created_at | dateFormat }}
                </td>
                <td>
                  <div class="table-status">
                    <span :class="['status', `${item.customStatus && item.customStatus.type}`]">
                      {{ item.customStatus && item.customStatus.title && item.customStatus.title[$i18n.locale] }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <CustomPagination @onChangeLimit="onChangeLimit" @paginate="paginate" :limit="pagination.limit" :count="count"
        :page="pagination.page" />
      <!-- <PopupsTenderReject :id="activeId" :isVisible="isReject" @close="closeReject" /> -->
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

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
      pagination: {
        limit: 10,
        page: 1,
      },
      // isReject: false,
      // isAccept: false,
      // activeId: null,
    };
  },
  computed: {
    ...mapGetters('organizer/tender', ['list', 'count', 'loading', 'statusList']),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
        status: this.tab.key,
      }
      return params
    }

  },
  methods: {
    ...mapActions('organizer/tender', ['getList']),
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
    // openReject({ id }) {
    //   this.activeId = id;
    //   this.isReject = true;
    // },
    // closeReject() {
    //   this.isReject = false;
    // },
    async fetchList() {
      await this.getList({
        params: this.params
      })
    },
    urlGenerator(item) {
      if (item.status == 'in_add_info_organizer') {
        return `/cabinet/organizer/tenders/${item.id}/`
      }  else {
        return `/cabinet/organizer/tenders/detail/${item.id}`
      }
    }
  },
  async mounted() {
    await this.fetchList();
  },
};
</script>
