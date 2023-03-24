<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number,
  width?: string,
  color?: string,
}>()

const emit = defineEmits(['update'])

function updateValue(e:any) {
  return e.target.value
}

</script>
<template>
<div>
  <input 
    class="input" 
    :value="modelValue"
    @input="$emit('update:modelValue', updateValue($event))"
    v-bind="$attrs"
  />

  <div class="underline"></div>
</div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  width: v-bind(width);
}

.input {
  opacity: 60%;
  height: 2.5rem;
  font-size: 2.25rem;
  color: v-bind(color);
  background-color: transparent;
  border: none;
  outline: none;
}

.underline {
  height: 5px;
  opacity: 60%;
  background-color: v-bind(color);
  border-radius: 1rem;
}

.input:focus + .underline, .input:focus {
    opacity: 100%;
}

.input::placeholder {
  color: v-bind(color);
}

/* Chrome, Safari, Edge, Opera */
.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<style scoped>
@media only screen and (max-width: 1100px) {
  .input {
    font-size: 2rem;
  }
}

@media only screen and (max-width: 1000px) {
  .input {
    font-size: 1.5rem;
  }
}
</style>