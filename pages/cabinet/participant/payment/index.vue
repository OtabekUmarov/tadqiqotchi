<template>
  <layouts title="Tenderlar">
    <template #headerItems>
      <CustomSearch @onFilter="onFilter" />
      <FiltersApplications :isFilter="isFilter" />
    </template>
    <template #body>
      <div class="tab-wrapper">
        <CustomTab :tabs="statusList" v-model="tab" @change="changeTab"/>
      </div>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>Tender nomi</th>
                <th>To'lov turi</th>
                <th>Yaratilgan sana</th>
                <th width="220px">Holati</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in list" :key="item.id" @click="
                $router.push({
                  path: '/cabinet/participant/payment/' + item.id,
                })
              ">
                <td>{{ item.id }}</td>
                <td>{{ item.tender_name }}</td>
                <td>
                  {{ item.type == 'guarantee_commission' ? 'Komissiya to\'lovi' : 'Kafolat summasi'}}
                </td>
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
    ...mapGetters('participant/payment', ['list', 'count', 'loading', 'statusList']),
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
    ...mapActions('participant/payment', ['getList']),
    onFilter() {
      this.isFilter = !this.isFilter;
    },
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
    openReject({ id }) {
      this.activeId = id;
      this.isReject = true;
    },
    closeReject() {
      this.isReject = false;
    },
    async fetchList() {
      await this.getList({ params: this.params });
    },
  },
  mounted() {
    this.fetchList();
  },
};
</script>
