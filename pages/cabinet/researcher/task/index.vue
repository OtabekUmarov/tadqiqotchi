<template>
  <layouts title="Foydalanuvchilar">
    <template #headerItems>
      <a-button class="green" type="primary" @click="$router.push({
        path: '/cabinet/advisor/task/create'
      })">
        <i class="icon-user-plus"></i> Qo‘shish
      </a-button>
    </template>
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>Nomi</th>
                <th>Tugash sanasi</th>
                <th>Fayl</th>
              </tr>
            </thead> 
            <tbody>
              <tr v-for="(item, index) in list" :key="item.id">
                <td>{{ index + 1 + params.offset }}</td>
                <td class="nowrap">{{ item.title }}</td>
                <td>{{ item.exam_date | dateFormat }}</td>
                <td>
                  <a :href="item.file" download target="_blank" type="primary">
                    <template v-if="item.file">
                      <i class="icon-download"></i>
                      <small>Yuklab olish</small>
                    </template>
                    <template v-else>
                      <small>Yuklanmagan</small>
                    </template>
                    </a>          
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
import { mapGetters, mapActions } from "vuex"

export default {
  middleware: 'advisor',
  data() {
    return {
      pagination: {
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters('advisor/task', ['list', 'count', 'loading']),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset: ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
      }
      return params
    }
  },
  methods: {
    ...mapActions("advisor/task", ["getList"]),
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
