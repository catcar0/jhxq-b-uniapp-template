
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useBgmStore } from '@/stores/bgm';
import { GetAudios, type BgAudio } from '@/services/play';
import { setPageOverflow } from '@/utils/uniUtils';

const props = defineProps<{
    show: boolean
}>();
const BgmStore = useBgmStore();
const emit = defineEmits(['update:show']);

const bgms = ref<BgAudio[]>([]);
const CurrentBgm = computed(() => BgmStore.CurrentBgm);
const BgmStatus = computed(() => BgmStore.BgmStatus);

watch(() => props.show, (value) => {
    setPageOverflow(value ? 'hidden' : 'auto');
})

onUnmounted(() => {
    setPageOverflow('auto');
})

onMounted(() => {
    init();
    BgmStore.InitBgm();
})

const init = async () => {
    // try {
    //     let res = await GetAudios();
    //     bgms.value = res.data!;
    // } catch (err: any) { }
}

const close = () => {
    uni.vibrateShort({
        type: "light"
    })
    emit('update:show', false);
}

const play = (bgm: BgAudio) => {
    uni.vibrateShort({
        type: "light"
    });
    if (bgm.title == CurrentBgm.value?.title) {
        if (BgmStatus.value == 'paused') {
            BgmStore.PlayBgm(bgm);
        } else {
            BgmStore.PauseBgm();
        }
    } else {
        BgmStore.PlayBgm(bgm);
    };
}
</script>

<template>
    <view class="popup-mask" v-show="show">
        <view class="popup-inner">
            <image @tap="close" class="close-button" src="@/static/icons/dm_close_white.png"></image>
            <view class="music-list">
                <view @tap="play(item)" class="music-item" v-for="(item, index) in bgms" :key="item.title"
                    :class="{ active: CurrentBgm?.title == item.title }">
                    <view class="music-body">
                        <view class="music-title">
                            <text>{{ item.title }}</text>
                            <image v-show="CurrentBgm?.title == item.title && BgmStatus == 'playing'"
                                src="@/static/icons/common_playing.gif"></image>
                        </view>
                        <view v-if="item.loop" class="loop-tip">
                            <image src="@/static/icons/loop_music.jpg"></image>
                            <text>单曲循环</text>
                        </view>
                    </view>
                    <image
                        v-show="BgmStatus == 'paused' || (CurrentBgm?.title !== item.title && BgmStatus == 'playing')"
                        src="@/static/icons/common_music_play.png"></image>
                    <image v-show="BgmStatus == 'playing' && CurrentBgm?.title == item.title"
                        src="@/static/icons/common_music_pause.png"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.popup-mask {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
}

.popup-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 32rpx;
    box-sizing: border-box;
}

.close-button {
    width: 70rpx;
    height: 70rpx;
    padding-bottom: 32rpx;
}

.music-list {
    width: 100%;
    max-height: 80vh;
    overflow: auto;
    background-color: #fff;
    border-radius: 16px;
    padding: 0 32rpx;
    box-sizing: border-box;
    font-size: 28rpx;
}

.music-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50rpx;
    padding: 30rpx 0;
    border-bottom: 1px solid #F3F3F3;
}

.music-item.active .music-title {
    color: #7AD71F;
}

.music-title {
    display: flex;
    align-items: center;
    gap: 5rpx;
}

.music-title>image {
    width: 30rpx;
    min-width: 30rpx;
    height: 30rpx;
}

.music-item>image {
    width: 50rpx;
    min-width: 50rpx;
    height: 50rpx;
}

.music-body {
    display: flex;
    flex-direction: column;
    gap: 5rpx;
}

.loop-tip {
    display: flex;
    align-items: center;
    gap: 5rpx;
}

.loop-tip>text {
    opacity: 0.5;
    font-size: 20rpx;
}

.loop-tip>image {
    width: 20rpx;
    min-width: 20rpx;
    height: 20rpx;
}
</style>