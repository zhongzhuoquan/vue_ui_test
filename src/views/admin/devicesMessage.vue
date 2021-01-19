<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-16 17:34:06
 * @LastEditTime: 2021-01-15 10:22:45
 * @Description : 
-->
<template>
  <div id="personalInformation-app">
    <div id="personalInformation-logo">
      <img
        class="personalInformation-logo"
        :src="require('@/assets/image/logo.jpg')"
        alt=""
      />
    </div>
    <el-form
      id="personalInformation-form"
      ref="formRef"
      :model="form"
      label-width="80px"
    >
      <el-form-item prop="devices_name" label="设备编号">
        <el-input :disabled="true" v-model="form.devices_name"></el-input>
      </el-form-item>

      <el-form-item prop="available_count" label="可用次数">
        <el-input :disabled="true"  v-model="form.available_count"></el-input>
      </el-form-item>
      <el-form-item prop="usage_count" label="已用次数">
        <el-input :disabled="true"  v-model="form.usage_count"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss">
#personalInformation-logo {
  margin-top: 10px;
  text-align: right;
  width: 100%;
  height: 50px;
}
.personalInformation-logo {
  width: 250px;
  height: 50px;
}
#personalInformation-app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
}
#personalInformation-form {
  width: 50%;
  height: 100%;
  margin: 8%;
}
</style>
<script>
import { fsWrite } from '@/api/fs.js'
export default {
  name: 'personalinformation-index',
  data() {
    return {
      sendMessage: {
        devicesId: localStorage.getItem('devicesId')
      },
      form: {
        devices_name: localStorage.getItem('devicesId'),
        usage_count: '',
        available_count: ''
      }
    }
  },
  created() {
    this.GetInformation()
  },
  methods: {
    GetInformation() {
      const rLoading = this.openLoading()
      this.axios({
        method: 'post',
        url: 'devices/devices_information_api',
        data: this.sendMessage,
        transformRequest: [
          function(data) {
            var oMyForm = new FormData()
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
            rLoading.close()
            let res = response.data['message']
            this.form.available_count = res['available_count']
            this.form.usage_count = res['usage_count']
          } else {
            this.$message.error({
              message: response.data['message'],
              center: true
            })
            rLoading.close()
          }
        })
        .catch(error => {
          rLoading.close()
          fsWrite('管理员信息（GetInformation）：' + error)
          this.$message.error({ message: '网络请求错误', center: true })
        })
    }
  }
}
</script>
