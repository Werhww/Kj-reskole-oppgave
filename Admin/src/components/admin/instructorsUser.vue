<script setup lang="ts">
const prop = defineProps<{
    name:string
    licence:string
}>()
</script>

<template>
<div>
    <p>{{ name }}</p>
    <p>{{ licence }}</p>
</div>
</template>

<style scoped>
div {
    display: flex;
    justify-content: space-between;

    padding: .3rem 1rem;
}
</style>