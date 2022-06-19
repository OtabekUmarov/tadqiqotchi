ƒ<template>
  <layouts title="Main page">
    <template #headerItems> </template>
    <template #body> </template>
  </layouts>
</template>

<script>
export default {
  computed: {
  },
  mounted() {
    let auth_user = localStorage.getItem('auth_user')
    if (auth_user) {
      
      auth_user = auth_user && auth_user.replace('_', '-')
      this.$router.push(`/cabinet/${auth_user.toLowerCase()}`)
    } else {
      this.$router.push('/auth/sign-in')
    }
  },
};
</script>
