<script setup lang="ts">
/* Componments imports */
import Underline from '@/components/underline.vue';
import Studentlist from '@/components/studentlist.vue';
import CalenderDays from '@/components/calenderDays.vue';
import CalenderItem from '@/components/calenderItem.vue';
import CalenderOpenDay from '@/components/calenderOpenDay.vue';

import { instructorsUsers, instructorCourses } from "../firebase/store";
import {  } from "../firebase/store";

import { ref, watch } from 'vue';
import moment from 'moment';

const users = ref(instructorsUsers)

const currentDate = moment().format()

const week = ref(moment().week())

interface courseProps {
    course: string,
    startTime: string,
    endTime: string,

    shortAddress: string,
    fullAddress: string,

    amount: number,
    price: number,
    paid: boolean,

    instructor: string,
    comment: string,

    student: string,

    studentID: string,
    courseID: string,
    instructorID:  string,
    courseTypeID: string,
}

const curretWeekCourses = ref<courseProps[]>([])

watch([instructorCourses, week], (newValue) => {
    const courses = newValue[0]
    

    const currentWeekCourses:courseProps[] = []

    for (let i = 0; i < courses.length; i++) {
        const course = courses[i]
        const courseStartTime = moment(course.startTime).format()
        const courseEndTime = moment(course.endTime).format()


        if (moment(courseStartTime).week() == week.value) {
            currentWeekCourses.push({
                course: course.course,
                startTime: courseStartTime,
                endTime: courseEndTime,
                shortAddress: course.shortAddress,
                fullAddress: course.fullAddress,
                amount: course.amount,
                price: course.price,
                paid: course.paid,
                instructor: course.instructor,
                comment: course.comment,
                student: course.student,
                studentID: course.studentID,
                courseID: course.courseID,
                instructorID: course.instructorID,
                courseTypeID: course.courseTypeID,
            })

            console.log('added')
        }
    }

    curretWeekCourses.value = currentWeekCourses
    console.log('sorted')
})

const showedCourse = ref({
    isShowed: false,
    courseTitle: "",
    amount: 5,
    student: "",
    comment: "",
    shortAdress: "",
    fullAdress: "",
    studentId: "",
    courseID: "",
    startTime: "",
    endTime: ""
})

/* Used to get one of the info day on the top now the with of the element */
const calenderDaysMonday = ref<HTMLDivElement | null>(null)

/* Used to get the width of the calender day */
const calenderColumnWidth = ref(0)
const calenderColumnGap = ref(0)
const calenderRowGap = ref(90)

watch(calenderDaysMonday, (newValue) => {
    const parentWidth:any = newValue?.offsetWidth
    const child = newValue?.children[0] as HTMLDivElement
    const width = child.offsetWidth

    calenderColumnGap.value = (parentWidth - (width*5)) / 4
    calenderColumnWidth.value = width
})

let displayedCalenderDates = ref<string[] >([])
let displayedCalenderFirstDate = ref<string>('')

/* changes to next and previuse week */
function nextWeek() {
    week.value = week.value + 1
    displayedCalenderFirstDate.value = moment().week(week.value).day(1).format()
}

function prevWeek() {
    week.value = week.value - 1
    displayedCalenderFirstDate.value = moment().week(week.value).day(1).format()
}

watch([displayedCalenderFirstDate], (date) => {
    for (let i = 0; i < 5; i++) {
        const day = moment(date[0]).day(i+1).format('dddD')
        displayedCalenderDates.value[i] = day
    }
})

function setDate() {
    displayedCalenderFirstDate.value = moment().week(week.value).day(1).format()
}

setDate()


const calenderContentWrapper = ref<HTMLDivElement | null>(null)

/* Opens the course info */
function openCourse(course:any) {
    showedCourse.value = {
        isShowed: true,
        courseTitle: course.courseTitle,
        amount: course.amount,
        student: course.student,
        comment: course.comment,
        shortAdress: course.shortAdress,
        fullAdress: course.fullAdress,
        studentId: course.studentId,
        courseID: course.courseID,
        startTime: course.startTime,
        endTime: course.endTime,
    }

    removeHighlightCourse()
}

