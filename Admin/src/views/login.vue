<script setup lang="ts">
import { auth } from '@/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const mail = ref('')
const password = ref('')


async function login() {
    await signInWithEmailAndPassword(auth, mail.value, password.value)
    router.push('/')
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