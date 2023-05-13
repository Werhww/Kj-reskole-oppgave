<script setup lang="ts">
import { auth, db} from '@/firebase/firebase';
import { createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'; 
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ref } from 'vue';

const props = defineProps<{
    mail: string
    password: string
}>()

const emit = defineEmits(['avbryt'])

const loginInfo = ref({
    name: "",
    mail: "",
    password: ""
})

const instructorRef = collection(db, "instructors")

async function createUser() {
    const instructor = await createUserWithEmailAndPassword(auth, loginInfo.value.mail, loginInfo.value.password)
    updateProfile(instructor.user, {
        displayName: loginInfo.value.name
    })
    signOut(auth)

    setDoc(doc(instructorRef, instructor.user.uid), {
        name: loginInfo.value.name
    })


    signInWithEmailAndPassword(auth, props.mail, props.password)
    emit('avbryt')
}

</script>

<template>
<div class="new-instructor-popup">
    <h1>Ny instructor</h1>
    <div>
        <label for="name">Navn</label>
        <input type="text" id="name" placeholder="Navn" v-model="loginInfo.name">
    </div>
    <div>
        <label for="mail">Epost</label>
        <input type="mail" id="mail" placeholder="Epost" v-model="loginInfo.mail">
    </div>
    <div>
        <label for="password">Passord</label>
        <input type="password" id="password" placeholder="Passord" v-model="loginInfo.password">
    </div>
    <button @click="createUser">Lag bruker</button>
    <button @click="$emit('avbryt')">avbryt</button>
</div>
<div class="background"><!-- Background blur --></div>
</template>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.3);
}

.new-instructor-popup{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    gap: 1rem;

    padding: 1.5rem 3rem;
    border-radius: 1rem;

    z-index: 1;
}

.new-instructor-popup > div{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

</style>