<script setup lang='ts'>
import DMTabBar from "@/components/DM-TabBar/index.vue"
import HunChuan from './components/HunChuan.vue'
</script>

<template>
  <scroll-view scroll-y>
    <navigator url="/package_nzgx/pages/team-management/team-management" hover-class="none">
      <view class="team flex-row-center shadow-box  almm"> <text class="orange-font">团队管理</text> </view>
    </navigator>
    <HunChuan />
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