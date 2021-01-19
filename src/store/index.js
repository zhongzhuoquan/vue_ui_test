/*
 * @Author      : 钟焯权
 * @Date        : 2020-11-03 17:19:57
 * @LastEditTime: 2020-12-26 14:57:14
 * @Description :
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: '', //传感器数据
    getDataStatus: 0, //获取数据开关
    max: '', //完成校验获取最大值
    isCollapse: false,
    name: '', //用户名
    trainId: '',
    actionModeCount: localStorage.getItem('action_mode_count'), //激活模式可训练次数
    enduranceMuscleCount: localStorage.getItem('endurance_muscle_count'), //耐力肌可训练次数
    freeCount: localStorage.getItem('free_count'), //自由训练可训练次数
    basicOfSlowMuscleCount: localStorage.getItem('basic_of_slow_muscle_count'), //慢肌基础训练
    slowMuscleCoordinationCount: localStorage.getItem(
      'slow_muscle_coordination_count'
    ), //慢肌协调训练
    advancedSlowMuscleCount: localStorage.getItem('advanced_slow_muscle_count'), //慢肌进阶训练
    fastMuscleCoordinationCount: localStorage.getItem(
      'fast_muscle_coordination_count'
    ), //快肌协调训练
    advancedFastMuscleCount: localStorage.getItem('advanced_fast_muscle_count'), //快肌进阶训练
    comprehensiveACount: localStorage.getItem('comprehensiveA_count'), //综合训练A
    comprehensiveBCount: localStorage.getItem('comprehensiveB_count'), //综合训练B
    timeOverStatus: localStorage.getItem('time_over_status'), //定时器状态
    adminSearchUsername: '' //管理员搜索
  },
  getters: {
    getData(state) {
      return state.data
    },
    getDataStatus(state) {
      return state.getDataStatus
    },
    getMax(state) {
      return state.max
    },
    getIsCollapse(state) {
      return state.isCollapse
    },
    getName(state) {
      return state.name
    },
    getTrainId(state) {
      return state.trainId
    },
    getActionModeCount(state) {
      return state.actionModeCount
    },
    getEnduranceMuscleCount(state) {
      return state.enduranceMuscleCount
    },
    getFreeCount(state) {
      return state.freeCount
    },
    getBasicOfSlowMuscleCount(state) {
      return state.basicOfSlowMuscleCount
    },
    getSlowMuscleCoordinationCount(state) {
      return state.slowMuscleCoordinationCount
    },
    getAdvancedSlowMuscleCount(state) {
      return state.advancedSlowMuscleCount
    },
    getFastMuscleCoordinationCount(state) {
      return state.fastMuscleCoordinationCount
    },
    getAdvancedFastMuscleCount(state) {
      return state.advancedFastMuscleCount
    },
    getComprehensiveACount(state) {
      return state.comprehensiveACount
    },
    getComprehensiveBCount(state) {
      return state.comprehensiveBCount
    },
    getTimeOverStatus(state) {
      return state.timeOverStatus
    },
    getAdminSearchUsername(state) {
      return state.adminSearchUsername
    }
  },
  mutations: {
    setData(state, data) {
      state.data = data
    },
    setDataStatus(state, getDataStatus) {
      state.getDataStatus = getDataStatus
    },
    setMax(state, max) {
      state.max = max
    },
    setIsCollapse(state, isCollapse) {
      state.isCollapse = isCollapse
    },
    setName(state, name) {
      state.name = name
    },
    setTrainId(state, trainId) {
      state.trainId = trainId
    },
    setActionModeCount(state, actionModeCount) {
      state.actionModeCount = actionModeCount
    },
    setEnduranceMuscleCount(state, enduranceMuscleCount) {
      state.enduranceMuscleCount = enduranceMuscleCount
    },
    setFreeCount(state, freeCount) {
      state.freeCount = freeCount
    },
    setBasicOfSlowMuscleCount(state, basicOfSlowMuscleCount) {
      state.basicOfSlowMuscleCount = basicOfSlowMuscleCount
    },
    setSlowMuscleCoordinationCount(state, slowMuscleCoordinationCount) {
      state.slowMuscleCoordinationCount = slowMuscleCoordinationCount
    },
    setAdvancedSlowMuscleCount(state, advancedSlowMuscleCount) {
      state.advancedSlowMuscleCount = advancedSlowMuscleCount
    },
    setFastMuscleCoordinationCount(state, fastMuscleCoordinationCount) {
      state.fastMuscleCoordinationCount = fastMuscleCoordinationCount
    },
    setAdvancedFastMuscleCount(state, advancedFastMuscleCount) {
      state.advancedFastMuscleCount = advancedFastMuscleCount
    },
    setComprehensiveACount(state, comprehensiveACount) {
      state.comprehensiveACount = comprehensiveACount
    },
    setComprehensiveBCount(state, comprehensiveBCount) {
      state.comprehensiveBCount = comprehensiveBCount
    },
    setTimeOverStatus(state, timeOverStatus) {
      state.timeOverStatus = timeOverStatus
    },
    setAdminSearchUsername(state, adminSearchUsername) {
      state.adminSearchUsername = adminSearchUsername
    }
  },
  actions: {
    setData({ commit, state }, data) {
      commit('setData', data)
    },
    setDataStatus({ commit, state }, getDataStatus) {
      commit('setDataStatus', getDataStatus)
    },
    setMax({ commit, state }, max) {
      commit('setMax', max)
    },
    setIsCollapse({ commit, state }, isCollapse) {
      commit('setIsCollapse', isCollapse)
    },
    setName({ commit, state }, name) {
      commit('setName', name)
    },
    setTrainId({ commit, state }, trainId) {
      commit('setTrainId', trainId)
    },
    setActionModeCount({ commit, state }, actionModeCount) {
      commit('setActionModeCount', actionModeCount)
    },
    setEnduranceMuscleCount({ commit, state }, enduranceMuscleCount) {
      commit('setEnduranceMuscleCount', enduranceMuscleCount)
    },
    setFreeCount({ commit, state }, freeCount) {
      commit('setFreeCount', freeCount)
    },
    setBasicOfSlowMuscleCount({ commit, state }, basicOfSlowMuscleCount) {
      commit('setBasicOfSlowMuscleCount', basicOfSlowMuscleCount)
    },
    setSlowMuscleCoordinationCount(
      { commit, state },
      slowMuscleCoordinationCount
    ) {
      commit('setSlowMuscleCoordinationCount', slowMuscleCoordinationCount)
    },
    setAdvancedSlowMuscleCount({ commit, state }, advancedSlowMuscleCount) {
      commit('setAdvancedSlowMuscleCount', advancedSlowMuscleCount)
    },
    setFastMuscleCoordinationCount(
      { commit, state },
      fastMuscleCoordinationCount
    ) {
      commit('setFastMuscleCoordinationCount', fastMuscleCoordinationCount)
    },
    setAdvancedFastMuscleCount({ commit, state }, advancedFastMuscleCount) {
      commit('setAdvancedFastMuscleCount', advancedFastMuscleCount)
    },
    setComprehensiveACount({ commit, state }, comprehensiveACount) {
      commit('setComprehensiveACount', comprehensiveACount)
    },
    setComprehensiveBCount({ commit, state }, comprehensiveBCount) {
      commit('setComprehensiveBCount', comprehensiveBCount)
    },
    setTimeOverStatus({ commit, state }, timeOverStatus) {
      commit('setTimeOverStatus', timeOverStatus)
    },
    setAdminSearchUsername({ commit, state }, adminSearchUsername) {
      commit('setAdminSearchUsername', adminSearchUsername)
    }
  },
  modules: {}
})
