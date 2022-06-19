<template>
  <div class="header">
    <div class="header-search">
      <i class="icon-search"></i>
      <a-input v-model="search" placeholder="Izlash" @input="onSearch" class="text-body4"></a-input>
    </div>
    <div class="header-lang">
      <a-dropdown :trigger="['click']" placement="bottomCenter">
        <a-button>
          <img src="/flag-uz.jpg" alt="flag" />
          <span class="text-body4"> {{ selected.title }}</span>
          <i class="icon-angle-down"></i>
        </a-button>
        <div class="header-lang-options" slot="overlay">
          <ul>
            <nuxt-link :to="switchLocalePath(lang.value)" v-for="lang in langs" :key="lang.title" tag="li"
              class="lang-options-item" @click.native="chooseLang(lang.value)">
              <img src="/flag-uz.jpg" alt="flag" />
              <span>{{ lang.title }}</span>
            </nuxt-link>
          </ul>
        </div>
      </a-dropdown>
    </div>
    <div class="header-user">
      <div class="header-user-info">
        <h4 class="text-body1">{{ user_info && user_info.username }}</h4>
        <span class="text-caption">{{ user_info && user_info.user_role }}</span>
      </div>
      <div class="header-user-image">
        <img src="/user.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      search: "",
      allLangs: {
        uz: {
          title: "O'zb",
          value: "uz"
        },
        ru: {
          title: "Рус",
          value: "ru"
        },
        en: {
          title: "Eng",
          value: "en"
        }
      },
      langs: {},
      selected: {}
    };
  },
  computed: {
    ...mapGetters('auth', ['user_info'])
  },
  methods: {
    chooseLang(lang) {
      this.selected = this.allLangs[lang + ""];
      this.langs = { ...this.allLangs };
      delete this.langs[lang + ""];
      this.$router.go();
    },
    onSearch() {
      console.log(this.search);
    },
  },
  mounted() {
    this.selected = this.allLangs[this.$i18n.locale];
    this.langs = { ...this.allLangs };
    delete this.langs[this.$i18n.locale];
  },
};
</script>

<style scoped>
</style>