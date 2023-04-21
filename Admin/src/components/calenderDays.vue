<script setup lang="ts">
import Underline from './underline.vue';
const props = defineProps<{
    date:string
}>()
</script>

<template>
<div>
    <p>{{ date }}</p>
    <Underline color="var(--grey)" />
</div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;

    width: 15rem;
}

div p{
    font-size: 1.5rem;
}
</style>