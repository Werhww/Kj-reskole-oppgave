<script setup lang="ts">
import { ref } from 'vue'
const prop = defineProps<{
    name: string;
    instructorID: string;
    openChat: (instructorID: string) => void;
    open: boolean;
}>()

</script>

<template>
<span v-if="!open" @click="openChat(prop.instructorID)" class="notOpenChat">
    {{ name }}
</span>
<span v-if="open" @click="openChat(prop.instructorID)" class="openChat">
    {{ name }}
</span>
</template>

<style scoped>
span {
    padding: 0.75rem 1.875rem;
    border-radius: 2.625rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 600;
}

.openChat {
    color: var(--green);
    border: var(--green) 4px solid;
}

.notOpenChat {
    color: var(--grey);
    border: var(--grey) 4px solid;
}
</style>