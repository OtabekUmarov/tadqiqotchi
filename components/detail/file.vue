<template>
  <div>
    <span class="text-body3 black2 mb-8">{{title}}</span>
    <div class="content" v-if="file">
      <a :href="file" target="_blank" class="text-body3 black1 with-icon">
        <i class="icon-file mr-12"></i>
        {{ file_data && file_data.name }}
        {{ file_data && file_data.format}}
      </a>
    </div>
    <div class="content" v-else>
      <h3 class="text-body4 black1">Yuklanmagan</h3>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
      file: {
        type: String,
        default: ''
      },
      file_data: {
        type: Object,
        default: () => ({})
      }
    },

  }

</script>

<style>

</style>
