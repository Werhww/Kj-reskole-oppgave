<script setup lang="ts">
import RouterButton from "@/components/routerButton.vue";
const props = defineProps<{
    anchorID: string;
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
    <div><!-- Underline --></div>
</div>
</template>

<style scoped>
.title{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.title > div:not(:first-child) {
    height: 5px;
    background-color: v-bind(color);
    border-radius: 5rem;
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