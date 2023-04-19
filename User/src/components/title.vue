<script setup lang="ts">
import RouterButton from "@/components/routerButton.vue";
import Underline from "@/components/underline.vue";
const props = defineProps<{
    anchorID?: string;
    text: string;
    color: string;
}>()
</script>

<template>
<div class="title">
    <div class="top">
        <div :id="anchorID">
            <h1>{{ text }}</h1>
            <a :name="anchorID"></a>
        </div>
        <RouterButton text="Tilbake" :color="color" to="/"></RouterButton>
    </div>
    <Underline :color="color"/>
</div>
</template>

<style scoped>
.title{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.top{
    display: flex;
    justify-content: space-between;
    align-items: end;
}

.top h1{
    font-size: 2.5rem;
    font-weight: 500;
    color: v-bind(color);
}
</style>

<style scoped>
@media only screen and (max-width: 1280px) {
    .top h1{
        font-size: 2.5rem;
    }
}
</style>