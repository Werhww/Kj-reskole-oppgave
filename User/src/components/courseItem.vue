<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    courseTitle: string;
    amount: string;
    date: string;
    price: string;
    paid?: boolean;

    /* Dropdown content */
    instructor?: string;
    place?: string;
    time?: string;
    comment?: string;
}>()

const isDropdownOpen = ref(false)
const topUnderline = ref<HTMLInputElement | null>(null)

/* opens and hiddes extra dropdown content */
function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
    if (isDropdownOpen.value) {
        topUnderline.value?.classList.add('hiddenOpacity')
    } else {
        topUnderline.value?.classList.remove('hiddenOpacity')
    }
}

</script>

<template>
<section>
    <!-- Inital show items -->
    <div class="top" @click="toggleDropdown"> 
        <!-- Content -->
        <div class="content">
            <p>{{ courseTitle }} ({{ amount }})</p>
            <p>{{ date }}</p>
            <div>
                <p>{{ price }} kr</p>
                <img v-if="paid == undefined" class="payment_hidden" src="../assets/Course_Unpaid.svg" draggable="false">
                <img v-else-if="paid == false" src="../assets/Course_Unpaid.svg" alt="Unpaid">
                <img v-else src="../assets/Course_Paid.svg" alt="Paid">
            </div>
        </div>
        <div class="hover"><!-- Light gray hover transion --></div>
        <div class="underline" ref="topUnderline"><!-- Underline --></div>
    </div>
    <!-- Dropdown content -->
    <div class="dropdown" v-if="isDropdownOpen">
        <div>
            <p>Instruktør: {{ instructor }}</p>
            <div class="place_time">
                <a :href="'https://maps.google.com/?q=' + place" target="_blank">{{ place }}</a>
                <p>{{ time }}</p>
            </div>
            
        </div>
        <div class="comment">
            <p>Kommentar:</p>
            <p>{{ comment }}</p>
        </div>
        
    </div>
    <div class="underline" v-if="isDropdownOpen"><!-- Underline --></div>
</section>
</template>

<style scoped>

.dropdown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-size: 1.5rem;
}

.hidden{
    display: none;
}

.hiddenOpacity{
    opacity: 0;
}

.place_time{
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    color: var(--dark-grey);
}

.place_time *{
    color: var(--dark-grey);
}

.comment{
    display: flex;
    flex-direction: column;
    padding-right: 3rem;
    gap: 0.5rem;
    width: 25%;
}

.comment p:last-child{
    color: var(--dark-grey);
}

section {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.hover{
    position: absolute;
    bottom: 6px;
    left: -1rem;
    width: 102%;
    height: 0%;
    transition: height 0.3s ease-in-out;
    z-index: -1;
    background-color: var(--light-grey);
    border-radius: 3rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.top:hover > .hover {
    height: 100%;
}

.top:hover > .underline{
    opacity: 0;
}

.top:hover{
    cursor: pointer;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
}

.content > p:first-child {
    width: 40%;
}

.content p {
    font-size: 1.5rem;
}

.content > div{
    display: flex;
    gap: 3.75rem;
}

.top {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 0.375rem;
}

.underline {
    height: 5px;
    background-color: var(--light-grey);
    border-radius: 5rem;
    transition: opacity 0.3s ease-in-out;
}

.payment_hidden {
    opacity: 0;
    pointer-events: none;
}
</style>