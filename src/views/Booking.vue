<script lang="ts">
import Offer from "@/components/offer.vue"
import Input from "@/components/input.vue"

export default {
  components: { Input },
  data() {
    return {
      Fornavn: '',
      Etternavn: '',
      Alder: 0,
      Epost: '',
      Telefon: 0, 
    }
  },
  methods: {
    test () {
      console.log(this.Fornavn)
      console.log(this.Alder)
    }
  }
}
</script>

<script setup lang="ts">
import { ref } from "vue"

</script>

<template>
<form
@submit.prevent="test"
>
  <h1>Kontaktinformasjon</h1>
  <div class="personal-info">
    <Input placeholder="Fornavn" v-model="Fornavn" type="text"/>
    <Input placeholder="Fornavn" v-model="Etternavn" type="text"/>
    <select v-model="Alder">
      <option v-for="i in 100" :value="i">{{ i }} År</option>
    </select>
  </div>

  <button>Test</button>
</form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--green);
}

.personal-info {
  display: flex;
  flex: 1 1 160px;
  gap: 5.5rem;
}
</style>