<script lang="ts">
import Offer from "@/components/offer.vue"
import Input from "@/components/input.vue"

export default {
  components: { Input },
  data() {
    return {
      /* User personal information */
      Fornavn: '',
      Etternavn: '',
      Alder: 0,
      Epost: '',
      Telefon: 0,

      /* Traning alredy done */
      Trafical: false,
      Night_Training: false,

      /* License */
      Personal_Car: false,
      Light_motocycle: false,
      Medium_heavy_motocycle: false,
      Heavy_motocycle: false
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
      console.log(element)
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
        return
      }
      let license = element.getAttribute('data-license')
      if(license) {
        console.log(license, element)        
        if(license == "B") {
          this.Personal_Car?classList.remove('active'):classList.add('active')
          this.Personal_Car?this.Personal_Car = false:this.Personal_Car = true

        } else if(license == "A1") {
          this.Light_motocycle?classList.remove('active'):classList.add('active')
          this.Light_motocycle?this.Light_motocycle = false:this.Light_motocycle = true
        } 
      }

    }
  }
}
</script>

<script setup lang="ts">
const offers = [
  {
    imgLink: '/src/assets/offers/personbil.svg',
    offer: 'Personbil (B)',
    meta_data: 'B'
  },
  {
    imgLink: '/src/assets/offers/A1.svg',
    offer: 'Lett Motorsykkel (A1)',
    meta_data: 'A1'
  },
  {
    imgLink: '/src/assets/offers/A2.svg',
    offer: 'Mellomtung Motorsykkel (A2)',
    meta_data: 'A2'
  },
  {
    imgLink: '/src/assets/offers/A.svg',
    offer: 'Tung Motorsykkel (A)',
    meta_data: 'A'
  },
]

</script>

<template>
<form
@submit.prevent="test"
>
  <div class="container1">
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
  </div>
  
  
  <h1>Hva har du gjort?</h1>
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
  <h1>Hva skal du lære?</h1>
  <div class="want-to-learn">
    <Offer v-for="item in offers" :img-link="item.imgLink" :offer="item.offer" class="want-to-learn-item"  :data-license="item.meta_data" @click="toggelOpacity($event)"/> 
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

.container1{
  display: flex;
  flex-direction: column;
  gap: 4.438rem;
  align-items: center;
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

.already-done-container:hover, .want-to-learn-item:hover {
  opacity: 100%;
  cursor: pointer;
}

.want-to-learn {
  display: flex;
  gap: 4.35rem;
  flex-wrap: wrap;
}

.want-to-learn-item{
  flex: 1 1 175px;
  opacity: 60%;
  transition: 0.3s;
}

.active {
  opacity: 100%;
}
</style>