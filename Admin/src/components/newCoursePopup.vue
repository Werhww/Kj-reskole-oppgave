<script setup lang="ts">
import { ref } from 'vue'

import { updateDoc } from 'firebase/firestore'

const props = defineProps<{
    studentID: string

    allInstuctors: {
        name: string,
        instructorId: string,
    }[]

    allPlaces: {
        name: string,
        fullAddress: string,
        placeId: string
    }[]

    allCourseTypes: {
        name: string,
        price: number,
        courseTypeID: string
        DurationMinutes: number
    }[]

    show: boolean

    close: () => void
}>()

const courseID = ref()
const amount = ref()
const instructorID = ref()

/* amount: number
startTime: string
endTime: string
paid: boolean
price: number

userId: string
placeId: string
instructorId: string
courseTemplateId: string */

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
                <option v-for="instructor in allInstuctors" :value="instructor.instructorId">{{ instructor.name }}</option>
            </select>
        </div>
        <div>
            <label for="place">Place</label>
            <select id="place">
                <option v-for="place in allPlaces" :value="place.fullAddress">{{ place.name }}</option>
            </select>
        </div>
    </div>
    <div>
        <div>
            <label for="date">Date</label>
            <input type="date" id="date">
        </div>
        <div>
            <label for="time">Start time</label>
            <input type="time" id="time">
        </div>
    </div>
    <div class="buttons">
        <button>Avbryt</button>
        <button>Lagre</button>
    </div>
</div>
<div class="background_blur"></div>
</template>

<style scoped>
.background_blur {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
}

.wrapper {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    background-color: white;
    border-radius: 1rem;
    padding: 2rem 3rem;
}

.wrapper > div{
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.wrapper > div > div{
    display: flex;
    gap: 0.3rem;
}

.wrapper label, .wrapper input, .wrapper select{
    font-size: 1.25rem;
}

.buttons {
    display: flex;
    justify-content: space-between;
    gap: 0;
}

.buttons button{
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background-color: var(--red);
    color: white;   
}

.buttons button:last-child{
    background-color: var(--green);
}

</style>