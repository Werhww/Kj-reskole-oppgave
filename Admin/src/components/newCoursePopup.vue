<script setup lang="ts">
import { ref, watch } from 'vue'
import moment from 'moment'
import { db } from '../firebase/firebase'
import { setDoc, collection, doc } from 'firebase/firestore'

const props = defineProps<{
    studentID: string

    allInstuctors: {
        name: string,
        instructorId: string,
    }[]

    allPlaces: {
        name: string,
        fullAddress: string,
        placeId: string
    }[]

    allCourseTypes: {
        name: string,
        price: number,
        courseTypeID: string
        DurationMinutes: number
    }[]

    close: () => void
}>()

const newCourse = ref({
    amount: 1,
    startTime: "",
    endTime: "",
    paid: false,
    price: 0,

    userId: props.studentID,
    placeId: "",
    instructorId: "",
    courseTemplateId: "",
    comment: ""
})

const msg = ref("Nytt kurs")

const date = ref("")
const start = ref("")
const end = ref("--:-- --")

const courseTemplateId = ref("")
const amount = ref(1)


/* Watches changes in start time */
watch(start, ()=>{
    try {
        const courseType:any = findCourseType(newCourse.value.courseTemplateId)
        calculateTime(courseType.DurationMinutes, newCourse.value.amount)
    } catch {
        msg.value = "Fyll ut alle feltene"
        setTimeout(() => {
            msg.value = "Nytt kurs"
        }, 2000);
    }

})

watch([courseTemplateId, amount], ()=> {
    newCourse.value.courseTemplateId = courseTemplateId.value
    const courseType:any = findCourseType(courseTemplateId.value)
    
    newCourse.value.amount = amount.value
    newCourse.value.price = courseType.price * amount.value
})

function findCourseType(courseTypeID:string) {
    for (let i = 0; i < props.allCourseTypes.length; i++) {
        if (props.allCourseTypes[i].courseTypeID == courseTypeID) {       
            return props.allCourseTypes[i]
        }
    }
}

function calculateTime(courseMinutes:number, amount:number) {
    const minutes = courseMinutes * amount

    const momentStartTime = moment(date.value + " " + start.value)
    const endTime = moment(momentStartTime).add(minutes, 'minutes')
    
    

    newCourse.value.startTime = momentStartTime.format('yyyy-MM-DDTHH:mm:ss')
    newCourse.value.endTime = endTime.format('yyyy-MM-DDTHH:mm:ss')

    end.value = endTime.format('HH:mm')

    if(end.value == "Invalid date") {
        throw new Error('Parameter is not a number!');
    }
}

function saveCourse() {
    if( newCourse.value.courseTemplateId == "" ||
        newCourse.value.amount == 0 ||
        newCourse.value.instructorId == "" ||
        newCourse.value.placeId == "" ||
        newCourse.value.startTime == "" ||
        newCourse.value.endTime == "" ||
        newCourse.value.price == 0 ||
        newCourse.value.userId == "") {
            
        msg.value = "Fyll ut alle feltene"
        setTimeout(() => {
            msg.value = "Nytt kurs"
        }, 2000);
        return
    }
    
    setDoc(doc(collection(db, "courses")), newCourse.value)
    props.close()
}

</script>

<template>
<div class="wrapper">
    <h1>{{ msg }}</h1>
    <div>
        <div>
            <label for="courseName">Kurs</label>
            <select id="courseName" v-model="courseTemplateId">
                <option v-for="course in allCourseTypes" :value="course.courseTypeID">{{ course.name }}</option>
            </select>
        </div>
        <div>
            <label for="amount">Amount</label>
            <input type="number" id="amount" v-model="amount">
        </div>
    </div>
    <div>
        <div>
            <label for="instructor">Instructor</label>
            <select id="instructor" v-model="newCourse.instructorId">
                <option v-for="instructor in allInstuctors" :value="instructor.instructorId">{{ instructor.name }}</option>
            </select>
        </div>
        <div>
            <label for="place">Place</label>
            <select id="place" v-model="newCourse.placeId">
                <option v-for="place in allPlaces" :value="place.placeId">{{ place.name }}</option>
            </select>
        </div>
    </div>
    <div>
        <div>
            <label for="date">Date</label>
            <input type="date" id="date" v-model="date">
        </div>
        <div>
            <label for="time">Start time</label>
            <input type="time" id="time" v-model="start">
        </div>
        <div>
            <p>End time</p>
            <p>{{ end }}</p>
        </div>
    </div>
    <div class="buttons">
        <button @click="close">Avbryt</button>
        <button @click="saveCourse">Lagre</button>
    </div>
</div>
<div class="background_blur"></div>
</template>

<style scoped>
.background_blur {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.wrapper {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    background-color: white;
    border-radius: 1rem;
    padding: 2rem 3rem;
}

.wrapper > div{
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.wrapper > div > div{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.wrapper label, .wrapper input, .wrapper select, .wrapper p{
    font-size: 1.25rem;
}

.buttons {
    display: flex;
    justify-content: space-between;
    gap: 0;
}

.buttons button{
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background-color: var(--red);
    color: white;   
}

.buttons button:last-child{
    background-color: var(--green);
}

</style>