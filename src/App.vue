<template>
<div class="house">
  <div class="floor-left">
    <elevator
      :time="this.getCoordinate.time"
      :to-floor="this.getCoordinate.toFloor"
    />
    <div
      v-for="n in numberFloors"
      :key="n" 
      class="floor">
    </div>
  </div>
  <div class="floor-right">
    <div
      v-for="n in numberFloors"
      :key="n" 
      class="floor">
        <p class="floor-number">{{n}}</p>
        <p class="lift-call-button"></p>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Elevator from '@/components/Elevator.vue'

export default {
  name: 'App',
  components: {
    Elevator
  },
  computed: {
    ...mapState(['numberFloors', 'elevatorIsFree', 'coordinate', 'goingUp']),
    ...mapGetters(['getCoordinate'])
  },
  methods: {
      ...mapActions(['changeFloor', 'nextFloor']),
    },
  mounted() {
    setTimeout(() => {
      this.changeFloor(5)
    }, 1000),
    this.$store.watch(() => this.$store.getters.getCoordinate, (turnFloors) => {
      this.nextFloor(this.getCoordinate.time)
    })
  }
}
</script>

<style lang="scss">
  .house {
    display: flex;
  }
  .floor-left {
    width: 10%;
  }
  .floor-right {
    width: 90%;
    border-left: 1px solid black;
  }
  .floor-right, .floor-left {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    
  }
  .floor {
    position: relative;
    z-index: 2;
    height: 19vh;
    border-bottom: 1px solid black;
  }
</style>
