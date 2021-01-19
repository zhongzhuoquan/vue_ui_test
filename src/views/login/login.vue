<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="name">
          <el-input
            class="login_item"
            v-model="loginForm.name"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login_item"
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="info" @click="dialogFormVisible = true"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 模态框 -->
    <el-dialog
      append-to-body
      title="注册"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dialogFormRef"
        :rules="dialogFormRules"
        :model="dialogForm"
        label-width="0px"
      >
        <el-form-item prop="dname" label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="dialogForm.dname"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="dsex" label="性别" :label-width="formLabelWidth">
          <el-select v-model="dialogForm.dsex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dyear" label="出生年" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dialogForm.dyear"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          prop="dpassword"
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="dialogForm.dpassword"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请输入登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="drpassword"
          label="重复密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="dialogForm.drpassword"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="请重新输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :plain="true" @click="register"
          >注 册</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fsWrite } from '@/api/fs.js'
export default {
  name: 'login',
  data() {
    return {
      //模态框
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogForm: {
        dname: '',
        dpassword: '',
        drpassword: '',
        dsex: '',
        dyear: '',
        devicesId: localStorage.getItem('devicesId')
      },
      //登录表单数据
      loginForm: {
        name: '',
        password: '',
        devicesId: localStorage.getItem('devicesId')
      },
      //登录验证规则
      loginFormRules: {
        name: [
          { required: true, message: '请输入用户名', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', tigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', tigger: 'blur' },
          { min: 4, max: 15, message: '长度在4到15个字符之间', tigger: 'blur' }
        ]
      },
      dialogFormRules: {
        dname: [
          { required: true, message: '请输入用户名', tigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', tigger: 'blur' }
        ],
        dsex: [{ required: true, message: '请选择性别' }],
        dyear: [{ required: true, message: '请选择出生年' }],
        dpassword: [
          { required: true, message: '请输入登录密码', tigger: 'blur' },
          { min: 4, max: 15, message: '长度在4到15个字符之间', tigger: 'blur' }
        ],
        drpassword: [
          { required: true, message: '请重新输入密码', tigger: 'blur' },
          { min: 4, max: 15, message: '长度在4到15个字符之间', tigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.limit_count()
  },
  methods: {
    //限制训练次数
    limit_count() {
      localStorage.setItem('action_mode_count', 5) //激活模式
      this.$store.dispatch('setActionModeCount', 5) //激活模式
      localStorage.setItem('endurance_muscle_count', 5) //耐力肌模式
      this.$store.dispatch('setEnduranceMuscleCount', 5) //耐力肌模式
      localStorage.setItem('free_count', 5) //自由模式
      this.$store.dispatch('setFreeCount', 5) //自由模式
      localStorage.setItem('basic_of_slow_muscle_count', 5) //慢肌基础模式
      this.$store.dispatch('setBasicOfSlowMuscleCount', 5) //慢肌基础模式
      localStorage.setItem('slow_muscle_coordination_count', 5) //慢肌协调模式
      this.$store.dispatch('setSlowMuscleCoordinationCount', 5) //慢肌协调模式
      localStorage.setItem('advanced_slow_muscle_count', 5) //慢肌进阶模式
      this.$store.dispatch('setAdvancedSlowMuscleCount', 5) //慢肌进阶模式
      localStorage.setItem('fast_muscle_coordination_count', 5) //快肌协调模式
      this.$store.dispatch('setFastMuscleCoordinationCount', 5) //快肌协调模式
      localStorage.setItem('advanced_fast_muscle_count', 5) //快肌进阶模式
      this.$store.dispatch('setAdvancedFastMuscleCount', 5) //快肌进阶模式
      localStorage.setItem('comprehensiveA_count', 5) //综合训练A模式
      this.$store.dispatch('setComprehensiveACount', 5) //综合训练A模式
      localStorage.setItem('comprehensiveB_count', 5) //综合训练B
      this.$store.dispatch('setComprehensiveBCount', 5) //综合训练B
    },

    resetLoginForm() {
      this.$message.success({ message: '重置完成', center: true })
      this.$refs.loginFormRef.resetFields()
    },

    login() {
      const rLoading = this.openLoading()
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          rLoading.close()
          return
        } else {
          await this.axios({
            method: 'post',
            url: 'user/user_login_api',
            data: this.loginForm,
            transformRequest: [
              function(data) {
                var oMyForm = new FormData()
                oMyForm.append('name', data.name)
                oMyForm.append('password', data.password)
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
                if (response.data['role_status'] == 1) {
                  localStorage.setItem('username', this.loginForm['name'])
                  this.$message.success({
                    message: response.data['message'],
                    center: true
                  })
                  this.$store.dispatch('setAdminSearchUsername', '')
                  rLoading.close()
                  this.$router.push('/admin/index')
                } else {
                  localStorage.setItem('time_over_status', true)
                  this.$store.dispatch('setTimeOverStatus', true)
                  localStorage.setItem('username', this.loginForm['name'])
                  localStorage.setItem(
                    'available_count',
                    response.data['available_count']
                  )
                  this.$message.success({
                    message: response.data['message'],
                    center: true
                  })
                  rLoading.close()
                  this.$router.push('/home/index')
                }
              }
              if (response.data['status'] == 401) {
                rLoading.close()
                this.$alert(
                  '可使用次数为0，请联系' +
                    localStorage.getItem('administrator_phone') +
                    '进行充值',
                  '警告',
                  {
                    confirmButtonText: '确定'
                  }
                )
              }
              if (response.data['status'] == 402) {
                rLoading.close()
                this.$message.error({
                  message: response.data['message'],
                  center: true
                })
                this.$forceUpdate()
              }
            })
            .catch(error => {
              rLoading.close()
              fsWrite('用户登录：' + error)
              this.$message.error({ message: '网络请求错误', center: true })
            })
        }
      })
    },

    //注册
    register() {
      const rLoading = this.openLoading()
      this.$refs.dialogFormRef.validate(async valid => {
        if (!valid) {
          rLoading.close()
          return
        } else {
          await this.axios({
            method: 'post',
            url: 'user/user_register_api',
            data: this.dialogForm,
            transformRequest: [
              function(data) {
                var oMyForm = new FormData()
                oMyForm.append('name', data.dname)
                oMyForm.append('sex', data.dsex)
                oMyForm.append('year', data.dyear)
                oMyForm.append('password', data.dpassword)
                oMyForm.append('rpassword', data.drpassword)
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
                this.dialogFormVisible = false
                rLoading.close()
                this.$message.success({
                  message: response.data['message'],
                  center: true
                })

                this.axios({
                  method: 'post',
                  url: 'user/user_login_api',
                  data: this.dialogForm,
                  transformRequest: [
                    function(data) {
                      var oMyForm = new FormData()
                      oMyForm.append('name', data.dname)
                      oMyForm.append('password', data.dpassword)
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
                        localStorage.setItem('time_over_status', true)
                        this.$store.dispatch('setTimeOverStatus', true)
                        localStorage.setItem('username', this.dialogForm['name'])
                        localStorage.setItem(
                          'available_count',
                          response.data['available_count']
                        )
                        this.$message.success({
                          message: response.data['message'],
                          center: true
                        })
                        rLoading.close()
                        this.$router.push('/home/index')
                    }
                    if (response.data['status'] == 401) {
                      rLoading.close()
                      this.$alert(
                        '可使用次数为0，请联系' +
                          localStorage.getItem('administrator_phone') +
                          '进行充值',
                        '警告',
                        {
                          confirmButtonText: '确定'
                        }
                      )
                    }
                    if (response.data['status'] == 402) {
                      rLoading.close()
                      this.$message.error({
                        message: response.data['message'],
                        center: true
                      })
                      this.$forceUpdate()
                    }
                  })
                  .catch(error => {
                    rLoading.close()
                    fsWrite('用户登录：' + error)
                    this.$message.error({ message: '网络请求错误', center: true })
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
              fsWrite('用户注册：' + error)
              this.$message.error({ message: '网络请求错误', center: true })
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 97%;
  background-image: url('../../assets/image/background.jpg');
  background-size: cover;
}
.login_item {
  border-color: rgb(31, 31, 31);
}
.login_box {
  width: 450px;
  height: 250px;
  // background-color: rgb(255, 255, 255);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -20%);
}
.btns {
  display: flex;
  justify-content: center;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
