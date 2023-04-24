<script setup lang="ts">
import Title from '@/components/title.vue';
import CourseItem from '@/components/courseItem.vue';

import moment from 'moment'
import { ref } from 'vue'

const user = ref({
    name: "Test",
    
})

function avmeldKurs(CourseID:string) {
    console.log("Avmeld kurs")
    console.log(CourseID)
}

function saveComment(CourseID:string, comment:string) {
    console.log("Save comment")
    console.log(CourseID, comment)
}
</script>

<template>
<main>
    <Title :text="user.name" color="var(--red)"/>
    <div>
        <CourseItem 
            course="Test"
            :amount="3"
            price="100"
            instructor="instructøre"
            fullAddress="22351251561"   
            comment="Test"
            :paid="true"

            startTime="2021-09-04T10:00:00"
            endTime="2021-09-04T11:00:00"
            courseID="3151233512"

            :avmeldKurs="avmeldKurs"
            :saveComment="saveComment"
        />
    </div>
</main>

<!-- <p>{{ $route.params.studentID }}</p> -->
</template>

<style scoped>

</style>