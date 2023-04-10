<script setup lang="ts">

const prop = defineProps<{ 
    name: string
    done: boolean
}>()

</script>

<template>
<p class="green" v-if="done">{{ name }}</p>
<p class="red" v-else>{{ name }}</p>
</template>

<style scoped>
p {
    font-size: 1.5rem;
}

.green {
    color: var(--green);
}

.red {
    color: var(--red);
}
</style>