<script setup lang="ts">
import { signOut } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import instructor from '@/components/admin/instructor.vue';
import { onMounted, ref } from 'vue';
import { collection, doc, onSnapshot, query, updateDoc, where, getDocs} from 'firebase/firestore';

const instructorRef = collection(db, "instructors")

interface instructors {
    name:string
    id:string
}

const allInstructor = ref<instructors[]>([])

onMounted(()=>{
    onSnapshot(instructorRef ,(docs)=>{
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
}

const allUsers = ref<user[]>([])

onMounted(()=>{
    onSnapshot(usersRef ,(docs)=>{
        docs.docs.forEach((data)=>{
            allUsers.value?.push({
                name: data.data().name,
                id: data.id
            })
        })
    })
})

function logOut() {
    signOut(auth)
}
</script>

<template>
<main>
<header>
    <p @click="logOut">SignOut</p>
</header>
<section>
    <div class="instructors">
        <h1>Instruktører</h1>
        <div class="instructors_info">
            <p>name</p>
            <p>id</p>
        </div>

        <instructor v-for="instructor in allInstructor" :name="instructor.name" :id="instructor.id" :all-users="allUsers"/>
    </div>
</section>
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

.instructors {
    display: flex;
    flex-direction: column;
    
    width: 25vw;
    border: solid 2px var(--dark-grey);
}

.instructors_info {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.5rem;
}
</style>