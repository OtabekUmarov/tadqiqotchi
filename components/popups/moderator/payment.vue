<template>
  <popups-layout Width="500px" @close="close" title="To'lov haqida" :isVisible="isVisible" :isFooter="true">
    <template #body>
      <a-form-item label="To'lov sanasi">
        <a-date-picker 
          format="DD.MM.YYYY"
          valueFormat="YYYY-MM-DD"
          v-model="form.date"
          placeholder="Yozing">
          <template #suffixIcon><i class="icon-calendar"></i></template>
        </a-date-picker>
      </a-form-item>
      <a-form-item label="To'lov summasi">
        <a-input v-model="form.amount" placeholder="Yozing"></a-input>
      </a-form-item>
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
          <a-button class="green" :loading="pending" type="primary" @click="submit">
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
        participant_payment: null,
        attachment: null,
        amount: null,
        date: null,
      },
      pending: false,
    }
  },
  methods: {
    ...mapActions('moderator/payment', ['postDetail']),
    handleChange(info) {
        this.form.attachment = info;
    },
    close() {
      this.form = {
        participant_payment: null,
        attachment: null,
        amount: null,
        date: null,
      }
      this.$emit("close");
    },
    async submit() {
      this.pending = true;
      this.form.participant_payment = this.id;
      let f = new FormData()
      Object.keys(this.form).forEach((k) => {
        if (k == "attachment") {
          if (this.form[k] && this.form[k].file && this.form[k].file.extension) {
            console.log(this.form[k] && this.form[k].file && this.form[k].file.extension)
          } else {
            this.form[k] && f.append(k, this.form[k], this.form[k].name)
          }
        } else {
          f.append(k, this.form[k])
        }
      })
      await this.postDetail({ form: f}).then(res => {
        if (res.status >= 200 && res.status < 400) {
          this.$message.success("Muvaffaqiyatli saqlandi");
          this.$emit("fetch");
          this.close();
        }
      }).catch(error => {
        this.$message.error('Iltimos ma\'lumotlarni to\'liq kiriting');
      })
      this.pending = false;
    },
  },
};
</script>

<style>
/* .ant-upload-list {
  display: none;
} */
</style>