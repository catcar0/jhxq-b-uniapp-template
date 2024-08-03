<script setup lang='ts'>
import DMTabBar from "@/components/DM-TabBar/index.vue"
import dmDialog from '@/package_nzgx/components/dmDialog.vue';
import { ref } from "vue";
// 关闭弹窗
const closeDialog = () => {
    dialogObj.value.dialogVisible = false
}

const showDialog = () => {
    dialogObj.value.dialogVisible = true
}
const dialogObj = ref({
    dialogVisible: false,
    title: '注意',
    content: 'aa',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: true, // 是否显示按钮
    location: '',
    type: '',
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
const selectedIndex = ref(0)
const statusList = ref(['待验证','未提交','正确','错误'])
const qaList = ref([
    {
        name:'白鹭',
        content:'一张连环画',
        status:0
    },
    {
        name:'白鹭',
        content:'一张连环画',
        status:1
    },
    {
        name:'白鹭',
        content:'一张连环画',
        status:2
    },
    {
        name:'白鹭',
        content:'一张连环画',
        status:3
    },
    {
        name:'白鹭',
        content:'一张连环画',
        status:0
    },
    {
        name:'白鹭',
        content:'一张连环画',
        status:0
    }
])
</script>

<template>
    <scroll-view scroll-y>
        <view class="questionnaire">
        <!-- 问卷 -->
        <view  class="shadow-box questionnaire-box" >
            <view class="flex-row-sb">
                <view @tap="selectedIndex = index" v-for="(item, index) in 4"
                    :class="selectedIndex === index ? 'question-selected' : 'question-select'">问题{{ index }}</view>
            </view>
            <view style="text-align: center;margin-top: 10rpx;margin-bottom: 10rpx;">问题</view>
            <view class="flex-row-sb" style="margin-top: 20rpx;" v-for="(item, index) in qaList" :key="index">
                <view> {{ item.name }} ：</view>
                <view>{{ item.content }}</view>
                <view class="status flex-row-center" :class="'status-' + item.status" >{{ statusList[item.status] }}</view>
            </view>
        </view>
        <!-- 复盘 -->
        <view v-show="false" class="shadow-box questionnaire-box" > 
            <view style="text-align: center;">问题1-4</view>
            <view>1.asdasd</view>
            <view>2.asdasd</view>
            <view>3.asdasd</view>
            <view>4.asdasd</view>
        </view>
        <view style="margin-top: 30rpx;" class="button">验证全部问题</view>
    </view>
    </scroll-view>
    <dmDialog :dialogObj="dialogObj" @cancel="closeDialog" />
    <DMTabBar></DMTabBar>
</template>

<style scoped>
.questionnaire{
    padding: 2px 35rpx;box-sizing: border-box;
}
.questionnaire-box{
    padding: 30rpx;
}
.question-selected {
    padding: 5rpx;
    box-sizing: border-box;
    border-bottom: 3rpx solid black
}

.question-select {
    padding: 5rpx;
    box-sizing: border-box;
    border-bottom: 3rpx solid #FFFFFF;
}
.status{
    width: 70rpx;
    height: 28rpx;
    box-sizing: border-box;
    font-size: 17.5rpx;
}

.status-0{
    background-color: #AAAAAA;
    color: black;
}
.status-1{
    background-color: #EEEEEE;
    color: black;
}
.status-2{
    background-color: #8AEB99;
    color: black;
}
.status-3{
    background-color: #FE0000;
    color: #FFFFFF;
}
</style>