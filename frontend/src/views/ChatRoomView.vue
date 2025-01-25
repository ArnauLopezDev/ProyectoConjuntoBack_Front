<template>
    <div class="chat-room-view">
        <ChatRoom />
    </div>
</template>

<script>
import ChatRoom from "@/components/chatroom.vue";

export default {
    components: {
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
    background-color: #eaeaea;
    padding: 20px;
}
</style>
