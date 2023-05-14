<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/header.vue'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { user } from './firebase/store'; 
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

watch(user, (newValue) => {
  name.value = newValue.name
})

onAuthStateChanged(auth, (users) => {
  if (users) {
    router.push('/')
    loggedIn.value = true
    name.value = user.value.name
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
