<!--
 * @Author      : 钟焯权
 * @Date        : 2020-11-17 09:16:45
 * @LastEditTime: 2021-01-15 10:30:24
 * @Description : 
-->
<template>
  <div id="advancedTestOfSlowMuscle-pages-app">
    <div id="advancedTestOfSlowMuscle-pages-head">
      <div id="advancedTestOfSlowMuscle-pages-font">
        挺直腰背坐在座椅中间, <br />
        进行全力且快速的三次收缩（快收-快放）
      </div>
      <div id="advancedTestOfSlowMuscle-pages-logo">
        <img
          class="advancedTestOfSlowMuscle-pages-logo"
          :src="require('@/assets/image/logo.jpg')"
          alt=""
        />
      </div>
    </div>
    <div id="advancedTestOfSlowMuscle-pages-middio">
      <div id="advancedTestOfSlowMuscle-pages-echarts"></div>
    </div>
    <div id="advancedTestOfSlowMuscle-pages-bottom">
      <el-button id="advancedTestOfSlowMuscle-pages-btn2" @click="open"
        >开始</el-button
      >
      <el-button
        id="advancedTestOfSlowMuscle-pages-btn1"
        @click="btnClick"
        :disabled="isOpen1"
        >完成校验</el-button
      >
    </div>
  </div>
</template>
<style lang="scss">
#advancedTestOfSlowMuscle-pages-app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
#advancedTestOfSlowMuscle-pages-middio {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
#advancedTestOfSlowMuscle-pages-font {
  text-align: left;
  margin-left: 5%;
  width: 40%;
  height: 0%;
  font-size: 20px;
}
#advancedTestOfSlowMuscle-pages-head {
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
#advancedTestOfSlowMuscle-pages-logo {
  text-align: right;
  width: 100%;
  height: 100%;
}
.advancedTestOfSlowMuscle-pages-logo {
  width: 250px;
  height: 50px;
}
#advancedTestOfSlowMuscle-pages-echarts {
  text-align: center;
  width: 85%;
  height: 90%;
  margin-bottom: 2%;
  margin-left: 5%;
}
#advancedTestOfSlowMuscle-pages-bottom {
  text-align: center;
  width: 100%;
  height: 10%;
}
#advancedTestOfSlowMuscle-pages-btn1,
#advancedTestOfSlowMuscle-pages-btn2 {
  width: 20%;
  font-size: 15px;
}
</style>
<script>
export default {
  name: 'advancedTestOfSlowMuscle-pages-index',
  data() {
    return {
      isOpen1: true, //开关
      myChart: null, //图表
      max: '', //最大压力值
      min: '', //最小压力值
      timer: null, // setInterval定时器名称
      timeOut: null, //settimeout定时器名称
      recordData: {
        data: [],
        time: 12
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearTimeout(this.timeOut)
    this.timer = null
  },
  watch: {
    recordData: {
      handler(newValue, oldValue) {
        const xAxisData = []
        const newData = newValue.data
        const oldData = oldValue.data

        for (let i = 0; i <= this.recordData.time * 10; i++) {
          xAxisData.push(i / 10)
        }

        this.myChart.setOption({
          xAxis: {
            data: xAxisData,
            splitLine: {
              show: true //去掉网格线
            }
          },
          series: [
            {
              showSymbol: false,
              hoverAnimation: false,
              data: newData,
              itemStyle: {
                normal: {
                  color: '#8b008b'
                }
              }
            }
          ]
        })
      },
      deep: true
    }
  },
  methods: {
    drawChart() {
      return new Promise((resolve, reject) => {
        this.myChart = this.$echarts.init(
          document.getElementById('advancedTestOfSlowMuscle-pages-echarts')
        )
        // 指定图表的配置项和数据
        // 指定图表的配置项和数据
        this.myChart.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            name: 't/s',
            type: 'category',
            data: [],
            splitLine: {
              show: true //去掉网格线
            }
          },
          yAxis: {
            name: 'mbar',
            scale: true,
            type: 'value',
            splitLine: {
              show: true //去掉网格线
            }
          },
          grid: {
            left: '5%',
            top: '1%',
            width: '90%',
            height: '95%',
            containLabel: false
          },
          series: [
            {
              name: '压力值（mbar）',
              type: 'line',
              data: [],
              itemStyle: {
                normal: {
                  color: '#8b008b'
                }
              }
            }
          ]
        })
        return resolve()
      })
    },
    destroy() {
      clearInterval(this.timer)
      clearTimeout(this.timeOut)
      this.timer = null
    },

    btnClick() {
      this.destroy()
      this.isOpen1 = true
      let dataArray = this.recordData.data
      this.min = Math.min.apply(null, dataArray)
      this.max = Math.max.apply(null, dataArray)
      if (this.min == this.max) {
        this.isOpen == true
        this.$message.error({
          message: '请重新校验',
          center: true
        })
      } else {
        this.$store.dispatch('setMax', this.max - this.min)
        this.$router.push(
          '/home/trainingmode/advancedTestOfSlowMuscle/pages/test'
        )
      }
    },
    open() {
      this.isOpen1 = false
      this.destroy()
      this.$store.dispatch('setDataStatus', 1)
      this.recordData.data = []
      this.timer = setInterval(() => {
        this.recordData.data.push(this.$store.getters.getData)
      }, 100)
      this.timeOut = setTimeout(() => {
        this.$store.dispatch('setDataStatus', 0)
        this.destroy()
      }, this.recordData.time * 1000)
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>
