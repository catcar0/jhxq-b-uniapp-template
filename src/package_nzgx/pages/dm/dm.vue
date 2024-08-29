<script setup lang='ts'>
// import DMTabBar from "@/package_nzgx/components/DM-TabBar/index.vue"
import HunChuan from './components/HunChuan.vue'
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { onMounted, onUnmounted } from "vue";
import { WebSocketService } from "@/package_nzgx/services/WebSocketService";
import { initAllInfo, updateOriFlowInfo } from "@/package_nzgx/services/initInfo";
import { allClues, updateOriClueInfo } from "@/package_nzgx/services/clues";
import { getInfoById } from "@/package_nzgx/services/updateInfo";
import { PlayToken } from "@/utils/auth";
import { usePlayStore } from "@/stores/play";
import { useAuthStore } from "@/stores/auth";
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const PlayStore = usePlayStore();
const AuthStore = useAuthStore();
const initInfo = async () => {
  webSocketStore.gameSend(
    initAllInfo
  )

}
onMounted(async () => {
  // 获取最新的原始流程信息和线索集信息
  uni.showLoading({
    title: '加载中'
  });
  await updateOriFlowInfo()
  await updateOriClueInfo()
  uni.hideLoading()

  if (!memberStore.info) {
    memberStore.setInfo(initAllInfo)
  }
  await init();
  // 创建 WebSocket 连接
  const wsService = new WebSocketService(`token=${memberStore.profile.token}&room_id=${memberStore.roomId}&virtual_role_id=gm`);
  wsService.connect()
  // 监听 WebSocket 连接成功事件
  wsService.onOpen = () => {
    if(webSocketStore.messages.slice(-1)[0] && webSocketStore.messages.slice(-1)[0].type && webSocketStore.messages.slice(-1)[0].type === 'error'){
      return
    }
    console.log("WebSocket 连接成功");

    // 连接成功后执行后续操作
    webSocketStore.gameWebSocketService = wsService;
    // webSocketStore.gameConnect();
    setTimeout(() => {
      if(!memberStore.playerInfo) initInfo();
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

const init = async () => {
  await PlayStore.GetRoomInfo();
  memberStore.setProfile({
    ...memberStore.profile,
    token: PlayToken.get()
  })
  memberStore.setRoomId(PlayStore.PlayInfos?.room_number);
  memberStore.setVirtualRoleId('gm');
}
</script>

<template>
  <Watermark></Watermark>
  <scroll-view scroll-y>
    <navigator url="/package_nzgx/pages/dm/team-management" hover-class="none">
      <view class="team flex-row-center shadow-box  almm"> <text class="orange-font">团队管理</text> </view>
    </navigator>
    <HunChuan v-if="memberStore.info" />
  </scroll-view>
  <!-- <DMTabBar :userinfo="memberStore.playerInfo"></DMTabBar> -->
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
<style>
@import url("@/package_nzgx/static/fonts/stylesheet.css");
@import url("@/package_nzgx/styles/common.css");

.almm {
  font-family: 'Alimama ShuHeiTi';
}

.hyshtj {
  font-family: 'hyshtj';
}
</style>