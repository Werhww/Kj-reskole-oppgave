<script setup lang="ts">


const props = defineProps<{
    userName: string,
}>()
</script>

<template>
<header>
    <router-link to="/chat"><img src="../assets/chat.svg"></router-link>
    <p>{{ userName }}</p>
</header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    padding: 1.75rem 4.625rem;
    gap: 2.125rem;
}

p {
    font-size: 2.5rem;
    padding: 0.625rem 4.375rem;
    background-color: var(--red);
    color: white;
    font-family: 'Iceberg', cursive;
}
</style>