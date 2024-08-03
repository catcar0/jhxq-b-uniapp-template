<script setup lang='ts'>
import { setPageOverflow } from '@/utils/uniUtils';
import { computed, onUnmounted, ref, watch } from 'vue';
import type { DmDialog } from '@/package_nzgx/types/dialog'
import { charactersStore } from '@/package_nzgx/stores';
const charactersList = charactersStore().characters
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
    emit('confirm');
}
const zstselectIndex = ref<number>(0)
const zstSelectUser = (index: number) => {
    zstselectIndex.value = index
}
</script>

<template>
    <view class="dialog-mask" :class="{ show: dialogObj.dialogVisible }">
        <view class="dialog-inner">
            <view class="dialog-header">
                <text>{{ dialogObj.title }}</text>
                <!-- <image v-if="dialogObj.showCancel" @tap="close" src="@/static/icons/common_close.png"
                    :mode="'widthFix'" /> -->
            </view>
            <view class="dialog-content">
                {{ dialogObj.content }}
            </view>

            <!-- 找尸体地点 -->
            <view v-show="dialogObj.type === '找尸体'">
                <view style="width: 100%;height: 200prx;" class="flex-row-center">
                    <img class="big-avatar" :src="charactersList[zstselectIndex!].avatar" alt="">
                </view>
                <view style="width: 100%;height: 170rpx;font-size: 36rpx;" class="flex-row-center">{{ dialogObj.location }}</view>
                <view class="flex-row-sb">
                    <view @tap="zstSelectUser(index)" v-for="(item, index) in charactersList" :key="item.name">
                        <img class="avatar" :class="zstselectIndex == index ? 'avatar-selected' : ''" :src="item.avatar"
                            alt="">
                    </view>
                </view>
            </view>
            <!-- 个人线索发放＋个人问题 -->
            <view v-show="dialogObj.type === '个人线索发放+个人问题'">
                <view class="flex-row-center" style="gap: 200rpx;margin-top: 30rpx;">
                    <view class="flex-column-sb-center" style="gap:10rpx" v-for="(item, index) in dialogObj.qa?.user">
                        <img class="qa-avatar" :src="charactersList[item].avatar" alt="">
                        <text>{{ charactersList[item].name }}</text>
                    </view>
                </view>
                <view v-for="item in dialogObj.qa?.qalist">
                    <view>Q:{{ item.question }}</view>
                    <text style="text-decoration: underline;">A:{{ item.answer}}</text>
                </view>
            </view>

            <view class="dialog-control">
                <button @tap="confirm" class="theme-button button">{{ dialogObj.confirmText || '确认' }}</button>
                <button v-if="dialogObj.showCancel" @tap="close" class="theme-button cancel-button">{{
                    dialogObj.cancelText || '取消'
                }}</button>
            </view>
        </view>
    </view>
</template>

<style scoped>
.big-avatar{
    width: 200rpx;
    height: 200rpx;
    border-radius: 999rpx;
    background-color: #C4C4C4;
}
.avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 999rpx;
    border: #C4C4C4 solid 2px;
    box-sizing: border-box;
}

.avatar-selected {
    background-color: #EA6A00;
}

.qa-avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 999rpx;
    background-color: #C4C4C4;
}

.qa-avatar-selected {
    background-color: #EA6A00;
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
    background-color: #FFF;
    border-radius: 24px;
    padding: 40rpx;
    box-sizing: border-box;
    transform: translateY(20px);
    transition: .3s ease;
    transition-property: transform;
}

.dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

.dialog-content {
    padding: 30rpx 0;
    color: #747474;
    font-size: 28rpx;
}

.dialog-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24rpx;
    margin-top: 40rpx;
}

.theme-button {
    width: 100%;
    line-height: 100rpx;
    font-size: 28rpx;
    border-radius: 16px;
    font-weight: bold;
}

.cancel-button {
    background: #D8D8D8;
    color: #FFFFFF;
}
</style>