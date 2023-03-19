<script lang="ts">
export default {
  props: ['modelValue', 'placeholder', 'type', 'width'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value:any) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<template>
<div>
    <input class="input" v-model="value" :placeholder="placeholder" :type="type"/>
    <div class="underline"></div>
</div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    transition: 0.5s;
    width: 21.875rem;
}

.input {
    opacity: 60%;
    height: 2.5rem;
    font-size: 2.25rem;
    color: var(--green);
    background-color: transparent;
    border: none;
    outline: none;
}

.underline {
    height: 5px;
    opacity: 60%;
    background-color: var(--green);
    border-radius: 1rem;
}

.input:focus + .underline, .input:focus {
    opacity: 100%;
}

.input::placeholder {
  color: var(--green);
}
</style>