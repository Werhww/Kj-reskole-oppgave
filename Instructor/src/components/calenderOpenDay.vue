<script setup lang="ts">
import Underline from './underline.vue';
import Button from './button.vue';
import moment from 'moment'
import { ref, watch } from 'vue';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { db } from '../firebase/firebase'

const props = defineProps<{
    courseTitle: string
    amount: number
    student: string
    comment: string
    shortAdress: string
    fullAdress: string
    studentId: string
    courseID: string
    startTime: string
    endTime: string

    commentChanged: () => void
}>()

const formatedDateTime = ref(moment(props.startTime).format("dddd DD MMMM HH:mm"))
const formatedEndTime = ref(moment(props.endTime).format("HH:mm"))

const newComment = ref(props.comment)

async function saveComment() {
    await updateDoc(doc(db, "courses", props.courseID), {
        comment: newComment.value
    })
    props.commentChanged()
}

function deleteCourse() {
    deleteDoc(doc(db, "courses", props.courseID))
}

function toStudentMessege() {
    router.push("/chat/" + props.studentId)
}
</script>

<template>
<section>
    <div class="title">
        <h1>{{ courseTitle }} ({{ amount }})</h1>
        <Underline color="var(--green)" />
    </div>
    <div class="info">
        <div>
            <p>{{ formatedDateTime }} - {{ formatedEndTime }}</p>
            <RouterLink :to="'/user/' + studentId">{{ student }}</RouterLink>
            <a :href="'https://google.maps.com/q:' + fullAdress">{{ fullAdress }}</a>
        </div>
        <div>
            <div>
                <p>Kommentar:</p>
                <p @click="saveComment">Lagre Kommentar</p>
            </div>
            <textarea v-model="newComment" :maxlength="300"></textarea>
        </div>
    </div>
    <div class="buttons">
        <Button text="Medling til elev" color="var(--green)" @click="toStudentMessege"/>
        <Button text="Avmeld" color="var(--red)"  @click="deleteCourse"/>
    </div>
</section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 3.5rem;
}

.title h1{
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--green);
}

.info {
    display: flex;
    justify-content: space-between;
}

.info > div:first-child{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.info > div:last-child{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.info > div:first-child *{
    font-size: 2rem;
}

.info > div:first-child a{
    color: var(--green);
}

.info > div:last-child textarea {
    width: 23.5rem;
    height: 9.75rem;
    border: var(--grey) 3px solid;
    outline: none;
    transition: border 0.2s ease-in-out;
    border-radius: 0.5rem;
    resize: none;
}

.info > div:last-child textarea:focus {
    border: var(--dark-grey) 3px solid;
}

.info > div:last-child > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info > div:last-child > div p:first-child {
    font-size: 1.5rem;
}

.info > div:last-child > div p:last-child {
    text-decoration: underline;
    cursor: pointer;
}


.buttons {
    display: flex;
    justify-content: space-between;
}
</style>