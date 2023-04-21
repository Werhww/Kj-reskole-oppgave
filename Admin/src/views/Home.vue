<script setup lang="ts">
/* Componments imports */
import Underline from '@/components/underline.vue';
import Studentlist from '@/components/studentlist.vue';
import CalenderDays from '@/components/calenderDays.vue';
import CalenderItem from '@/components/calenderItem.vue';


import { ref, onMounted, watch } from 'vue';
import moment from 'moment';

const week = ref(moment().week())

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

const currentDate = moment().format()

/* changes to next and previuse week */
function nextWeek() {
    week.value = week.value + 1
}

function prevWeek() {
    week.value = week.value - 1
}

const calenderDays = [
    {
        startTime: "2021-09-15T03:00:00",
        endTime: "2021-09-15T04:30:00",
    }
]
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
                <Studentlist name="he213t123tllo" :next-course="currentDate" student-i-d="test1234"/>
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
                <CalenderDays date="Man.15"/>
                <CalenderDays date="Tir.15" />
                <CalenderDays date="Ons.15" />
                <CalenderDays date="Tor.15" />
                <CalenderDays date="Fre.15" />
            </div>
            <div class="calender"  v-dragscroll>
                <div class="time">
                    <div v-for="i in 24">
                        <p>{{ i }}:00</p>
                        <Underline color="var(--light-grey)"/>
                    </div>
                </div>
                <div class="calender_content">
                    <div class="testCalenderDay">
                    </div>
                    <CalenderItem 
                    v-for="day in calenderDays"
                    
                    :column-gap="calenderColumnGap"
                    :column-width="calenderColumnWidth"
                    :row-gap="calenderRowGap"

                    :start-time="day.startTime"
                    :end-time="day.endTime"
                    />
                </div>
            </div>
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
    gap: 3rem;
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
.testCalenderDay{
    position: relative;
    background-color: blue;
    display: none;
    width: v-bind(calenderColumnWidth + "px");
    height: v-bind((calenderRowGap * 2) + "px");
    left: v-bind((calenderColumnWidth + calenderColumnGap) * 3 + "px");
    top: v-bind((calenderRowGap * 1) + 9 + "px");
}

.calender_content{
    position: absolute;
    padding-left: 3.1rem;
    top: 0;
    left: 0;
    height: 2090px;
    width: 96%;
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
    margin-top: 2.875rem;
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