<script setup lang="ts">
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';

const props = defineProps<{
    userName: string | null,
}>()

function logout() {
    signOut(auth)
}
</script>

<template>
<header>
    <p @click="logout" class="signOut">Sign Out</p>
    <router-link to="/chat"><img src="../assets/chat.svg"></router-link>
    <router-link to="/">{{ userName }}</router-link>
</header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    padding: 1.75rem 4.625rem;
    gap: 2.125rem;
}

header a:last-child {
    font-size: 2.5rem;
    padding: 0.625rem 4.375rem;
    background-color: var(--red);
    color: white;
    font-family: 'Iceberg', cursive;
    text-decoration: none;
}

p {
    align-self: center;
}

.signOut {  
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--grey);
    cursor: pointer;
}
</style>

<style scoped>
@media only screen and (max-width: 1280px) {
    header {
        padding: 1.75rem 0.5rem;
    }
}
</style>