function removeHighlightCourse() {
    const childern:any = calenderContentWrapper.value?.children
    for (let i = 0; i < childern?.length; i++) {
        const element = childern[i]
        if (element.classList.contains("highlighted")) {
            element.classList.remove("highlighted")
        } 
    }
}

</script>

<template>
<main>
    <section>
        <div>
            <h1>Min elever</h1>
            <Underline color="var(--red)" />
            <div class="students_info">
                <p>Elev</p>
                <p>Neste kurs</p>
                <p>Hidden text</p><!-- This is hidden to even out teh bar -->
            </div>
            <div>
                <Studentlist v-for="user in users" :name="user.name" :next-course="currentDate" :student-i-d="user.userId"/>
            </div>
        </div>
    </section>
    <section>
        <div class="week">
            <img @click="prevWeek" src="../assets/Arrow.svg" alt="">
            <h1>Uke {{ week }}</h1>
            <img @click="nextWeek" src="../assets/Arrow.svg" alt="" style="rotate: 180deg;">
        </div>
        <div>
            <div class="days_info"  ref="calenderDaysMonday">
                <CalenderDays v-for="i in displayedCalenderDates" :date="i"/>

            </div>
            <div class="calender" v-dragscroll:nochilddrag >
                <div class="time" data-dragscroll>
                    <div v-for="i in 24">
                        <p>{{ i }}:00</p>
                        <Underline color="var(--light-grey)"/>
                    </div>
                </div>
                <div class="calender_content" ref="calenderContentWrapper" data-dragscroll>
                    <CalenderItem 
                        v-for="day in curretWeekCourses"
                        :is-showed="false"

                        :open-course="openCourse"
                        
                        :course-title="day.course"
                        :amount="day.amount"
                        :student="day.student"
                        :comment="day.comment"
                        :short-adress="day.shortAddress"
                        :full-adress="day.fullAddress"
                        :student-id="day.studentID"
                        :course-i-d="day.courseID"

                        :column-gap="calenderColumnGap"
                        :column-width="calenderColumnWidth"
                        :row-gap="calenderRowGap"

                        :start-time="day.startTime"
                        :end-time="day.endTime"
                    />
                </div>
            </div>
            <CalenderOpenDay
                v-if="showedCourse.isShowed"

                :courseTitle="showedCourse.courseTitle"
                :amount="showedCourse.amount"
                :student="showedCourse.student" 
                :comment="showedCourse.comment"
                :shortAdress="showedCourse.shortAdress"
                :fullAdress="showedCourse.fullAdress"
                :startTime="showedCourse.startTime"
                :endTime="showedCourse.endTime"
               
                :studentId="showedCourse.studentId"
                :course-i-d="showedCourse.courseID"

                :comment-changed="()=>{week = week}"
            />
        </div>
    </section>
</main>
</template>

<style scoped>
h1 {
    color: var(--red);
    font-size: 2.5rem;
    font-weight: 600;
}

main {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    padding-bottom: 5rem;
}
</style>

<!-- Students / top part -->
<style setup>
.students_info {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.5rem;
}

.students_info p {
    font-size: 1.5rem;
    font-weight: 500;
}

.students_info p:last-child {
    /* Hidden element to even out info bar */
    opacity: 0;
    user-select: none;
}
</style>

<!-- Calender / bottom part -->
<style setup>
.calender_content{
    position: absolute;
    top: 0;
    left: 0;
    height: 2090px;
    width: 100%;
}

.time {
    display: flex;
    flex-direction: column;
    gap: 4.375rem;
    user-select: none;
}

.time > div{
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.time > div > div{
    flex: 1;
}

.calender {
    position: relative;
    margin-top: .2rem;
    margin-bottom: 1rem;
    overflow-y: hidden;
    height: 24.375rem;
    cursor: grab;
}

.calender:active {
    cursor: grabbing;
}

.days_info {
    display: flex;
    justify-content: space-between;
    margin: 0 3.125rem;
}

.week {
    display: flex;
    justify-content: space-around;
}

.week h1{
    color: var(--green);
    font-weight: 700;
}

.week img{
    cursor: pointer;
    user-select: none;
}

</style>