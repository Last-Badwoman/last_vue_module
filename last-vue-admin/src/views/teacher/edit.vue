<template>
  <div class="app-container">
    <el-form :model="teacher" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="pass">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="checkPass">
        <el-input-number v-model="teacher.sort" :min="0" :max="2"></el-input-number>
      </el-form-item>
      <el-form-item label="头衔" prop="age">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="资历" prop="pass">
        <el-input v-model="teacher.career"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="pass">
        <el-input type="textarea" :rows="8" v-model="teacher.intro"></el-input>
      </el-form-item>
      <div style="margin-bottom: 20px;margin-left: 100px">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9001/last/oss/upload/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-form-item>
        <el-button type="primary" @click="save" v-if="saveOrUpdate">保存</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
        <el-button @click="clearData">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
  import teacher from "@/api/teacher/teacher";

  export default {
    data() {
      return {
        teacher: {
          name: null,
          sort: 0,
          level: 1,
          career: null,
          intro: null,
          avatar: null
        },
        saveOrUpdate: true,
        dialogVisible: false,
      }
    },
    created() {
      this.init();
    },
    watch: {
      $route(to, from) {
        this.init();
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        // this.teacher.avatar = URL.createObjectURL(file.raw);
        this.teacher.avatar = res.data.url;
      },
      beforeAvatarUpload(file) {

      },
      init() {
        if (this.$route.params && this.$route.params.id > 0) {
          const id = this.$route.params.id;
          this.getTeacherInfo(id);
          this.saveOrUpdate = false;
        } else {
          this.saveOrUpdate = true;
          this.clearData();
        }
      },
      getTeacherInfo(id) {
        teacher.findTeacherById(id)
          .then(response => {
            this.teacher = response.data.item;
          }).catch(error => {

        });
      },
      clearData() {
        this.teacher = {
          sort: 0,
          level: 1,
          avatar: "",
          name: "",
          intro: ""
        };
      },
      save() {
        if (this.teacher.name == null || this.teacher.career == null || this.teacher.intro == null) {
          this.$message({
            message: '讲师姓信息不完整 !',
            type: 'warning'
          });
          return;
        }
        this.$confirm('是否确认保存该讲师信息 ？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '取消'
        })
          .then(() => {
            teacher.saveTeacher(this.teacher)
              .then(response => {
                if (response.code === 20000) {
                  this.$message({
                    type: 'success',
                    message: '保存成功 !'
                  });
                  this.clearData();
                  this.$router.push({path: '/teacher/list'});
                }
              }).catch(error => {
              this.$message({
                type: 'error',
                message: '保存失败 !'
              });
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              // message: action === 'cancel'
              //   ? '放弃保存并离开页面'
              //   : '停留在当前页面'
              message: "取消保存 !"
            })
          });
      },
      update() {
        if (this.teacher.name == null || this.teacher.career == null || this.teacher.intro == null) {
          this.$message({
            message: '讲师姓信息不完整 !',
            type: 'warning'
          });
          return;
        }
        this.$confirm('是否确认修改该讲师信息 ？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '修改',
          cancelButtonText: '取消'
        })
          .then(() => {
            teacher.updateTeacher(this.teacher)
              .then(response => {
                if (response.code === 20000) {
                  this.$message({
                    type: 'success',
                    message: '修改成功 !'
                  });
                  this.clearData();
                  this.$router.push({path: '/teacher/list'})
                }
              }).catch(error => {
              this.$message({
                type: 'error',
                message: '修改失败 !'
              });
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              // message: action === 'cancel'
              //   ? '放弃保存并离开页面'
              //   : '停留在当前页面'
              message: "取消修改 !"
            })
          });
      }
    }
  }
</script>
