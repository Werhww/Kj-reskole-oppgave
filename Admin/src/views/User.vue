<script setup lang="ts">
/* User id to get all info */
/* $route.params.studentID */

import Title from '@/components/title.vue';
import CourseItem from '@/components/courseItem.vue';
import Button from '@/components/button.vue';
import Achievements from '@/components/achievement.vue';
import AchievementEdit from '@/components/achievementEdit.vue';
import { allCourses, allInstructors, allPlaces, allCourseTypes, allAchievements } from '@/firebase/store';

import moment from 'moment';
import { ref, watch } from 'vue'

/* Open and close user edit page */
const isUserEdit = ref(true)
function editUser() {
    isUserEdit.value = !isUserEdit.value
}   

function editUserCancel() {
    user.value = oldUserData
    achievements.value = oldAchievementsData
    isUserEdit.value = true

    oldUserData = JSON.parse(JSON.stringify(user.value))
    oldAchievementsData = JSON.parse(JSON.stringify(achievements.value))

}

function saveEditsToUser() {
    isUserEdit.value = true
    /* Firestore save funcion */
}

const user = ref({
    name: "Test",
    email: "mail",
    phone: "91205",
    license: "A1",
})

interface achievements {
    driveTime: number
    achievement: {
        name: string
        done: boolean
    }[]
}

const achievements = ref<achievements>({
    driveTime: 9,
    achievement: []
})

let oldUserData = JSON.parse(JSON.stringify(user.value))
let oldAchievementsData = JSON.parse(JSON.stringify(achievements.value))

const usersCourses = ref(allCourses)

function avmeldKurs(CourseID:string) {
    console.log("Avmeld kurs")
    console.log(CourseID)

    /* Firebase change function */
}

function saveCourseComment(CourseID:string, comment:string) {
    console.log("Save comment")
    console.log(CourseID, comment)
    
    /* Firebase change function */
}

function saveCourseChange(CourseID:string, editContent:any) {
    console.log("Save changes")
    console.log(CourseID, editContent)

    /* Firebase change function */
}

function changeAchievement(done:boolean, name:string) {
    for(let i = 0; i < achievements.value.achievement.length; i++) {
        if(achievements.value.achievement[i].name == name) {
            achievements.value.achievement[i].done = done
        }
    }
}

/* Achievements watcher */
watch(user, (data) => {
    const license = data.license
    console.log(license)
    console.log(allAchievements)

    if(license == "A1") {
        achievements.value.achievement = allAchievements.A1
    }
})


/* testing stuff */
setTimeout(() => {
    user.value.name = "Test2"
}, 2000)
</script>

<template>
<main>
    <Title :text="user.name" color="var(--red)"/>
    <div class="achievements" v-if="isUserEdit">
        <p>Kjørt {{ achievements.driveTime }} timer</p>
        <div>
            <Achievements 
                v-for="achievement in achievements.achievement"
                :name="achievement.name"
                :done="achievement.done"
                class="achievementItem"
            />
        </div>
    </div>
    <div class="courses" v-if="isUserEdit">
        <CourseItem 
            v-for="course in usersCourses"

            :course="course.course"
            :amount="course.amount"
            :price="course.price"
            :instructor="course.instructor"
            :fullAddress="course.fullAddress"   
            :comment="course.comment"
            :paid="course.paid"
            :courseTypeID="course.courseTypeID"

            :startTime="course.startTime"
            :endTime="course.endTime"
            :courseID="course.courseID"
            :instructorID="course.instructorID"

            :avmeldKurs="avmeldKurs"
            :saveComment="saveCourseComment"
            :saveChanges="saveCourseChange"

            :allInstuctors="allInstructors"
            :allPlaces="allPlaces"
            :allCourseTypes="allCourseTypes"
        />
    </div>
    <div class="buttons" v-if="isUserEdit">
        <Button text="Rediger Bruker" color="var(--red)" @click="editUser"/>
        <Button text="Legg til kurs" color="var(--green)"/>
    </div>
    <div class="editUser" v-else>
        <div class="userInfo">
            <input type="text" v-model="user.name">
            <input type="text" v-model="user.email">
            <input type="text" v-model="user.phone">
            
        </div>
        <p class="driventime">Kjørt <input type="text" v-model="achievements.driveTime"> timer</p>
        <div class="userAchievement">
            <AchievementEdit
                v-for="achievement in achievements.achievement"
                :name="achievement.name"
                :done="achievement.done"

                :onChange="changeAchievement"
            />
        </div>
        
        <div class="buttons">
            <Button text="Avbryt" color="var(--red)" @click="editUserCancel"/>
            <Button text="Lagre" color="var(--green)"  @click="saveEditsToUser"/>
        </div>
    </div>
</main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.achievements {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.achievements > p:first-child{
    font-size: 2rem;
    font-weight: 500;
}

.achievements > div{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.achievementItem {
    flex: 1 350px;
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

<style scoped>
.userInfo {
    display: flex;
    gap: 3rem;
    justify-content: center;
}

.userInfo > input{
    font-size: 2rem;
}

.editUser {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.driventime {
    font-size: 2rem;
    align-self: center;
}

.driventime input{
    font-size: 1.5rem;
    width: 5rem;
}

.userAchievement {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}
</style>