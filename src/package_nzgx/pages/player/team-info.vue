<script setup lang='ts'>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const updateInfo = (info: any) => {
  webSocketStore.gameSend(
    info
  )
}
const fun = (content: any) => {
  const newInfo = memberStore.info
  newInfo.aa.bb = content
  updateInfo(newInfo)
}

const props = defineProps({
    dialogObj: Object
});

const emit = defineEmits(['updateDialogObj']);

const modifyDialog = () => {
    dialogObj.value.dialogVisible = true
    emit('updateDialogObj', dialogObj);
};
const rankList = [
    {
        name: '小分队1',
        rank: 1,
        status: 1,
        time: '2024.09.09',
        level: 350
    },
    {
        name: '小分队2',
        rank: 9,
        status: 1,
        time: '2024.09.09',
        level: 250
    },
    {
        name: memberStore.info.teamInfo.name + '小分队',
        rank: 10,
        status: 0,
        time: '2024.09.09',
        level: memberStore.info.teamInfo.scores
    }
]
const dialogObj = ref({
    dialogVisible: false,
    title: '请输入您的昵称',
    content: '推荐使用昵称不超过五个字',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: false, // 是否显示按钮
    type: 'changeTeamName',
})


const showDialog = (e: any) => {
    console.log(e)
    dialogObj.value.dialogVisible = true
}
</script>

