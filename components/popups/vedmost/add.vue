<template>
  <popups-layout
    Width="500px"
    @close="close"
    title="Vedmost qo‘shish"
    :isVisible="isVisible"
    :isFooter="true"
  >
    <template #body>
      <span class="text-body4 black2 mb-24"> Vedmost nomini kiriting </span>
      <CustomLangSwitcher @changed="changed" class="mb-16" />
      <a-form-item label="Yangi ish nomi" class="mb-0">
        <a-input v-model="form.title[isLang]" placeholder="Yozing"></a-input>
      </a-form-item>
    </template>
    <template #footer>
      <a-row type="flex" :gutter="[20, 0]">
        <a-col span="12">
          <a-button @click="close" type="primary" class="grey">
            Orqaga
          </a-button>
        </a-col>
        <a-col span="12">
          <a-button type="primary" class="green" @click="send()"> Qo‘shish </a-button>
        </a-col>
      </a-row>
    </template>
  </popups-layout>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    isVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      isLang: 'oz',
      form: {
        title: {
          uz: '',
          ru: '',
          en: '',
          oz: '',
        }
      }
    };
  },
  methods: {
    ...mapActions('organizer/applications', ['postState']),
    close() {
      this.$emit("close");
      this.clear()
    },
    async send(){
      try {
        let form = {
          title_uz: this.form.title.uz,
          title_ru: this.form.title.ru,
          title_en: this.form.title.en,
          title_oz: this.form.title.oz,
        }
        await this.postState({form});
        this.$message.success('Vedmost qo‘shildi');
        this.$emit("fetchState")
        this.close()
      } catch (error) {
        console.log(error);
      }
    },
    clear() {
      this.form = {
          title: {
            uz: '',
            ru: '',
            en: '',
            oz: '',
          }
        }
    },
    changed(val) {
      this.isLang = val;
    },
  },
};
</script>

<style>
</style>