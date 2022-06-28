import { createStore } from 'vuex'

export default createStore({
  state: {
    numberFloors: 5,
    currentFloor: 0,
    turnFloors: [],
    elevatorIsFree: true,
  },
  mutations: {
    addToTurn(state, floor) {
      state.turnFloors.push(floor)
    },
    inCurrentFloor(state) {
      state.turnFloors.shift()
    }
  },
  actions: {

  },
})