<template>
    <view class="team-info">
        <view class="user-avatar">
            <img class="user-avatar-img" src="http://159.138.147.87/statics/img/avatar_frame.png" alt="">
        </view>
        <view class="character-avatar">
            <img class="character-avatar-img" src="http://159.138.147.87/statics/img/avatar1.png" alt="">
        </view>

        <view class="team-info-box">
            <view class="staff-info flex-column-sb ">
                <view class="player-title hyshtj ">
                    <view class="font-player-gradient1">职员信息</view>
                </view>
                <view class="user-name font-player-gradient1" @tap="modifyDialog">
                    <!-- 厨师沙拉 -->
                    {{ memberStore.info.characters[memberStore.virtualRoleId].user }}
                    <img class="edit-icon" src="http://159.138.147.87/statics/img/edit_icon.png" alt="">
                </view>
                <view class="team-name font-player-gradient1">
                    啥都接公司:天下无敌第一小分队
                </view>
                <view class="team-level font-player-gradient1">
                    队伍等级:
                    <img class="level-icon" src="http://159.138.147.87/statics/img/wu.png" alt="">
                </view>
                <view class="exp font-player-gradient1">
                    个人经验:
                    <view class="exp-icon"></view>
                    <img class="ding-icon" src="http://159.138.147.87/statics/img/ding.png" alt="">
                </view>
            </view>

            <view class="rank-info">
                <view class="player-title hyshtj">
                    <view class="font-player-gradient1">排行榜</view>
                </view>
                <view class="rank-box ">
                    <view class="make-old"></view>
                    <view :class="index === 0 ? 'rank-box-item-first' : 'rank-box-item'"
                        v-for="(item, index) in rankList" :key="index">
                        <view class="flex-row-sb"
                            :class="index + 1 === rankList.length ? 'rank-box-item-me' : 'rank-box-item-other'">
                            <view class="flex-column-sb rank-box-left">
                                <view class="font-player-gradient1">{{ item.name }}</view>
                                <view>
                                    <view class="font-player-gradient1">分区第 {{ item.rank }} 名</view>
                                    <view v-if="item.status === 1">
                                        <img class="rank-status-icon"
                                            src="http://159.138.147.87/statics/img/completed_icon.png" alt="">
                                        <text class="font-player-gradient1">完成时间: {{ item.time }}</text>
                                    </view>
                                    <view v-else>
                                        <img class="rank-status-icon"
                                            src="http://159.138.147.87/statics/img/underway_icon.png" alt="">
                                        <text class="underway-text">任务进行中</text>
                                    </view>
                                </view>
                            </view>
                            <view v-if="item.level < 100" class="team-rank-level "
                                :class="item.status === 1 ? 'team-rank-level-bg0' : 'team-rank-level-bg1'">
                                <img class="team-rank-level-icon" src="http://159.138.147.87/statics/img/wu.png" alt="">
                            </view>
                            <view v-if="item.level < 300 && item.level > 200" class="team-rank-level "
                                :class="item.status === 1 ? 'team-rank-level-bg0' : 'team-rank-level-bg1'">
                                <img class="team-rank-level-icon" src="http://159.138.147.87/statics/img/di.png" alt="">
                            </view>
                            <view v-if="item.level < 400 && item.level > 300" class="team-rank-level "
                                :class="item.status === 1 ? 'team-rank-level-bg0' : 'team-rank-level-bg1'">
                                <img class="team-rank-level-icon" src="http://159.138.147.87/statics/img/tian.png"
                                    alt="">
                            </view>
                        </view>
                        <view class="flex-row-center" style="height: 20rpx;" v-if="index === 0">...</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.make-old {
    position: absolute;
    z-index: 11;
    transform: rotate(2deg);
    height: 650rpx;
    width: 100%;
    margin-top: -10rpx;
    margin-left: -30rpx;
    background: url('http://159.138.147.87/statics/img/make_old.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    filter: invert(0.7) sepia(1) saturate(2) hue-rotate(-20deg) brightness(0.9) opacity(1);
}

.team-info {
    font-weight: 600;
    width: 100%;
    height: 100vh;
    background: url('http://159.138.147.87/statics/img/teaminfo_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.staff-info {
    height: 340rpx
}

.rank-info {
    margin-top: 50rpx;
}

.exp {
    display: flex;
    align-items: center;
}

.rank-box {
    width: 665rpx;
    padding: 20rpx;
    box-sizing: border-box;
}

.rank-box-left {
    height: 145rpx;
}

.rank-box-item {
    height: 175rpx;
    position: relative;
    z-index: 12;
}

.rank-box-item-other {
    border: 2rpx solid #D4AA6E;
    box-sizing: border-box;
    margin-top: 20rpx;
    border-left: none;
    border-right: none;
}

.rank-box-item-me {
    border: 4rpx solid #BE3700;
    box-sizing: border-box;
    margin-top: 20rpx;
    border-left: none;
    border-right: none;
}

.rank-box-item-first {
    position: relative;
    z-index: 12;
    height: 195rpx;
}

.team-rank-level {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 15rpx 0;
    box-sizing: border-box;
    height: 100%;
    background-position: 0rpx 20rpx;
    background-size: 175rpx 155rpx;
    height: 175rpx;
    width: 175rpx;
}

.team-rank-level-bg0 {
    background: url('http://159.138.147.87/statics/img/circle1.png') no-repeat;
    background-size: 110% 100%;
    background-position: center;
}

.team-rank-level-bg1 {
    background: url('http://159.138.147.87/statics/img/circle2.png') no-repeat;
    background-size: 115% 100%;
    background-position: center;
}

.user-avatar {
    position: fixed;
    right: 10rpx;
    top: 30rpx;
    z-index: 1;
    width: 300rpx;
    height: 360rpx;
    background: url('http://159.138.147.87/statics/img/jcw.jpg') no-repeat;
    background-size: 86% 72%;
    background-position: 22rpx 31rpx;
    z-index: 2;
    box-sizing: border-box;
}

.user-avatar-img {
    width: 300rpx;
    height: 360rpx;
}

.character-avatar {
    position: fixed;
    right: 40rpx;
    top: 270rpx;
    z-index: 2;
}

.character-avatar-img {
    width: 224rpx;
    height: 266rpx;
}

.team-info-box {
    position: absolute;
    top: 180rpx;
    padding-left: 30rpx;
    transform: rotate(-2deg);
}



.user-name {
    font-size: 35rpx;
    display: flex;
    align-items: center;
    gap: 10rpx;
}

.team-name {}

.team-level {
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.edit-icon {
    width: 38.5rpx;
    height: 40rpx;
}

.level-icon {
    width: 52.5rpx;
    height: 52.5rpx;
}

.team-rank-level-icon {
    width: 100rpx;
    height: 100rpx;
}

.exp-icon {
    width: 250rpx;
    height: 20rpx;
    margin-left: 30rpx;
    margin-top: 5rpx;
    background-color: rgba(194, 147, 79, 80);
}

.ding-icon {
    width: 65.5rpx;
    height: 60.5rpx;
    margin-left: -30rpx;
}

.rank-status-icon {
    width: 20rpx;
    height: 20rpx;
}

.underway-text {
    color: #228300;
}
</style>