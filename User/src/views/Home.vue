<script setup lang="ts">
import { ref } from 'vue';
import calenderDay from '@/components/calenderDay.vue';
import moment from 'moment';

const week = ref(moment().isoWeek())
const Monday = ref({
    date: moment().week(week.value).day('Monday').format('DD'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: ""
})

const Turday = ref({
    date: moment().week(week.value).day('Turday').format('DD'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: ""
})

const Wendesday = ref({
    date: moment().week(week.value).day('Wendesday').format('DD'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: ""
})

const Thursday = ref({
    date: moment().week(week.value).day('Thursday').format('DD'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: ""
})

const Friday = ref({
    date: moment().week(week.value).day('Friday').format('DD'),
    course: "",
    time: "",
    shortAddress: "",
    fullAddress: ""
})

function changeDays() {
    Monday.value.date = moment().week(week.value).day('Monday').format('DD')
    Turday.value.date = moment().week(week.value).day('Turday').format('DD')
    Wendesday.value.date = moment().week(week.value).day('Wendesday').format('DD')
    Thursday.value.date = moment().week(week.value).day('Thursday').format('DD')
    Friday.value.date = moment().week(week.value).day('Friday').format('DD')
}

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

function asingCourseToDay() {
    clearAllDays()
    kjøretimer.forEach((item) => {
        if (item.dateDay == Monday.value.date) {
            Monday.value.course = item.course
            Monday.value.time = item.time
            Monday.value.shortAddress = item.shortAddress
            Monday.value.fullAddress = item.fullAddress


        } else if (item.dateDay == Turday.value.date) {
            Turday.value.course = item.course
            Turday.value.time = item.time
            Turday.value.shortAddress = item.shortAddress
            Turday.value.fullAddress = item.fullAddress

        } else if (item.dateDay == Wendesday.value.date) {
            Wendesday.value.course = item.course
            Wendesday.value.time = item.time
            Wendesday.value.shortAddress = item.shortAddress
            Wendesday.value.fullAddress = item.fullAddress

        } else if (item.dateDay == Thursday.value.date) {
            Thursday.value.course = item.course
            Thursday.value.time = item.time
            Thursday.value.shortAddress = item.shortAddress
            Thursday.value.fullAddress = item.fullAddress

        } else if (item.dateDay == Friday.value.date) {
            Friday.value.course = item.course
            Friday.value.time = item.time
            Friday.value.shortAddress = item.shortAddress
            Friday.value.fullAddress = item.fullAddress
        }
    })
}

function clearAllDays() {
    Monday.value.course = ""
    Monday.value.time = ""
    Monday.value.shortAddress = ""
    Monday.value.fullAddress = ""

    Turday.value.course = ""
    Turday.value.time = ""
    Turday.value.shortAddress = ""
    Turday.value.fullAddress = ""

    Wendesday.value.course = ""
    Wendesday.value.time = ""
    Wendesday.value.shortAddress = ""
    Wendesday.value.fullAddress = ""

    Thursday.value.course = ""
    Thursday.value.time = ""
    Thursday.value.shortAddress = ""
    Thursday.value.fullAddress = ""

    Friday.value.course = ""
    Friday.value.time = ""
    Friday.value.shortAddress = ""
    Friday.value.fullAddress = ""
}

const kjøretimer = [
    {
        dateDay: '12',
        course: 'Kjøretime (A1)',
        time: '15.00 - 15.45',
        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen'
    },
    {
        dateDay: '14',
        course: 'Kjøretime (A1)',
        time: '15.00 - 15.45',
        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen'
    },
    {
        dateDay: '17',
        course: 'Kjøretime (A1)',
        time: '15.00 - 15.45',
        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen'
    },
    {
        dateDay: '18',
        course: 'Kjøretime (A1)',
        time: '15.00 - 15.45',
        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen'
    },
    {
        dateDay: '01',
        course: 'Kjøretime (A1)',
        time: '15.00 - 15.45',
        shortAddress: 'Areneset',
        fullAddress: 'Areneset 8, 5350 Bergen'
    },
]

const placholder = {
    gjenomførte: 5600,
    fremtidige: 3400,
    kjørtetimer: 20,
    presentsjoner: ['Trafikkopplæringen', 'Trafikkopplæringen', 'Mennesket i trafikken']
}

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
            <div><!-- Underline --></div> 
        </div>
        <div class="cours_content">
            <span>
                <p>Gjennomførte kurs</p>
                <p>{{ placholder.gjenomførte }} kr</p>
            </span>
            <span>
                <p>Fremtidig kurs</p>
                <p>{{ placholder.fremtidige }} kr</p>
            </span>
            <span>
                <p>Total</p>
                <p>{{ placholder.gjenomførte + placholder.fremtidige }} kr</p>
            </span>
        </div>
    </div>
    <div>
        <div class="achv_title title">
            <div>
                <h1>Gjennomført</h1>
                <RouterLink :to="{ name:'courses', hash:'#achievements'}">Alle prestasjonene</RouterLink>
            </div>
            <div><!-- Underline --></div> 
        </div>
        <div class="achv_content">
            <span>
                <p>Kjørtetimer</p>
                <p>{{ placholder.kjørtetimer }} timer</p>
            </span>
            <span><p v-for="item in placholder.presentsjoner">{{ item }}</p></span>
        </div>
    </div>
</div>
<div class="course-calender">
    <h2>Uke {{ week }}</h2>
    <div class="calender">
        <img src="../assets/Arrow.svg" @click="prevWeek">
        <div class="days">
            <calenderDay :dateDay="'Man. ' + Monday.date" :course="Monday.course" :time="Monday.time" :shortAddress="Monday.shortAddress"  :fullAddress="Monday.fullAddress"/>
            <calenderDay :dateDay="'Tir. ' + Turday.date" :course="Turday.course" :time="Turday.time" :shortAddress="Turday.shortAddress"  :fullAddress="Turday.fullAddress"/>
            <calenderDay :dateDay="'Ons. ' + Wendesday.date" :course="Wendesday.course" :time="Wendesday.time" :shortAddress="Wendesday.shortAddress"  :fullAddress="Wendesday.fullAddress"/>
            <calenderDay :dateDay="'Tors. ' + Thursday.date" :course="Thursday.course" :time="Thursday.time" :shortAddress="Thursday.shortAddress"  :fullAddress="Thursday.fullAddress"/>
            <calenderDay :dateDay="'Fre. ' + Friday.date" :course="Friday.course" :time="Friday.time" :shortAddress="Friday.shortAddress"  :fullAddress="Friday.fullAddress"/>
        </div>
        <img src="../assets/Arrow.svg" style="rotate: 180deg;" @click="nextWeek">
    </div>
</div>
</main>
</template>


<!-- calender css -->
<style scoped>
h2 {
    font-size: 2.5rem;
    color : var(--green);
    font-weight: 700;
}

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
    color: var(--green);
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

.cours_title > div:not(:first-child) {
    height: 5px;
    background-color: var(--red);
    border-radius: 5rem;
}

.achv_title, .achv_title a {
    color: var(--green);
}

.achv_title > div:not(:first-child) {
    height: 5px;
    background-color: var(--green);
    border-radius: 5rem;
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