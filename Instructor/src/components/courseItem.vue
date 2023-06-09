<script setup lang="ts">
import { ref, watch } from 'vue'
import moment from 'moment';


const props = defineProps<{
    course: string
    amount: number
    price: number
    paid?: boolean | undefined
    startTime: string
    endTime: string
    courseTypeID: string

    /* Dropdown content */
    instructor: string
    fullAddress: string
    comment: string

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

    /* IDs */
    courseID: string
    instructorID: string
    placeId: string

    /* Functions */
    avmeldKurs: (CourseID:string) => void;
    saveComment: (CourseID:string, comment:string) => void;
    saveChanges: (CourseID:string, editContent:any) => void;
}>()

const date = moment(props.startTime).format('DD.MMM')
const start = ref(moment(props.startTime).format('HH.mm'))
const end = ref(moment(props.endTime).format('HH.mm'))

const isDropdownOpen = ref(false)
const topUnderline = ref<HTMLInputElement | null>(null)

/* opens and hiddes extra dropdown content */
function toggleDropdown(event:any) {
    /* Stops toggle if dateinput is clicked */
    if(edit.value) return

    isDropdownOpen.value = !isDropdownOpen.value
    isDropdownOpen.value? null : edit.value = false
    if (isDropdownOpen.value) {
        topUnderline.value?.classList.add('hiddenOpacity')
    } else {
        topUnderline.value?.classList.remove('hiddenOpacity')
    }
}

/* comment value */
const newComment = ref(props.comment)
const dateEdit = ref('')
const startEdit = ref(moment(props.startTime).format('HH:mm:ss.SSS'))

const editContent = ref({
    instructorId: props.instructorID,
    comment: newComment,
    paid: props.paid,
    startTime: props.startTime,
    endTime: props.endTime,
    placeId: props.placeId,
    courseTemplateId: props.courseTypeID,
    amount: props.amount,
    price: props.price
})

const edit = ref(false)

function openEdit() {
    edit.value = !edit.value
}

/* watches changes in edit content */
watch(editContent.value, ()=>{
    const courseType:any = findCourseType(editContent.value.courseTemplateId)
    editContent.value.price = courseType.price * editContent.value.amount
    calculateTime(courseType.DurationMinutes)
})

/* Watches changes in start time */
watch(startEdit, ()=>{
    const courseType:any = findCourseType(editContent.value.courseTemplateId)
    calculateTime(courseType.DurationMinutes)
})

watch(dateEdit, ()=>{
    const courseType:any = findCourseType(editContent.value.courseTemplateId)
    calculateTime(courseType.DurationMinutes)
})


function findCourseType(courseTypeID:string) {
    for (let i = 0; i < props.allCourseTypes.length; i++) {
        if (props.allCourseTypes[i].courseTypeID == courseTypeID) {
            return props.allCourseTypes[i]
        }
    }
}

function calculateTime(courseMinutes:number, amount:number = editContent.value.amount) {
    const minutes = courseMinutes * amount

    const startTime = moment(dateEdit.value + " " + startEdit.value)
    const endTime = moment(startTime).add(minutes, 'minutes')
    editContent.value.startTime = startTime.format('yyyy-MM-DDTHH:mm:ss')
    editContent.value.endTime = endTime.format('yyyy-MM-DDTHH:mm:ss')

    start.value = startTime.format('HH.mm')
    end.value = endTime.format('HH.mm')
}
</script>

