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
          toFloor: state.turnFloors[0]
        }
      } else {
        return {
          time: 0
        }
      }
    }
  },
  mutations: {
    addToTurn(state, floor) {
      state.turnFloors.push(floor)
      state.turnFloors.push(2)
      state.turnFloors.push(4)
      state.turnFloors.push(3)
    },
    inCurrentFloor(state) {     
      if (!!state.turnFloors.length || state.turnFloors.length > 1) {
        state.currentFloor = state.turnFloors.shift()
      }
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
          state.elevatorIsFree = true
          resolve();
        }, 3000)
      })
      .then(() => commit('inCurrentFloor'))
    },
    nextFloor({state, dispatch, commit}, time) {
      new Promise((resolve, reject) => {
        state.coordinate = `calc(${(state.turnFloors[0] - 1) * 19}vh + ${state.turnFloors[0]}px)`
        state.goingUp = state.turnFloors[0] < state.currentFloor ? 'down' : 'up'
        setTimeout(() => {
          state.elevatorIsFree = false
          resolve();
        }, time * 1000)
      })
      .then(() => dispatch('busyElevator'))
    }
  },
})
