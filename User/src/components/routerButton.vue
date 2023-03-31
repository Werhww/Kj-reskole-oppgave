<script setup lang="ts">
const props = defineProps<{
    text: string,
    to: string,
    color: string,
}>()
</script>

<template>
<div v-bind="$attrs">
    <RouterLink :to="to">{{ text }}</RouterLink>
</div>
</template>

<style scoped>
div a {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
    background-color: v-bind(color);
    padding: 0.375rem 4.125rem;
    border-radius: 5rem;
}
</style>