<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{

    allInstuctors: {
        name: string,
        instructorID: string,
    }[]

    allPlaces: {
        name: string,
        fullAddress: string,
    }[]

    allCourseTypes: {
        name: string,
        price: number,
        courseTypeID: string
        DurationMinutes: number
    }[]

    show: boolean
}>()

const courseID = ref()
const amount = ref()
const instructorID = ref()

</script>

<template>
<div class="wrapper">
    <h1>Ny kurs</h1>
    <div>
        <div>
            <label for="courseName">Kurs</label>
            <select id="courseName" v-model="courseID">
                <option v-for="course in allCourseTypes" :value="course.courseTypeID">{{ course.name }}</option>
            </select>
        </div>
        <div>
            <label for="amount">Amount</label>
            <input type="number" id="amount" v-model="amount">
        </div>
    </div>
    <div>
        <div>
            <label for="instructor">Instructor</label>
            <select id="instructor" v-model="instructorID">
                <option v-for="instructor in allInstuctors" :value="instructor.instructorID">{{ instructor.name }}</option>
            </select>
        </div>
        <div>
            <label for="place">Place</label>
            <select id="place">
                <option v-for="place in allPlaces" :value="place.fullAddress">{{ place.name }}</option>
            </select>
        </div>
    </div>
</div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
}
</style>