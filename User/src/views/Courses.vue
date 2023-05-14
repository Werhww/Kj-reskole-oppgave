<script setup lang="ts">
import Title from "@/components/title.vue";
import CourseItem from "@/components/courseItem.vue";
import Achievement from "@/components/achievement.vue";
import { ref } from "vue";
import moment from 'moment';

import { commingCourses, previousCourses, achievements, user, allCourseTemplates, allInstructors, allPlaces } from "../firebase/store";

const PreviousCourses = ref(previousCourses)

const CommingCourses = ref(commingCourses)

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
                    <p class="info_price">Pris</p>
                </span>
                <CourseItem v-for="item in PreviousCourses" :course-data="item" :all-course-templates="allCourseTemplates" :all-instructors="allInstructors" :all-places="allPlaces" />
            </div>
        </div>
        <div class="course_content">
            <h1>Fremtidig kurs</h1>
            <div >
                <span>
                    <p>Kurs</p>
                    <p>Dato</p>
                    <p class="info_price">Pris</p>
                </span>
                <CourseItem v-for="item in CommingCourses" :course-data="item" :all-course-templates="allCourseTemplates" :all-instructors="allInstructors" :all-places="allPlaces" />
            </div>
        </div>
    </section>
    <section class="container">
        <Title text="Prestasjonene" color="var(--green)" anchor-i-d="achievements" />
        <div class="driveTime">
            <p>Du har kjørt {{ user.drivetime }} timer</p>
        </div>
        <div class="achievements">
            <Achievement v-for="i in achievements" :name="i.name" :done="i.done" />
        </div>
    </section>
</main>
</template>

<!-- rebrukt code -->
<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
    padding-bottom: 5rem;
}

.container {
    display: flex;
    flex-direction: column;;
    gap: 3.125rem;
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
    padding-left: 0.2rem;
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
}
</style>

<!-- Media querys -->
<style scoped>
@media only screen and (max-width: 900px) {
    main {
        gap: 5rem;
        padding-bottom: 5rem;
    }
    
    h1 {
        font-size: 1.75rem;
        padding-left: 0;
    }
    
    /* Kurs css */
    .course_content > div > span {
        display: flex;
        justify-content: space-around;
    }

    .course_content > div  > span > p {
        font-size: 1.25rem;
    }

    .course_content > div > span > p:last-child {
        padding-right: 8.25rem;
    }

    .course_content > div  > span > p:first-child {
        width: 36%;
        padding-left: 0.4rem;
    }

    .info_price{
        display: none;
    }

    /* Prestasjonene css */    
    .driveTime {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        color: var(--green);
        font-size: 1.5rem;
    }

    .achievements {
        grid-template-columns: 45% 45%;
        column-gap: 1rem;
        padding-left: 0.5rem;
    }
}
</style>