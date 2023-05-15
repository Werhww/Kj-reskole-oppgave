<script setup lang="ts">
import { ref, watch } from 'vue';
import calenderDay from '@/components/calenderDay.vue';
import Underline from '@/components/underline.vue';
import CalenderShowedCourse from '@/components/calenderShowedCourse.vue';
import moment from 'moment';
import { allCourses, achievements, user, extraData, allPlaces, allCourseTemplates, allInstructors } from '../firebase/store';
import type { CourseProps } from '../firebase/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

/* Get current and is the week counter */
const week = ref(moment().isoWeek())
/* Content inside every day in calander */

const weekValues = ref<CourseProps[]>([
    {
        courseTemplateId: "",
        instructorId: "",
        placeId: "",

        startTime: "",
        endTime: "",
        amount: 0,

        price: 0,
        paid: false,

        comment: "",
    },
    {
        courseTemplateId: "",
        instructorId: "",
        placeId: "",

        startTime: "",
        endTime: "",
        amount: 0,

        price: 0,
        paid: false,

        comment: "",
    },
    {
        courseTemplateId: "",
        instructorId: "",
        placeId: "",

        startTime: "",
        endTime: "",
        amount: 0,

        price: 0,
        paid: false,

        comment: "",
    },
    {
        courseTemplateId: "",
        instructorId: "",
        placeId: "",

        startTime: "",
        endTime: "",
        amount: 0,

        price: 0,
        paid: false,

        comment: "",
    },
    {
        courseTemplateId: "",
        instructorId: "",
        placeId: "",

        startTime: "",
        endTime: "",
        amount: 0,

        price: 0,
        paid: false,

        comment: "",
    },
])

const IsCourseOpen = ref(false)
const ShowedCourse = ref<CourseProps | any>()


/* changes to next and previuse week */
function nextWeek() {
    week.value = week.value + 1;
    asingCourseToDay()
}

function prevWeek() {
    week.value = week.value - 1;
    asingCourseToDay()
}

/* Asings data to days in week */
function asingCourseToDay() {
    clearAllDays()

    for(let item of courses.value) {
        for(let i = 1; i < 6; i++) {
            const currentWeekDay = moment().week(week.value).day(i).format('YYYY-MM-DDTHH:mm:ss')
            const isSameDay = moment(currentWeekDay).isSame(item.startTime, 'day')

            if(isSameDay) {
                weekValues.value[i - 1] = item
            }

        }
    }
}

/* Clears all days */
function clearAllDays() {
    for(let i = 0; i < weekValues.value.length; i++) {
        weekValues.value[i] = {
            courseTemplateId: "",
            instructorId: "",
            placeId: "",

            startTime: "",
            endTime: "",
            amount: 0,

            price: 0,
            paid: false,

            comment: "",
        }
    }
}

/* Shows and hides extra content for days */
function showCourse(course:CourseProps) {
    const dayOfWeek = moment(course.startTime).day() - 1

    ShowedCourse.value[dayOfWeek] = course
    
}

const courses = ref(allCourses)

const Achievements = ref(achievements)
const ShowedAchievements = ref<any>([])

/* Watches and sorts when achievements change */
watch(Achievements, (el) => {
    sortAchievements()
})

/* Sorts achievements */
function sortAchievements() {
    ShowedAchievements.value = []
    let foundAchievements = 0
    const MaxAchievementsShown = 3

    for(let item of Achievements.value) {
        if (item.done == false && foundAchievements < MaxAchievementsShown) {
            ShowedAchievements.value.push(item.name)
            foundAchievements++
        }
    }
}

watch(allCourses, () => {
    asingCourseToDay()
})

setTimeout(() => {
    asingCourseToDay()
}, 1000)
</script>

