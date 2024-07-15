<script setup lang='ts'>
import { setPageOverflow } from '@/utils/uniUtils';
import { computed, onUnmounted, watch } from 'vue';

const props = withDefaults(defineProps<{
    show: boolean,
    title?: string,
    showCancel?: boolean,
    cancelText?: string,
    confirmText?: string,
}>(), {
    title: '提示',
    showCancel: true,
    cancelText: '取消',
    confirmText: '确认'
})

const emit = defineEmits(["update:show", "confirm", "cancel"]);

watch(() => props.show, (value) => {
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
</script>

<template>
    <view class="dialog-mask" :class="{ show: show }">
        <view class="dialog-inner">
            <view class="dialog-header">
                <text>{{ title }}</text>
                <image v-if="showCancel" @tap="close" src="@/static/icons/common_close.png" :mode="'widthFix'" />
            </view>
            <view class="dialog-content">
                <slot></slot>
            </view>
            <view class="dialog-control">
                <button v-if="showCancel" @tap="close" class="theme-button cancel-button">{{ cancelText || '取消'
                    }}</button>
                <button @tap="confirm" class="theme-button">{{ confirmText || '确认' }}</button>
            </view>
        </view>
    </view>
</template>

<style scoped>
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
}

.theme-button {
    width: 100%;
    line-height: 100rpx;
    font-size: 28rpx;
    border-radius: 16px;
    font-weight: bold;
}

.theme-button.cancel-button {
    background: #F9F9F9;
    color: #323232;
}
</style>