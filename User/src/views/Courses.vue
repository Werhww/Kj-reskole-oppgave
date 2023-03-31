<script setup lang="ts">
import Button from "@/components/button.vue";
import Title from "@/components/title.vue";
</script>

<template>
<main>
    <section>
        <Title text="Kurs" color="var(--red)" anchor-i-d="list" />
        
    </section>
    <section>
        <Title text="Prestasjonene" color="var(--green)" anchor-i-d="achievements" />
    </section>
</main>
</template>

<style scoped>
.kurs_top{
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.kurs_top h1{
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--red);
}

.kurs_title{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.kurs_title > div:not(:first-child) {
    height: 5px;
    background-color: var(--red);
    border-radius: 5rem;
}
</style>