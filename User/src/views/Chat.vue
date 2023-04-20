<script setup lang="ts">
import { ref } from 'vue'
import Title from '@/components/title.vue';
import ChatPersons from '@/components/chatPersons.vue';
import ChatMessages from '@/components/chatMessage.vue';
import { instructors, chatMessages } from '@/firebase/store';

const chatPersons = ref(instructors)

const allChatMessages = ref(chatMessages)


const currentChat = ref<chatMessages>()

const personWrapper = ref<HTMLElement>()

/* Opens chat messages and highlights the open chat person in the side menu */
function openChat(instructorID:string, $event:any) {
    console.log($event.target)

    const personWrapperChildren = personWrapper.value?.children

    for (let i = 0; i < chatPersons.value.length; i++) {
        const person = personWrapperChildren?.item(i)
        person?.classList.contains("openChat") ? person.classList.remove("openChat") : null
        $event.target.classList.add("openChat")
    }
    for (let i = 0; i < allChatMessages.value.length; i++) {
        if (allChatMessages.value[i].instructorID === instructorID) {
            currentChat.value = allChatMessages.value[i]
            break
        }
    }
}

const newMessage = ref("")

function resize(el:any) {
    el.target.style.height = "18px"
    el.target.style.height = el.target.scrollHeight + "px"
}
</script>
<template>
<main>
    <Title text="Chat" color="var(--green)" />
    <section class="chat">
        <div class="chat_persons" ref="personWrapper" v-dragscroll> <!-- Chat persons -->
            <ChatPersons v-for="item in chatPersons" :name="item.name" :instructor-i-d="item.instructorID" :open="item.isActive" :open-chat="openChat" />
        </div>
        <div class="horisontal_Line"><!-- Horisontal line --></div>
        <div class="chat_messages"> <!-- Chat messages -->
            <div class="messages" v-dragscroll:nochilddrag>
                <ChatMessages v-for="item in currentChat?.messages" :from="item.from" :message="item.message" :datetime="item.datetime" />
            </div>
            <div class="messageInput">
                <textarea ref="messageInput" @input="resize($event)" maxlength="150" rows="1" v-model="newMessage"></textarea>
                <div>
                    <img src="../assets/MessageSendArrow.svg">
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