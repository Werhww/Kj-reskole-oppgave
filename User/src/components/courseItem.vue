<script setup lang="ts">
import { computed, ref } from 'vue'
import moment from 'moment'

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

    allPlaces: {
        placeId: string,
        name: string,
        fullAddress: string,
    }[],

    allCourseTemplates: {
        templateId: string,
        name: string,
    }[],

    allInstructors: {
        instructorId: string,
        name: string,
    }[],
}>()

const isDropdownOpen = ref(false)
const topUnderline = ref<HTMLInputElement | null>(null)

/* opens and hiddes extra dropdown content */
function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
    if (isDropdownOpen.value) {
        topUnderline.value?.classList.add('hiddenOpacity')
    } else {
        topUnderline.value?.classList.remove('hiddenOpacity')
    }
}

const courseTitle = computed(() => props.allCourseTemplates.find(course => course.templateId === props.courseData.courseTemplateId)?.name)
const place = computed(() => props.allPlaces.find(place => place.placeId === props.courseData.placeId)?.fullAddress)
const instructor = computed(() => props.allInstructors.find(instructor => instructor.instructorId === props.courseData.instructorId)?.name)

const date = computed(() => {
    return moment(props.courseData.startTime).format('ddd.DD')

})

const time = computed(() => {
    const fromTime = moment(props.courseData.startTime).format('HH:mm')
    const toTime = moment(props.courseData.endTime).format('HH:mm')

    return `${fromTime} - ${toTime}`
})

</script>

<template>
<section>
    <!-- Inital show items -->
    <div class="top" @click="toggleDropdown"> 
        <!-- Content -->
        <div class="content">
            <p>{{ courseTitle }} ({{ courseData.amount }})</p>
            <p>{{ date }}</p>
            <div class="top_Price">
                <p>{{ courseData.price }} kr</p>
                <img v-if="courseData.paid == undefined" class="payment_hidden" src="../assets/Course_Unpaid.svg" draggable="false">
                <img v-else src="../assets/Course_Unpaid.svg" alt="Unpaid">
            </div>
        </div>
        <div class="hover"><!-- Light gray hover transion --></div>
        <div class="underline" ref="topUnderline"><!-- Underline --></div>
    </div>
    <!-- Dropdown content -->
    <div class="dropdown" v-if="isDropdownOpen">
        <div>
            <p>Instruktør: {{ instructor }}</p>
            <div class="place_time">
                <a :href="'https://maps.google.com/?q=' + place" target="_blank">{{ place }}</a>
                <p>{{ time }}</p>
            </div>
            <div class="content_Price">
                <img v-if="courseData. paid == undefined" class="payment_hidden" src="../assets/Course_Unpaid.svg" draggable="false">
                <img v-else src="../assets/Course_Unpaid.svg" alt="Unpaid">
                <p>Pris: {{ courseData.price }} kr</p> 
            </div>
        </div>
        <div class="comment">
            <p>Kommentar:</p>

            <p>{{ courseData.comment }}</p>
        </div>
        
    </div>
    <div class="underline" v-if="isDropdownOpen"><!-- Underline --></div>
</section>
</template>

<style scoped>

.dropdown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-size: 1.5rem;
}

.hidden{
    display: none;
}

.hiddenOpacity{
    opacity: 0;
}

.place_time{
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    color: var(--dark-grey);
}

.place_time *{
    color: var(--dark-grey);
}

.comment{
    display: flex;
    flex-direction: column;
    padding-right: 3rem;
    gap: 0.5rem;
    width: 25%;
}

.comment p:last-child{
    color: var(--dark-grey);
}

section {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.hover{
    position: absolute;
    bottom: 6px;
    left: -1rem;
    width: 102%;
    height: 0%;
    transition: height 0.3s ease-in-out;
    z-index: -1;
    background-color: var(--light-grey);
    border-radius: 3rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.top:hover > .hover {
    height: 100%;
}

.top:hover > .underline{
    opacity: 0;
}

.top:hover{
    cursor: pointer;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
}

.content > p:first-child {
    width: 40%;
}

.content p {
    font-size: 1.5rem;
}

.content > div{
    display: flex;
    gap: 3.75rem;
}

.top {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0.375rem;
}

.underline {
    height: 5px;
    background-color: var(--light-grey);
    border-radius: 5rem;
    transition: opacity 0.3s ease-in-out;
}

.payment_hidden {
    opacity: 0;
    pointer-events: none;
}
</style>

<!-- Media querys -->
<style scoped>
@media only screen and (max-width: 900px) {
    .dropdown {
        font-size: 1rem;
    }

    .content > p:first-child {
        width: max-content;
    }

    .content p {
        font-size: 1.25rem;
    }

    .top_Price {
        display: none!important;
    }

    .content_Price{
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .hover {
        display: none;
    }

    .place_time{
        flex-direction: column-reverse;
        gap: 0.5rem;
    }

    .comment{
        padding-right: 0.3rem;
        width: 40%;
    }
}
</style>