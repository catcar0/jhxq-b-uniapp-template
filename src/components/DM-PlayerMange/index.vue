<script setup lang='ts'>
import RoomInfosDM from "@/components/DM-RoomInfos/index.vue";
import LemDialog from "@/components/LemDialog/LemDialog.vue";
import { BanPlayer, GetPlayerList } from "@/services/play";
import type { Player } from "@/services/play";
import { Toast, setPageOverflow } from "@/utils/uniUtils";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits(["update:show"]);
const banPlayerVisible = ref<boolean>(false);
const selectPlayer = ref<Player>();
const playerList = ref<Player[]>();
const loopTimer = ref<any>();


watch(() => props.show, (value) => {
    setPageOverflow(value ? 'hidden' : 'auto');
    if (value) {
        init();
        loopApi();
    }else{
        clearInterval(loopTimer.value);
    }
})

onMounted(() => {
    init();
})

onUnmounted(()=>{
    setPageOverflow('auto');
    clearInterval(loopTimer.value);
})

const loopApi = () => {
    clearInterval(loopTimer.value);
    loopTimer.value = setInterval(()=>{
        init();
    },1000)
}

const init = async () => {
    // try {
    //     let res = await GetPlayerList();
    //     playerList.value = res.data;
    // } catch (err: any) { }
}

const toBanPlayer = async () => {
    banPlayerVisible.value = false;
    try {
        await BanPlayer(selectPlayer.value?.role_id!);
        init();
        Toast("成功踢出玩家");
    } catch (err: any) { }
}

const selectBanPlayer = (player: Player) => {
    if (player.player_name || player.player_avatar) {
        banPlayerVisible.value = true;
        selectPlayer.value = player;
    } else {
        Toast("此角色还没有玩家")
    }
}

const toClose = () => {
    emit("update:show", false)
}
</script>

<template>
    <LemDialog v-model:show="banPlayerVisible" @confirm="toBanPlayer" title="注意">
        <text>是否确认移出？</text>
        <view class="ban-player-infos">
            <image :src="selectPlayer?.player_avatar" />
            <text>{{ selectPlayer?.player_name }}</text>
        </view>
    </LemDialog>
    <view v-if="show" class="pop-mask">
        <view @tap="toClose" class="pop-close">
            <image src="@/static/icons/dm_close_white.png" />
        </view>
        <view class="pop-inner">
            <view class="room-infos-wrap">
                <RoomInfosDM></RoomInfosDM>
            </view>
            <view class="container">
                <text class="title">玩家列表</text>
                <view class="player-list">
                    <view class="player-item" v-for="item in playerList" :key="item.role_id">
                        <view class="player-info">
                            <view class="avatar">
                                <image :src="item.role_avatar" />
                            </view>
                            <text>{{ item.role_name }}</text>
                        </view>
                        <view class="player-info" @tap="selectBanPlayer(item)">
                            <view class="avatar">
                                <image :src="item.player_avatar" />
                                <image v-if="item.player_name || item.player_avatar" class="del" src="@/static/icons/common_close_white.png" />
                            </view>
                            <text>{{ item.player_name || "???" }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.ban-player-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20rpx;
    font-size: 32rpx;
    padding: 30rpx 0;
}

.ban-player-infos>image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
}
</style>

<style scoped>
.pop-mask {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.pop-close {
    position: absolute;
    top: 4%;
    right: 5%;
    width: 70rpx;
    height: 70rpx;
}

.pop-close>image {
    width: 100%;
    height: 100%;
}

.pop-inner {
    background-color: #FFF;
    border-radius: 16px;
    width: 90%;
    max-width: 780rpx;
    height: 80%;
    max-height: 1200rpx;
    overflow: hidden;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.room-infos-wrap {
    padding: 32rpx;
    box-sizing: border-box;
    background: linear-gradient(180deg, #FEFAF1 0%, #FFFFFF 47%);
}

.container {
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.title {
    padding: 0 28rpx 28rpx 28rpx;
    font-size: 36rpx;
    font-family: AlimamaShuHeiTi-Bold;
    box-sizing: border-box;
}

.player-list {
    padding: 0 28rpx;
    padding-bottom: 100rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: auto;
}

.player-item {
    border-radius: 32rpx;
    padding: 16rpx 36rpx;
    background-color: #F7F7F7;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.player-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10rpx;
    font-size: 24rpx;
    width: 100%;
}

.avatar {
    position: relative;
    width: 92rpx;
    min-width: 92rpx;
    height: 92rpx;
    background-color: #CCCCCC;
    border-radius: 50%;
}

.avatar>image {
    width: 100%;
    border-radius: 50%;
    height: 100%;
}

.avatar>image.del{
    position: absolute;
    top: 0;
    right: 0;
    width: 32rpx;
    height: 32rpx;
    padding: 5rpx;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #F04C00;
}
</style>