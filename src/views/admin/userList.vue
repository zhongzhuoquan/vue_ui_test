<!--
 * @Author      : 钟焯权
 * @Date        : 2020-12-19 17:09:06
 * @LastEditTime: 2021-01-15 10:24:51
 * @Description : 
-->
<template>
  <div id="admin-user-list">
    <div id="admin-user-head">
      <div id="admin-user-logo">
        <img
          class="admin-user-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="admin-user-bottom">
      <div class="handle-box">
        <el-input
          v-model="query.user_name"
          placeholder="用户名"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="
          tableData.slice(
            (limitePage.page - 1) * limitePage.limit,
            limitePage.limit * limitePage.page
          )
        "
        :border="false"
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
        style="height:80%"
      >
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column
          align="center"
          prop="username"
          label="用户名"
        ></el-table-column>
        <el-table-column align="center" prop="password" label="密码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="login_time"
          label="最近登录时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="create_time"
          label="注册时间"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-search"
              class="blud"
              @click="handleSearch2(scope.$index, scope.row)"
              >查看报告</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="limitePage.page"
          :page-sizes="[10]"
          :page-size="limitePage.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
#admin-user-list {
  width: 100%;
  height: 100%;
}
#admin-user-head {
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
#admin-user-bottom {
  width: 90%;
  height: 100%;
}
#admin-user-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.admin-user-logo {
  width: 250px;
  height: 50px;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.block {
  bottom: 0px;
}
</style>
<script>
import { getBasicApi } from '@/api/recordSaveApi'
import { deleteApi } from '@/api/recordSaveApi'
import { fsWrite } from '@/api/fs.js'
export default {
  name: 'user-list',
  data() {
    return {
      query: {
        user_name: '',
        devices_name: localStorage.getItem('devicesId')
      },

      tableData: [],
      limitePage: {
        limit: 10,
        page: 1
      },
      form: {},
      idx: -1,
      editVisible: false
    }
  },
  created() {
    this.getUserMessageApi()
  },
  methods: {
    async getUserMessageApi() {
      const rLoading = this.openLoading()
      let res = await getBasicApi(this.query, 'user/get_user_message')
      if (res['status'] == 200) {
        this.tableData = res['message']
        console.log(this.tableData)
        rLoading.close()
      } else {
        this.$message.error({
          message: res['message'],
          center: true
        })
        rLoading.close()
      }
    },
    handleSizeChange(val) {
      this.limitePage.limit = val
    },
    handleCurrentChange(val) {
      this.limitePage.page = val
    },
    // 触发搜索按钮
    async handleSearch() {
      const rLoading = this.openLoading()
      let res = await getBasicApi(this.query, 'user/get_user_message')
      if (res['status'] == 200) {
        this.tableData = res['message']
        rLoading.close()
      } else {
        this.$message.error({
          message: res['message'],
          center: true
        })
        rLoading.close()
      }
    },
    handleSearch2(index, row) {
      this.$store.dispatch('setAdminSearchUsername', row['username'])
      this.$router.push('/admin/trainRecord')
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(async () => {
          const rLoading = this.openLoading()
          let res = await deleteApi(row['id'], 'user/delete_user_api')
          if (res['status'] == 200) {
            this.$message.success('删除成功')
            this.tableData.splice(
              (this.limitePage.page - 1) * this.limitePage.limit + index,
              1
            )
            rLoading.close()
          } else {
            this.$message({
              message: res['message'],
              center: true
            })
            rLoading.close
          }
        })
        .catch(error => {
          rLoading.close()
          fsWrite('管理员查看用户列表（handleDelete）：' + error)
          this.$message({ message: '网络请求错误', center: true })
        })
        .catch()
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 编辑操作
    handleEdit(index, row) {
      console.log(index)
      console.log(row)
      // this.idx = index;
      // this.form = row;
      this.editVisible = true
    },
    saveEdit() {
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
      this.$set(this.tableData, this.idx, this.form)
    }
    // async delAllSelection() {
    //     if (this.multipleSelection != null) {
    //         const length = this.multipleSelection.length;
    //         let id = '';
    //         let userName = '';
    //         for (let i = 0; i < length; i++) {
    //             id += this.multipleSelection[i].id + ',';
    //             userName +=this.multipleSelection[i].username+' ';
    //         }
    //         let res = await deleteAnyApi(id, 'DeleteMessage/delete_user_all_api');
    //         if (res['status'] == 200) {
    //             this.$message.error(`删除了${userName}`);
    //             this.multipleSelection = [];
    //             location.reload();
    //         } else {
    //             this.$message({
    //                 message: res['message'],
    //                 center: true
    //             });
    //         }
    //     }
    // }
  }
}
</script>
