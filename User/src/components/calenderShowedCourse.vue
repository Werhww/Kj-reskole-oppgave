<script setup lang="ts">
import Underline from "@/components/underline.vue";
import moment from "moment";


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

const showdate = moment(props.date).format("Do MMMM");
</script>

<template>
<section>
    <div>
        <h1>{{ course }} ({{ amount }})</h1>
        <Underline color="var(--green)" />
        <p> {{ nameofday }} {{ showdate }} {{ time }} </p>
        <p>{{ instructor }}</p>
        <a :href="'https://maps.google.com/?q=' + fullAddress" target="_blank" >{{ fullAddress }}</a>
        <iframe :src="'https://maps.google.com/?q=' + fullAddress" width="600" height="800" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <p>Kommentar:</p>
        <p>{{ comment }}</p>
    </div>
</section>
</template>

<style scoped>

</style>