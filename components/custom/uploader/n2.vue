<template>
  <div class="uploader _2">
    <div v-if="example" class="uploader-header _2 mb-12">
      <a :href="example_url" download target="_blank" class="uploader-header-item _2">
        <span class="text-caption black1">
          <img src="/excel.svg" alt="excel" />
          {{example_name}}.xls
        </span>
        <i class="icon-download"></i>
      </a>
    </div>
    <a-upload-dragger 
      name="file" 
      :multiple="false" 
      @change="handleChange" 
      :accept="accept"
      class="page-uploader">
      <p class="text-body3 black1 mb-8">
        Click or drag file to this area to upload
      </p>
      <p class="text-caption black2">
        Fayl yuklang
      </p>
    </a-upload-dragger>
  </div>
</template> 

<script>
export default {
  props: {
    accept: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    example_name: {
      type: String,
      default: ''
    },
    example_url: {
      type: String,
      default: ''
    },
    example: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        this.$emit('change', info.file);
      }
      if (info.file.status === 'done') {
        console.log('done')
      } else if (info.file.status === 'error') {
        console.log('error');
      }
    },
  },
};
</script>

<style>
</style>