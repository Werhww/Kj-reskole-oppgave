<script setup lang="ts">
import Title from "@/components/title.vue";
import CourseItem from "@/components/courseItem.vue";
import Achievement from "@/components/achievement.vue";
import { ref } from "vue";
import moment from 'moment';

import { user } from "../firebase/store";

const achievements = ref(user.value.achievements);

const courses = ref(user.value.courses)

const commingCourses = ref(user.value.commingcourses)

function payNow() {
    console.log("pay now")
}

</script>

<template>
<main>
    <section class="container">
        <Title text="Kurs" color="var(--red)" anchor-i-d="list" />
        <div class="course_content">
            <div>
                <h1>Gjennomført kurs</h1>
                <p @click="payNow">Betal nå</p>
            </div>
            
            <div >
                <span>
                    <p>Kurs</p>
                    <p>Dato</p>
                    <p>Pris</p>
                </span>
                <CourseItem v-for="item in courses" :instructor="item.instructor" :place="item.fullAddress" :time="item.time" :comment="item.comment" :course-title="item.course" :amount="item.amount" :date="moment(item.date).format('DD.MM.YYYY')" :price="item.price" :paid="item.paid" />
            </div>
        </div>
        <div class="course_content">
            <h1>Fremtidig kurs</h1>
            <div >
                <span>
                    <p>Kurs</p>
                    <p>Dato</p>
                    <p>Pris</p>
                </span>
                <CourseItem v-for="item in commingCourses" :instructor="item.instructor" :place="item.fullAddress" :time="item.time" :comment="item.comment" :course-title="item.course" :amount="item.amount" :date="moment(item.date).format('DD.MM.YYYY')" :price="item.price" :paid="item.paid" />
            </div>
        </div>
    </section>
    <section class="container">
        <Title text="Prestasjonene" color="var(--green)" anchor-i-d="achievements" />
        <div class="driveTime">
            <p>Du har kjørt</p>
            <p>{{ achievements.driveTime }} timer</p>
        </div>
        <div class="achievements">
            <Achievement v-for="i in achievements.achievement" :name="i.name" :done="i.done" />
        </div>
    </section>
</main>
</template>

<!-- Reused code -->
<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
    padding-bottom: 5rem;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
    padding-left: 0.2rem;
}
</style>

<!-- Second container css -->
<style scoped>
.driveTime {
    display: flex;
    flex-direction: row;
    gap: 9.125rem;
    color: var(--green);
    font-size: 2.5rem;
}

.achievements {
    display: grid;
    grid-template-columns: auto auto auto;
    row-gap: 2.5rem;

    font-size: 1.5rem;
}
</style>

<!-- First container css -->
<style scoped>

.course_content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.course_content > div:first-child {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
}

.course_content > div:first-child > p:last-child {
    font-size: 1.5rem;
    text-decoration: underline;
}

.course_content > div:first-child > p:last-child:hover {
    cursor: pointer;
}

.course_content > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.course_content > div > span {
    display: flex;
    justify-content: space-between;
}

.course_content > div  > span > p {
    font-size: 1.5rem;
    font-weight: 700;
}

.course_content > div > span > p:last-child {
    padding-right: 8.25rem;
}

.course_content > div  > span > p:first-child {
    width: 36%;
    padding-left: 0.4rem;
}
</style>