<script setup lang="ts">
import { auth } from '@/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';

const emits = defineEmits(['login'])

const mail = ref('')
const password = ref('')

const msg = ref('')

async function login() {
    try {
        emits('login', mail.value, password.value)
        await signInWithEmailAndPassword(auth, mail.value, password.value)
    } catch(error) {
        msg.value = `${error}`

        setTimeout(()=>{
            msg.value = ""
        }, 3000)
    }
}
</script>

<template>
<main>
    <h1>Login</h1>
    <div>
        <label for="mail">Epost</label>
        <input type="mail" id="mail" placeholder="Epost" v-model="mail">
    </div>
    <div>
        <label for="password">Passord</label>
        <input type="password" id="password" placeholder="Passord" v-model="password">
    </div>
    <button @click="login">Login</button>

    <p>{{ msg }}</p>
</main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;
    gap: 1rem;

    height: 40vh;
}

main > div{
    display: flex;
    flex-direction: column;

    gap: .3rem;

    padding: auto;
}

h1 {
    font-weight: 700;
    font-size: 3rem ;
}

label {
    font-size: 1.25rem;
    font-weight: 500;
}

input {
    font-size: 1.25rem;
}
</style>