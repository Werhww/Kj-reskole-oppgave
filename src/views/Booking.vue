<script lang="ts">
import Offer from "@/components/offer.vue"
import Input from "@/components/input.vue"
import { V_SHOW } from "@vue/compiler-dom";

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
      console.log(this.Trafical + " Trafical")
      console.log(this.Night_Training + " Night_Training")
      console.log(this.Personal_Car + " Personal_Car")
      console.log(this.Light_motocycle + " Light_motocycle")
      console.log(this.Medium_heavy_motocycle + " Medium_heavy_motocycle")
      console.log(this.Heavy_motocycle + " Heavy_motocycle")
    },

    /* Toggel alredy done training */
    toggelTrained (e:any) {
      const element = e.target.parentElement
      const classList = element.classList

      const trained = element.getAttribute('data-trained-type')
      if(trained) {      
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
          this.Personal_Car?this.everyLicenseFalse():this.everyLicenseFalse();this.Personal_Car = true;classList.add('active')
        } else if(license == "A1") {
          this.Light_motocycle?this.everyLicenseFalse():this.everyLicenseFalse();this.Light_motocycle = true;classList.add('active')
        } else if(license == "A2") {
          this.Medium_heavy_motocycle?this.everyLicenseFalse():this.everyLicenseFalse();this.Medium_heavy_motocycle = true;classList.add('active')
        } else if(license == "A") {
          this.Heavy_motocycle?this.everyLicenseFalse():this.everyLicenseFalse();this.Heavy_motocycle = true;classList.add('active')
        } 
      }
    },

    everyLicenseFalse() {
      const license = this.$refs['License_Container'] as HTMLDivElement

      const licenseArray = Array.from(license.childNodes)

      for (let i = 1; i < 5; i++) {
        const element:any = licenseArray[i];
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
      <Input placeholder="Fornavn" v-model="Fornavn" type="text" color="var(--green)" class="personal-info-input"/>
      <Input placeholder="Etternavn" v-model="Etternavn" type="text" color="var(--green)" class="personal-info-input"/>
      <Input v-model="Alder" type="date" color="var(--green)" class="personal-info-input"/>
    </div>
    <div class="contact-info">
      <Input placeholder="Epost" v-model="Epost" type="email" color="var(--red)" class="contact-info-epost"/>
      <Input placeholder="Telefon" v-model="Telefon" type="number" color="var(--red)" class="contact-info-tlf"/>
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

.personal-info-input {
  width: 21.875rem;
}

.contact-info {
  display: flex;
  flex-direction: row;
  gap: 14rem;
}

.contact-info-epost {
  width: 37.5rem;
}

.contact-info-tlf {
 width: 25rem;
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
  justify-content: space-between;
  width: 70%;
}

.Buttons button{
  border: none;
  border-radius: 1.25rem;
  color: white;
  cursor: pointer;

  font-family: 'Inter', sans-serif;
  font-weight: 500;
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

<style scoped>
@media only screen and (max-width: 1300px) {
  .personal-info-input {
    width: 17rem;
  }

  .contact-info-epost {
    width: 28rem;
  }

  .contact-info-tlf {
    width: 20rem;
  }

  .already-done-container img{
    width: 25rem;
  }

  .Buttons {
    width: 95%;
  }
}

@media only screen and (max-width: 1000px) {
  .personal-info {
    gap: 3rem;
  }

  .personal-info-input {
    width: 16rem;
  }

  .contact-info {
    gap: 7rem;
  }

  .contact-info-epost {
    width: 28rem;
  }

  .contact-info-tlf {
    width: 20rem;
  }

  .already-done {
    flex-direction: column;
    gap: 5rem;
  }

  .already-done-container img{
    width: 35rem;
  }

  .Buttons button {
    font-size: 2.25rem;
  }
}

@media only screen and (max-width: 900px) {
  .personal-info {
    gap: 3rem;
  }

  .personal-info-input {
    width: 13rem;
  }

  .contact-info {
    gap: 7rem;
  }

  .contact-info-epost {
    width: 23rem;
  }

  .contact-info-tlf {
    width: 15rem;
  }

}



@media only screen and (max-width: 700px) {
  .personal-info, .contact-info{
    gap: 1.875rem;
    flex-direction: column;
  }

  .personal-info-input, .contact-info-epost, .contact-info-tlf {
    width: 35rem;
  }

  .already-done-container img{
    width: 20rem;
  }
}

@media only screen and (max-width: 600px) {
  .personal-info-input, .contact-info-epost, .contact-info-tlf {
    width: 21.875rem;
  }

  .already-done-container img{
    width: 18.75rem;
  }

  .Buttons {
    flex-direction: column;
    gap: 2rem;
  }

  .Buttons button{
    padding: 0;
  }
}
</style>