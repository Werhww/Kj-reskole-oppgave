<script setup lang="ts">
const props = defineProps<{
    text: string,
    to: string,
    color: string,
}>()
</script>

<template>
<div>
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

@media only screen and (max-width: 1280px) {
    div a {
        font-size: 1.5rem;
        padding: 0.375rem 3.125rem;
    }
}

@media only screen and (max-width: 900px) {
    div a {
        font-size: 1.25rem;
        padding: 0.275rem 3rem;
    }
}
</style>