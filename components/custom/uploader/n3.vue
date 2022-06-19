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
      :file-list="fileList" 
      :remove="handleRemove"
      :before-upload="beforeUpload"  
      name="file" 
      :multiple="multiple" 
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
    multiple: {
      type: Boolean,
      default: false
    },
    example: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fileList: []
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
      if(this.multiple) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
      } else {
        this.fileList = []
      }
    },
    beforeUpload(file) {
      if(this.multiple) {
        this.fileList = [...this.fileList, file];
        return false;
      } else {
        this.fileList = [ file];
        return false;
      }
    },
  },
};
</script>

<style>
</style>