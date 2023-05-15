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

const name = ref<string>('')
const loggedIn = ref(false)

onAuthStateChanged(auth, (users) => {
  if (users) {
    loggedIn.value = true
    name.value = users.displayName!
    router.push('/')
  } else {
    router.push('/login')
    loggedIn.value = false
  }
})
</script>

<template>
  <Header :user-name="name" v-if="loggedIn"/>

  <RouterView />
</template>

<style scoped>
</style>
