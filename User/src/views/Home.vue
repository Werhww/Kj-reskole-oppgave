<script setup lang="ts">
import { ref, watch } from 'vue';
import calenderDay from '@/components/calenderDay.vue';
import Underline from '@/components/underline.vue';
import CalenderShowedCourse from '@/components/calenderShowedCourse.vue';
import moment from 'moment';
import { allCourses, achievements, user } from '../firebase/store';

watch(allCourses, () => {
    asingCourseToDay()
})

/* Get current and is the week counter */
const week = ref(moment().isoWeek())
/* Content inside every day in calander */
const Monday = ref({
    nameofday: "Mandag",
    shortdate: moment().week(week.value).day('Monday').format('DD'),
    date: moment().week(week.value).day('Monday').format('DD:MM:YYYY'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: "",
    amount: 0,
    instructor: "",
    comment: ""
})

const Tuesday = ref({
    nameofday: "Tirsdag",
    shortdate: moment().week(week.value).day('Tuesday').format('DD'),
    date: moment().week(week.value).day('Tuesday').format('DD:MM:YYYY'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: "",
    amount: 0,
    instructor: "",
    comment: ""
})

const Wendesday = ref({
    nameofday: "Onsdag",
    shortdate: moment().week(week.value).day('Wendesday').format('DD'),
    date: moment().week(week.value).day('Wendesday').format('DD:MM:YYYY'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: "",
    amount: 0,
    instructor: "",
    comment: ""
})

const Thursday = ref({
    nameofday: "Torsdag",
    shortdate: moment().week(week.value).day('Thursday').format('DD'),
    date: moment().week(week.value).day('Thursday').format('DD:MM:YYYY'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: "",
    amount: 0,
    instructor: "",
    comment: ""
})

const Friday = ref({
    nameofday: "Fredag",
    shortdate: moment().week(week.value).day('Friday').format('DD'),
    date: moment().week(week.value).day('Friday').format('DD:MM:YYYY'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: "",
    amount: 0,
    instructor: "",
    comment: ""
})

const ShowedCourse = ref({
    nameofday: "",
    showed: false,
    course: "",
    time: "",
    date: "",
    fullAddress: "",
    amount: 0,
    instructor: "",
    comment: ""
})

/* Changes date showed in calander day */
function changeDays() {
    Monday.value.date = moment().week(week.value).day('Monday').format('DD:MM:YYYY')
    Monday.value.shortdate = moment().week(week.value).day('Monday').format('DD')
    Tuesday.value.date = moment().week(week.value).day('Tuesday').format('DD:MM:YYYY')
    Tuesday.value.shortdate = moment().week(week.value).day('Tuesday').format('DD')
    Wendesday.value.date = moment().week(week.value).day('Wendesday').format('DD:MM:YYYY')
    Wendesday.value.shortdate = moment().week(week.value).day('Wendesday').format('DD')
    Thursday.value.date = moment().week(week.value).day('Thursday').format('DD:MM:YYYY')
    Thursday.value.shortdate = moment().week(week.value).day('Thursday').format('DD')
    Friday.value.date = moment().week(week.value).day('Friday').format('DD:MM:YYYY')
    Friday.value.shortdate = moment().week(week.value).day('Friday').format('DD')
}

/* changes to next and previuse week */
function nextWeek() {
    week.value = week.value + 1;
    changeDays()
    asingCourseToDay()
}

function prevWeek() {
    week.value = week.value - 1;
    changeDays()
    asingCourseToDay()
}

/* Asings data to days in week */
function asingCourseToDay() {
    clearAllDays()

    for(let item of courses.value) {
        const date = moment(item.date).format('DD:MM:YYYY')

        if (date == Monday.value.date) {
            Monday.value.course = item.course
            Monday.value.time = item.time
            Monday.value.shortAddress = item.shortAddress
            Monday.value.fullAddress = item.fullAddress
            Monday.value.amount = item.amount
            Monday.value.instructor = item.instructor
            Monday.value.comment = item.comment

        } else if (date == Tuesday.value.date) {
            Tuesday.value.course = item.course
            Tuesday.value.time = item.time
            Tuesday.value.shortAddress = item.shortAddress
            Tuesday.value.fullAddress = item.fullAddress
            Tuesday.value.amount = item.amount
            Tuesday.value.instructor = item.instructor
            Tuesday.value.comment = item.comment

        } else if (date == Wendesday.value.date) {
            Wendesday.value.course = item.course
            Wendesday.value.time = item.time
            Wendesday.value.shortAddress = item.shortAddress
            Wendesday.value.fullAddress = item.fullAddress
            Wendesday.value.amount = item.amount
            Wendesday.value.instructor = item.instructor
            Wendesday.value.comment = item.comment

        } else if (date == Thursday.value.date) {
            Thursday.value.course = item.course
            Thursday.value.time = item.time
            Thursday.value.shortAddress = item.shortAddress
            Thursday.value.fullAddress = item.fullAddress
            Thursday.value.amount = item.amount
            Thursday.value.instructor = item.instructor
            Thursday.value.comment = item.comment

        } else if (date == Friday.value.date) {
            Friday.value.course = item.course
            Friday.value.time = item.time
            Friday.value.shortAddress = item.shortAddress
            Friday.value.fullAddress = item.fullAddress
            Friday.value.amount = item.amount
            Friday.value.instructor = item.instructor
            Friday.value.comment = item.comment
        }
    }
}

/* Clears all days */
function clearAllDays() {
    Monday.value.course = ""
    Monday.value.time = ""
    Monday.value.shortAddress = ""
    Monday.value.fullAddress = ""
    Monday.value.amount = 0
    Monday.value.instructor = ""
    Monday.value.comment = ""

    Tuesday.value.course = ""
    Tuesday.value.time = ""
    Tuesday.value.shortAddress = ""
    Tuesday.value.fullAddress = ""
    Tuesday.value.amount = 0
    Tuesday.value.instructor = ""
    Tuesday.value.comment = ""

    Wendesday.value.course = ""
    Wendesday.value.time = ""
    Wendesday.value.shortAddress = ""
    Wendesday.value.fullAddress = ""
    Wendesday.value.amount = 0
    Wendesday.value.instructor = ""
    Wendesday.value.comment = ""

    Thursday.value.course = ""
    Thursday.value.time = ""
    Thursday.value.shortAddress = ""
    Thursday.value.fullAddress = ""
    Thursday.value.amount = 0
    Thursday.value.instructor = ""
    Thursday.value.comment = ""

    Friday.value.course = ""
    Friday.value.time = ""
    Friday.value.shortAddress = ""
    Friday.value.fullAddress = ""
    Friday.value.amount = 0
    Friday.value.instructor = ""
    Friday.value.comment = ""
}

/* Shows and hides extra content for days */
function showCourse(day:any) {
    const dateWithMonth = moment().week(week.value).day(day).format('LL')
    if (day == "Monday") {
        assingDayToShowedCourse(Monday.value, dateWithMonth)
    } else if (day == "Tuesday") {
        assingDayToShowedCourse(Tuesday.value, dateWithMonth)
    } else if (day == "Wendesday") {
        assingDayToShowedCourse(Wendesday.value, dateWithMonth)
    } else if (day == "Thursday") {
        assingDayToShowedCourse(Thursday.value, dateWithMonth)
    } else if (day == "Friday") {
        assingDayToShowedCourse(Friday.value, dateWithMonth)
    }
}

/* Asings data to ShowedCourse */
function assingDayToShowedCourse(CourseData:any, date:any) {
    if (CourseData.course == "") {
        ShowedCourse.value.showed = false
        return
    }

    ShowedCourse.value.nameofday = CourseData.nameofday
    ShowedCourse.value.date = date
    ShowedCourse.value.course = CourseData.course
    ShowedCourse.value.time = CourseData.time
    ShowedCourse.value.fullAddress = CourseData.fullAddress
    ShowedCourse.value.amount = CourseData.amount
    ShowedCourse.value.instructor = CourseData.instructor
    ShowedCourse.value.comment = CourseData.comment
    ShowedCourse.value.showed = true
}


const courses = ref(allCourses)
const User = ref(user)
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
    const allAchievements = Achievements.value.achievement


    for(let item of allAchievements) {
        if (item.done == false && foundAchievements < MaxAchievementsShown) {
            ShowedAchievements.value.push(item.name)
            foundAchievements++
        }
    }
}

sortAchievements()
asingCourseToDay()
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
                <p>{{ User.payedCoursesSum }} kr</p>
            </span>
            <span>
                <p>Fremtidig kurs</p>
                <p>{{ User.commingCoursesSum }} kr</p>
            </span>
            <span>
                <p>Total</p>
                <p>{{ User.payedCoursesSum + User.commingCoursesSum }} kr</p>
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
                <p>{{ Achievements.driveTime }} timer</p>
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
            <calenderDay :dateDay="'Man. ' + Monday.shortdate" :course="Monday.course" :time="Monday.time" :shortAddress="Monday.shortAddress"  :fullAddress="Monday.fullAddress" @click="showCourse('Monday')"/>
            <calenderDay :dateDay="'Tir. ' + Tuesday.shortdate" :course="Tuesday.course" :time="Tuesday.time" :shortAddress="Tuesday.shortAddress"  :fullAddress="Tuesday.fullAddress" @click="showCourse('Tuesday')"/>
            <calenderDay :dateDay="'Ons. ' + Wendesday.shortdate" :course="Wendesday.course" :time="Wendesday.time" :shortAddress="Wendesday.shortAddress"  :fullAddress="Wendesday.fullAddress" @click="showCourse('Wendesday')"/>
            <calenderDay :dateDay="'Tors. ' + Thursday.shortdate" :course="Thursday.course" :time="Thursday.time" :shortAddress="Thursday.shortAddress"  :fullAddress="Thursday.fullAddress" @click="showCourse('Thursday')"/>
            <calenderDay :dateDay="'Fre. ' + Friday.shortdate" :course="Friday.course" :time="Friday.time" :shortAddress="Friday.shortAddress"  :fullAddress="Friday.fullAddress" @click="showCourse('Friday')"/>
        </div>
        <img src="../assets/Arrow.svg" style="rotate: 180deg;" @click="nextWeek">
    </div>
    <CalenderShowedCourse 
        v-if="ShowedCourse.showed"
        :nameofday="ShowedCourse.nameofday"
        :date="ShowedCourse.date" 
        :course="ShowedCourse.course"
        :time="ShowedCourse.time"
        :fullAddress="ShowedCourse.fullAddress"
        :amount="ShowedCourse.amount"
        :instructor="ShowedCourse.instructor"
        :comment="ShowedCourse.comment"
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