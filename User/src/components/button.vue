<script setup lang="ts">
const props = defineProps<{
    text: string;
    color: string;
}>()
</script>

<template>
<div v-bind="$attrs">
    <p>{{ text }}</p>
</div>
</template>

<style scoped>
div {
    display: flex;
    background-color: v-bind(color);
    padding: 0.375rem 4.125rem;
    border-radius: 5rem;
}

div p {
    color: white;
    font-size: 2rem;
    font-weight: 700;
}
</style>