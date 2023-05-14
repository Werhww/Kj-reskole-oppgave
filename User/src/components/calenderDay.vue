<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';

const props = defineProps<{
    startTime: string,
    endTime: string,

    courseTemplateId: string,
    placeId: string,

    allPlaces: {
        placeId: string,
        name: string,
        fullAddress: string,
    }[],

    allCourseTemplates: {
        templateId: string,
        name: string,
    }[],

    allCoursData : {
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
    
}>()

const emit = defineEmits(['open'])

const course = computed(() => props.allCourseTemplates.find(course => course.templateId === props.courseTemplateId)?.name);

const place = computed(() => props.allPlaces.find(place => place.placeId === props.placeId));

const date = computed(() => {
    const test = moment(props.startTime).format('ddd.DD')
    if (test === 'Invalid date') {
        return ''
    } else {
        return test
    }
})

const timeFrom = computed(() => {
    const test = moment(props.startTime).format('HH:mm')
    if (test === 'Invalid date') {
        return ''
    } else {
        return test
    }
})

const timeTo = computed(() => {
    const test = moment(props.endTime).format('HH:mm')
    if (test === 'Invalid date') {
        return ''
    } else {
        return test
    }
})
</script>

<template>
<div class="content" @click="$emit('open', allCoursData)">
    <p>{{ date }}</p>
    <p>{{ course }}</p>
    <p>{{ timeFrom }} - {{ timeTo }}</p>
    <a :href="'https://maps.google.com/?q=' + place?.fullAddress" target="_blank">{{ place?.name }}</a>
</div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    min-width: 10rem;
    max-width: 12rem;

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