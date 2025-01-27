<template>
    <div class="animales-view">
        <Animales />
        <ChatRoom />
    </div>
</template>

<script>
import Animales from "@/components/animales.vue";
import ChatRoom from "@/components/Chatroom.vue";

export default {
    components: {
        Animales,
        ChatRoom,
    },
};
</script>

<style scoped>
.chat-room-view {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
</style>