<script setup lang='ts'>
import { setPageOverflow } from '@/utils/uniUtils';
import audioplay from '@/package_nzgx/pages/player/components/audioplay.vue';
import { computed, onUnmounted, ref, watch } from 'vue';
import type { DmDialog } from '@/package_nzgx/types/dialog'
const props = defineProps<{ dialogObj: DmDialog }>()

const emit = defineEmits(["update:show", "confirm", "cancel"]);

watch(() => props, (value) => {
    setPageOverflow(value ? 'hidden' : 'auto');
})

onUnmounted(() => {
    setPageOverflow('auto');
})

const close = () => {
    emit('update:show', false);
    emit('cancel');
}

const confirm = () => {
    emit('confirm',false);
}
const zstselectIndex = ref<number>()
const zstSelectUser = (index: number) => {
    zstselectIndex.value = index
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
    }
])
</script>

<template>
    <view class="dialog-mask" :class="{ show: dialogObj.dialogVisible }">
        <view class="dialog-inner">
            <view class="dialog-header">
                <image class="close-icon"  @tap="close" src="http://159.138.147.87/statics/img/close_icon.png"
                :mode="'widthFix'" />
            </view>
            <text class="hyshtj font-player-gradient1 dialog-title">{{ dialogObj.title }}</text>
            <view class="dialog-content font-player-gradient1 ">
                {{ dialogObj.content }}
            </view>
            <view v-if="dialogObj.type==='changeTeamName'">
                <view class="input-box flex-row-center">
                    <input type="text" style="text-align: center;">
                </view>
            </view>
            <audioplay v-if="dialogObj.type==='voice'"  :audioList="audioList" />
            <view class="dialog-control">
                <view @tap="confirm" class="theme-button button">
                    <view class="theme-button-clear"></view>
                    <view class="hyshtj font-player-gradient2">                    {{ dialogObj.confirmText || '确认' }}</view>
                </view>
                <!-- <button v-if="dialogObj.showCancel" @tap="close" class="theme-button cancel-button">{{
                    dialogObj.cancelText || '取消'
                }}</button> -->
            </view>
        </view>
    </view>
</template>

<style scoped>
.close-icon{
    width: 70rpx;height: 70rpx;
}
.dialog-mask {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40rpx;
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
    transition: .3s ease;
    transition-property: opacity;
}

.dialog-mask.show {
    opacity: 1;
    pointer-events: unset;
}

.dialog-mask.show>.dialog-inner {
    transform: translateY(0px);
}

.dialog-inner {
    width: 100%;
    /* max-width: 600rpx; */
    /* background-color: #FFF;
    border-radius: 24px; */
    display: flex;
    align-items: center;
    flex-direction: column;
    background: url('http://159.138.147.87/statics/img/player_dialog_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    padding:40rpx 50rpx 90rpx 50rpx;
    box-sizing: border-box;
    transform: translateY(20px);
    transition: .3s ease;
    transition-property: transform;
}

.dialog-header {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.dialog-header>text {
    font-size: 34rpx;
    font-weight: bold;
}

.dialog-header>image {
    width: 48rpx;
    min-width: 48rpx;
    height: 48rpx;
}
.dialog-title{
    font-size: 50rpx;
}
.dialog-content {
    padding: 20rpx 0;
    color: #747474;
    font-size: 28rpx;
    font-weight: 600;
}

.dialog-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24rpx;
    margin-top: 40rpx;
}

.theme-button {
    width: 245rpx;
    line-height: 94.5rpx;
    font-size: 28rpx;
    border-radius: 16px;
    font-weight: bold;
    background: url('http://159.138.147.87/statics/img/player_dialog_btn1.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.cancel-button {
    background: #D8D8D8;
    color: #FFFFFF;
}
.theme-button-clear{
    position: absolute;
    width: 185rpx;
    height: 95.5rpx;
    background: url('http://159.138.147.87/statics/img/player_dialog_btn2.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    filter: brightness(100) contrast(100%) opacity(0.5);
}
.input-box{
    width: 500rpx;
    height: 100rpx;
    background: url('http://159.138.147.87/statics/img/dialog_input_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    font-weight: 600;
    color: #842800;
}
</style>