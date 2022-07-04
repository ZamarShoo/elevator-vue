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
        }
      }
    },
    heightFloors(state) {
      return 100 / state.numberFloors - 1
    }
  },
  mutations: {
    addToTurn(state, floor) {
      if (Array.isArray(floor)) {
        state.turnFloors.push(...floor)
      } else {
        state.turnFloors.push(floor)
      }
    },
    inCurrentFloor(state) {     
      if (!!state.turnFloors.length || state.turnFloors.length > 1) {
        state.currentFloor = state.turnFloors.shift()
      }
      state.elevatorIsFree = true
    },
    setNumberOfFloors(state, floorNumber) {
      state.numberFloors = floorNumber
    }
  },
  actions: {
    changeFloor({state, commit}, floorTo) {
      if(floorTo !== state.currentFloor) {
        commit('addToTurn', floorTo)
      }
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
      console.log()
      if(state.turnFloors[0] !== state.currentFloor) {
        state.elevatorIsFree = false
        new Promise((resolve, reject) => {
          state.coordinate = state.turnFloors[0] ? `calc(${(state.turnFloors[0] - 1) * 19}vh + ${state.turnFloors[0]}px)` : state.coordinate
          state.goingUp = state.turnFloors[0] < state.currentFloor ? 'down' : 'up'
          setTimeout(() => {
            resolve();
          }, time * 1000)
        })
        .then(() => dispatch('busyElevator'))
      }
    },
    saveToStorage({state}) {
      const strObj = JSON.stringify(state);
      localStorage.setItem('data', strObj);
    },
    getToStorage({state, dispatch, commit}) {
      const strObjFromStorage = localStorage.getItem('data')
      const data = JSON.parse(strObjFromStorage)
      state.coordinate = data.coordinate
      state.numberFloors = data.numberFloors
      state.currentFloor = data.currentFloor
      state.elevatorIsFree = data.elevatorIsFree
      state.goingUp = data.goingUp
      state.turnFloors = data.turnFloors
      if (state.currentFloor === data.turnFloors[0]) {
        commit('inCurrentFloor')
      } else {
        dispatch('nextFloor', Math.abs(state.turnFloors[0] - state.currentFloor))
      }
    }
  },
})