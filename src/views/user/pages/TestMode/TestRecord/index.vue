<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:24:29
 * @LastEditTime: 2021-01-15 10:29:07
 * @Description : 
-->
<template>
  <div id="testRrcord-app">
    <div id="testRrcord-top">
      <div id="testRrcord-logo">
        <img
          class="testRrcord-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="testRrcord-middio">
      <el-table
        height="100%"
        class="testRrcord-table"
        :data="
          tableData.slice(
            (limitePage.page - 1) * limitePage.limit,
            limitePage.limit * limitePage.page
          )
        "
        style="width: 70%"
      >
        <el-table-column
          align="center"
          prop="create_time"
          label="日期"
          width="290"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="total_time"
          label="数值(s)"
          width="290"
        >
        </el-table-column>
        <el-table-column align="center" label="操作" width="290">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
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
    <div id="testRrcord-bottom"></div>
  </div>
</template>
<style lang="scss" scoped>
#testRrcord-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
.block {
  margin-bottom: 1%;
}
#testRrcord-top {
  width: 100%;
  height: 50px;
}
#testRrcord-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.testRrcord-logo {
  width: 250px;
  height: 50px;
}
#testRrcord-middio {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
#testRrcord-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#testRrcord-table {
  width: 80%;
  height: 60%;
}
#testRrcord-btn {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
import { fsWrite } from '@/api/fs.js'
export default {
  name: 'checktest-index',
  data() {
    return {
      sendMessage: {
        record_id: '',
        name: localStorage.getItem('username'),
        devicesId: localStorage.getItem('devicesId')
      },
      tableData: [],
      limitePage: {
        limit: 10,
        page: 1
      }
    }
  },
  created() {
    this.getInformation()
  },
  methods: {
    getInformation() {
      const rLoading = this.openLoading()
      this.axios({
        method: 'post',
        url: 'TestMode/enduranceMuscleTest_record_get_api',
        data: this.sendMessage,
        transformRequest: [
          function(data) {
            var oMyForm = new FormData()
            oMyForm.append('name', data.name)
            oMyForm.append('devices_id', data.devicesId)
            return oMyForm
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          if (response.data['status'] == 200) {
            rLoading.close
            this.tableData = response.data['message']
          }
          if (response.data['status'] == 300) {
            rLoading.close
            this.tableData = response.data['message']
          } else {
            rLoading.close()
          }
        })
        .catch(error => {
          rLoading.close()
          fsWrite('测试报告（getInformation）：' + error)
          this.$message({ message: '网络请求错误', center: true })
        })
    },
    handleSizeChange(val) {
      this.limitePage.limit = val
    },
    handleCurrentChange(val) {
      this.limitePage.page = val
    },
    handleDelete(index, row) {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.tableData.splice(
            (this.limitePage.page - 1) * this.limitePage.limit + index,
            1
          )
          this.sendMessage.record_id = row['id']
          const rLoading = this.openLoading()
          this.axios({
            method: 'post',
            url: 'TestMode/enduranceMuscleTest_record_delete_api',
            data: this.sendMessage,
            transformRequest: [
              function(data) {
                var oMyForm = new FormData()
                oMyForm.append('name', data.name)
                oMyForm.append('devices_id', data.devicesId)
                oMyForm.append('id', data.record_id)
                return oMyForm
              }
            ],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then(response => {
              if (response.data['status'] == 200) {
                rLoading.close()
                this.$message.success({
                  message: response.data['message'],
                  center: true
                })
              } else {
                rLoading.close()
                this.$message.error({
                  message: response.data['message'],
                  center: true
                })
              }
            })
            .catch(error => {
              rLoading.close()
              fsWrite('测试报告（handleDelete）：' + error)
              this.$message.error({ message: '网络请求错误', center: true })
            })
        })
        .catch()
    }
  },
  mounted() {}
}
</script>
