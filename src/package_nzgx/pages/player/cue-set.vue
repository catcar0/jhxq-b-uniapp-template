<script setup lang='ts'>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import audioplay from '@/package_nzgx/pages/player/components/audioplay.vue';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const setClass = ['物品', '音频', '记录']
const classIndex = ref(0)
const clues = ['clue1', 'clue2', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3']
const cluesIndex = ref(-1)
interface AudioItem {
    src: string;
    isPlaying: boolean;
    context: UniApp.InnerAudioContext | null;
    roles: string;
    location: string;
    content: string;
    scrollText: string;
    scrollPosition: number;
    scrollOffset: number; // 新增
    scrollAnimationFrame: number; // 新增
}
const audioList = ref<AudioItem[]>([
    {
        roles: '尹萍&陈敏',
        location: '后山花坛',
        content: '春天已经准备春天已经准备春天已经准备春天已经准备',
        src: 'http://159.138.147.87/statics/voice/test.mp3',
        isPlaying: false,
        context: null,
        scrollText: '春天已经准备春天已经准备春天已经准备春天已经准备',
        scrollPosition: 0,
        scrollOffset: 0,
        scrollAnimationFrame: 0
    },
    {
        roles: '尹萍&陈敏',
        location: '后山花坛',
        content: '春天已经准备春天已经准备春天已经准备春天已经准备',
        src: 'http://159.138.147.87/statics/voice/test.mp3',
        isPlaying: false,
        context: null,
        scrollText: '春天已经准备春天已经准备春天已经准备春天已经准备',
        scrollPosition: 0,
        scrollOffset: 0,
        scrollAnimationFrame: 0
    }
])
</script>

<template>
    <view class="cue-set">
        <view class="set-class flex-row-sb">
            <view @tap="classIndex = index" v-for="(item, index) in setClass" :key="item" class="flex-row-center"
                :class="index === classIndex ? 'class-selected' : 'class-not-selected'">
                <text class="class-name">{{ item }}</text>
            </view>
        </view>
        <view class="paper">
            <view v-show="classIndex !== 0" class="make-old"></view>
            <!-- 物品 -->
            <view class="class-inner" v-show="classIndex === 0">
                <view class="player-title hyshtj ">
                    <view class="font-player-gradient1">线索集</view>
                </view>
                <scroll-view scroll-y style="height: 71vh;">
                    <img v-if="cluesIndex !== -1" class="clue-big-image" :src="`http://159.138.147.87/statics/img/${memberStore.info.characters[memberStore.virtualRoleId].cueset.clues[cluesIndex].name}.png`"
                        alt="">
                    <view v-if="cluesIndex !== -1" class="flex-row-center clue-text">
                        举报他们了，你也受不了他们很久了吧？这次我一定会配合你（是春天的字迹）
                    </view>
                    <view class="clues-box flex-row-center">
                        <!-- <view class="make-old2"></view> -->
                        <view v-for="(item, index) in memberStore.info.characters[memberStore.virtualRoleId].cueset.clues" :key="index">
                            <view @tap="cluesIndex === index ? cluesIndex = -1 : cluesIndex = index" class="clues-item"
                                :class="cluesIndex === index ? 'clue-selected-border1' : ''">
                                <img class="clue-selected-border2" v-show="cluesIndex === index"
                                    src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                                <view class="clue-small-image"
                                    :style="{ backgroundImage: `url(http://159.138.147.87/statics/img/${item.name}.png)` }">
                                    <!-- <img class="clue-small-image"  :src="`http://159.138.147.87/statics/img/${item}.png`" alt=""> -->
                                </view>
                            </view>
                            <view style="padding-top: 15rpx;text-align: center;"><text>海报</text></view>
                        </view>
                    </view>
                </scroll-view>

            </view>
            <!-- 音频 -->
            <view class="class-inner" v-show="classIndex === 1">
                <view class="player-title hyshtj ">
                    <view class="font-player-gradient1">调查记录</view>
                </view>
                <scroll-view scroll-y style="width: 625rpx;height: 71vh;padding-top: 20rpx;">
                    <audioplay class="a" :audioList="audioList" />
                </scroll-view>
                <!-- <view class="audio-box flex-row-sb" v-for="(item, index) in audioList" :key="index">
                </view> -->
            </view>
            <!-- 记录 -->
            <view class="class-inner" v-show="classIndex === 2">
                <view class="player-title hyshtj ">
                    <view class="font-player-gradient1">调查记录</view>
                </view>
                <scroll-view scroll-y style="width: 625rpx;height: 71vh;padding-top: 20rpx;">
                    <view class="audio-box flex-row-sb" v-for="(item, index) in audioList" :key="index">
                    第一次魂穿记录
                </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.a {
    pointer-events: all;
}

.make-old {
    margin-top: 120rpx;
    margin-left: 40rpx;
    transform: rotate(2deg);
    width: 80%;
    height: 83%;
    position: absolute;
    z-index: 11;
    background: url('http://159.138.147.87/statics/img/make_old3.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    mix-blend-mode: soft-light;
    opacity: 0.8;
    pointer-events: none;
}

.make-old2 {
    width: 80%;
    height: 83%;
    position: absolute;
    z-index: 9999;
    background: url('http://159.138.147.87/statics/img/make_old3.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    mix-blend-mode: soft-light;
    opacity: 0.8;
    pointer-events: none;
}

.cue-set {
    color: #333333;
    width: 100%;
    height: 100vh;
    background: url('http://159.138.147.87/statics/img/cue_set_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.set-class {
    color: black;
    position: fixed;
    width: 80%;
    right: 20rpx;
    top: 90rpx;
    transform: rotate(1deg);
}

.class-name {
    margin-top: -20rpx;
    transform: rotate(2deg);
}

.class-selected {
    width: 158rpx;
    height: 105rpx;
    margin-top: -40rpx;
    background: url('http://159.138.147.87/statics/img/set_selected.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    transform: rotate(-2deg);
}

.class-not-selected {
    width: 158rpx;
    height: 105rpx;
    background: url('http://159.138.147.87/statics/img/set_not_selected.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    transform: rotate(-2deg);
}

.paper {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    padding: 0 170rpx 0rpx 50rpx;
    box-sizing: border-box;
    position: absolute;
    left: -30rpx;
    top: 125rpx;
    width: 120%;
    height: 87%;
    background: url('http://159.138.147.87/statics/img/paper.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.class-inner {
    transform: rotate(2deg);
    padding-left: 80rpx;
    padding-top: 50rpx;
}

.class-title {
    width: auto;
    height: 70rpx;
    margin-left: -40rpx;
    padding-left: 60rpx;
    font-size: 45.5rpx;
    display: flex;
    align-items: center;
    background: url('http://159.138.147.87/statics/img/teaminfo_title_bg.png') no-repeat;
    background-size: 175rpx 70rpx;
    background-position: left;
}

.clue-big-image {
    margin-left: 100rpx;
    margin-top: 20rpx;
    width: 370rpx;
    height: 500rpx;
}

.clues-item {
    width: 112rpx;
    height: 112rpx;
    background-color: #CAA16A;
    text-align: center;
    mix-blend-mode:multiply;
}

.clue-small-image {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /* object-fit:contain; */
}

.clue-selected-border1 {
    box-sizing: border-box;
    border: 4rpx solid #583400;
}

.clue-selected-border2 {
    position: absolute;
    margin-left: -62rpx;
    margin-top: -8rpx;
    width: 122rpx;
    height: 122rpx;
    transform: rotate(-2deg);
}

.clue-text {
    width: 90%;
    font-size: 28rpx;
    font-weight: 600;
    height: 100rpx;
    line-height: 150%;
    text-align: center;
    margin-top: 0rpx;
}

.clues-box {
    margin-left: -20rpx;
    width: 645rpx;
    justify-content: flex-start;
    padding-left: 50rpx;
    /* min-height: 303rpx; */
    /* height: 303rpx; */
    font-size: 20rpx;
    font-weight: 600;
    margin-top: 20rpx;
    padding-top: 40rpx;
    padding-bottom: 20rpx;
    display: flex;
    flex-wrap: wrap;
    gap: 30rpx;
    background: url('http://159.138.147.87/statics/img/paper6.jpg') repeat;
    background-size: 100% 100%;
}

.audio-box {
    background-color: #D3B58B;
    height: 121rpx;
    width: 625rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
}

.audio-icon1 {
    width: 85rpx;
    height: 85rpx;
    background-color: #A66C2C;
    border-radius: 999rpx;
}

.audio-icon1-img {
    width: 30rpx;
    height: 30rpx;
    margin-left: 2rpx;
    transform: rotate(2deg);
}

.audio-icon2 {
    width: 315rpx;
    height: 85rpx;
    transform: rotate(-2deg);
    filter: brightness(0.9);
}

.audio-roles {
    font-size: 24.5rpx;
}

.audio-location {
    font-size: 21rpx;
}

.audio-content {
    width: 315rpx;
    line-height: 85rpx;
    overflow: hidden;
    white-space: nowrap;
    /* display: flex;
    align-items: center; */
}

.audio-info {
    height: 85rpx;
}
</style>