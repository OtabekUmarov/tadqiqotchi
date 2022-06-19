<template>
  <layouts title="Ishtirokchilar reytingi">
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
                <th width="1%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="item.id">
                <td>{{ params.offset + index + 1 }}</td>
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
        :Width="'600px'"
        :isFooter="true"
        title="Qo'shish"
        :isVisible="isVisible"
      >
        <template #body> 
          <a-form-model ref="form" :model="form" :rules="rules" >
            <a-form-item label="Nomi">
              <a-input v-model="form.title" placeholder="Yozing"></a-input>
            </a-form-item>
            <a-form-model-item label="Yil" has-feedback  prop="year">
              <a-input v-model="form.year" placeholder="Yozing" ></a-input>
            </a-form-model-item>
            <a-form-model-item label="Chorak" placeholder="Tanlang" has-feedback  prop="quarter_number">
            <a-select v-model="form.quarter_number">
                <template #suffixIcon> <i class="icon-angle-down"></i></template>
                <a-select-option :value="item.id" v-for="item in quarterList" :key="item.id" width="100%">
                  {{ item.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-item label="Izoh">
              <a-textarea placeholder="Yozing" v-model="form.description" :rows="4" />
            </a-form-item>
            <a-form-item class="popup-uploader" label="Fayl yuklash">
              <CustomUploaderN1 
                v-if="isVisible"
                @change="handleFile"
                :accept="'.xlsx'"
              />
            </a-form-item>
          </a-form-model>
        </template>
        <template #footer>
          <div class="flex-center">
            <a-button class="grey" type="primary" @click="close">
            Orqaga
          </a-button>
          <a-button class="green ml-16" type="primary" :loading="pending" @click="send">
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
        quarter_number: null,
        year: '',
        description: '',
        file: null,
      },
      rules: {
        quarter_number: [{required: true, trigger: 'blur', message: "Ushbu maydon bo'sh bo'lmasligi kerak"}],
        year: [{required: true, message: "Ushbu maydon bo'sh bo'lmasligi kerak", trigger: 'blur' }],
      },
      quarterList: [
        {id: 1, title: "1 - chorak"},
        {id: 2, title: "2 - chorak"},
        {id: 3, title: "3 - chorak"},
        {id: 4, title: "4 - chorak"}
      ],
    };
  },
  computed: {
    ...mapGetters("moderator/rating", ["list", "count", "loading"]),
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
    ...mapActions("moderator/rating", ["getList","postDetail","deleteDetail"]),
    async send(){
      this.pending = true;
      this.$refs.form.validate(async valid => {
        if (valid) { 
          let f = new FormData()
          Object.keys(this.form).forEach((k) => {
            if (k == "file") {
              if (this.form[k] && this.form[k].file && this.form[k].file.extension) {
                console.log(this.form[k].file && this.form[k].file.extension)
              } else {
                this.form[k] && f.append(k, this.form[k], this.form[k].name)
              }
            } else {
              f.append(k, this.form[k])
            }
          })
          try {
            let res = await this.postDetail({form:f})
            if (res.status >= 200 && res.status < 400) {
              this.fetchList()
              this.close()
              this.$message.success("Muvaffaqiyatli saqlandi")
            }
          } catch (error) {
            console.log(error);
          }
        }
        else {
          console.log("Xatolik");
        } });
      this.pending = false;
    },
    editItem(item) {
      this.form = JSON.parse(JSON.stringify(item))
      this.isVisible = true
    },
    async deleteItem(item){
        await this.deleteDetail({id:item.id})
        this.fetchList()
    },
    handleFile(info) {
      this.form.file = info;
    },
    onFilter() {
      this.isFilter = !this.isFilter;
    },
    close() {
      this.isVisible = false;
      this.form = {
        title: "",
        quarter_number: null,
        year: '',
        description: '',
        file: null,
      }
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
