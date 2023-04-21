<script setup lang="ts">
import moment from 'moment'
import { RouterLink } from 'vue-router'
import Underline from './underline.vue'
const props = defineProps<{
    name:string,
    nextCourse:string,
    studentID:string
}>()

const nextCourseDate = moment(props.nextCourse).format('DD.MMM');
</script>

<template>
<div class="wrapper">
    <RouterLink :to="'/user/' + studentID">
        <p>{{ name }}</p>
        <p>{{ nextCourseDate }}</p>
        <RouterLink :to="'/chat/' + studentID">Medling til elev</RouterLink>
    </RouterLink>
    <Underline color="var(--light-grey)" />
</div>


</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
}

.wrapper a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 5rem 0.2rem 0.5rem;
    text-decoration: none;
    color: black;
    font-size: 1.25rem;
    font-weight: 400;
}

.wrapper > a > p:first-child {
    width: 12rem;
}

.wrapper > a > a {
    text-decoration: underline;
}

</style>