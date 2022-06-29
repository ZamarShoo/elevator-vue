import { createStore } from 'vuex'

export default createStore({
  state: {
    coordinate: 'calc(0vh + 1px)',
    numberFloors: 5,
    currentFloor: 1,
    turnFloors: [],
    elevatorIsFree: true,
    goingUp: ''
  },
  getters: {
    getCoordinate(state) {
      if (!!state.turnFloors.length) {
        return {
          time: Math.abs(state.turnFloors[0] - state.currentFloor),
          toFloor: state.turnFloors[0],
          elevatorIsFree: state.elevatorIsFree,
        }
      } else {
        return {
          time: 0,
          toFloor: state.currentFloor,
          elevatorIsFree: true,
        }
      }
    }
  },
  mutations: {
    addToTurn(state, floor) {
      state.turnFloors.push(floor)
    },
    inCurrentFloor(state) {     
      if (!!state.turnFloors.length || state.turnFloors.length > 1) {
        state.currentFloor = state.turnFloors.shift()
      }
      state.elevatorIsFree = true
    }
  },
  actions: {
    changeFloor({state, commit}, floorTo) {
      commit('addToTurn', floorTo)
    },
    busyElevator({state, commit}) {
      state.goingUp = 'false'
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000)
      })
      .then(() => commit('inCurrentFloor'))
    },
    nextFloor({state, dispatch, commit}, time) {
      state.elevatorIsFree = false
      new Promise((resolve, reject) => {
        state.coordinate = `calc(${(state.turnFloors[0] - 1) * 19}vh + ${state.turnFloors[0]}px)`
        state.goingUp = state.turnFloors[0] < state.currentFloor ? 'down' : 'up'
        setTimeout(() => {
          resolve();
        }, time * 1000)
      })
      .then(() => dispatch('busyElevator'))
    }
  },
})