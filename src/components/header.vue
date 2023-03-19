+<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
<header class="header">
    <RouterLink to="/"><img src="../assets/logo.svg" class="logo"></RouterLink>
    <nav>
        <div>
            <RouterLink to="/booking" class="booking">Booking</RouterLink>
            <RouterLink to="/user" class="account">Min Side</RouterLink>
        </div>
    </nav>
</header>
</template>

<style scoped>

.header {
    display: flex;
    justify-content: center;
    padding: 1rem 0 0 0;
    gap: 44.375rem;
}

.logo {
    width: 10rem;
}

.header > nav {
    display: flex;
    align-items: start;
    padding: 1rem 0 0 0 ;
}

.header > nav > div {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.booking {
    font-size: 1.875rem;
    text-decoration: none;
    color: black;
    font-family: 'Iceberg', cursive;
}

.account {
    color: #fff;
    background-color: var(--red);
    font-size: 2.5rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    font-family: 'Iceberg', cursive;
}
</style>

<!-- Media Queries -->
<style scoped>
@media only screen and (max-width: 900px) {
    .header {
        gap: 15rem;
    }    
}

@media only screen and (max-width: 600px) {
    .header {
        gap: 5rem;
    }

    .logo {
        width: 5rem;
    }

    .booking {
        font-size: 1.25rem;
    }

    .account {
        font-size: 1.5rem;
    }

    
}

@media only screen and (max-width: 400px) {
    .header {
        gap: 4rem;
    }

    .logo {
        width: 4rem;
    }
}
</style>