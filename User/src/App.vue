<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/header.vue'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
const router = useRouter()

watch(router.currentRoute, () => {
  const user = auth.currentUser
  if (user) {
    return
  } else {
    router.push('/login')
  }

})

const loggedIn = ref(false)

onAuthStateChanged(auth, (user) => {
  if (user) {
    router.push('/')
    loggedIn.value = true
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <Header user-name="Leo" v-if="loggedIn"/>

  <RouterView />
</template>

<style scoped>
</style>
