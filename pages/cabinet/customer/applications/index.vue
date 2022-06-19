<template>
  <layouts title="Yuborilgan arizalar">
    <template #headerItems>
      <CustomSearch @onFilter="onFilter" />
      <a-button @click="
        $router.push({
          path: '/cabinet/customer/create-tender',
        })
      " class="green" type="primary">
        <i class="icon-plus"></i> Qo‘shish
      </a-button>
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
        <a-row :gutter="[{ xl: 24, sm: 16, xs: 8 }, { xs: 8, sm: 16, xl: 24 }]" type="flex" v-if="layoutId == 1">
          <a-col :sm="24" :xs="24" :md="12" v-for="item in list" :key="item.id">
            <CardsCustomerApplication :data="item" />
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
              <tr v-for="item in list" :key="item.id">
                <td>
                  {{ item.id }}
                </td>
                <td>{{ item.organizer }}</td>
                <td>{{ item.account_number }}</td>
                <td>
                  {{ item.created_at | timeFormat }} /
                  {{ item.created_at | dateFormat }}
                </td>
                <td>
                  <div class="table-status">
                    <span :class="[
                      'status',
                      `${item.customStatus && item.customStatus.type}`,
                    ]">
                      {{
                          item.customStatus &&
                          item.customStatus.title &&
                          item.customStatus.title.uz
                      }}
                    </span>
                    <a-dropdown :trigger="['click']" placement="bottomRight" v-if="item.status == 'rejected_organizer'">
                      <i class="icon-dots"></i>
                      <ul class="table-dropdown" slot="overlay">
                        <li class="green">
                          <i class="icon-resend"></i>
                          <span>Qayta yuborish</span>
                        </li>
                      </ul>
                    </a-dropdown>
                  </div>
                  <span v-if="item.status == 'rejected_organizer'" class="status _0">
                    {{
                        (item.rejected_tender_application &&
                          item.rejected_tender_application[0] &&
                          item.rejected_tender_application[0].comment) ||
                        ""
                    }}
                  </span>
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
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: "customer",
  data() {
    return {
      tab: {
        title: "Barchasi",
        value: 0,
        key: null,
      },
      layoutId: 1,
      isFilter: false,
      pagination: {
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters("customer/applications", [
      "list",
      "count",
      "loading",
      "statusList",
    ]),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset:
          ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
        status: this.tab.key,
      };
      return params;
    },
  },
  methods: {
    ...mapActions("customer/applications", ["getList"]),
    changeTab() {
      this.pagination.page = 1;
      this.fetchList();
    },
    paginate(arg) {
      this.pagination.page = arg;
      this.fetchList();
    },
    onChangeLimit(arg) {
      this.pagination.limit = arg;
      this.pagination.page = 1;
      this.fetchList();
    },
    onFilter() {
      this.isFilter = !this.isFilter;
    },
    changeLayout(id) {
      this.layoutId = id;
    },
    async fetchList() {
      await this.getList({
        params: this.params,
      });
    },
  },
  async mounted() {
    await this.fetchList();
  },
};
</script>
