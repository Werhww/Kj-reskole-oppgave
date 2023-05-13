<script setup lang="ts">
import Header from './components/header.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { onMounted, ref } from 'vue';

import login from './views/login.vue';

const loggedIn = ref(false)
const signInnPage = ref(true)
const name = ref<string | any>("")

onMounted(()=>{
    onAuthStateChanged(auth, (user)=> {
        if(user) {
            loggedIn.value = true
            signInnPage.value = false

            name.value = user.displayName
        } else {
            loggedIn.value = false
            signInnPage.value = true
        }
    })
})

</script>

<template>
<Header :user-name="name" v-if="loggedIn"/>

<login v-if="signInnPage"/>
<RouterView v-if="loggedIn"/>
</template>