<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header.vue'
</script>

<template>
  <Header user-name="Leo" />

  <RouterView />
</template>

<style scoped>
</style>
