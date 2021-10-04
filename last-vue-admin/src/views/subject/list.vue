<template>
  <div class="custom-tree-container">
    <div class="block">
      <p style="margin-left: 30px">课程分类</p>
      <el-input style="margin-bottom: 20px"
                placeholder="输入关键字进行过滤"
                v-model="filterSearch">
      </el-input>

      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false" ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button style="margin-left: 50px"
                     size="mini"
                     type="primary" icon="el-icon-edit" circle
                     @click="append(data)">
          </el-button>

          <el-button style="margin-left: 50px"
                     type="danger"
                     size="mini"
                     icon="el-icon-delete"
                     circle
                     @click="remove(node, data)">
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
  import subject from "@/api/subject/subject";

  export default {
    watch: {
      filterSearch(val) {
        this.$refs.tree.filter(val);
      }
    },
    data() {
      return {
        filterSearch: "",
        data: [{}],
      }
    },
    created() {
      this.initSubject();
    },
    methods: {
      initSubject(pid = 0) {
        subject.findSubject(pid)
          .then(response => {
            this.data = response.data.items;
          }).catch(error => {

        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      append(data) {
        this.$prompt('请输入分类名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          subject.saveSubject(data.id, value)
            .then(response => {
              this.$message({
                type: 'success',
                message: response.message
              });
              this.initSubject();
            }).catch(error => {
            this.$message({
              type: 'error',
              message: error.message
            });
          });
        }).catch(error => {
          this.$message({
            type: 'info',
            message: "你已取消!"
          });
        });
      },
      remove(node, data) {
        if (data.children.length !== 0) {
          this.$message({
            type: 'waring ',
            message: `当前课程存在子节点!`
          });
          return false;
        }
        this.$confirm('是否确认删除该课程信息 ？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() => {
            subject.deleteSubject(data.id)
              .then(response => {
                this.$message({
                  type: 'success ',
                  message: `你已删除${data.label}课程!`
                });
                this.initSubject();
              }).catch(error => {
              this.$message({
                type: 'error ',
                message: error.message
              });
            });
          })
          .catch(action => {
            this.$message({
              type: 'info ',
              message: `你已取消!`
            });
          });
      },
    }
  }
</script>
