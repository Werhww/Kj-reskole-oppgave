<script setup lang="ts">
const props = defineProps<{
    color: string;
}>()
</script>

<template>
<div><!-- Underline --></div>
</template>

<style scoped>
div {
    height: 5px;
    background-color: v-bind(color);
    border-radius: 5rem;
}


@media only screen and (max-width: 1280px) {
    div {
        height: 3px;
    }
}
</style>