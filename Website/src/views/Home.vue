<script setup lang="ts">
import Employee from '@/components/employee.vue'
import Offer from '@/components/offer.vue'
import Prices from '@/components/prices.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const offers = [
  {
    imgLink: '/src/assets/offers/personbil.svg',
    offer: 'Personbil (B)',
  },
  {
    imgLink: '/src/assets/offers/A1.svg',
    offer: 'Lett Motorsykkel (A1)',
  },
  {
    imgLink: '/src/assets/offers/A2.svg',
    offer: 'Mellomtung Motorsykkel (A2)',
  },
  {
    imgLink: '/src/assets/offers/A.svg',
    offer: 'Tung Motorsykkel (A)',
  },
]

const employees = [
  {
    imgLink: '/src/assets/employee/Jonson.svg',
    name: 'Jonson Jones',
    tilbud: 'A + A1 + A2',
    tlf: '94356329',
    mail: 'jonson@rask.no',
  },

  {
    imgLink: '/src/assets/employee/Petra.svg',
    name: 'Petra Pelkan',
    tilbud: 'B + A + A1 + A2',
    tlf: '94353546',
    mail: 'petra@rask.no',
  },

  {
    imgLink: '/src/assets/employee/Even.svg',
    name: 'Even Egonsen',
    tilbud: 'B + A + A1 + A2',
    tlf: '94354529',
    mail: 'even@rask.no',
  },

  {
    imgLink: '/src/assets/employee/guril.svg',
    name: 'Guril Pelkan',
    tilbud: 'AM + S + C1 + T',
    tlf: '99642029',
    mail: 'guril@rask.no',
  },
]

const general_prices = [
  {
    name: "Trafikalt grunnkurs (Sommerhalvåret - med førstehjelp)",
    price: "1.850",
  },
  {
    name: "Trafikalt grunnkurs (Vinterhalvåret - med mørkekjøring og førstehjelp)",
    price: "3.700",
  },
  {
    name: "Trafikant i mørket (mørkekjøring)",
    price: "1.850",
  },
  {
    name: "Førstehjelpkurs",
    price: "850",
  }
]

const personalCar_prices = [
  {
    name: "Kjøretime",
    price: "740",
  },
  {
    name: "Grunnkurs",
    price: "1550",
  },
  {
    name: "Sikkerhetskurs på bane (glattkjøring)",
    price: "4.550",
  },
  {
    name: "Sikkerhetskurs på vei",
    price: "4.900",
  },
  {
    name: "Trinnvurdering trinn 2 - 3",
    price: "2.550",
  }
]

const motorcycle_prices = [
{
    name: "Kjøretime",
    price: "990",
  },
  {
    name: "MC - Grunnkurs",
    price: "1550",
  },
  {
    name: "Sikkerhetskurs på bane",
    price: "5.235",
  },
  {
    name: "Sikkerhetskurs på vei",
    price: "4.900",
  },
  {
    name: "Trinnvurdering trinn 2 - 3",
    price: "2.000",
  }
]
</script>

<template>
  <main>
    <!-- Første container med litt tekst om selskapet -->
    <div class="container1">
      <div>
        <h1>Kjøreskolen for <span>alle</span></h1>
        <p>Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      </div>
      <img src="../assets/car.svg" alt="car drawing">
    </div>

    <!-- Viser alle tilbudene til kjøreskolen -->
    <div class="tilbud">
      <h2>Hva vi tilbyr:</h2>
      <div class="tilbud-bilder">
        <Offer v-for="item in offers" :img-link="item.imgLink" :offer="item.offer" class="tilbud-item"/> 
      </div>
    </div>

    <!-- Bestill time -->
    <div class="bestill">
      <div class="bestill-text">
        <h1>Start å kjøre <span>nå!</span></h1>
        <p>Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <button @click="router.push('/booking')">Bestill time</button>
      </div>
      <img src="../assets/Bestill.svg" alt="Bestill">
    </div>

    <!-- Ansatte -->
    <div class="ansatte">
      <h2>Våre Ansatte:</h2>
      <div class="ansatte-container">
        <Employee v-for="item in employees" :img-link="item.imgLink" :name="item.name" :tilbud="item.tilbud" :tlf="item.tlf" :mail="item.mail" class="assatte-item"/>
      </div>
    </div>

    <div class="prices_container">
      <!--General Prices -->
      <div class="price">
        <h2>Generelle kurs</h2>
        <div>
          <Prices v-for="i in general_prices" :name="i.name" :price="i.price"/>
        </div>
      </div>

      <!--Personal car Prices -->
      <div class="price">
        <h2>Prisliste klasse B – personbil (manuell og automat)</h2>
        <div>
          <Prices v-for="i in personalCar_prices" :name="i.name" :price="i.price"/>
        </div>
      </div>

      <!--Motorcycle Prices -->
      <div class="price">
        <h2>Prisliste klasse A, A1, A2</h2>
        <div>
          <Prices v-for="i in motorcycle_prices" :name="i.name" :price="i.price"/>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.prices_container{
  display: flex;
  flex-direction: column;
  gap: 7.375rem;
}

