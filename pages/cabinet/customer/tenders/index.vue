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
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <a-row :gutter="[{ xl: 24, sm: 16, xs: 8 }, { xs: 8, sm: 16, xl: 24 }]" v-if="layoutId == 1" type="flex">
          <a-col :sm="24" :xs="24" :md="12" v-for="item in list" :key="item.id">
            <CardsCustomerTender 
              :data="item"
              @approve='approved'
              @contract='sendContract'
              @reject='rejected'/>
          </a-col>
        </a-row>
        <div class="table" v-else>
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>Tender nomi</th>
                <th>Shaxsiy hisobvaraq</th>
                <th>Yuborilgan sana</th>
                <th width="220px">Holati</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in list" :key="item.id" @click="item.customStatus.value > 3 ? $router.push({path: '/cabinet/customer/tenders/' + item.id}) : null">
                <td>{{ item.id }}</td>
                <td>{{ item.tender_name }}</td>
                <td>{{ item.account_number }}</td>
                <td>{{ item.created_at | dateFormat }}</td>
                <td>
                  <div class="table-status" @click.stop>
                    <span :class="['status', `${item.customStatus && item.customStatus.type}`]">
                      {{ item.customStatus && item.customStatus.title && item.customStatus.title[$i18n.locale] }}
                    </span>
                    <a-dropdown :trigger="['click']" placement="bottomRight" v-if="item.status == 'customer_sign_waiting' || item.status == 'trade_executed'">
                      <i class="icon-dots"></i>
                      <ul class="table-dropdown" slot="overlay">
                      <li v-if="item.status == 'customer_sign_waiting'" class="green">
                          <a-popconfirm title="Qabul qilasizmi?" ok-text="Ha" cancel-text="Yo'q"
                            @confirm="approved(item.id)">
                            <i class="icon-accept"></i>
                            <span>Qabul qilish</span>
                          </a-popconfirm>
                      </li>
                      <li v-if="item.status == 'customer_sign_waiting'" class="red" @click="rejected(item.id)">
                          <i class="icon-reject"></i>
                          <span>Rad etish</span>
                      </li>
                      <li v-if="item.status == 'trade_executed'" class="green" @click="sendContract(item.id)">
                          <i class="icon-accept"></i>
                          <span>Shartnoma yuklash</span>
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
      <PopupsCustomerReject :id="activeId" :isVisible="isVisible" @close="close" @fetch='fetchList'/>
      <PopupsCustomerTenderContract :id="activeIdContract" :isVisible="isContract" @close="close" @fetch='fetchList'/>
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  middleware: 'customer',
  data() {
    return {
      tab: {
        title: "Barchasi",
        value: 0,
        key: null
      },
      layoutId: 1,
      activeId: null,
      activeIdContract: null,
      isFilter: false,
      isVisible: false,
      isContract: false,
      pagination: {
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters('customer/tender', ['list', 'count', 'loading', 'statusList']),
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
    ...mapActions('customer/tender', ['getList', 'approve']),
    onFilter() {
      this.isFilter = !this.isFilter;
    },
    paginate(arg) {
      this.pagination.page = arg
      this.fetchList()
    },
    sendContract(id) {
      this.activeIdContract = id;
      this.isContract = true
    },
    onChangeLimit(arg) {
      this.pagination.limit = arg
      this.pagination.page = 1
      this.fetchList()
    },
    changeTab() {
      this.pagination.page = 1;
      this.fetchList();
    },
    changeLayout(id) {
      this.layoutId = id;
    },
    close() {
      this.isVisible = false;
      this.isContract = false;
      this.activeId = null;
    },
    async approved(id){
      await this.approve({status: 'winner_sign_waiting', id: id})
      this.fetchList()
    },
    rejected(id){
      this.activeId = id;
      this.isVisible = true;
      //  status = 'customer_not_agree'
      console.log('rejected', id)
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
