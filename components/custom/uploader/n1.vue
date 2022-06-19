<template>
  <div class="uploader _2">
    <a-upload-dragger
      :file-list="fileList" 
      :remove="handleRemove"
      :before-upload="beforeUpload" 
      name="file" 
      @change="handleChange" 
      :accept="accept">
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
  },
  data() {
    return {
      fileList: [],
    }
  },
  methods: {
    handleChange(info) {
      if (info.file && info.fileList.length > 0) {
        console.log('done')
        this.$emit('change', info.file);
      } else  {
        console.log('error');
        this.$emit('change', null);
      }
    },
    handleRemove(file) {
      this.fileList = []
    },
    beforeUpload(file) {
      this.fileList = [ file];
      return false;
    },
  },
};
</script>

<style>
</style>