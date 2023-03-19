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
      console.log(this.Etternavn)
      console.log(this.Alder)
      console.log(this.Epost)
      console.log(this.Telefon)
    }
  }
}
</script>

<script setup lang="ts">


</script>

<template>
<form
@submit.prevent="test"
>
  <h1>Kontaktinformasjon</h1>
  <div class="personal-info">
    <Input placeholder="Fornavn" v-model="Fornavn" type="text" width="21.875rem" color="var(--green)"/>
    <Input placeholder="Etternavn" v-model="Etternavn" type="text" width="21.875rem" color="var(--green)"/>
    <Input v-model="Alder" type="date" width="21.875rem" color="green"/>
  </div>
  <div class="contact-info">
    <Input placeholder="Epost" v-model="Epost" type="email" width="37.5rem" color="var(--red)"/>
    <Input placeholder="Telefon" v-model="Telefon" type="number" width="25rem" color="var(--red)"/>
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
  gap: 5.5rem;
}

.age {
  width:21.875rem;
}

.contact-info {
  display: flex;
  flex-direction: row;
  gap: 14rem;
}

</style>