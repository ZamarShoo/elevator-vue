<template>
  <div class="input-wrapper">
    <p>Количество этажей (от 5 до 10):</p>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
  </div>
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
        if (Number(event.target.value) && Number(event.target.value) <= 10 && Number(event.target.value) >= 5)
            this.$emit('update:modelValue', Number(event.target.value))
        }
  }
}
</script>

<style scoped>
.input-wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #F7FCFC;
    z-index: 100;
    border: 1px solid rgba(120, 120, 120, .4);
    padding: 20px;
}
p {
    margin: 0;
}
.input {
  width: 160px;
  border: 1px solid rgba(120, 120, 120, .4);
  padding: 10px 15px;
  margin-top: 15px;
  background: #F7FCFC;
}
</style>