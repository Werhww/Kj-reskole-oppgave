<script lang="ts">
import Offer from "@/components/offer.vue"
import Input from "@/components/input.vue"

export default {
  expose: ['License_Container'],
  components: { Input },
  data() {
    return {
      /* User personal information */
      Fornavn: '',
      Etternavn: '',
      Alder: 0,
      Epost: '',
      Telefon: '98-876-543',

      /* Traning alredy done */
      Trafical: false,
      Night_Training: false,

      /* License */
      Personal_Car: false,
      Light_motocycle: false,
      Medium_heavy_motocycle: false,
      Heavy_motocycle: false,
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

    /* Toggel alredy done training */
    toggelTrained (e:any) {
      const element = e.target.parentElement
      const classList = element.classList

      console.log(element)
      const trained = element.getAttribute('data-trained-type')
      if(trained) {
        console.log(trained)        
        if(trained == "trafical") {
          this.Trafical?classList.remove('active'):classList.add('active')
          this.Trafical?this.Trafical = false:this.Trafical = true
        } else if(trained == "nightTraning") {
          this.Night_Training?classList.remove('active'):classList.add('active')
          this.Night_Training?this.Night_Training = false:this.Night_Training = true
        }
        return
      }
    },

    /* Toggel license */
    toggelLicense (e:any) {
      var element = e.target.parentElement
      var classList = element.classList

      if(!classList.value) {
        var element = e.target.parentElement.parentElement
        var classList = element.classList
      }

      const license = element.getAttribute('data-license')
      if(license) {
        if(license == "B") {
          this.Personal_Car?this.everyLicenseFalse():this.everyLicenseFalse();this.Personal_Car = true
          this.Personal_Car?classList.add('active'):classList.remove('active')
        } else if(license == "A1") {
          this.Light_motocycle?this.everyLicenseFalse():this.everyLicenseFalse();this.Light_motocycle = true
          this.Light_motocycle?classList.add('active'):classList.remove('active')
        } else if(license == "A2") {
          this.Medium_heavy_motocycle?this.everyLicenseFalse():this.everyLicenseFalse();this.Medium_heavy_motocycle = true
          this.Medium_heavy_motocycle?classList.add('active'):classList.remove('active')
        } else if(license == "A") {
          this.Heavy_motocycle?this.everyLicenseFalse():this.everyLicenseFalse();this.Heavy_motocycle = true
          this.Heavy_motocycle?classList.add('active'):classList.remove('active')
        } 
      }
    },

    everyLicenseFalse() {
      const license = this.$refs['License_Container'] as HTMLDivElement

      console.log(license.childNodes)

      const licenseArray = Array.from(license.childNodes)

      console.log(licenseArray[5])

      for (let i = 1; i < 5; i++) {
        const element:any = licenseArray[i];
        console.log(element)
        element.classList.remove('active')
      }
      
      this.Personal_Car = false
      this.Light_motocycle = false
      this.Medium_heavy_motocycle = false
      this.Heavy_motocycle = false
    },
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

const cancel = () => {
 window.location.href = '/'
}
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
    <div class="already-done-container trafical"  @click="toggelTrained($event)" data-trained-type="trafical">
      <img src="../assets/carClass.svg" alt="Trafikalt Grunnkurs">
      <p>Trafikalt grunnkurs</p>
    </div>
    <div class="already-done-container "  @click="toggelTrained($event)" data-trained-type="nightTraning">
      <img src="../assets/darkNight.svg" alt="Mørkekjøring">
      <p>Mørkekjøring</p>
    </div>
  </div>
  <h1>Hva skal du lære?</h1>
  <div class="want-to-learn" ref="License_Container">
    <Offer v-for="item in offers" :img-link="item.imgLink" :offer="item.offer" class="want-to-learn-item"  :data-license="item.meta_data" @click="toggelLicense($event)"/> 
  </div>

  <div class="Buttons">
    <button type="button" class="cancel" @click="cancel">Avbryt</button>
    <button type="submit" class="submit">Send Inn</button>
  </div>
  
</form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6.25rem;
  gap: 5rem;
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

.Buttons {
  display: flex;
  gap: 35rem;
}

.Buttons button{
  border: none;
  border-radius: 1.25rem;
  color: white;
  cursor: pointer;

  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 3rem;
}

.cancel {
  padding: 0.3rem 6rem 0.3rem 1.5rem;
  background-color: var(--red);
}

.submit {
  padding: 0.3rem 1.5rem 0.3rem 5rem;
  background-color: var(--green);
}
</style>