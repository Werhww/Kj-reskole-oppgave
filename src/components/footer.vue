<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
<footer>
    <div class="content">
        <div class="colume1">
            <div>
                <RouterLink to="/"><img src="../assets/logo.svg" alt="Logo" class="logo"></RouterLink>
                <h1>Trafikkskole</h1>
            </div>
            <p>Rask & Tidig</p>
            <a href="https://maps.app.goo.gl/5WPVkvrCbqeiDL6u8" target="_blank">Lungegårdskaien 40, 5015 Bergen</a>
            <a href="tel:+4755189240">+47 55 18 92 40</a>
            <a href="mailto:post@rask.no">post@rask.no</a>
        </div>
        <div class="colume2">
            <a href="#topAnchor">Til Top</a>
            <RouterLink to="/Bruker">Min side</RouterLink>
            <RouterLink to="/omoss">Booking</RouterLink>
        </div>
    </div>
</footer>
</template>

<style scoped>
footer {
    background-color: var(--red);
    color: white;
    margin-top: 5rem;
}

.content {
    display: flex;
    justify-content: space-around;
    align-items: start;
    padding: 2rem 0;
}

/* Colume 1 */
.colume1 {
    display: flex;
    flex-direction: column;
    gap: .3rem;
}

.colume1 > div {
    display: flex;
    align-items: center;
    gap: 0.688rem;
}

.logo {
    height: 5rem;
}

.colume1 > div > h1 {
    font-family: 'Iceberg', cursive;
    padding-top: 2rem;
}

.colume1 > a  {
    font-size: 1.5rem;
    color: white;
}

.colume1 > p  {
    font-size: 1.5rem;
    font-weight: 300;
}

.colume2 {
    display: flex;
    flex-direction: column;
    gap: .3rem;
    padding-top: 2.5rem;
}

.colume2 a{
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
}
</style>

<!-- Meida Querie -->
<style scoped>
@media only screen and (max-width: 600px) {
    /* Colume 1 */
    .logo {
        height: 1.75rem;
    }

    .colume1 > div > h1 {
        padding-top: 0.5rem;
        font-size: 1rem;
    }

    .colume1 > a  {
        font-size: 0.688rem;
    }

    .colume1 > p  {
        font-size: 0.688rem;
    }

    .colume2 a{
        font-size: 0.688rem;
    }
}
</style>