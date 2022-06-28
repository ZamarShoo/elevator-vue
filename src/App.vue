<template>
<div class="house">
  <div class="floor-left">
    <div class="elevator"></div>
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
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      numberFloors: state => state.numberFloors
    }),
  }
}
</script>

<style lang="scss">
  .house {
    display: flex;
  }
  .floor-left {
    width: 10%;

    .elevator {
      position: absolute;
      width: 100%;
      height: 19vh;
      background-color: tomato;
      z-index: 1;
      left: 0;
      bottom: calc(0vh + 1px);
      transition: 1s;
    }
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
