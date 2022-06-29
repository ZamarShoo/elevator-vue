<template>
    <div
      v-for="n in numberFloors"
      :key="n" 
      class="floor">
        <p class="floor-number">{{n}}</p>
        <p 
          @click="this.changeFloor(n)"
          :class="{active: this.turnFloors.includes(n)}"
          class="lift-call-button">
        </p>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'floor',
        props: {
            numberFloors: Number,
            turnFloors: Array
        },
        methods: {
            ...mapActions(['changeFloor']),
        },
    }
</script>

<style lang="scss">
.lift-call-button {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    background-color: green;
    cursor: pointer;

    &.active {
      background-color: tomato;
    }
}
</style>