<script setup lang="ts">

/* Components */
import Title from '@/components/title.vue';
import CourseItem from '@/components/courseItem.vue';
import Button from '@/components/button.vue';
import Achievements from '@/components/achievement.vue';
import AchievementEdit from '@/components/achievementEdit.vue';
import newCoursePopup from '@/components/newCoursePopup.vue';

import { useRoute } from 'vue-router'; const route = useRoute()
import { ref, watch, onMounted } from 'vue'
import { collection, setDoc, doc, onSnapshot, where, query, deleteDoc, updateDoc} from "firebase/firestore"; 

import { allInstructors, allPlaces, allCourseTypes, allAchievements } from '@/firebase/store';
import { db } from '@/firebase/firebase';

/* $route.params.studentID */
const studentID = (route.params.studentID).toString()


/* Get user data */
const userRef = doc(db, "users", studentID)

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
    onSnapshot(userRef, (doc) => {
        if(doc.exists()) {
            user.value = doc.data() as user
        }
    })
})

function updateUser() {
    const { name, drivetime, license, mainInstructor, email, phone } = user.value

    updateDoc(userRef, {
        "name": name,
        "drivetime": drivetime,
        "email": email,
        "phone": phone
    })
}


/* Get acivement data */
const achievementRef = collection(db, "achievements")
const achievementQuery = query(achievementRef, where("userId", "==", studentID))

interface achievements {
    name: string
    achievementId: string
    done?: boolean
}

const userAchievements = ref<achievements[]>([])

onMounted(() => {
    onSnapshot(achievementQuery, (achievement)=> {
        achievement.forEach((achievement) => {
            const achvIndex = findAchievement(achievement.data().achievementId)
            userAchievements.value[achvIndex].done = true
        })
    })
})

interface changedAchievements {
    userId: string
    achievementId: string
    docId: string
    done: boolean
}

const changedAchievements = ref<changedAchievements[]>([])

function changeAchievement(done:boolean, name:string, id:string) {
    const docId = `${id}_${studentID}`
    changedAchievements.value.push({
        userId: studentID,
        achievementId: id,
        docId: docId,
        done: done
    })
}

function startAchievementChange() {
    for(let i = 0; i < changedAchievements.value.length; i++) {
        const docData = changedAchievements.value[i]
        if(docData.done) {
            setDoc(doc(achievementRef, docData.docId), {
                userId: docData.userId,
                achievementId: docData.achievementId,
            })
        } else {
            const achvIndex = findAchievement(docData.achievementId)
            userAchievements.value[achvIndex].done = false
            deleteDoc(doc(achievementRef, docData.docId))
        }
    }

    changedAchievements.value = []
}

function findAchievement(achievementId:string) {
    for(let i = 0; i < userAchievements.value.length; i++) {
        if(userAchievements.value[i].achievementId === achievementId) {
            return i
        }
    }
    return -1
}

/* Achievements watcher */
watch(user, (data) => {
    const license = data.license

    userAchievements.value = JSON.parse(JSON.stringify(allAchievements.value["Global"]))
    if(license == "A1") {
        userAchievements.value = userAchievements.value.concat(JSON.parse(JSON.stringify(allAchievements.value["A1"])))
    } else if(license == "A_A2") {
        userAchievements.value = userAchievements.value.concat(JSON.parse(JSON.stringify(allAchievements.value["A_A2"])))
    } else if(license == "B") {
        userAchievements.value = userAchievements.value.concat(JSON.parse(JSON.stringify(allAchievements.value["B"])))
    } else {
        userAchievements.value = [{name: "Ingen tilgjengelige achievements", achievementId: "0", done: false}]
    }
})

/* Get course data */
const courseRef = collection(db, "courses")
const courseQuery = query(courseRef, where("userId", "==", studentID))

interface course {
    /* From DB */
    instructorId: string
    userId: string
    courseTemplateId: string
    placeId: string
    courseId: string

    endTime: string
    startTime: string
    comment: string
    amount: number

    paid: boolean
    price: number
    /* ********* */

    courseName: string
    instructor: string
    fullAddress: string

    courseTypeID: string
}

const usersCourses = ref<course[]>([])

