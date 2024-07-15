<script setup lang='ts'>
import DMTabBar from "@/components/DM-TabBar/index.vue"
import { charactersStore } from '@/package_nzgx/stores';

const charactersList = charactersStore().characters
</script>

<template>
    <view class="team-management">
        <view class="team-info shadow-box flex-column-sb">
            <view class="title flex-row-center info-item almm">队伍信息</view>
            <view class="info-item flex-row-sb">
                <text>名称</text>
                <view class="flex-row-sb orange-font team-name">
                    <text>天下第一小分队</text>
                    <view>修改</view>
                </view>
            </view>
            <view class="info-item flex-row-sb">
                <text>等级</text>
                <view class="orange-font">无</view>
            </view>
        </view>
        <view class="user-box shadow-box flex-column-sb">
            <view class="title flex-row-center info-item almm">玩家列表</view>
            <view v-for="item in charactersList" :key="item.name" class="flex-row-sb user-item">
                <view class="user-item-avatar">
                    <img class="user-item-avatar" :src="item.avatar" alt="">
                </view>
                <view class="user-item-info flex-column-sb">
                    <view class="flex-row-sb">
                        <view class="characters flex-row-sb">
                            <text class="user-name">{{ item.user }}</text>
                            <text class="shi">饰</text>
                            <view class="character-name flex-row-center">{{ item.name }}</view>
                        </view>
                        <text class="ding almm">丁</text>
                    </view>
                    <view class="score-progress">
                        <text class="score">{{ item.score }}</text>
                        <text class="score-max">500</text>
                        <view class="score-progress-bar" :style="{ width: (item.score / 500) * 464 + 'rpx' }">
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    <DMTabBar></DMTabBar>
</template>

<style scoped>
.team-management {
    padding: 2px 35rpx;
    box-sizing: border-box;
}

.team-info {
    aspect-ratio: 2.1/1;
    padding: 17.5rpx 31.5rpx;
    padding-bottom: 40rpx;
}

.title {
    font-size: 31.5rpx;
}

.info-item {
    width: 100%;
    aspect-ratio: 9.25/1;
}

.team-name {
    gap: 20rpx
}

.user-item-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 999rpx;
    background-color: #ccc;
}

.user-item-info {
    width: 464rpx;
    height: 80rpx;
}

.user-box {
    height: 890rpx;
    padding: 30rpx 25rpx;
    margin-top: 30rpx;
}

.user-item {
    width: 631rpx;
    height: 108rpx;
    padding: 0rpx 25rpx;
    box-sizing: border-box;
}

.ding {
    font-size: 28rpx;
}

.shi {
    font-size: 17.4rpx;
}

.user-name {
    font-size: 21rpx;
}

.characters {
    width: 231rpx;
}

.character-name {
    font-size: 21rpx;
    width: 70rpx;
    border-radius: 8.75rpx;
    background-color: #f09235;
    height: 35rpx;
    color: #FFFFFF;
}

.score-progress {
    height: 28rpx;
    background: #ccc;
    box-shadow: none;
    overflow: hidden;
    border-radius: 10rpx !important;
    font-size: 17.4rpx;
    color: #FFFFFF;
}

.score-progress-bar {
    background: #f09235;
    height: 28rpx;
    border-radius: 10rpx !important;
    font-size: 14px;
    line-height: 28rpx;
    color: #fff;
    text-align: center;
}

.score {
    position: absolute;
    margin-top: 5rpx;
    margin-left: 10rpx;
}

.score-max {
    position: absolute;
    margin-left: 425rpx;
    margin-top: 5rpx;
}
</style>