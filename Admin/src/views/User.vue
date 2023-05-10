<script setup lang="ts">

/* Components */
import Title from '@/components/title.vue';
import CourseItem from '@/components/courseItem.vue';
import Button from '@/components/button.vue';
import Achievements from '@/components/achievement.vue';
import AchievementEdit from '@/components/achievementEdit.vue';

import moment from 'moment';
import { useRoute } from 'vue-router'; const route = useRoute()
import { ref, watch, computed, onMounted } from 'vue'
import { collection, getDocs, doc, onSnapshot, getDoc, where, query, orderBy } from "firebase/firestore"; 

import { allInstructors, allPlaces, allCourseTypes, allAchievements } from '@/firebase/store';
import { db } from '@/firebase/firebase';

/* $route.params.studentID */
const studentID = (route.params.studentID).toString()


/* Get user data */
const userquery = doc(db, "users", studentID)

interface user {
    name: string
    drivetime: number
    license: string
    mainInstructor: string
    email: string
    phone: string
}

const user = ref<user>({
    name: "",
    drivetime: 0,
    license: "",
    mainInstructor: "",
    email: "",
    phone: ""
})

onMounted(() => {
    onSnapshot(userquery, (doc) => {
        if(doc.exists()) {
            user.value = doc.data() as user
        }
    })
})


/* Get acivement data */
const achievementQuery = query(collection(db, "achievements"), where("userId", "==", studentID))

interface achievements {
    name: string
    achievementId: string
    done?: boolean
}

const achievements = ref<achievements[]>([])

onMounted(() => {
    onSnapshot(achievementQuery, (achievement)=> {
        achievement.forEach((achievement) => {
            for(let i = 1; i < achievements.value.length; i++) {
                if(achievements.value[i].achievementId === achievement.data().achievementId) {
                    achievements.value[i].done = true
                }
            }
        })
    })
})

/* Achievements watcher */
watch(user, (data) => {
    const license = data.license

    achievements.value = JSON.parse(JSON.stringify(allAchievements.value["Global"]))
    if(license == "A1") {
        achievements.value = achievements.value.concat(JSON.parse(JSON.stringify(allAchievements.value["A1"])))
    } else if(license == "A_A2") {
        achievements.value = achievements.value.concat(JSON.parse(JSON.stringify(allAchievements.value["A_A2"])))
    } else if(license == "B") {
        achievements.value = achievements.value.concat(JSON.parse(JSON.stringify(allAchievements.value["B"])))
    } else {
        achievements.value = [{name: "Ingen tilgjengelige achievements", achievementId: "0", done: false}]
    }

    console.log(achievements.value)
    console.log(allAchievements.value)
})


/* Open and close user edit page */
const isUserEdit = ref(true)
function editUser() {
    isUserEdit.value = !isUserEdit.value
}   

function editUserCancel() {
    isUserEdit.value = true
}

function saveEditsToUser() {
    isUserEdit.value = true
    /* Firestore save funcion */
}


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

}
</script>

<template>


<main>
    <Title :text="user.name" color="var(--red)"/>
    <div class="achievements" v-if="isUserEdit">
        <p>Kjørt {{ user.drivetime }} timer</p>
        <div>
            <Achievements 
                v-for="a in achievements"
                :name="a.name"
                :achievementId="a.achievementId"
                :done="a.done"
                class="achievementItem"
            />
        </div>
    </div>
    <div class="courses" v-if="isUserEdit">
        <!-- <CourseItem 
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
        /> -->
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
        <p class="driventime">Kjørt <input type="text" v-model="user.drivetime"> timer</p>
        <div class="userAchievement">
            <AchievementEdit
                v-for="achievement in achievements"
                :name="achievement.name"
                :achievementId="achievement.achievementId"
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