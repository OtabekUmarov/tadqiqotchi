<template>
  <layouts title="Buyurtmachilar">
    <template #headerItems>
      <CustomSearch @onFilter="onFilter" />
      <FiltersApplications :isFilter="isFilter" />
    </template>
    <template #body>
      <div class="tab-wrapper">
        <CustomTab :tabs="tabs" v-model="tab" />
        <div class="tab-layout" v-if="false">
          <i class="icon-layout1" :class="{ active: layoutId == 1 }" @click="changeLayout(1)"></i>
          <i class="icon-layout2" :class="{ active: layoutId == 2 }" @click="changeLayout(2)"></i>
        </div>
      </div>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <a-row :gutter="[20, 24]" v-if="false">
          <a-col span="12" v-for="item in list" :key="item.id">
            <CardsPayment :data="item" />
          </a-col>
        </a-row>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>Shaxsiy hisobvaraq</th>
                <th>Tashkilotchi</th>
                <th>Telefon raqami</th>
                <th>Manzil</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="item.id">
                <td>{{ index + 1 + params.offset }}</td>
                <td>{{ item.account_number }}</td>
                <td>{{ item.organization_name }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.address }}</td>
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
import { mapGetters, mapActions } from "vuex"

export default {
  middleware: 'moderator',
  data() {
    return {
      tabs: [
        {
          title: "Barchasi",
          value: 1,
          count: 7,
        },
        // {
        //   title: "To‘langan",
        //   value: 2,
        //   count: 2,
        // },
        // {
        //   title: "To‘lanmagan",
        //   value: 3,
        //   count: 2,
        // },
      ],
      tab: {
        title: "Barchasi",
        value: 1,
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
    ...mapGetters('moderator/customer', ['list', 'count', 'loading']),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
      }
      return params
    }
  },
  methods: {
    ...mapActions("moderator/customer", ["getList"]),
    onFilter() {
      this.isFilter = !this.isFilter;
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
    changeLayout(id) {
      this.layoutId = id;
    },
    async fetchList() {
      await this.getList({
        params: this.params
      })
    }
  },
  async mounted() {
    await this.fetchList();
  },
};
</script>
