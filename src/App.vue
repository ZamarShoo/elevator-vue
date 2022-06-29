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
    <floor 
      :number-floors="this.numberFloors"
      :turn-floors="this.turnFloors"
    />
  </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Elevator from '@/components/Elevator.vue'
import Floor from '@/components/Floor.vue'

export default {
  name: 'App',
  components: {
    Elevator, Floor
  },
  computed: {
    ...mapState(['numberFloors', 'turnFloors']),
    ...mapGetters(['getCoordinate'])
  },
  methods: {
      ...mapActions(['nextFloor']),
  },
  mounted() {
    this.$store.watch(() => this.$store.getters.getCoordinate, (n) => {
        if (n.elevatorIsFree) {
          this.nextFloor(this.getCoordinate.time)
        }
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
    p {
      margin: 10px;
      font-size: 18px;
      font-weight: bold;
    }
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
