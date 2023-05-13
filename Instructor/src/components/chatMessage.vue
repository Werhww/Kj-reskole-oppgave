<script setup lang="ts">
import moment from 'moment';
import { computed } from '@vue/reactivity';

const props = defineProps<{
    from: string;
    message: string;
    datetime: string;
}>()

const messageFrom = computed(() => {
    if (props.from === 'instructor') {
        return true
    } else {
        return false
    }
})

const time = computed(() => {
    const timeNow = moment().format();
    const weekAgo = moment(props.datetime).isBefore(timeNow, 'week')
    if (weekAgo) {
        return moment(props.datetime).format('MMMM Do  - HH:mm')
    } else {
        return moment(props.datetime).isBefore(timeNow, 'day') ? moment(props.datetime).format('dddd - HH:mm') : `Today - ${moment(props.datetime).format('HH:mm')}`
    }
})
</script>

<template>
<div v-if="messageFrom" class="wrapper fromUser">
    <p class="message messageUser">{{ message }}</p>
    <div class="time timeUser">
        <p>{{ time }}</p>
        <img src="../assets/GreenMessageArrow.svg">
    </div>
</div>
<div v-else class="wrapper fromInstructor">
    <p class="message messageInstructor">{{ message }}</p>
    <div class="time timeInstructor">
        <img src="../assets/GreyArrowMessage.svg">
        <p>{{ time }}</p>
    </div>
</div>
</template>

<!-- For the diffrent types -->
<style scoped>

.messageUser {
    background-color: var(--green);
    color: white;
}

.timeUser, 
.fromUser {
    align-self: end;
}

.fromInstructor {
    align-self: start;
}

.messageInstructor {
    background-color: var(--light-grey);
    color: black;
}

.timeInstructor {
    align-self: start;
}
</style>

<!-- Global -->
<style scoped>
.wrapper {
    max-width: 30rem;
    min-width: 15rem;

    display: flex;
    flex-direction: column;
}

.message {
    padding: 1rem 1.5rem;
    border-radius: 0.8rem;
    font-size: 1.25rem;
}

.time {
    display: flex;
    flex-direction: row;
}

@media only screen and (max-width: 900px) {

    .message {
        font-size: 1rem;
    }
}
</style>
