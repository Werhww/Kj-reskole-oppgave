<script setup lang="ts">
import { computed } from 'vue'
const prop = defineProps<{ 
    name: string
    achievementId: string
    done?: boolean
}>()

const done = computed(() => {
    if(prop.done) {
        return true
    } else {
        return false
    }
})
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

@media only screen and (max-width: 900px) {
    p {
        font-size: 1.25rem;
    }
}
</style>