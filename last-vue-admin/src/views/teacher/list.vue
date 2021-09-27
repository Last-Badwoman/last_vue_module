<template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline" style="padding-left: 50px">
      <el-form-item label="姓名">
        <el-input v-model="teacherQuery.name" placeholder="讲师姓名"></el-input>
      </el-form-item>
      <el-form-item label="头衔" style="padding-left: 10px">
        <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围" style="padding-left: 10px">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="开始时间"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
        <el-date-picker style="margin-left: 10px"
                        v-model="teacherQuery.end"
                        type="datetime"
                        placeholder="结束时间"
                        value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="findTeachers()">查询</el-button>
      <el-button @click="clearData()">重置</el-button>
    </el-form>

    <el-table
      :data="teachers"
      style="width: 100%">
      <el-table-column align="center" v-if="false"
                       label="id"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="序号"
                       width="180">
        <template slot-scope="scope">
          <i class="el-icon-info"></i>
          <span style="margin-left: 10px">{{ scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="姓名"
                       width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>简介: {{ scope.row.intro }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="头衔"
                       width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>头衔: 1 => 高级讲师 2 => 首席讲师</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="资历"
                       width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.career }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="添加日期"
                       width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="更新时间"
                       width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.gmtModified }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button size="mini">编辑</el-button>
          </router-link>
            <el-button
              size="mini"
              type="danger"
              @click="delTeacher(scope.row.name, scope.row.id)">删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="limit"
      :current-page="page"
      style="padding: 30px 0;text-align: center"
      @current-change="findTeachers">
    </el-pagination>
  </div>
</template>

<script>
  import teacher from "@/api/teacher/teacher";

  export default {
    data() {
      return {
        teachers: [],
        page: 1,
        limit: 10,
        total: 0,
        teacherQuery: {}
      }
    },
    created() {
      this.findTeachers();
    },
    methods: {
      findTeachers(page = 1) {
        this.page = page
        teacher.findTeachersPage(this.page, this.limit, this.teacherQuery)
          .then(response => {
            this.teachers = response.data.rows;
            this.total = response.data.total
          }).catch(error => {

        });
      },
      clearData() {
        this.teacherQuery = {};
        this.findTeachers(this.page, this.limit, this.teacherQuery);
      },
      delTeacher(name, id) {
        this.$confirm(`是否要删除${name}讲师？`, '删除提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            teacher.delTeacherById(id)
              .then(response => {
                if (response.code === 20000) {
                  this.$message({
                    type: 'success ',
                    message: `已删除${name}讲师`
                  });
                  this.findTeachers(this.page, this.limit, this.teacherQuery);
                }
              }).catch(error => {
              this.$message({
                type: 'error ',
                message: `删除${name}讲师失败`
              });
            });

          })
          .catch(action => {
            this.$message({
              type: 'info',
              // message: action === 'cancel'
              //   ? '取消并离开页面'
              //   : '停留在当前页面'
              message: "取消删除!"
            })
          });

      }
    }
  }
</script>
