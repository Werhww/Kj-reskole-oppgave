<script setup lang="ts">
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

const props = defineProps<{
    userName: string,
}>()

const admin = ref(false)

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(auth)
    const uid = user.uid;
    if(uid === "1RAh131ORqQPoF7m3E00Uwfj1rz1") {
        admin.value = true
    }
  }
})
</script>

<template>
<header>
    <router-link v-if="admin" to="/admin">admin</router-link>
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
</style>

<style scoped>
@media only screen and (max-width: 1280px) {
    header {
        padding: 1.75rem 0.5rem;
    }
}
</style>