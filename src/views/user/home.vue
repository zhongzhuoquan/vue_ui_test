<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-14 15:40:53
 * @LastEditTime: 2021-01-11 14:22:14
 * @Description : 
-->
<template>
  <div class="home" style="height:100%">
    <div class="menu" style="height:100%">
      <el-button style="width: 65px;" @click="change_collapse">
        <i v-if="isCollapse == true" class="el-icon-arrow-left"></i>
        <i v-else class="el-icon-arrow-right"></i>
      </el-button>
      <div
        style="width:100%;height:92% ;overflow:scroll;overflow-x: hidden"
        v-show="isCollapse == false"
      >
        <el-menu
          default-active=""
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-menu-item>
            <i class="el-icon-user-solid"></i>
            <span slot="title">{{ '  ' + name }}</span>
          </el-menu-item>
          <el-menu-item
            @click="change_collapse2"
            index="/home/actionmode/index"
            :disabled="
              this.$store.getters.getActionModeCount <= 0 ? true : false
            "
          >
            <i class="el-icon-sunny"></i>
            <span slot="title">激活模式</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-finished"></i>
              <span slot="title">  测试模式</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                @click="change_collapse2"
                index="/home/testmode/index"
                :disabled="
                  this.$store.getters.getEnduranceMuscleCount <= 0
                    ? true
                    : false
                "
                >  肌耐力测试</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-video-play"></i>
              <span slot="title">  训练模式</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/freetest/index"
                :disabled="this.$store.getters.getFreeCount <= 0 ? true : false"
                >  自由训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/basictestofslowmuscle/index"
                :disabled="
                  this.$store.getters.getBasicOfSlowMuscleCount <= 0
                    ? true
                    : false
                "
                >  慢肌基础训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/slowmusclecoordinationtest/index"
                :disabled="
                  this.$store.getters.getSlowMuscleCoordinationCount <= 0
                    ? true
                    : false
                "
                >  慢肌协调训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/advancedtestofslowmuscle/index"
                :disabled="
                  this.$store.getters.getAdvancedSlowMuscleCount <= 0
                    ? true
                    : false
                "
                >  慢肌进阶训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/fastmusclecoordinationtest/index"
                :disabled="
                  this.$store.getters.getFastMuscleCoordinationCount <= 0
                    ? true
                    : false
                "
                >  快肌协调训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/advancedfastmuscletest/index"
                :disabled="
                  this.$store.getters.getAdvancedFastMuscleCount <= 0
                    ? true
                    : false
                "
                >  快肌进阶训练</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/comprehensivetesta/index"
                :disabled="
                  this.$store.getters.getComprehensiveACount <= 0 ? true : false
                "
                >  综合训练A</el-menu-item
              >
              <el-menu-item
                @click="change_collapse2"
                index="/home/trainingmode/comprehensivetestb/index"
                :disabled="
                  this.$store.getters.getComprehensiveBCount <= 0 ? true : false
                "
                >  综合训练B</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item
            @click="change_collapse2"
            index="/home/personalinformation/index"
          >
            <i class="el-icon-info"></i>
            <span slot="title">  个人信息</span>
          </el-menu-item>

          <el-menu-item
            @click="change_collapse2"
            index="/home/testmode/testrecord/index"
          >
            <i class="el-icon-document"></i>
            <span slot="title">  测试记录</span>
          </el-menu-item>

          <el-menu-item
            @click="change_collapse2"
            index="/home/trainingmode/trainRecord/index"
          >
            <i class="el-icon-notebook-2"></i>
            <span slot="title">  训练记录</span>
          </el-menu-item>
          <el-menu-item @click="logout">
            <i class="el-icon-switch-button"></i>
            <span slot="title">  退出登录</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <router-view style="text-align: center"></router-view>
  </div>
</template>
<style lang="scss">
.home {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
</style>
<script>
export default {
  name: 'nav-left',
  data() {
    return {
      timeOverStatus: null, //定时器状态
      timeOver_home: null, //定时器
      isCollapse: false,
      name: localStorage.getItem('username'),
      available_count: localStorage.getItem('available_count'),
      limit: {
        action_mode_count: this.$store.getters.getActionModeCount
      },
      action_mode_status: false
    }
  },
  beforeDestroy() {
    clearTimeout(this.timeOver_home)
    this.timeOver_home = null
  },
  watch: {
    timeOverStatus: {
      handler(newValue, oldValue) {
        if (newValue == true) {
          this.timeOver_home = setTimeout(() => {
            localStorage.setItem('action_mode_count', 0) //激活模式
            this.$store.dispatch('setActionModeCount', 0) //激活模式
            localStorage.setItem('endurance_muscle_count', 0) //耐力肌模式
            this.$store.dispatch('setEnduranceMuscleCount', 0) //耐力肌模式
            localStorage.setItem('free_count', 0) //自由模式
            this.$store.dispatch('setFreeCount', 0) //自由模式
            localStorage.setItem('basic_of_slow_muscle_count', 0) //慢肌基础模式
            this.$store.dispatch('setBasicOfSlowMuscleCount', 0) //慢肌基础模式
            localStorage.setItem('slow_muscle_coordination_count', 0) //慢肌协调模式
            this.$store.dispatch('setSlowMuscleCoordinationCount', 0) //慢肌协调模式
            localStorage.setItem('advanced_slow_muscle_count', 0) //慢肌进阶模式
            this.$store.dispatch('setAdvancedSlowMuscleCount', 0) //慢肌进阶模式
            localStorage.setItem('fast_muscle_coordination_count', 0) //快肌协调模式
            this.$store.dispatch('setFastMuscleCoordinationCount', 0) //快肌协调模式
            localStorage.setItem('advanced_fast_muscle_count', 0) //快肌进阶模式
            this.$store.dispatch('setAdvancedFastMuscleCount', 0) //快肌进阶模式
            localStorage.setItem('comprehensiveA_count', 0) //综合训练A模式
            this.$store.dispatch('setComprehensiveACount', 0) //综合训练A模式
            localStorage.setItem('comprehensiveB_count', 0) //综合训练B
            this.$store.dispatch('setComprehensiveBCount', 0) //定时器
          }, 3600 * 1000)
        } else {
          clearTimeout(this.timeOver_home)
          this.timeOver_home = null
        }
      }
    }
  },
  created() {
    this.notify()
    this.changeTimeOverStatus()
  },
  methods: {
    changeTimeOverStatus() {
      this.timeOverStatus = this.$store.getters.getTimeOverStatus
    },
    notify() {
      if (this.available_count < 3) {
        this.$notify({
          title: '警告',
          message:
            '可登录次数:' +
            this.available_count +
            '次。为了避免对训练造成影响，请及时联系我们进行充值。',
          duration: 0,
          type: 'warning',
          onClick: () => {
            this.$alert(
              '联系电话:' + localStorage.getItem('administrator_phone'),
              '联系我们'
            )
          }
        })
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    change_collapse() {
      if (this.isCollapse == true) {
        this.isCollapse = false
        return 'el-icon-arrow-left'
      } else {
        this.isCollapse = true
        return 'el-icon-arrow-left'
      }
    },
    change_collapse2() {
      this.isCollapse = true
      return 'el-icon-arrow-left'
    },
    logout() {
      // 二次退出登录
      this.$confirm('确定要退出吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          localStorage.setItem('username', '')
          localStorage.setItem('login_time', '')
          localStorage.setItem('available_count', '')
          this.$store.dispatch('setTimeOverStatus', false)
          localStorage.setItem('time_over_status', false)
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>
