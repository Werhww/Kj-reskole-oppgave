<script setup lang="ts">
const props = defineProps<{
    courseTitle: string;
    amount: string;
    date: string;
    price: string;
    payment?: boolean;
}>()

</script>

<template>
<section>
    <!-- Content -->
    <div class="content">
        <p>{{ courseTitle }} ({{ amount }})</p>
        <p>{{ date }}</p>
        <div>
            <p>{{ price }} kr</p>
            <img v-if="payment == undefined" class="payment_hidden" src="../assets/Course_Unpaid.svg" draggable="false">
            <img v-else-if="payment == false" src="../assets/Course_Unpaid.svg" alt="Unpaid">
            <img v-else src="../assets/Course_Paid.svg" alt="Paid">
        </div>
    </div>
    <div><!-- Underline --></div>
</section>
</template>

<style scoped>
.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
}

.content p {
    font-size: 1.5rem;
}

.content > div{
    display: flex;
    gap: 3.75rem;
}

section {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
}


section > div:not(:first-child) {
    height: 5px;
    background-color: var(--light-grey);
    border-radius: 5rem;
}

.payment_hidden {
    opacity: 0;
    pointer-events: none;
}
</style>