<template>
  <popups-layout Width="500px" @close="close" title="Rad etish" :isVisible="isVisible" :isFooter="true">
    <template #body>
      <a-form-item class="popup-uploader mb-20" label="Fayl yuklash">
        <a-upload-dragger name="file"  :multiple="false" @change="handleChange" class="popup-uploader-block">
          <p class="text-body3 black1 mb-8">
            Click or drag file to this area to upload
          </p>
          <p class="text-caption black2">
            Fayl yuklang
          </p>
        </a-upload-dragger>
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
        reject_file: {},
        reject_comment: null,
        status: 'rejected_organizer',
      }
    }
  },
  methods: {
    ...mapActions('organizer/applications', ['reject']),
    handleChange(info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        // multiple file upload
        // this.form.reject_file = info.fileList;
        this.form.reject_file = info.file;
      }
      if (info.file.status === 'done') {
        // this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    close() {
      this.$emit("close");
    },
    async submit() {
      let f = new FormData()
      Object.keys(this.form).forEach((k) => {
        if (k == "reject_file") {
          // multiple files uchun
          // this.form[k].forEach((i) => {
          //   if (i.file && i.file.extension) {
          //     console.log(i.file && i.file.extension)
          //   } else {
          //     i.originFileObj && f.append(k, i.originFileObj, i.originFileObj.name)
          //   }
          // })
          if (this.form[k].file && this.form[k].file.extension) {
            console.log(this.form[k].file && this.form[k].file.extension)
          } else {
            this.form[k].originFileObj && f.append(k, this.form[k].originFileObj, this.form[k].originFileObj.name)
          }
        } else {
          f.append(k, this.form[k])
        }
      })
      await this.reject({ form: f, id: this.id })
      this.$message.success("Harakat muvaffaqiyatli bajarildi");
      this.close();
      this.$emit("fetch");
    },
  },
};
</script>

<style>
/* .ant-upload-list {
  display: none;
} */
</style>