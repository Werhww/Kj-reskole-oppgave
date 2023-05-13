<script setup lang="ts">
import { computed, ref } from 'vue'
import { db } from '@/firebase/firebase'
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import type { Query, DocumentData } from 'firebase/firestore'

const prop = defineProps<{
    name:string
    id:string

    licence:string
    mainInstructor:string

    allInstructor: {
        name:string
        id:string
    }[]
}>()

const instructor = computed(()=>{
    return prop.allInstructor.find((data)=>{
        return data.id == prop.mainInstructor
    })
})

const isOpen = ref(false)

function open() {
    isOpen.value = !isOpen.value
}

const deleteText = ref("Slett bruker")
const deleteTimer = ref<string | any>("")

const deletionPrimed = ref(false)

function deletePrimed() {
    if (deletionPrimed.value) {
        const whereQuery = where("userId", "==", prop.id)

        forEachDelete(query(collection(db, "courses"), whereQuery))
        forEachDelete(query(collection(db, "chats"), whereQuery))
        forEachDelete(query(collection(db, "achievements"), whereQuery))        

        deleteDoc(doc(db, "users", prop.id))
    } else {
        deletionPrimed.value = true
        deleteTimer.value = 5
        deleteText.value = `Klikk igjen for å slette`

        const deleteInterval = setInterval(() => {
            deleteTimer.value--
        }, 1000)

        setTimeout(() => {
            clearInterval(deleteInterval)
            deleteText.value = `Slett bruker`
            deletionPrimed.value = false
            deleteTimer.value = ""
        }, 5000);
    }
}

function forEachDelete(query: Query<DocumentData>) {
    const querySnapshot = getDocs(query)
    querySnapshot.then((data)=>{
        data.forEach((doc)=>{
            deleteDoc(doc.ref)
        })
    })
}


</script>

<template>
<div class="listContent" @click="open">
    <p>{{ name }}</p>
    <p>{{ id }}</p>
</div>
    <div v-if="isOpen" class="extra_content">
        <p>Førerkort: {{ licence }}</p>
        <p>HovedInstruktør: {{ instructor?.name }}</p>
    </div>
    <div v-if="isOpen"  class="buttons">
        <p @click="deletePrimed">{{ deleteText }} {{ deleteTimer }}</p>
    </div>
</template>

<style scoped>
.listContent {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.5rem;
    border-top: solid 2px var(--grey);
}

.listContent:hover {
    cursor: pointer;
    background-color: var(--light-grey);
}

.extra_content {
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.5rem;
}

.licence_edit {
    display: flex;
    gap: 0.2rem;
}

.buttons {
    display: flex;
    justify-content: space-around;
    text-decoration: underline;
    cursor: pointer;
}
</style>