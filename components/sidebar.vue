<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="/logo.svg" alt="logo" />
      <h4>O‘zbekiston Respublikasi Avtomobil yo‘llari</h4>
    </div>
    <perfect-scrollbar class="sidebar-body">
      <div class="sidebar-body-menu" v-for="(item, index) in menuList" :key="index">
        <h4>{{ item.title }}</h4>
        <a-menu mode="inline">
          <template v-for="menu in item.list">
            <a-sub-menu v-if="menu.child" :key="`menuitem-${menu.key}`">
              <template #title>
                <i :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
                <i class="icon-angle-right"></i>
              </template>
              <nuxt-link class="ant-menu-item" v-for="child in menu.child" :key="`submenu-${child.id}`" :to="{
                path: child.path,
              }">
                <i :class="child.icon"></i>
                <span>{{ child.title }}</span>
              </nuxt-link>
            </a-sub-menu>
            <nuxt-link class="ant-menu-item" v-else :key="`menuitem-${menu.id}`" :to="{
              path: menu.path,
            }">
              <i :class="menu.icon"></i>
              <span>{{ menu.title }}</span>
            </nuxt-link>
          </template>
        </a-menu>
      </div>
      <div class="sidebar-logout" @click="logout">
        <i class="icon-sidebar-logout"></i>
        <span>Chiqish</span>
      </div>
    </perfect-scrollbar>
    <div class="sidebar-footer">
      <i :class="this.isSidebar ? 'icon-setting2' : 'icon-setting'" @click="setSidebar"></i>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  methods: {
    ...mapMutations("functions", ["setState"]),
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push({ path: "/auth/sign-in" })
      })
    },
    setSidebar() {
      if (!this.isSidebar) {
        this.setState({ payload: true, key: "isSidebar" });
      } else {
        this.setState({ payload: false, key: "isSidebar" });
      }
    },
  },
  computed: {
    ...mapGetters("functions", ["isSidebar"]),
    ...mapGetters("menu", ["menu"]),
    menuList() {
      let auth_user = localStorage.getItem('auth_user')
      auth_user = auth_user && auth_user.replace('_', '');
      auth_user = auth_user.toLocaleLowerCase();
      return this.menu[auth_user]
    }
  },
};
</script>

<style scoped>
</style>