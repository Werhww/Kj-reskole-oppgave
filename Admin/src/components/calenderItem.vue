<script setup lang="ts">
import moment from 'moment'

const props = defineProps<{
    /* Placement props */
    dayInWeek: number
    startTime: string
    endTime: string

    columnWidth: number
    columnGap: number
    rowGap: number

    /* Content props */
    /* course: string
    student: string
    comment: string
    shortAdress: string
    fullAdress: string
    studentId: string */
}>()
/* Formating start time to minuts and hours to wantet format */
const formatedStartTimeHour = Number(moment(props.startTime).format("HH")) - 1
const formatedStartTimeMinute = Number(moment(props.startTime).format("mm")) / 60
const formatedStartTime = formatedStartTimeHour + formatedStartTimeMinute

/* Formating end time to minuts and hours to wantet format */
const formatedEndTimeHour = Number(moment(props.endTime).format("HH")) - formatedStartTime - 1
const formatedEndTimeMinute = Number(moment(props.endTime).format("mm")) / 60
const formatedEndTime = formatedEndTimeHour + formatedEndTimeMinute

</script>

<template>
<div class="item">

</div> 
</template>

<style scoped>
.item {
    position: relative;
    background-color: blue;

    width: v-bind(columnWidth + "px");
    height: v-bind((rowGap * formatedEndTime) + "px");
    left: v-bind((columnWidth + columnGap) * dayInWeek + "px");
    top: v-bind((rowGap * formatedStartTime) + 9 + "px");
}
</style>