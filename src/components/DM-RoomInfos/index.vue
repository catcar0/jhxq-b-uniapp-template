<script setup lang='ts'>
import LemDialog from "@/components/LemDialog/LemDialog.vue";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { usePlayStore } from "@/stores/play";

const PlayStore = usePlayStore();
const infos = computed(() => PlayStore.PlayInfos);
const closeRoomVisible = ref<boolean>(false);
const timer = ref<any>();
const start_time = ref<number>(0);
const current_time = ref<number>(0);
const time_str = computed(() => secondsToMinutesSeconds(current_time.value - start_time.value));


onMounted(async () => {
    // await PlayStore.GetRoomInfo();
    console.log('------')
    console.log(uni.getStorageSync('member'))
})

onUnmounted(() => {
    stopTime();
})

const showCloseRoomVisible = () => {
    uni.vibrateShort({ type: 'light' });
    closeRoomVisible.value = true;
    loopTime();
}

// 关闭房间
const toCloseRoom = () => {
    stopTime();
    closeRoomVisible.value = false;
    PlayStore.CloseRoom();
}

const loopTime = () => {
    start_time.value = infos.value?.start_time || 0;
    current_time.value = Math.ceil(Date.now() / 1000);
    timer.value = setInterval(() => {
        current_time.value++
    }, 1000);
}

const stopTime = () => {
    clearInterval(timer.value);
    timer.value = null;
}

function secondsToMinutesSeconds(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    const formattedSeconds: string = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutes}:${formattedSeconds}`;
}
</script>

<template>
    <LemDialog @cancel="stopTime" v-model:show="closeRoomVisible" @confirm="toCloseRoom" title="注意">
        <text>是否确认结束本场《{{ infos?.script_name }}》？</text>
        <view class="script-infos">
            <image :src="infos?.script_preview" mode="heightFix" />
            <view class="opening-tip">
                <text>您本场的开局时长为 </text>
                <text class="opened-time">{{ time_str }}</text>
            </view>
            <text>若开错房间在5分钟之内关闭房间，请联系客服处理。</text>
        </view>
    </LemDialog>

    <view class="top-bar">
        <view class="header-item text-14">
            <text class="room-status">{{ infos?.running_room ? '进行中' : '已结束' }}</text>
            <view class="controls">
                <button @tap="showCloseRoomVisible">
                    提前结束
                </button>
            </view>
        </view>
        <view class="header-item text-14">
            <text class="script-name">{{ infos?.script_name }}</text>
            <text class="room-number">房间号：{{ infos?.room_number }}</text>
        </view>
        <view class="header-item text-12">
            <text>DM - {{ infos?.DM }}</text>
            <text>房间人数：{{ infos?.people_number }}</text>
        </view>
        <view class="end-time">
            <text>预计结束时间：{{ infos?.room_end_time.split(" ")[1] }}</text>
        </view>
    </view>
</template>

<style scoped>
.script-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20rpx;
    font-weight: 400;
    color: #3D3D3D;
    padding-bottom: 30rpx;
}

.script-infos>image {
    width: 200rpx;
    max-height: 320rpx;
    padding: 50rpx 0;
}

.opening-tip {
    display: flex;
    align-items: baseline;
    gap: 10rpx;
    font-size: 28rpx;
    font-weight: 400;
    padding-bottom: 16rpx;
}

.opened-time {
    font-size: 36rpx;
    line-height: 36rpx;
    font-weight: 700;
}
</style>

<style scoped>
.text-14 {
    font-size: 28rpx;
}

.text-12 {
    font-size: 24rpx;
}

.top-bar {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.header-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
}

.room-status {
    font-size: 28rpx;
    font-weight: 500;
    color: #EA6A00;
}

.controls>button {
    border-radius: 16px;
    padding: 0 16rpx;
    line-height: 48rpx;
    font-size: 20rpx;
    border: 0.5px solid #E1E1E1;
    background-color: transparent;
}

.script-name {
    font-size: 28rpx;
    font-weight: 500;
}

.room-number {
    font-size: 24rpx;
    color: #EA6A00;
    line-height: 34rpx;
    padding: 0 10rpx;
    background: #FEFAF1;
}

.end-time {
    width: 100%;
    text-align: center;
    justify-content: center;
    display: flex;
    font-size: 28rpx;
    font-weight: 500;
    padding: 20rpx 0 0 0;
    border-top: 1px dashed #E1E1E1;
}
</style>