<template>
<section>
    <!-- Inital show items -->
    <div class="top" @click="toggleDropdown($event)"> 
        <!-- Content -->
        <div class="content">
            <p  v-if="!edit">{{ course }} ({{ amount }})</p>
            <div v-else>
                <select class="" v-model="editContent.courseTemplateId">
                    <option v-for="course in allCourseTypes" :value="course.courseTypeID">{{ course.name }}</option>
                </select>
                <input type="number" v-model="editContent.amount">
            </div>
            <p v-if="!edit">{{ date }}</p>
            <input v-else type="date" v-model="dateEdit" class="dateEdit">
            <div class="top_Price">
                <p>{{ editContent.price }} kr</p>
                <img v-if="paid == true" src="../assets/Course_Paid.svg" alt="Paid">
                <img v-else-if="paid == false" src="../assets/Course_Unpaid.svg" alt="Unpaid">
                <img v-else class="payment_hidden" src="../assets/Course_Unpaid.svg" draggable="false">
            </div>
        </div>
        <div class="hover"><!-- Light gray hover transion --></div>
        <div class="underline" ref="topUnderline"><!-- Underline --></div>
    </div>
    <!-- Dropdown content -->
    <div class="dropdown" v-if="isDropdownOpen">
        <div class="mainContent">
            <div>
                <p v-if="!edit">{{ instructor }}</p>
                <select class="instructorEdit" v-model="editContent.instructorId" v-else>
                    <option v-for="instructor in allInstuctors" :value="instructor.instructorId">{{ instructor.name }}</option>
                </select>
                <div class="place_time">
                    <a v-if="!edit" :href="'https://maps.google.com/?q=' + fullAddress" target="_blank">{{ fullAddress }}</a>
                    <select v-else class="placeEdit" v-model="editContent.placeId">
                        <option v-for="place in allPlaces" :value="place.placeId">{{ place.name }}</option>
                    </select>
                    <p v-if="!edit">{{ start }} - {{ end }}</p>
                    <div v-else>
                        <input type="time" v-model="startEdit">
                        <p>-</p>
                        <p>{{ end }}</p>
                    </div>
                </div>
                <div class="content_Price">
                    <p>{{ editContent.price }} kr</p> 
                    <img v-if="paid == undefined" class="payment_hidden" src="../assets/Course_Unpaid.svg" draggable="false">
                    <img v-else-if="paid == false" src="../assets/Course_Unpaid.svg" alt="Unpaid">
                    <img v-else src="../assets/Course_Paid.svg" alt="Paid">
                </div>
            </div>
            <div class="comment">
                <p>Kommentar:</p>
                <textarea v-model="newComment" :maxlength="300"></textarea>
            </div>
        </div>
        <div class="changeButtons" v-if="!edit">
            <p @click="avmeldKurs(courseID)">Avmeld kurs</p>
            <p @click="openEdit">Rediger</p>
            <p @click="saveComment(courseID, newComment)">Lagre Kommentar</p>
        </div>
        <div class="changeButtons" v-else>
            <p @click="openEdit">Avbryt</p>
            <p @click="()=>{
                saveChanges(courseID, editContent)
                openEdit()
            }">Lagre</p>
        </div>
    </div>
    <div class="underline" v-if="isDropdownOpen"><!-- Underline --></div>
</section>
</template>

<style scoped>
.placeEdit {
    font-size: 1.25rem;
    width: 20rem;
}

.instructorEdit {
    font-size: 1.25rem;
}

.dateEdit {
    font-size: 1.25rem;
    background-color: transparent;
    border: none;
    outline: none;
}

.place_time > div{
    display: flex;
    gap: 0.3rem;
}

.place_time > div > input{
    color: black;
    font-size: 1.25rem;
    background-color: transparent;
    border: none;
    outline: none;
}

</style>


<!-- style -->
<style scoped>
.changeButtons{
    display: flex;
    align-self: center;
    gap: 3.875rem;

    font-size: 1.25rem;
}

.changeButtons p{
    text-decoration: underline;
    cursor: pointer;
}

.changeButtons p:first-child{
    color: var(--red);
}

.changeButtons p:nth-child(2){
    color: var(--dark-grey);
    text-decoration: none;
}

.top_Price {
    font-size: 1.5rem;
}

.content_Price{
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    color: var(--dark-grey);
}

.dropdown {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
}

.mainContent{
    display: flex;
    justify-content: space-between;

    font-size: 1.5rem;
}

.mainContent > div:first-child{
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.place_time{
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
}

.place_time *{
    color: var(--dark-grey);
}

.comment{
    display: flex;
    flex-direction: column;
    padding-right: 3rem;
    gap: 0.5rem;
    width: 25%;
}

.comment > textarea {
    width: 19rem;
    height: 9.75rem;
    border: var(--grey) 3px solid;
    outline: none;
    transition: border 0.2s ease-in-out;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    resize: none;
}

.comment > textarea:focus {
    border: var(--dark-grey) 3px solid;
}


section {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.content > p:first-child {
    width: 30%;
}

.content > p {
    font-size: 1.5rem;
}

.content > div{
    display: flex;
    gap: 3.75rem;
}

.top {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0.375rem;
}

.underline {
    height: 5px;
    background-color: var(--light-grey);
    border-radius: 5rem;
    transition: opacity 0.3s ease-in-out;
} 

.payment_hidden {
    opacity: 0;
    pointer-events: none;
}

.hidden{
    display: none;
}

.hiddenOpacity{
    opacity: 0;
}


/* hover effect */
.hover{
    position: absolute;
    bottom: 6px;
    left: -1rem;
    width: 102%;
    height: 0%;
    transition: height 0.3s ease-in-out;
    z-index: -1;
    background-color: var(--light-grey);
    border-radius: 3rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.top:hover > .hover {
    height: 100%;
}

.top:hover > .underline{
    opacity: 0;
}

.top:hover{
    cursor: pointer;
}
/* ***************************/
</style>

<!-- Media querys -->
<style scoped>
@media only screen and (max-width: 900px) {
    .dropdown {
        font-size: 1rem;
    }

    .content > p:first-child {
        width: max-content;
    }

    .content p {
        font-size: 1.25rem;
    }

    .top_Price {
        display: none!important;
    }

    .content_Price{
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .hover {
        display: none;
    }

    .place_time{
        flex-direction: column-reverse;
        gap: 0.5rem;
    }

    .comment{
        padding-right: 0.3rem;
        width: 40%;
    }
}
</style>