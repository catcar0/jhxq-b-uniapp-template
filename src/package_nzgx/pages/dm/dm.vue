<script setup lang='ts'>
import DMTabBar from "@/components/DM-TabBar/index.vue"
import HunChuan from './components/HunChuan.vue'
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { onMounted, onUnmounted } from "vue";
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
onMounted(() => {
    console.log('as')
    if (memberStore.profile.token && memberStore.roomId && memberStore.virtualRoleId) {
        webSocketStore.gameConnect();
        setTimeout(() => {
            webSocketStore.gameplayerFirstSend()
        }, 500);
    }
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
  <DMTabBar></DMTabBar>
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