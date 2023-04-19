<script setup lang="ts">
import { ref } from 'vue'
import Title from '@/components/title.vue';
import ChatPersons from '@/components/chatPersons.vue';

const active = ref(false)

const chatPersons = ref([
    {
        name: "Leo",
        instructorID: "1245",
        isActive: false
    },
    {
        name: "Leo",
        instructorID: "1245",
        isActive: false
    },
    {
        name: "Leo",
        instructorID: "1245",
        isActive: false
    }
])

function openChat(instructorID: string) {
    console.log(instructorID)

}
</script>
<template>
<main>
    <Title text="Chat" color="var(--green)" />
    <section class="chat">
        <div class="chat_persons"> <!-- Chat persons -->
            <ChatPersons name="Leo" instructor-i-d="1245" :open-chat="openChat" :open="false"/>
        </div>
        <div class="horisontal_Line"><!-- Horisontal line --></div>
        <div class="chat_messages"> <!-- Chat messages -->

        </div>
    </section>
</main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 80vh;
}

.chat {
    display: flex;
    flex-direction: row;
    flex: 1;
}

.chat_persons {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-right: 0.5rem;
}

.chat_messages {
    width: 80%;
    height: 100%;
}

.horisontal_Line {
    height: 100%;
    border: 3px solid var(--grey);
    border-radius: 5rem;
}
</style>