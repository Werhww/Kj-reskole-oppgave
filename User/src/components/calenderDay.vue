<script setup lang="ts">
const props = defineProps<{
    dateDay: string,
    course: string,
    time: string,
    shortAddress: string,
    fullAddress: string,
}>()
</script>

<template>
<div class="content">
    <p>{{ dateDay }}</p>
    <p>{{ course }}</p>
    <p>{{ time }}</p>
    <a :href="'https://maps.google.com/?q=' + fullAddress" target="_blank">{{ shortAddress }}</a>
</div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    min-width: 10rem;
    min-height: 9.375rem;

    padding: 1rem 1.25rem 2.375rem 1.25rem;
    border: var(--grey) 2px solid;
    border-radius: 3.125rem;
    background-color: var(--light-grey);

    user-select: none;
}

p, a{
    font-size: 1.5rem;
    text-align: center;
}

.content p:first-child{
    font-weight: 600;
    color: var(--green);
}

.content p:nth-child(3){
    color: var(--dark-grey);
}

.content a {
    color: var(--red);
}
</style>