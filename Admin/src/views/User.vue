<script setup lang="ts">
/* User id to get all info */
/* $route.params.studentID */

import Title from '@/components/title.vue';
import CourseItem from '@/components/courseItem.vue';
import Button from '@/components/button.vue';
import Achievements from '@/components/achievement.vue';
import AchievementEdit from '@/components/achievementEdit.vue';
import { allCourses, allInstructors, allPlaces, allCourseTypes } from '@/firebase/store';

import moment from 'moment';
import { ref, watch } from 'vue'

/* Open and close user edit page */
const isUserEdit = ref(true)
function editUser() {
    isUserEdit.value = !isUserEdit.value
}   

function editUserCancel() {
    console.log(oldAchievementsData)

    user.value = oldUserData
    achievements.value = oldAchievementsData
    isUserEdit.value = true
}

const user = ref({
    name: "Test",
    email: "mail",
    phone: "91205",
})

const achievements = ref({
    driveTime: 9,
    achievement: [
        {
            name: "Trafikalt grunnkurs",
            done: true
        },
        {
            name: "Grunnleggende opplæringen",
            done: true
        },
        {
            name: "Sikkerhetskurs i trafikk",
            done: true
        },
        {
            name: "Trinnvurdering (trinn 2)",
            done: false
        },
        {
            name: "Trinnvurdering (trinn 3)",
            done: false
        },
        {
            name: "Sikkerhetskurs på vei",
            done: false
        },
        
        {
            name: "Teorie prøven",
            done: false
        },
        {
            name: "Mørkekjøring",
            done: false
        },
    ]
})

let oldUserData = JSON.parse(JSON.stringify(user.value))
let oldAchievementsData = JSON.parse(JSON.stringify(achievements.value))

const usersCourses = ref(allCourses)

function avmeldKurs(CourseID:string) {
    console.log("Avmeld kurs")
    console.log(CourseID)
}

function saveCourseComment(CourseID:string, comment:string) {
    console.log("Save comment")
    console.log(CourseID, comment)
}

function saveCourseChange(CourseID:string, editContent:any) {
    console.log("Save changes")
    console.log(CourseID, editContent)
}

function changeAchivment(done:boolean, name:string) {
    for(let i = 0; i < achievements.value.achievement.length; i++) {
        if(achievements.value.achievement[i].name == name) {
            achievements.value.achievement[i].done = done
        }
    }
}

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

                :onChange="changeAchivment"
            />
        </div>
        
        <div class="buttons">
            <Button text="Avbryt" color="var(--red)" @click="editUserCancel"/>
            <Button text="Lagre" color="var(--green)"/>
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