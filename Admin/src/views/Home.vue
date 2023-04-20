<script setup lang="ts">
import Underline from '@/components/underline.vue';
</script>

<template>
<main>
    <section>
        <div>
            <h1>Min elever</h1>
            <Underline color="var(--red)" />
            <div class="students_info">
                <p>Elev</p>
                <p>Neste kurs</p>
                <p>Hidden text</p><!-- This is hidden to even out teh bar -->
            </div>
        </div>
    </section>
</main>
</template>

<style scoped>
h1 {
    color: var(--red);
    font-size: 2.5rem;
    font-weight: 600;
}
</style>

<!-- Students / top part -->
<style setup>
.students_info {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.5rem;
}

.students_info p {
    font-size: 1.5rem;
    font-weight: 500;
}

.students_info p:last-child {
    /* Hidden element to even out info bar */
    opacity: 0;
    user-select: none;
}

</style>