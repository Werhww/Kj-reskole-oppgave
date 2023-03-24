<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>

<template>
  <a id="topAnchor"></a>
  <Header />

  <RouterView />

  <Footer />
</template>

<style scoped>

</style>
