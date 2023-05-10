<script setup lang="ts">
import { ref, computed } from 'vue'
const prop = defineProps<{ 
    name: string
    done?: boolean
    achievementId: string
}>()

const done = computed(() => {
    if(prop.done) {
        return true
    } else {
        return false
    }
})

const emit = defineEmits<{
  (e: 'change', done: boolean, name:string, achievementId:string): void
}>()

const doneEdit = ref(done.value)

function changeDone() {
    doneEdit.value = !doneEdit.value

    return emit('change', doneEdit.value, prop.name, prop.achievementId)
}
</script>

<template>
<div class="achievement">
    <p class="green" v-if="doneEdit">{{ name }}</p>
    <p class="red" v-else>{{ name }}</p>
    <input type="checkbox" @change="changeDone" :checked="doneEdit" :value="name">
</div> 
</template>

<style scoped>
.achievement {
    display: flex;
    align-items: center;
    gap: 1rem;
    border: var(--grey) 1px solid;
    border-radius: 0.5rem;
    padding: 0.5rem;
}

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