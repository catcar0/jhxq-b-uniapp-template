<script setup lang='ts'>
import DMTabBar from "@/components/DM-TabBar/index.vue"
import HunChuan from './components/HunChuan.vue'
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { onMounted, onUnmounted } from "vue";
import { WebSocketService } from "@/package_nzgx/services/WebSocketService";
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
onMounted(() => {
    // 创建 WebSocket 连接
    const wsService = new WebSocketService(`ws://132.232.57.64:8030/?token=${memberStore.profile.token}&room_id=${memberStore.roomId}&virtual_role_id=${memberStore.virtualRoleId}`);
    wsService.connect()
    // 监听 WebSocket 连接成功事件
    wsService.onOpen = () => {
        console.log("WebSocket 连接成功");

        // 连接成功后执行后续操作
        webSocketStore.gameWebSocketService = wsService;
        // webSocketStore.gameConnect();
        setTimeout(() => {
            webSocketStore.gameplayerFirstSend()
            webSocketStore.getPlayerInfo()
        }, 500);


    };

    // 监听连接错误或关闭事件
    wsService.onError = (error) => {
        console.error("WebSocket 连接失败", error);
        // 在这里可以添加错误处理逻辑
    };
});

onUnmounted(() => {
    webSocketStore.gameClose();
});
</script>

<template>
  <scroll-view scroll-y>
    <navigator url="/package_nzgx/pages/dm/team-management" hover-class="none">
      <view class="team flex-row-center shadow-box  almm"> <text class="orange-font">团队管理</text> </view>
    </navigator>
    <HunChuan v-if="memberStore.info" />
  </scroll-view>
  <DMTabBar :userinfo="memberStore.playerInfo"></DMTabBar>
</template>

<style scoped>
scroll-view {
  padding: 2px 35rpx;
  box-sizing: border-box;
}

.team {
  aspect-ratio: 7.8/1;
  font-size: 24.5rpx;
  margin-bottom: 20rpx;
}
</style>