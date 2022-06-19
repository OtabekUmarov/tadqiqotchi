<template>
  <layouts title="Bayram kunlari">
    <template #headerItems>
      <!-- <CustomSearch @onFilter="onFilter" /> -->
      <a-button type="primary" @click="isVisible = true" class="green _32">
        Qo'shish
      </a-button>
      <!-- <FiltersApplications :isFilter="isFilter" /> -->
    </template>
    <template #body>
      <a-spin size="large" class="loader-list" v-if="loading" />
      <template v-else>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th width="1%">№</th>
                <th>Bayram nomi</th>
                <th>Sanasi</th>
                <th width="1%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="item.id">
                <td>{{ params.offset + index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.date | dateFormat }}</td>
                <td>
                  <div class="table-status">
                    <a-dropdown :trigger="['click']" placement="bottomRight">
                      <i class="icon-dots"></i>
                      <ul class="table-dropdown" slot="overlay">
                        <li class="green" @click="editItem(item)">
                          <i class="icon-edit"></i>
                          <span>Tahrirlash</span>
                        </li>
                        <li class="red" @click="deleteItem(item)">
                          <i class="icon-rubbish"></i>
                          <span>O'chirish</span>
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
      <CustomPagination
        @onChangeLimit="onChangeLimit"
        @paginate="paginate"
        :limit="pagination.limit"
        :count="count"
        :page="pagination.page"
      />
      <popupsLayout
        @close="close"
        :isFooter="true"
        title="Qo'shish"
        :isVisible="isVisible"
      >
        <template #body>
          <a-form-item label="Bayram nomi">
            <a-input v-model="form.title" placeholder="Yozing"></a-input>
          </a-form-item>
          <a-form-item label="Bayram sanasi">
            <a-date-picker
              v-model="form.date"
              format="DD.MM.YYYY"
              valueFormat="YYYY-MM-DD"
              placeholder="Sanani kiriting"
            >
              <template #suffixIcon><i class="icon-calendar"></i></template>
            </a-date-picker>
          </a-form-item>
        </template>
        <template #footer>
          <div class="flex-center">
            <a-button class="grey" type="primary" @click="close">
              Orqaga
            </a-button>
            <a-button
              class="green ml-16"
              type="primary"
              :loading="pending"
              @click="send"
            >
              Saqlash
            </a-button>
          </div>
        </template>
      </popupsLayout>
    </template>
  </layouts>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  middleware: "moderator",
  data() {
    return {
      isFilter: false,
      pending: false,
      isVisible: false,
      pagination: {
        limit: 10,
        page: 1,
      },
      form: {
        title: "",
        date: null,
      },
    };
  },
  computed: {
    ...mapGetters("moderator/catalog/holidays", ["list", "count", "loading"]),
    params() {
      let params = {
        limit: this.pagination.limit || 10,
        offset:
          ((this.pagination.page || 1) - 1) * (this.pagination.limit || 10),
      };
      return params;
    },
  },
  methods: {
    ...mapActions("moderator/catalog/holidays", [
      "getList",
      "postDetail",
      "deleteDetail",
    ]),
    async send() {
      this.pending = true;
      try {
        let res = await this.postDetail({ form: this.form });
        if (res.status >= 200 && res.status < 400) {
          this.fetchList();
          this.close();
          this.$message.success("Muvaffaqiyatli saqlandi");
        }
      } catch (error) {
        console.log(error);
      }
      this.pending = false;
    },
    editItem(item) {
      this.form = JSON.parse(JSON.stringify(item));
      this.isVisible = true;
    },
    async deleteItem(item) {
      await this.deleteDetail({ id: item.id });
      this.fetchList();
    },
    onFilter() {
      this.isFilter = !this.isFilter;
    },
    close() {
      this.isVisible = false;
      this.form = {
        title: "",
        date: null,
      };
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