<template>
<main>
<div class="top">
    <div>
        <div class="cours_title title">
            <div>
                <h1>Kurs</h1>
                <RouterLink :to="{ name:'courses', hash:'#list'}">List / Betaling</RouterLink>
            </div>
            <Underline color="var(--red)" />
        </div>
        <div class="cours_content">
            <span>
                <p>Gjennomførte kurs</p>
                <p>{{ extraData.payedSum }} kr</p>
            </span>
            <span>
                <p>Fremtidig kurs</p>
                <p>{{ extraData.unpaidSum }} kr</p>
            </span>
            <span>
                <p>Total</p>
                <p>{{ extraData.payedSum + extraData.unpaidSum }} kr</p>
            </span>
        </div>
    </div>
    <div>
        <div class="achv_title title">
            <div>
                <h1>Gjennomført</h1>
                <RouterLink :to="{ name:'courses', hash:'#achievements'}">Alle prestasjonene</RouterLink>
            </div>
            <Underline color="var(--green)" />
        </div>
        <div class="achv_content">
            <span>
                <p>Kjørtetimer</p>
                <p>{{ user.drivetime }} timer</p>
            </span>
            <span><p v-for="item in ShowedAchievements">{{ item }}</p></span>
        </div>
    </div>
</div>
<div class="course-calender">
    <div class="week">
        <img src="../assets/Arrow.svg" @click="prevWeek">
        <h2>Uke {{ week }}</h2>
        <img src="../assets/Arrow.svg" style="rotate: 180deg;" @click="nextWeek">
    </div>
    
    <div class="calender" ref="calenderContainer" v-dragscroll.x>
        <img src="../assets/Arrow.svg" @click="prevWeek">
        <div class="days">
            <calenderDay v-for="day in weekValues" v-bind:onOpen="showCourse" :startTime="day.startTime" :endTime="day.endTime" :courseTemplateId="day.courseTemplateId" :placeId="day.placeId" :allPlaces="allPlaces" :allCourseTemplates="allCourseTemplates" :allCoursData="day"/>
        </div>
        <img src="../assets/Arrow.svg" style="rotate: 180deg;" @click="nextWeek">
    </div>
    <CalenderShowedCourse 
        v-if="IsCourseOpen"
        :courseData="ShowedCourse.value"
        :allCourseTemplates="allCourseTemplates"
        :allPlaces="allPlaces"
        :allInstructors="allInstructors"
    />
</div>
</main>
</template>

<!-- Main css -->
<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding-bottom: 12rem!important;
}

h2 {
    font-size: 2.5rem;
    color : var(--green);
    font-weight: 700;
}

</style>

<!-- calender css -->
<style scoped>
.course-calender {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.calender {
    display: flex;
    align-items: center;
    gap: 1.875rem;
}

.week img{
    display: none;
}

.days {
    display: flex;
    flex-direction: row;
    gap: 1.875rem;
}
</style>

<!-- top course and achivments css -->
<style scoped>

.achv_content span:last-child {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.achv_content span:last-child p {
    flex: 1 1 5rem;
    color: var(--red);
    text-align: center;
}

.cours_content, .achv_content{
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1.375rem;
}

.cours_content span, .achv_content span:first-child{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0  1.25rem  0  0.2rem;
}

.cours_content span p, .achv_content span p{
    font-size: 1.5rem;
}

.cours_content span:last-child p{
    font-weight: 700;
}


.top {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.top div{
    width: 30rem;
}

.cours_title, .cours_title a {
    color: var(--red);
}

.achv_title, .achv_title a {
    color: var(--green);
}

.title {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.title > div:not(:last-child) {
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: space-between;
}

.title > div:not(:last-child) > h1 {
    padding: 0  0.2rem;
    font-size: 2.5rem;
    font-weight: 700;
}

.title > div:not(:last-child) > a {
    padding: 0  1.25rem;
}


</style>

<!-- Media Query -->
<style scoped>
@media only screen and (max-width: 1280px) {
    .top {
        flex-direction: column;
        align-items: center;
        gap: 1.875rem;
    }

    .top div{
        width: 85vw;
    }
    
    .course-calender {
        gap: 1.5rem;
    }

    .calender {
        overflow: hidden;
        width: 85vw;
    }

    .calender img{
        display: none;
    }
    
    .week {
        display: flex;
        gap: 3.875rem;
    }
    .week img {
        display: block;
    }
}

@media only screen and (max-width: 900px) {

    .top div{
        width: 95vw;
    }

    .calender {
        width: 100vw;
    }

    .title > div:not(:last-child) > h1 {
        font-size: 2rem;
    }
    
    .cours_content span p, .achv_content span p{
        font-size: 1.25rem;
    }
}
</style>