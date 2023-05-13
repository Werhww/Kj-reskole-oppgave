<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/firebase';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import instructorsUser from './instructorsUser.vue';

const prop = defineProps<{
    name:string
    id:string

    allUsers: {
        name:string
        id:string
    }[]
}>()

const userRef = collection(db, "users")
const usersQuery = query(userRef, where("mainInstructor", "==", prop.id))

interface user {
    name:string
    license:string
    id:string
}

const users = ref<user[]>([])

onMounted(()=>{
    onSnapshot(usersQuery, (list)=>{
        users.value = []

        list.docs.forEach((data)=>{
            users.value?.push({
                name: data.data().name,
                license: data.data().license,
                id: data.id
            })
        })
    })
})


const newUser = ref(false)
const removeUser = ref(false)

const addUserText = ref("ny bruker")
const removeUserText = ref('fjern bruker')

const newUserValue = ref("400")
const removeUserValue = ref("400")

function addUser() {
    if(newUser.value) {
        if(newUserValue.value == "400") {
            newUser.value = false
            addUserText.value = "ny bruker"

            return
        }

        updateDoc(doc(userRef, newUserValue.value), {
            mainInstructor: prop.id
        })

    } else {
        newUser.value = true
        addUserText.value = "legg til"

    }
}

function deleteUser() {
    if(removeUser.value) {
        if(removeUserValue.value == "400") {
            removeUser.value = false
            removeUserText.value = "fjern bruker"
            
            return
        }

        updateDoc(doc(userRef, removeUserValue.value), {
            mainInstructor: ""
        })

    } else {
        removeUser.value = true
        removeUserText.value = "fjern"

    }
}

const isOpen = ref(false)

function open() {
    isOpen.value = !isOpen.value

    newUser.value = false
    removeUser.value = false

    addUserText.value = "ny bruker"
    removeUserText.value = "fjern bruker"

    newUserValue.value = "400"
    removeUserValue.value = "400"
}
</script>

<template>
<div class="listContent" @click="open">
    <p>{{ name }}</p>
    <p>{{ id }}</p>
</div>
    <div v-if="isOpen">
        <instructorsUser v-for="user in users" :name="user.name" :licence="user.license"/>
    </div>
    <div v-if="isOpen" class="buttons">
        <p @click="addUser">{{addUserText}}</p>
        <p @click="deleteUser">{{removeUserText}}</p>
    </div>
        <select v-if="newUser" v-model="newUserValue">
            <option value="400">avbryt ny bruker med legg til knappen</option>
            <option v-for="user in allUsers" :value="user.id">{{ user.name }}</option>
        </select>
        <select v-if="removeUser" v-model="removeUserValue">
            <option value="400">avbryt fjerning av bruker med legg til knappen</option>
            <option v-for="user in users" :value="user.id">{{ user.name }}</option>
        </select>
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

.buttons {
    display: flex;
    justify-content: space-around;
    text-decoration: underline;
    cursor: pointer;
}
</style>