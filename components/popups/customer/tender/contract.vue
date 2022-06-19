<template>
  <popups-layout Width="500px" @close="close" title="Shartnoma fayl" :isVisible="isVisible" :isFooter="true">
    <template #body>
      <a-form-item class="popup-uploader mb-20" label="Fayl yuklash">
        <CustomUploaderN1 
          v-if="isVisible"
          @change="handleChange"
        />
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
          <a-button :loading="pending" class="green" type="primary" @click="submit">
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
    id: {
      type: Number,
      default: null
    },
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
        attachment: null,
        tender: null,
      },
      pending: false,
    }
  },
  methods: {
    ...mapActions('customer/tender', [ 'postContract']),
    handleChange(info) {
        this.form.attachment = info;
    },
    close() {
      this.$emit("close");
    },
    async submit() {
      this.pending = true;
      this.form.tender = this.id;
      let f = new FormData()
      Object.keys(this.form).forEach((k) => {
        if (k == "attachment") {
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
        let res = await this.postContract({ form: f})
        if(res.response && res.response.data && res.response.data.tender && res.response.data.tender[0] &&  res.response.data.tender[0] == 'This field must be unique.') {
          this.$message.error('Shartnoma fayl mavjud')
          this.pending = false
          return 
        }
        if(res.response && res.response.data && res.response.data.attachment && res.response.data.attachment[0] &&  res.response.data.attachment[0] == 'Hech qanday fayl yuborilmadi.') {
          this.$message.error('Iltimos fayl yuklang')
          this.pending = false
          return 
        }
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
      this.pending = false
    },
  },
};
</script>

<style>
/* .ant-upload-list {
  display: none;
} */
</style>