.price{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.75rem;
}

.price > div{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

main {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

h1 {
  font-size: 2.25rem;
  font-family: 'Iceberg', cursive;
}

h2 {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--green);
  font-family: 'Inter', sans-serif;
  text-align: center;
}

/* Landing content */
.container1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5.625rem;
}

.container1 > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.container1 > div > h1 > span {
  color: var(--red);
  text-decoration: underline;
  font-family: 'Iceberg', cursive;
}

.container1 > div > p {
  width: 28rem;
  font-size: 1.25rem;
}


/* Tilbud */
.tilbud {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}


.tilbud-bilder {
  display: flex;
  gap: 4.35rem;
  flex-wrap: wrap;
}

.tilbud-item{
  flex: 1 1 175px;
}


/* Bestill */
.bestill{
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5.625rem;
  align-items: center;
}

.bestill-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 32.813rem;
}

.bestill-text > h1 {
  align-self: flex-start;
}

.bestill-text > h1 > span {
  color: var(--red);
  text-decoration: underline;
  font-family: 'Iceberg', cursive;
}

.bestill-text > p {
  font-size: 1.25rem;
  width: 28rem;
  align-self: start;
}

.bestill-text > button {
  background-color: var(--green);
  border: none;
  border-radius: 1rem;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  padding: 1rem 10rem 1rem 10rem;
}


/* Ansatte */
.ansatte {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.ansatte-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8.75rem;
}

.assatte-item {
  flex: 1 1 300px;
}
</style>

<!-- Media Queries -->
<style scoped>
@media only screen and (max-width: 900px) {
  .container1{
   gap: 0;
  }


  .container1 > div > p, .bestill-text, .bestill-text > p {
    width: 19.875rem;
  }

  .container1 > img {
    width: 22.5rem;
  }

  .bestill {
    gap: 0;
  }

  .bestill > img {
    width: 22.5rem;
  }

  .bestill-text > button {
    border-radius: 1rem;
    font-size: 1.25rem;
    padding: 1rem 5rem 1rem 5em;
  }

  /* Ansatte */
  .ansatte {
    gap: 1rem;
  }

  .ansatte a {
    font-size: 2.5rem;
  }

  .ansatte-container {
    gap: 2.5rem;
  }
}

@media only screen and (max-width: 700px) {
  .tilbud-item{
    flex: 1 1 100px;
  }

  .assatte-item {
    flex: 1 60px;
  }
}

@media only screen and (max-width: 600px) {
  /* landing page container */
  main {
    margin-top: 1.5rem;
    gap: 2.5rem;
  }
  
  .container1 {
    flex-direction: column;
    gap: 0;
  }

  .bestill > img {
    width: 19.875rem;
  }


  .container1 > div > p, .bestill-text > p {
    font-size: 1rem;
  }

  /* Tilbud */
  .tilbud > a {
    font-size: 1.25rem;
  }

/* Bestill */
  .bestill{
    flex-direction: column;
    gap: 1.5rem;
  }

  .bestill-text {
    gap: .5rem;
  }

  .bestill-text > button {
    border-radius: .5rem;
    font-size: 0.875rem;
    padding: .5rem 3rem .5rem 3rem;
  }
}
</style>