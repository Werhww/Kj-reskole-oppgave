<script setup lang="ts">
import Offer from "@/components/offer.vue"
import Input from "@/components/input.vue"
import { ref } from "vue"
import { db, auth } from '@/firebase/firebase'
import { collection, setDoc, doc } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"

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

function cancel() {
  window.location.href = '/'
}

const offerList = ref<HTMLInputElement | null>(null)

/* Personal info */
const Fornavn = ref('')
const Etternavn = ref('')
const Alder = ref('')
const Epost = ref('')
const Telefon = ref('')

/* Traning done */
const Trafical:any = ref(false)
const Night_Training:any= ref(false)

/* Diffrent types off license */
const Personal_Car = ref(false)
const Light_motocycle = ref(false)
const Medium_heavy_motocycle = ref(false)
const Heavy_motocycle = ref(false)

/* Data til database */
const formData = ref({
  name: '',
  age: '',
  mail: '',
  phone: '',
  license: '',
  trafical: false,
  nightTraining: false,
  mainInstructor: ""
})

const errorMsg = ref<any>('')

const formSendt = ref(false)

const userRef = collection(db, "users")


async function sendForm() {
  if(!Fornavn.value || !Etternavn.value || !Alder.value || !Epost.value || !Telefon.value) {
    alert('Fyll inn kontakt info')
    return
  }

  let license:string 

  if(Heavy_motocycle.value == true) {
    license = "A"
  } else if(Medium_heavy_motocycle.value == true) {
    license = "A2"
  } else if(Light_motocycle.value == true) {
    license = "A1"
  } else if(Personal_Car.value == true) {
    license = "B"
  } else {
    alert('Velg førerkort')
    return
  }

  formData.value.name = Fornavn.value + " " + Etternavn.value
  formData.value.age = Alder.value
  formData.value.mail = Epost.value
  formData.value.phone = Telefon.value
  formData.value.license = license
  formData.value.trafical = Trafical.value
  formData.value.nightTraining = Night_Training.value
  try {
    const user = await createUserWithEmailAndPassword(auth, Epost.value, Telefon.value)
    const userId = user.user.uid

    setDoc(doc(userRef, userId), formData.value)

    errorMsg.value = 'Form sendt!'
  } catch (error) {
    errorMsg.value = error

    setTimeout(() => {
      errorMsg.value = ''
    }, 5000);
  }

}

/* Toggels all license and change them to false */
function everyLicenseFalse () {
  const license = offerList.value?.children

  for (let i = 0; i < 4; i++) {
    const element:any = license?.item(i);
    element.classList.remove('active')
  }
  
  Personal_Car.value = false
  Light_motocycle.value = false
  Medium_heavy_motocycle.value = false
  Heavy_motocycle.value = false
}

/* Toggel Trained */
function toggelTrained (e:any) {
  const element = e.target.parentElement
  const classList = element.classList

  const trained = element.getAttribute('data-trained-type')
  if(trained) {      
    if(trained == "trafical") {
      Trafical.value?classList.remove('active'):classList.add('active')
      Trafical.value?Trafical.value = false:Trafical.value = true
    } else if(trained == "nightTraning") {
      Night_Training.value?classList.remove('active'):classList.add('active')
      Night_Training.value?Night_Training.value = false:Night_Training.value = true
    }
    return
  }
}

/* Toggel license */
function toggelLicense (e:any) {
  var element = e.target.parentElement
  var classList = element.classList

  if(!classList.value) {
    var element = e.target.parentElement.parentElement
    var classList = element.classList
  }

  const license = element.getAttribute('data-license')
  if(license) {
    if(license == "B") {
      Personal_Car?everyLicenseFalse():everyLicenseFalse();Personal_Car.value = true;classList.add('active')
    } else if(license == "A1") {
      Light_motocycle?everyLicenseFalse():everyLicenseFalse();Light_motocycle.value = true;classList.add('active')
    } else if(license == "A2") {
      Medium_heavy_motocycle?everyLicenseFalse():everyLicenseFalse();Medium_heavy_motocycle.value = true;classList.add('active')
    } else if(license == "A") {
      Heavy_motocycle?everyLicenseFalse():everyLicenseFalse();Heavy_motocycle.value = true;classList.add('active')
    } 
  }
}
</script>

<template>
<form
@submit.prevent="sendForm"
>
  <div class="container1">
    <h1>Kontaktinformasjon</h1>
    <div class="personal-info">
      <Input placeholder="Fornavn" v-model="Fornavn" type="text" color="var(--green)" class="personal-info-input"/>
      <Input placeholder="Etternavn" v-model="Etternavn" type="text" color="var(--green)" class="personal-info-input"/>
      <Input placeholder="Alder" v-model="Alder" onfocus="(this.type='date')" type="text" color="var(--green)" class="personal-info-input"/>
    </div>
    <div class="contact-info">
      <Input placeholder="Epost" v-model="Epost" type="email" color="var(--red)" class="contact-info-epost"/>
      <Input placeholder="Telefon" v-model="Telefon" type="text" color="var(--red)" class="contact-info-tlf"/>
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
  <div class="want-to-learn" ref="offerList">
    <Offer v-for="item in offers" :img-link="item.imgLink" :offer="item.offer" class="want-to-learn-item"  :data-license="item.meta_data" @click="toggelLicense($event)"/> 
  </div>

  <div class="Buttons">
    <button type="submit" class="submit" :disabled="formSendt">Send Inn</button>
    <button type="button" class="cancel" @click="cancel">Avbryt</button>
  </div>
  <p>{{ errorMsg }}</p>
  
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
  font-size: 2.25rem;
  padding: 0.3rem 3rem 0.3rem 3rem;
}

.cancel {
  background-color: var(--red);
}

.submit {
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
    padding: 0.2rem 0;
  }
}
</style>