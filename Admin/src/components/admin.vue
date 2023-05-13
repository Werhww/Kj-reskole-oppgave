<script setup lang="ts">
import { signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { onMounted, ref } from 'vue';
import { collection, doc, onSnapshot, query, updateDoc, where, getDocs} from 'firebase/firestore';
import instructor from './instructor.vue';
import users from './users.vue';
import newInstructorPopup from './newInstructorPopup.vue';

const props = defineProps<{
    loginInfo: {
        mail: string
        password: string
    }
}>()

const instructorRef = collection(db, "instructors")

interface instructors {
    name:string
    id:string
}

const allInstructor = ref<instructors[]>([])

onMounted(()=>{
    onSnapshot(instructorRef ,(docs)=>{
        allInstructor.value = []

        docs.docs.forEach((data)=>{
            allInstructor.value?.push({
                name: data.data().name,
                id: data.id
            })
        })
    })
})

const usersRef = collection(db, "users")

interface user {
    name:string
    id:string
    mainInstructor:string
    license:string
}

const allUsers = ref<user[]>([])

onMounted(()=>{
    onSnapshot(usersRef ,(docs)=>{
        allUsers.value = []
        docs.docs.forEach((data)=>{
            allUsers.value?.push({
                name: data.data().name,
                id: data.id,
                mainInstructor: data.data().mainInstructor,
                license: data.data().license
            })
        })
    })
})

function logOut() {
    signOut(auth)
}

const isInstuctor = ref(false)

function addInstuctor() {
    isInstuctor.value = !isInstuctor.value
}
</script>

<template>
<main>
<header>
    <p @click="logOut">SignOut</p>
</header>
<section>
    <div class="instructors">
        <div class="ekstra_info">
           <h1>Instruktører</h1>
           <p @click="addInstuctor" class="add_instuctor">Ny Instruktør</p>
        </div>
        
        <div class="ekstra_info">
            <p>name</p>
            <p>id</p>
        </div>

        <instructor v-for="instructor in allInstructor" :name="instructor.name" :id="instructor.id" :all-users="allUsers"/>
    </div>
    <div class="brukere">
        <h1>Brukere</h1>
        <div class="ekstra_info">
            <p>name</p>
            <p>id</p>
        </div>
        <users v-for="user in allUsers" :name="user.name" :id="user.id" :main-instructor="user.mainInstructor" :licence="user.license" :all-instructor="allInstructor"/>
    </div>
</section>
<newInstructorPopup v-if="isInstuctor" :mail="loginInfo.mail" :password="loginInfo.password" v-on:avbryt="addInstuctor"/>
</main>
</template>

<style scoped>
main {
    width: 100vw;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0;
}

header {
    padding: 3rem 0;
    text-decoration: underline;
    cursor: pointer;
}

section {
    display: flex;
    justify-content: space-evenly;
    width: 100vw;
}

.instructors, .brukere {
    display: flex;
    flex-direction: column;
    
    width: 30vw;
    border: solid 2px var(--dark-grey);

    padding: 0.5rem;

    height: fit-content;
}

.brukere {
    width: 30vw;
}

.ekstra_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 0.5rem;
}

.add_instuctor {
    text-decoration: underline;
    cursor: pointer;
}
</style>