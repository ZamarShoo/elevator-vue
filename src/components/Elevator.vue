<template>
    <div 
        class="elevator"
        :class="{elevatorBusy: this.goingUp !== 'up' && this.goingUp !== 'down' && !elevatorIsFree ? true : false}"
        :style="{
            transition: time + 's',
            bottom: this.coordinate,
            height: `${100 / this.numberFloors - 1}vh`
        }"
        >
        <p v-if="this.goingUp === 'up'" class="scoreboard scoreboard--up">{{toFloor}}</p>
        <p v-else-if="this.goingUp === 'down'" class="scoreboard">{{toFloor}}</p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'elevator',
        props: {
            time: Number,
            toFloor: Number,
            numberFloors: Number
        },
        computed: {
            ...mapState(['elevatorIsFree', 'coordinate', 'goingUp']),
        },
    }
</script>
    
<style lang="scss">
.elevator {
    position: absolute;
    width: 100%;
    height: 19vh;
    background-color: #005eff;
    z-index: 3;
    left: 0;
    bottom: calc(0vh + 1px);
    transition: 1s;

    p {
        font-size: 18px;
    }
}
.elevatorBusy {
    animation: busy 1s linear infinite;
}

@keyframes busy {
    0% {
      opacity: .5;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: .5;
    }
}
.scoreboard {
    display: flex;
    justify-content: center;
    align-items: center;
}
.scoreboard::before {
    content: '';
    position: relative;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-size: 15px;
    background-image: url(https://svgsilh.com/svg/147745.svg);
    transform: rotate(0deg);
    margin-right: 5px;
}
.scoreboard--up::before {
    transform: rotate(180deg);
}
</style>