<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="OSS_PATH + '/2021/10/3/15/%E6%A8%A1%E6%9D%BF%E8%AF%B4%E6%98%8E.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>
    </el-form>

    <el-upload style="margin-left: 50px"
               class="upload-demo"
               action="http://localhost:9001/last/service/subject/upload"
               multiple
               :limit="1"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :before-upload="beforeUpload">
      <el-button size="small" type="primary" :loading="loadingBtn">{{fileUploadBtnText}}</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
    </el-upload>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        OSS_PATH: "https://last-oss-picture.oss-cn-shanghai.aliyuncs.com",
        fileUploadBtnText: "点击上传",
        loadingBtn: false,
      };
    },
    created() {

    },
    methods: {
      uploadSuccess(response) {
        if (response.success === true) {
          this.fileUploadBtnText = '导入成功'
          this.loadingBtn = false
          this.$message({
            type: 'success',
            message: response.message
          })
          setTimeout(() => {
            this.fileUploadBtnText = '点击上传'
          }, 1000);
        }
      },
      uploadError(error) {
        this.$message({
          type: 'error',
          message: error.message
        })
      },
      beforeUpload() {
        this.fileUploadBtnText = '正在上传...';
        this.loadingBtn = true;
      }
    }
  }
</script>
