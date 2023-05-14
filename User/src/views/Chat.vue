<script setup lang="ts">
import { ref, watch } from 'vue'
import { addDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import moment from 'moment';

import { chatMessages, chats, userRef, msgCollectionRef } from '@/firebase/store';
import { db } from '@/firebase/firebase';

/* Componnter */
import Title from '@/components/title.vue';
import ChatPersons from '@/components/chatPersons.vue';
import ChatMessages from '@/components/chatMessage.vue';

const allChatMessages = ref(chatMessages)

interface Chat {
    id: string
    messages: any[]
}

const currentChat = ref<Chat>()
const currentChatId = ref("")

const personWrapper = ref<HTMLElement>()

/* Opens chat messages and highlights the open chat person in the side menu */
function openChat(personId:string) {
    const personWrapperChildren = personWrapper.value?.children
    const chatAmount = chats.value.length

    const chatId = `${userRef.value}_${personId}`
    currentChatId.value = chatId

    assingChat(chatId)

    /* loop thougt all chatspersons and higtlight click one */
    for (let i = 0; i < chatAmount; i++) {
        const person = personWrapperChildren?.item(i)
        person?.classList.contains("openChat") ? person.classList.remove("openChat") : null

        if (person?.id === personId) {
            person?.classList.add("openChat")
        }
    }
}

function assingChat(chatId:string) {
    currentChat.value = allChatMessages.value[chatId]
}


watch(allChatMessages, () => {
    assingChat(currentChatId.value)
})

const newMessage = ref("")

function resize(el:any) {
    el.target.style.height = "18px"
    el.target.style.height = el.target.scrollHeight + "px"
}

async function sendMessage() {
    const message = newMessage.value
    const chatId = currentChatId.value

    const messageObject = {
        chatId: chatId,
        from: "user",
        text: message,
        timestamp: serverTimestamp(),
        datetime: moment().format()
    }

    newMessage.value = ""
    await addDoc(msgCollectionRef, messageObject)
    
}
</script>
<template>
<main>
    <Title text="Chat" color="var(--green)" />
    <section class="chat">
        <div class="chat_persons" ref="personWrapper" v-dragscroll> <!-- Chat persons -->
            <ChatPersons v-for="item in chats" :name="item.chatName" :instructor-id="item.instructorId" :open-chat="openChat" />
        </div>
        <div class="horisontal_Line"><!-- Horisontal line --></div>
        <div class="chat_messages"> <!-- Chat messages -->
            <div class="messages" v-dragscroll:nochilddrag>
                <ChatMessages v-for="item in currentChat?.messages" :from="item.from" :message="item.text" :datetime="item.datetime" />
            </div>
            <div class="messageInput">
                <textarea ref="messageInput" @input="resize($event)" maxlength="150" rows="1" v-model="newMessage"></textarea>
                <div>
                    <img @click="sendMessage" src="../assets/MessageSendArrow.svg">
                    <p>{{newMessage.length}}/150</p>
                </div>
            </div>
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

.horisontal_Line {
    height: 100%;
    border: 3px solid var(--grey);
    border-radius: 5rem;
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
    padding-right: 0.5rem;
    overflow: hidden;
    gap: 1.5rem;
}

.chat_messages {
    width: 80%;
    height: 43rem;
    display: flex;
    flex-direction: column;
    padding-left: 1.625rem;
}

.messages {
    width: 100%;
    height: 88%;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    gap: 2.5rem;
    padding-bottom: 1rem;
}


.messageInput {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1.5rem;
    
    border: 3px solid var(--grey);
    border-radius: 5rem;
}

.messageInput  textarea{
    flex: 1;
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 1.25rem;
    resize: none;
}

.messageInput  div{
    display: flex;
    flex-direction: row-reverse;
    gap: 0.5rem;
    align-items: center;
}

.messageInput  div img{
    transition: 3s filter ease-in-out;
}

.messageInput  div img:hover{
    cursor: pointer;
    filter: invert(53%) sepia(0%) saturate(0%) hue-rotate(188deg) brightness(99%) contrast(90%);
}
</style>


<!-- Media querys -->
<style scoped>
@media only screen and (max-width: 900px) {
    main {
        align-self: center;
    }

    .chat {
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
    }
    .horisontal_Line {
        height: 0;
        width: 100%;
    }

    .chat_persons {
        width: 100%;
        height: 13%;
        flex-direction: row;
        padding-right: 0;
    }

    .chat_messages {
        width: 93%;
        height: 60vh;
        padding-left: 0;
    }

}
</style>