<script setup lang="ts">
import Button from "@/components/button.vue";
</script>

<template>
<main>
    <section>
        <div class="kurs_top">
            <div>
                <H1>Kurs</H1>
                <a id="list"></a>
            </div>
            <Button text="Tilbake" color="var(--red)"></Button>
        </div>
    </section>
    <section>

    </section>
</main>
</template>

<style scoped>
.kurs_top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}
</style>