<template>
  <layouts title="To'lovlar">
    <template #headerItems>
      <CustomSearch @onFilter="onFilter" />
      <FiltersApplications :isFilter="isFilter" />
    </template>
    <template #body>
      <div class="tab-wrapper">
        <CustomTab :tabs="statusList" v-model="tab"  @change="changeTab"/>
      </div>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>Tender nomi</th>
                <th>Ishtirokchi</th>
                <th>To'lov turi</th>
                <th>Yaratilgan sana</th>
                <th width="220px">Holati</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in list" :key="item.id"
                @click="$router.push({
                  path: '/cabinet/moderator/payment/' + item.id,
                })"
              >
                <td>{{ item.id }}</td>
                <td>{{ item.tender_name }}</td>
                <td>
                  {{ item.participant_profile_user}}
                </td>
                <td>
                  {{ item.type == 'guarantee_commission' ? 'Komissiya to\'lovi' : 'Kafolat summasi'}}
                </td>
                <td>
                  {{ item.created_at | timeFormat }} /
                  {{ item.created_at | dateFormat }}
                </td>
                <td>
                  <div class="table-status" @click.stop>
                    <span :class="['status', `${item.customStatus && item.customStatus.type}`]">
                      {{ item.customStatus && item.customStatus.title && item.customStatus.title[$i18n.locale] }}
                    </span>
                    <a-dropdown
                    :trigger="['click']"
                    v-if="item.status != 'paid'"
                    placement="bottomRight"
                  >
                    <i class="icon-dots"></i>
                    <ul class="table-dropdown" slot="overlay">
                      <li class="green" @click="openPayment(item.id)">
                        <i class="icon-accept"></i>
                        <span>To'lov qilish</span>
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
      <PopupsModeratorPayment :id="paymentId" @close="close" @fetch="fetchList" :isVisible="isPayment" />
      <CustomPagination @onChangeLimit="onChangeLimit" @paginate="paginate" :limit="pagination.limit" :count="count"
        :page="pagination.page" />
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: 'moderator',
  data() {
    return {
      tab: {
        title: "Barchasi",
        value: 0,
        key: null
      },
      isFilter: false,
      isPayment: false,
      isAccept: false,
      activeId: null,
      paymentId: null,
      pagination: {
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters('moderator/payment', ['list', 'count', 'loading', 'statusList']),
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
    ...mapActions('moderator/payment', ['getList']),
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
    openPayment(id) {
      this.paymentId = id
      this.isPayment = true;
    },
    close() {
      this.paymentId = null
      this.isPayment = false;
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
