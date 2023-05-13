<script setup lang="ts">
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import login from './components/login.vue';
import admin from './components/admin.vue';
import { onMounted, ref } from 'vue';

const loggedIn = ref(false)

const loginInfo = ref({
  mail: "",
  password: ""
})

function loginEmit(mail:string, password:string) {
  loginInfo.value.mail = mail
  loginInfo.value.password = password
}

onMounted(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;

      if(uid == '1RAh131ORqQPoF7m3E00Uwfj1rz1') {
        loggedIn.value = true
      }
    } else {
      loggedIn.value = false
    }
  })
})
</script>

<template>
<login v-if="!loggedIn" v-on:login="loginEmit"/>
<admin v-if="loggedIn" :login-info="loginInfo"/>
</template>

<style scoped>

</style>
