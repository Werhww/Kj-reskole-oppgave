<script setup lang="ts">
const props = defineProps<{
    name?: string,
    price?: string,
}>()
</script>

<template>
<div>
    <p class="name">{{ name }}</p>
    <span></span>
    <p class="price">{{ price }},-</p>
</div>
</template>

<style scoped>
div {
    display: flex;
    gap: 1rem;
    font-size: 1.5rem;
    width: 80vw;
    flex-wrap: wrap;
}

.name {
    opacity: 70%;
}

span {
    flex-grow: 1;
    border-bottom: 2px dotted black;
    transform: translateY(-0.5rem);
    opacity: 70%;
}

.price {
    font-weight: 700;
}
</style>

<style scoped>
@media only screen and (max-width: 600px) {
    div {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 90vw;
        gap: 0.5rem;
    }

    span {
        transform: translateY(0);
    }
}
</style>