<script setup lang="ts">
import calenderDay from '@/components/calenderDay.vue';

const placholder = {
    gjenomførte: 5600,
    fremtidige: 3400,
    kjørtetimer: 20,
    presentsjoner: ['Trafikkopplæringen', 'Trafikkopplæringen', 'Mennesket i trafikken']
}
</script>

<template>
<main>
<div class="top">
    <div>
        <div class="cours_title title">
            <div>
                <H1>Kurs</H1>
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
                <H1>Gjennomført</H1>
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
    <h2>Uke 15</h2>
    <div class="calender">
        <img src="../assets/Arrow.svg">
        <div class="days">
            <calenderDay dateDay="Man. 17" course="Kjøretime (A1)" time="15.00 - 15.45" shortAddress="Areneset"  fullAddress="Areneset 8, 5350 Bergen"/>
            <calenderDay dateDay="Man. 17" course="Kjøretime (A1)" time="15.00 - 15.45" shortAddress="Areneset"  fullAddress="Areneset 8, 5350 Bergen"/>
            <calenderDay dateDay="Man. 17" course="Kjøretime (A1)" time="15.00 - 15.45" shortAddress="Areneset"  fullAddress="Areneset 8, 5350 Bergen"/>
            <calenderDay dateDay="Man. 17" course="Kjøretime (A1)" time="15.00 - 15.45" shortAddress="Areneset"  fullAddress="Areneset 8, 5350 Bergen"/>
            <calenderDay dateDay="Man. 17" course="Kjøretime (A1)" time="15.00 - 15.45" shortAddress="Areneset"  fullAddress="Areneset 8, 5350 Bergen"/>
        </div>
        <img src="../assets/Arrow.svg" style="rotate: 180deg;">
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