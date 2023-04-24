<script setup lang="ts">
/* User id to get all info */
/* $route.params.studentID */

import Title from '@/components/title.vue';
import CourseItem from '@/components/courseItem.vue';
import Button from '@/components/button.vue';
import { allCourses, allInstructors, allPlaces } from '@/firebase/store';

import moment from 'moment';
import { ref } from 'vue'

const user = ref({
    name: "Test",
    
})

const usersCourses = ref(allCourses)

function avmeldKurs(CourseID:string) {
    console.log("Avmeld kurs")
    console.log(CourseID)
}

function saveComment(CourseID:string, comment:string) {
    console.log("Save comment")
    console.log(CourseID, comment)
}

function saveChanges(CourseID:string, editContent:any) {
    const startTime = moment(editContent.date + " " + editContent.start).format()
    const endTime = moment(editContent.date + " " + editContent.end).format()
    
    console.log("Save changes")
    console.log(editContent)
}
</script>

<template>
<main>
    <Title :text="user.name" color="var(--red)"/>
    <div class="courses">
        <CourseItem 
            v-for="course in usersCourses"

            :course="course.course"
            :amount="course.amount"
            :price="course.price"
            :instructor="course.instructor"
            :fullAddress="course.fullAddress"   
            :comment="course.comment"
            :paid="course.paid"

            :startTime="course.startTime"
            :endTime="course.endTime"
            :courseID="course.courseID"
            :instructorID="course.instructorID"

            :avmeldKurs="avmeldKurs"
            :saveComment="saveComment"
            :saveChanges="saveChanges"

            :allInstuctors="allInstructors"
            :allPlaces="allPlaces"
        />
    </div>
    <div class="buttons">
        <Button text="Rediger Bruker" color="var(--red)"/>
        <Button text="Legg til kurs" color="var(--green)"/>
    </div>
</main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.courses {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2rem;
}
</style>