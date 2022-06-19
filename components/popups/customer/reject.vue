<template>
  <popups-layout Width="500px" @close="close" title="Rad etish" :isVisible="isVisible" :isFooter="true">
    <template #body>
      <a-form-item class="popup-uploader mb-20" label="Fayl yuklash">
        <CustomUploaderN1 
          v-if="isVisible"
          @change="handleChange"
        />
      </a-form-item>
      <a-form-item label="Izoh" class="mb-0">
        <a-textarea placeholder="Yozing" v-model="form.reject_comment" :rows="4" />
      </a-form-item>
    </template>
    <template #footer>
      <a-row :gutter="[20, 0]">
        <a-col span="12">
          <a-button class="grey" type="primary" @click="close">
            Orqaga
          </a-button>
        </a-col>
        <a-col span="12">
          <a-button class="green" type="primary" @click="submit">
            Yuborish
          </a-button>
        </a-col>
      </a-row>
    </template>
  </popups-layout>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    id: Number,
    isVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      form: {
        reject_file: null,
        reject_comment: null,
        status: 'customer_not_agree',
      }
    }
  },
  methods: {
    ...mapActions('customer/tender', ['reject']),
    handleChange(info) {
        this.form.reject_file = info;
    },
    close() {
      this.$emit("close");
    },
    async submit() {
      let f = new FormData()
      Object.keys(this.form).forEach((k) => {
        if (k == "reject_file") {
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
        let res = await this.reject({ form: f, id: this.id })
        if (res.status >= 200 && res.status < 300) { 
          this.$message.success("Harakat muvaffaqiyatli bajarildi");
          this.close();
          this.$emit("fetch");
        } else
        this.$message.error("Iltimos, qayta urinib ko'ring");
      } catch (error) {
        this.$message.error("Iltimos, qayta urinib ko'ring");
        console.log(error)
      }
    },
  },
};
</script>

<style>
/* .ant-upload-list {
  display: none;
} */
</style>