<template>
  <layouts title="Kirdi chiqdi vaqtlari">
    <template #headerItems>
    </template>
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>F.I.SH</th>
                <th>Telefon raqami</th>
                <th>Login</th>
              </tr>
            </thead> 
            <tbody>
              <tr v-for="(item, index) in list" :key="item.id">
                <td>{{ index + 1 + params.offset }}</td>
                <td>{{ item.fullname }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.login }}</td>
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
  middleware: 'admin',
  data() {
    return {
      pagination: {
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters('admin/log', ['list', 'count', 'loading']),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
      }
      return params
    }
  },
  methods: {
    ...mapActions("admin/log", ["getList"]),
    paginate(arg) {
      this.pagination.page = arg
      this.fetchList()
    },
    onChangeLimit(arg) {
      this.pagination.limit = arg
      this.pagination.page = 1
      this.fetchList()
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
