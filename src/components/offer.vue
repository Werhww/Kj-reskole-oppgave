<script setup lang="ts">
const props = defineProps<{
  imgLink?: string,
  offer?: string,
}>()
</script>

<template>
<div class="tilbud-container">
  <div><img v-bind:src="imgLink" :alt="offer"></div>
  <p>{{ offer }}</p>
</div>
</template>

<style scoped>
.tilbud-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.tilbud-container > div {
  background-color: #D9D9D9;
  border-radius: 5rem;
  width: 10.875rem;
  height: 10.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tilbud-container > div > img{
  width: 9.5rem;
}

.tilbud-container > p {
  font-size: 1.5rem;
  text-align: center;
}
</style>

<style scoped>
@media only screen and (max-width: 600px) {

  .tilbud-container > div {
    width: 7.5rem;
    height: 7.5rem;
  }

  .tilbud-container > div > img{
    width: 6.875rem;
  }

  .tilbud-container > p {
    font-size: 1rem;
  }
}
</style>