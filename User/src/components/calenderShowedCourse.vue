<script setup lang="ts">
import Underline from "@/components/underline.vue";
import Button from "./button.vue";
import { computed } from "vue";
import moment from "moment";

const props = defineProps<{
    courseData: {
        courseTemplateId: string,
        instructorId: string,
        placeId: string,

        startTime: string,
        endTime: string,
        amount: number,

        price: number,
        paid: boolean,

        comment: string,
    }

    allCourseTemplates: {
        templateId: string,
        name: string,
    }[],

    allPlaces: {
        placeId: string,
        name: string,
        fullAddress: string,
    }[],

    allInstructors: {
        instructorId: string,
        name: string,
    }[],
}>();
const { courseTemplateId, instructorId, placeId, startTime, endTime, amount, price, paid, comment } = props.courseData

const course = computed(() => props.allCourseTemplates.find(course => course.templateId === courseTemplateId)?.name);
const place = computed(() => props.allPlaces.find(place => place.placeId === placeId)?.fullAddress);
const instructor = computed(() => props.allInstructors.find(instructor => instructor.instructorId === instructorId)?.name);

const fromDate = moment(startTime).format('dddd.Do MMM YYYY HH:mm');
const toDate = moment(endTime).format('HH:mm');

</script>

<template>
<section>
    <h1>{{ course }} ({{ amount }})</h1>
    <Underline color="var(--green)" />
    <p>{{ fromDate }} - {{ toDate }}</p>
    <p>{{ instructor }}</p>
    <a :href="'https://maps.google.com/?q=' + place" target="_blank" >{{ place }}</a>
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

<!-- Media querys -->
<style scoped>
@media only screen and (max-width: 900px) {
    h1 {
        font-size: 2rem;
    }

    p, a {
        font-size: 1.25rem;
    }

    section > div:last-child {
        flex-direction: column-reverse;

        gap: 1rem;
    }
}
</style>