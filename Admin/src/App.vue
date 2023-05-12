<script setup lang="ts">
import Header from './components/header.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { onMounted, ref } from 'vue';

import login from './views/login.vue';
import Admin from './views/admin.vue';

const loggedIn = ref(false)
const signInnPage = ref(true)
const adminPage = ref(false)
const name = ref<string | any>("")

onMounted(()=>{
    onAuthStateChanged(auth, (user)=> {
        if(user) {
            const uid = user.uid;
            if(uid === "1RAh131ORqQPoF7m3E00Uwfj1rz1") {
                adminPage.value = true
                signInnPage.value = false
            } else {
                loggedIn.value = true
                signInnPage.value = false
                adminPage.value = false
            }

            name.value = user.displayName
        } else {
            loggedIn.value = false
            signInnPage.value = true
            adminPage.value = false
        }
    })
})

</script>

<template>
<Header :user-name="name" v-if="loggedIn"/>


<login v-if="signInnPage"/>
<Admin v-if="adminPage" />
<RouterView v-if="loggedIn"/>
</template>