<script setup lang="ts">
import Underline from "@/components/underline.vue";
import Button from "./button.vue";

const props = defineProps<{
    nameofday: string ,

    course: string,
    time: string,
    date: string,

    fullAddress: string,

    amount: number,

    instructor: string,
    comment: string
}>();

</script>

<template>
<section>
    <h1>{{ course }} ({{ amount }})</h1>
    <Underline color="var(--green)" />
    <p> {{ nameofday }}  , {{ date }}  , {{ time }} </p>
    <p>{{ instructor }}</p>
    <a :href="'https://maps.google.com/?q=' + fullAddress" target="_blank" >{{ fullAddress }}</a>
    <iframe
        width="600"
        height="400"
        frameborder="0" style="border:0"
        referrerpolicy="no-referrer-when-downgrade"
        :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyDlI2n6RDHhq9KgWZYbWjiR3OWuIDJOV2s&q=' + fullAddress"
        allowfullscreen>
    </iframe>
    <p>Kommentar:</p>
    <p>{{ comment }}</p>
    <div>
        <Button text="Medling til lærere" color="var(--green"/>
        <Button text="Avmeld" color="var(--red)" />
    </div>
</section>
</template>

<style scoped>
section {
    width: 85vw;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

h1 {
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--green);
}

p, a {
    font-size: 1.5rem;
}

section > div:last-child {
    display: flex;
    justify-content: space-between;
    margin-top: 3rem;
}

section > div:last-child > div {
    cursor: pointer;
}

section p:nth-child(4), section p:nth-child(7){
    color: var(--green);
}
section a {
    color: var(--red);
}
</style>