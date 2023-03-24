<script setup lang="ts">
const props = defineProps<{
    imgLink?: string,
    name?: string,
    tilbud?: string,
    tlf?: string,
    mail?: string,
}>()
</script>

<template>
    <div class="container">
        <img v-bind:src="imgLink" alt="Employee pic" class="tilbud-img">
        <div class="info">
            <p class="name">{{ name }}</p>
            <p class="offer">{{ tilbud }}</p>
            <a v-bind:href="'mailto:' + mail">{{ mail }}</a>
            <a v-bind:href="'tlf:' + tlf">{{ tlf }}</a>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.info {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 1.5rem;
    gap: 0.375rem;
}
.info a{
    color: black;
}

.name {
    font-weight: 700;
}

.offer {
    font-weight: 500;
}
</style>

<style scoped>
@media only screen and (max-width: 900px) {
    .tilbud-img {
        width: 15rem;
    }
}

@media only screen and (max-width: 700px) {
    .info {
        font-size: 1rem;
        gap: 0.25rem;
    }

    .tilbud-img {
        width: 7.813rem;
    }
}
</style>