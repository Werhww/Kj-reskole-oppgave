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
      Trafical: false,
      Night_Training: false,
    }
  },
  methods: {
    test () {
      console.log(this.Fornavn)
      console.log(this.Etternavn)
      console.log(this.Alder)
      console.log(this.Epost)
      console.log(this.Telefon)
    },

    toggelOpacity (e:any) {
      const element = e.target.parentElement
      const classList = element.classList
      let trained = element.getAttribute('data-trained-type')
      if(trained) {
        console.log(trained, element)        
        if(trained == "trafical") {
          this.Trafical?classList.remove('active'):classList.add('active')
          this.Trafical?this.Trafical = false:this.Trafical = true
        } else if(trained == "nightTraning") {
          this.Night_Training?classList.remove('active'):classList.add('active')
          this.Night_Training?this.Night_Training = false:this.Night_Training = true
        }
      }
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
    <Input v-model="Alder" type="date" width="21.875rem" color="var(--green)"/>
  </div>
  <div class="contact-info">
    <Input placeholder="Epost" v-model="Epost" type="email" width="37.5rem" color="var(--red)"/>
    <Input placeholder="Telefon" v-model="Telefon" type="number" width="25rem" color="var(--red)"/>
  </div>
  <h1 >Hva har du gjort?</h1>
  <div class="already-done">
    <div class="already-done-container trafical"  @click="toggelOpacity($event)" data-trained-type="trafical">
      <img src="../assets/carClass.svg" >
      <p>Trafikalt grunnkurs</p>
    </div>
    <div class="already-done-container "  @click="toggelOpacity($event)" data-trained-type="nightTraning">
      <img src="../assets/darkNight.svg" >
      <p>Mørkekjøring</p>
    </div>
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

.already-done{
  display: flex;
  flex-direction: row;
  gap: 11.875rem;
}

.already-done-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  opacity: 60%;
  transition: 0.3s;
}

.already-done-container img{
  width: 31.25rem;
}

.already-done-container p{
  font-size: 2.25rem;
  color: var(--green);
}

.already-done-container:hover {
  opacity: 100%;
  cursor: pointer;
}

.active {
  opacity: 100%;
}

</style>