<script setup lang="ts">
import { ref } from 'vue'
const prop = defineProps<{
    name: string;
    instructorId: string;
    openChat: (instructorId: string) => void;
}>()
</script>

<template>
<span :id="instructorId" @click="openChat(prop.instructorId)">
    {{ name }}
</span>
</template>

<style scoped>
span {
    padding: 0.75rem 1.875rem;
    border-radius: 2.625rem;
    cursor: pointer;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    transition: 0.3s ease-in-out;
    color: var(--grey);
    border: var(--grey) 4px solid;
}

.openChat {
    color: var(--green)!important;
    border: var(--green) 4px solid!important;
}

</style>