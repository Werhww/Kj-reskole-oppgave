<script setup lang="ts">
import Button from "@/components/button.vue";
import Title from "@/components/title.vue";
import CourseItem from "@/components/courseItem.vue";

const courses = [
    {
        courseTitle: "Trafikkopplæringen",
        amount: "1",
        date: "12.12.2021",
        price: "1000",
        payment: true
    },
    {
        courseTitle: "Trafikkopplæringen",
        amount: "3",
        date: "12.12.2021",
        price: "1000",
        payment: false
    },
    {
        courseTitle: "Trafikkopplæringen",
        amount: "1",
        date: "12.12.2021",
        price: "1000",
        payment: true
    },
]

const Commingcourses = [
    {
        courseTitle: "Trafikkopplæringen",
        amount: "1",
        date: "12.12.2021",
        price: "1000",
        payment: undefined
    },
    {
        courseTitle: "Trafikkopplæringen",
        amount: "3",
        date: "12.12.2021",
        price: "1000",
        payment: undefined
    },
    {
        courseTitle: "Trafikkopplæringen",
        amount: "1",
        date: "12.12.2021",
        price: "1000",
        payment: undefined
    },
]

</script>

<template>
<main>
    <section class="container">
        <Title text="Kurs" color="var(--red)" anchor-i-d="list" />
        <div class="course_content">
            <h1>Gjennomført kurs</h1>
            <div >
                <span>
                    <p>Kurs</p>
                    <p>Dato</p>
                    <p>Pris</p>
                </span>
                <CourseItem v-for="item in courses" :course-title="item.courseTitle" :amount="item.amount" :date="item.date" :price="item.price" :payment="item.payment" />
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
                <CourseItem v-for="item in Commingcourses" :course-title="item.courseTitle" :amount="item.amount" :date="item.date" :price="item.price" :payment="item.payment" />
            </div>
        </div>
    </section>
    <section class="container">
        <Title text="Prestasjonene" color="var(--green)" anchor-i-d="achievements" />
        
    </section>
</main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
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

.course_content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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

.course_content > div  > span > p:not(:last-child):not(:first-child) {
padding-left: 8.5rem;
}

.course_content > div  > span > p:first-child {
padding-left: 0.4rem;
}
</style>