<script setup lang='ts'>
import PlayerManage from "@/components/DM-PlayerMange/index.vue";
import MusicManage from "@/components/DM-MusicMange/index.vue";
import { ref } from "vue";

const PlayerManageVisible = ref<boolean>(false);
const MusicManageVisible = ref<boolean>(false);
const showPlayerManage = () => {
    uni.vibrateShort({ type: "light" });
    PlayerManageVisible.value = true;
}
const showMusicManage = () => {
    uni.vibrateShort({ type: "light" });
    MusicManageVisible.value = true;
}
</script>

<template>
    <PlayerManage v-model:show="PlayerManageVisible"></PlayerManage>
    <MusicManage v-model:show="MusicManageVisible"></MusicManage>
    <view class="tab-bar">
        <view @tap="showPlayerManage" class="tab-item" :class="PlayerManageVisible?'active':''">
            <image v-if="PlayerManageVisible" src="@/static/icons/dm/room_selected.svg" />
            <image v-else src="@/static/icons/dm/room_unselected.svg" />
            <text>房间管理</text>
        </view>
        <view class="tab-item" :class="(!PlayerManageVisible && !MusicManageVisible)?'active':''">
            <image v-if="PlayerManageVisible || MusicManageVisible" src="@/static/icons/dm/game_unselected.svg" />
            <image v-else src="@/static/icons/dm/game_selected.svg" />
            <text>游戏进程</text>
        </view>
        <view @tap="showMusicManage" class="tab-item" :class="MusicManageVisible?'active':''">
            <image v-if="MusicManageVisible" src="@/static/icons/dm/audio_selected.svg" />
            <image v-else src="@/static/icons/dm/audio_unselected.svg" />
            <text>游戏音频</text>
        </view>
    </view>
</template>

<style scoped>
.tab-bar {
    position: fixed;
    z-index: 3;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 24rpx 0 40rpx 0;
    background-color: #FFF;
    box-shadow: 0px 4px 10px 0px rgba(229, 229, 229, 0.3);
}

.tab-item {
    width: 100%;
    min-height: 80rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rpx;
    font-size: 20rpx;
    color: #C4C4C4;
}

.tab-item>image{
    width: 40rpx;
    height: 40rpx;
}

.tab-item.active {
    color: #F09235;
}
</style>