onMounted(async ()=>{
    onSnapshot(courseQuery, async (Courses) => {
        usersCourses.value = []

        const coursePromises = Courses.docs.map(async (course:any) => {
            const courseData = course.data()
            const courseTemplate:any = await findCourse(courseData.courseTemplateId)
            const instructor:any = await findInstructor(courseData.instructorId)
            const place:any = await findPlace(courseData.placeId)

            let courseTemplateData = {
                ...courseData,
                courseId: course.id,
                courseName: courseTemplate.name,
                courseTypeID: courseTemplate.courseTypeID,
                instructor: instructor.name,
                fullAddress: place.fullAddress
            }


            return courseTemplateData as course
       })

       const courses = await Promise.all(coursePromises);
        usersCourses.value = courses;
    })
})

function findCourse(courseId:string) {
    for(let i = 0; i < allCourseTypes.value.length; i++) {
        if(allCourseTypes.value[i].courseTypeID === courseId) {
            return allCourseTypes.value[i]
        }
    }
    return `error: ${courseId} course not found`
}

function findInstructor(instructorId:string) {
    for(let i = 0; i < allInstructors.value.length; i++) {
        if(allInstructors.value[i].instructorId === instructorId) {
            return allInstructors.value[i]
        }
    }
    return `error: ${instructorId} instructor not found`
}

function findPlace(placeId:string) {
    for(let i = 0; i < allPlaces.value.length; i++) {
        if(allPlaces.value[i].placeId === placeId) {
            return allPlaces.value[i]
        }
    }
    return `error: ${placeId} place not found`
}


/* Open and close user edit page */
let oldData:user

const isUserEdit = ref(true)
function editUser() {
    oldData = JSON.parse(JSON.stringify(user.value))
    isUserEdit.value = !isUserEdit.value
}   

function editUserCancel() {
    isUserEdit.value = true
    user.value = oldData
    changedAchievements.value = []
}

function saveEditsToUser() {
    isUserEdit.value = true
    startAchievementChange()
    if(oldData.name != user.value.name || oldData.email != user.value.email || oldData.phone != user.value.phone || oldData.drivetime != user.value.drivetime) {
        updateUser()
    }
}


function avmeldKurs(CourseID:string) {
    deleteDoc(doc(db, "courses", CourseID))
}

function saveCourseComment(CourseID:string, comment:string) {
    updateDoc(doc(db, "courses", CourseID), {
        comment: comment
    })
}

function saveCourseChange(CourseID:string, editContent:any) {
    updateDoc(doc(db, "courses", CourseID), editContent)
}

const newCourse = ref(false)

function openCloseNewCourse() {
    newCourse.value = !newCourse.value
}

</script>

<template>
<main>
    <Title :text="user.name" color="var(--red)"/>
    <div class="achievements" v-if="isUserEdit">
        <p>Kjørt {{ user.drivetime }} timer</p>
        <div>
            <Achievements 
                v-for="a in userAchievements"
                :name="a.name"
                :achievementId="a.achievementId"
                :done="a.done"
                class="achievementItem"
            />
        </div>
    </div>
    <div class="courses" v-if="isUserEdit">
        <CourseItem 
            v-for="course in usersCourses"

            :course="course.courseName"
            :amount="course.amount"
            :price="course.price"
            :instructor="course.instructor"
            :fullAddress="course.fullAddress"   
            :comment="course.comment"
            :paid="course.paid"
            :startTime="course.startTime"
            :endTime="course.endTime"
            
            :courseTypeID="course.courseTypeID"
            :courseID="course.courseId"
            :instructorID="course.instructorId"
            :placeId="course.placeId"

            
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
        <Button text="Legg til kurs" color="var(--green)" @click="openCloseNewCourse"/>
    </div>
    <div class="editUser" v-else>
        <div class="userInfo">
            <input type="text" v-model="user.name">
            <input type="text" v-model="user.phone">
            <input type="text" v-model="user.email">
        </div>
        <p class="driventime">Kjørt <input type="text" v-model="user.drivetime"> timer</p>
        <div class="userAchievement">
            <AchievementEdit
                v-for="achievement in userAchievements"
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
<newCoursePopup
    v-if="newCourse"

    :studentID="studentID"

    :allInstuctors="allInstructors"
    :allPlaces="allPlaces"
    :allCourseTypes="allCourseTypes"

    :close="openCloseNewCourse"
/>
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
    flex-wrap: wrap;
}

.userInfo > input{
    font-size: 2rem;
    flex: 1 1 5rem;
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