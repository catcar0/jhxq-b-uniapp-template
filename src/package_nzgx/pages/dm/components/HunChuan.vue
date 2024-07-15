<script setup lang='ts'>
import dmDialog from '@/package_nzgx/components/dmDialog.vue';
import { ref } from 'vue';

const isShowToast = ref(false)
const toastContent = ref('')
const ShowToast = (content:string) =>{
    isShowToast.value = true
    toastContent.value = content
    setTimeout(() => {
        isShowToast.value = false
    }, 1000);
}
const dialogObj = ref({
    dialogVisible: false,
    title: '注意',
    content: 'aa',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: true, // 是否显示按钮
    qa: {
        user: [1, 2],
        qalist: [
            {
                question: '问题1',
                answer: '答案1'
            },
            {
                question: '问题2',
                answer: '答案2'
            }
        ]
    }
})

// 关闭弹窗
const closeDialog = () => {
    dialogObj.value.dialogVisible = false
}

const showDialog = () => {
    dialogObj.value.dialogVisible = true
}
</script>

<template>
    <view class="mask flex-row-center" v-show="isShowToast">
        <view class="toast flex-row-center">{{ toastContent }}</view>
    </view>
    <dmDialog :dialogObj="dialogObj" @cancel="closeDialog" />
    <view class="hunchuan flex-row-sb shadow-box" v-for="item in 4">
        <view class="info">
            <text @tap="ShowToast('你好')" class="name almm">第一次魂穿</text>
            <view @tap="showDialog" class="status flex-row-center">待开启</view>
        </view>
        <switch class="switch " :checked="true" @change="" />
    </view>
</template>

<style scoped>
.hunchuan {
    width: 680rpx;
    aspect-ratio: 5.9/1;
    margin-bottom: 20rpx;
    padding: 0 30rpx;
}

.name {
    font-size: 28rpx;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 15rpx;
}

.status {
    width: 80rpx;
    aspect-ratio: 3.28/1;
    border-radius: 80rpx 80rpx 80rpx 0px;
    background: #FFE45B;
    font-size: 17rpx;
    color: #FFFFFF;
}

.switch {
    margin-right: -40rpx;
    transform: scale(0.7);
}
.mask{
    z-index: 9999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
.toast{
    width: 680rpx;
    aspect-ratio: 4.46/1;
    border-radius: 28rpx;
    background-color: rgba(0, 0, 0, 0.6);
    color: #FFFFFF;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.09);
}
</style>