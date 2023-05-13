<script setup lang="ts">
import moment from 'moment'
import { ref } from 'vue'

const props = defineProps<{
    /* Placement props */
    isShowed: boolean

    startTime: string
    endTime: string

    columnWidth: number
    columnGap: number
    rowGap: number

    /* Content props */
    courseTitle: string
    amount: number
    student: string
    comment: string
    shortAdress: string
    fullAdress: string
    studentId: string
    courseID: string

    /* Function props */
    openCourse: (
        course: 
        {
            courseTitle: string
            amount: number
            student: string
            comment: string
            shortAdress: string
            fullAdress: string
            studentId: string
            courseID: string
            startTime: string
            endTime: string
        }

    ) => void
}>()

/* Formating start time to minuts and hours to wantet format */
const formatedStartTimeHour = Number(moment(props.startTime).format("HH")) - 1
const formatedStartTimeMinute = Number(moment(props.startTime).format("mm")) / 60
const formatedStartTime = formatedStartTimeHour + formatedStartTimeMinute

/* Formating end time to minuts and hours to wantet format */
const formatedEndTimeHour = Number(moment(props.endTime).format("HH")) - formatedStartTime - 1
const formatedEndTimeMinute = Number(moment(props.endTime).format("mm")) / 60
const formatedEndTime = formatedEndTimeHour + formatedEndTimeMinute

const dayInWeek = Number(moment(props.startTime).format("d")) - 1

const startTimeShowed = moment(props.startTime).format("HH:mm")
const endTimeShowed = moment(props.endTime).format("HH:mm")

const element = ref<HTMLDivElement | null>(null)

function selfHighlight(event:any,
    course: {
        courseTitle: string
        amount: number
        student: string
        comment: string
        shortAdress: string
        fullAdress: string
        studentId: string
        courseID: string
        startTime: string
        endTime: string
    }) {
    props.openCourse(course)
    element.value?.classList.add("highlighted")
}

</script>

<template>
<div class="item" ref="element" @click="selfHighlight($event ,{
    courseTitle: courseTitle,
    amount: amount,
    student: student,
    comment: comment,
    shortAdress: shortAdress,
    fullAdress: fullAdress,
    studentId: studentId,
    courseID: courseID,
    startTime: startTime,
    endTime: endTime
})">
    <h1>{{ courseTitle }} ({{ amount }})</h1>
    <div>
        <img src="../assets/timeIcon.svg">
        <p>{{ startTimeShowed }} - {{ endTimeShowed }}</p>
    </div>
    <div>
        <img src="../assets/locationIcon.svg" alt="">
        <p>{{ shortAdress }}</p>
    </div>
    <div>
        <img src="../assets/userIcon.svg" alt="">
        <p>{{ student }}</p>
    </div>
</div> 
</template>

<style scoped>
.highlighted {
    border: var(--green) 5px solid !important;
}

.item {
    position: absolute;
    background-color: var(--light-grey);
    border: var(--grey) 3px solid;
    border-radius: 0.5rem;

    width: v-bind(columnWidth + "px");
    height: v-bind((rowGap * formatedEndTime) + "px");
    left: v-bind((columnWidth + columnGap) * dayInWeek + 51 + "px");
    top: v-bind((rowGap * formatedStartTime) + 9 + "px");

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.item:hover {
    cursor: pointer;
    user-select: none;
}

.item h1 {
    font-size: 1.125rem;
    font-weight: 500;
    padding-left: 0.5rem;
    padding-top: 0.375rem;
}

.item > div {
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.875rem;
    color: var(--dark-grey);
}

.item > div * {
    font-size: 0.875rem;
    color: var(--dark-grey);
}
</style>