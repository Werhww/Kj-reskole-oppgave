<script setup lang="ts">
import Title from '@/components/title.vue';
import CourseItem from '@/components/courseItem.vue';

import moment from 'moment'
import { ref } from 'vue'

const user = ref({
    name: "Test",
    
})

</script>

<template>
<main>
    <Title :text="user.name" color="var(--red)"/>
    <div>
        <CourseItem 
            courseTitle="Test"
            amount="1"
            price="100"
            instructor="Test"
            fullAddress="22351251561"   
            comment="Test"
            :paid="true"

            startTime="2021-09-01T10:00:00"
            endTime="2021-09-01T11:00:00"
        />
    </div>
</main>

<!-- <p>{{ $route.params.studentID }}</p> -->
</template>

<style scoped>

</style>