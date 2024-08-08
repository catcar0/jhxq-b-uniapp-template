<script setup lang='ts'>
import dmDialog from '@/package_nzgx/components/dmDialog.vue';
import { ref } from 'vue';
import { charactersStore } from '@/package_nzgx/stores';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const charactersList = charactersStore().characters
const isShowToast = ref(false)
const toastContent = ref('')
const ShowToast = (content: string) => {
    isShowToast.value = true
    toastContent.value = content
    setTimeout(() => {
        isShowToast.value = false
    }, 1000);
}
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
const updateSwitch = ref(true)
const onChangeHunchuan = (ev: any, item: any, index: number) => {
    if (ev.detail.value) {
        const newInfo = memberStore.info
        if (memberStore.info.teamInfo.flowIndex === 0 && index === 0) {
            newInfo.flow[newInfo.teamInfo.flowIndex].status = 2
            newInfo.flow[newInfo.teamInfo.flowIndex + 1].status = 1
            updateInfo(newInfo)
        } else {
            if (newInfo.flow[index - 1].inner.slice(-1)[0].status === 0) {
                // newInfo.flow[newInfo.teamInfo.flowIndex].isSwitchOn = false
                updateSwitch.value = false
                setTimeout(() => {
                    updateSwitch.value = true
                }, 10);
                ShowToast('请按照游戏流程逐步开启')
            } else {
                newInfo.flow[newInfo.teamInfo.flowIndex].status = 3
                newInfo.teamInfo.flowIndex = index
                updateInfo(newInfo)
            }
        }
    }
}
const onChangeDetail = (ev: any, item: any, index: number) => {
    console.log(index)
    if (ev.detail.value) {
        const newInfo = memberStore.info
        if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].title === '个人线索发放+个人问题') {
            if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index - 1].status === 3) {
                if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status === 0) {
                    for (let index2 = 0; index2 < 12; index2++) {
                        for (let index = 1; index < 6; index++) {
                        newInfo.characters[index].cueset.clues.push(
                        {
                            name: 'clue3',
                            context: '黄鹂',
                            isRead: false,
                            isNew: true,
                            type: 1
                        }
                    )
                        
                    }
                        
                    }
                    newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].content.forEach(element => {
                        newInfo.characters[element.userIndex].cueset.qa.push(
                        {
                            q: '你和李梦是什么关系？为什么你一定要保护她',
                            a: '',
                            isRead: false,
                            isNew: true,
                            type: 0
                        }
                    )
                    });
                }
                newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status = 2
                newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].isSwitchOn = true
                updateInfo(newInfo)
                dialogObj.value.type = newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].title
            } else {
                updateSwitch.value = false
                setTimeout(() => {
                    updateSwitch.value = true
                }, 0);
                ShowToast('请按照游戏流程逐步开启')
            }
        } else if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].title === '开启逐风') {
            newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status = 3
            newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].isSwitchOn = true
            updateInfo(newInfo)
            dialogObj.value.type = newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].title
        }
        else {
            if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index - 1].title === '个人线索发放+个人问题') {
                newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status = 2
                newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].isSwitchOn = true
                updateInfo(newInfo)
                dialogObj.value.type = newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].title
            } else {
                if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index - 1].status === 3) {
                    console.log(newInfo.flow[newInfo.teamInfo.flowIndex].inner[index - 1])
                    newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status = 2
                    newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].isSwitchOn = true
                    updateInfo(newInfo)
                    dialogObj.value.type = newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].title
                } else {
                    updateSwitch.value = false
                    setTimeout(() => {
                        updateSwitch.value = true
                    }, 10);
                    ShowToast('请按照游戏流程逐步开启')
                }
            }
        }
        // if (index === 0) {
        //     newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status = 3
        //     updateInfo(newInfo)
        // } else {
        //     if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index - 1].status === 0) {
        //         if (newInfo.flow[newInfo.teamInfo.flowIndex].inner[index - 1].title = '个人线索发放+个人问题') {
        //             newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status = 2
        //             updateInfo(newInfo)
        //         } else {
        //             updateSwitch.value = false
        //             setTimeout(() => {
        //                 updateSwitch.value = true
        //             }, 10);
        //             ShowToast('请按照游戏流程逐步开启')
        //         }
        //     } else if(newInfo.flow[newInfo.teamInfo.flowIndex].inner[index - 1].status === 3)  {
        //         newInfo.flow[newInfo.teamInfo.flowIndex].inner[index].status = 2
        //         updateInfo(newInfo)
        //     }
        // }
    }
}
const showZstDialog = (location: string, clue: any, zst_index: number) => {
    dialogObj.value.title = '请确认答案'
    dialogObj.value.content = '请DM确认选择该地点的用户回答'
    dialogObj.value.location = location
    dialogObj.value.clue = clue
    dialogObj.value.zst_index = zst_index
    dialogObj.value.confirmText = '回答正确'
    dialogObj.value.cancelText = '回答错误'
    showDialog()
}
const showQaDialog = (index: number) => {
    dialogObj.value.title = '注意'
    dialogObj.value.content = '请DM确认向以下用户提问并核对答案:'
    dialogObj.value.confirmText = '回答正确'
    dialogObj.value.cancelText = '回答错误'
    dialogObj.value.qa_index = index
    dialogObj.value.type = '个人线索发放+个人问题'
    showDialog()
}
const statusText = ref(['待开启', '待开启', '进行中', '已完成'])
const hunchuanList = ref([
    {
        title: '第一次魂穿',
        status: 3
    },
    {
        title: '第二次魂穿',
        status: 1
    },
    {
        title: '第三次魂穿',
        status: 0
    },
    {
        title: '海报分享',
        status: 0
    },
])
const hunchuanDetails: any = ref([
    {
        title: '开启逐风',
        content: [{}],
        status: 0
    },
    {
        title: '找尸体',
        content: [
            {
                location: '后山',
                status: 2
            },
            {
                location: '教室',
                status: 0
            },
            {
                location: '食堂',
                status: 0
            },
            {
                location: '活动楼',
                status: 0
            }
        ],
        status: 0
    },
    {
        title: '个人线索发放+个人问题',
        content: [{}],
        status: 0
    },
    {
        title: '音频搜证',
        content: [
            {
                users: [1, 2],
                location: '后山花坛',
                status: 3,
            },
            {
                users: [3],
                location: '教室',
                status: 0,
            }
        ],
        status: 0
    },
    {
        title: '地图搜证',
        content: [{}],
        status: 0
    },
    {
        title: '卦灵',
        content: [{}],
        status: 0
    },
    {
        title: '封印动画',
        content: [{}],
        status: 0
    },
])
const matchIndex = ref(0)
const dialogObj = ref({
    dialogVisible: false,
    title: '注意',
    content: 'aa',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: true, // 是否显示按钮
    location: '',
    type: '',
    clue: '',
    zst_index: 0,
    qa_index: 0,
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

    <dmDialog :dialogObj="dialogObj" @cancel="closeDialog" @confirm="closeDialog" />

    <!-- 三次魂穿+海报分享 -->
    <view style="padding-bottom: 300rpx;" >
        <view class=" shadow-box" v-for="(item, index) in memberStore.info.flow" :class="'hunchuan-box-' + item.status">

            <!-- 魂穿名称和状态 -->
            <view class="flex-row-sb hunchuan-title ">
                <view class="hunchuan-info">
                    <text @tap="ShowToast('你好')" class="name almm">{{ item.title }}</text>
                    <view class="flex-row-center status" :class="'status-' + item.status">{{
                        statusText[item.status] }}</view>
                </view>
                <switch v-if="updateSwitch" v-show="item.status === 0 || item.status === 1" class="switch"
                    :checked="item.isSwitchOn" @change="onChangeHunchuan($event, item, index)"
                    :disabled="item.status === 3" />
                <view v-show="item.status === 3" class="button fupan-button">卦灵复盘</view>
            </view>

            <!-- 魂穿任务 -->
            <view class="flex-column-sb  hunchuan-details-box" v-show="item.status === 2 && index !== 3" >

                <view class="hunchuan-details" :class="'hunchuan-box-' + (detail.status === 3 ? 3 : '01')"
                    v-for="(detail, detailIndex) in memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner"
                    :key="detail.title">

                    <!-- 具体魂穿任务名称和状态 -->
                    <view class="flex-row-sb task-box">
                        <view> {{ detailIndex + 1 }}.&nbsp;{{ detail.title }}</view>
                        <switch v-if="updateSwitch" class="switch" :checked="detail.isSwitchOn"
                            :disabled="detail.status === 3" @change="onChangeDetail($event, detail, detailIndex)" />
                    </view>

                    <!-- 需要完成的具体任务内容 -->

                    <!-- 找尸体 -->
                    <view v-show="detail.status === 2 && detail.title === '找尸体'" class="flex-row-sb"
                        style="margin-top: 30rpx;">
                        <view @tap="showZstDialog(content_zst.location, content_zst.clue, index_zst)"
                            class="location-box" :class="'hunchuan-box-' + (content_zst.status === 3 ? 3 : '')"
                            style="margin-bottom: 0%;" v-for="(content_zst, index_zst) in detail.content"
                            :key="content_zst.location">
                            <text class="absolute-center">{{ content_zst.location }}</text>
                            <view v-show="content_zst.status === 3" class="flex-row-center status location-status"
                                :class="'status-' + 3">{{
                                    statusText[3] }}</view>
                        </view>
                    </view>

                    <!-- 个人线索发放＋个人问题 -->
                    <view v-if="detail.status === 2 && detail.title === '个人线索发放+个人问题'">
                        <text style="font-size: 24.5rpx;">请DM确认向以下用户提问并核对答案:</text>
                        <view class="flex-row-center qa-box">
                            <view @tap="showQaDialog(qa_index)" class="flex-column-sb-center gap-10"
                                v-for="(qa, qa_index) in detail.content">
                                <img class="avatar" :src="memberStore.info.characters[qa_index + 1].avatar" alt="">
                                <text>{{ memberStore.info.characters[qa_index + 1].name }}</text>
                                <view v-show="qa.status === 3" class="flex-row-center status" :class="'status-' + 3">
                                    {{
                                        statusText[3] }}</view>
                                <view v-show="qa.status === 0" class="flex-row-center status" :class="'status-' + 0">
                                    未完成</view>
                            </view>
                        </view>
                    </view>

                    <!-- 音频搜证 -->
                    <view v-if="detail.status === 2 && detail.title === '音频搜证'" class="evidence-box">

                        <view class="flex-row-sb">
                            <view v-for="(item, index_sz) in detail.content" :key="item.location">
                                <view class="flex-row-center status" :class="'match-status-' + item.status">
                                    <text v-show="item.status === 0">待匹配</text><text
                                        v-show="item.status === 3">已匹配</text>
                                </view>
                                <view @tap="matchIndex = index_sz"
                                    :class='matchIndex == index_sz ? "evidence-box-location-selected" : ""'
                                    class="evidence-box-location flex-row-center">{{ item.location }}</view>
                            </view>
                        </view>

                        <view class="flex-row-center evidence-avatar-box">
                            <view class="flex-column-sb-center gap-10" v-for="(item, index) in 2">
                                <img v-if="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[matchIndex].users[index] !== -1" class="avatar"
                                    :src="memberStore.info.characters[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[matchIndex].users[index]].avatar"
                                    alt="">
                                <view v-else class="avatar evidence-avatar">
                                </view>
                                <text v-if="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[matchIndex].users[index] !== -1">{{
                                    memberStore.info.characters[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[matchIndex].users[index]].name
                                    }}</text>
                                <text v-else>&nbsp;</text>
                            </view>
                        </view>
                        <view class="button"
                            :style="{ background: memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[matchIndex].users.length === 2 ? '#8AEB99' : ' linear-gradient(90deg, #F09235 0%, #EA6A00 100%)' }">
                            匹配判断</view>
                    </view>

                    <!-- 卦灵 -->
                    <view v-show="hunchuanDetails[5].status === 2 && index === 5">
                        <navigator url="/package_nzgx/pages/questionnaire/questionnaire" hover-class="none">
                            <view class="survey-box flex-row-center">
                                <text class="absolute-center survey-title">还原问卷</text>
                                <view class="flex-row-center status survey-status" :class="'status-' + 3">{{
                                    statusText[3] }}</view>
                            </view>
                            <view class="survey-box flex-row-center">
                                <text class="absolute-center survey-title">凶案问卷</text>
                                <view class="flex-row-center status survey-status" :class="'status-' + 3">{{
                                    statusText[3] }}</view>
                            </view>
                        </navigator>
                    </view>
                </view>
            </view>

            <!-- 生成海报 -->
            <view class="flex-column-sb  hunchuan-details-box" v-show="item.status === 2 && index === 3">
                <view class="flex-column-sb-center poster-info">
                    <view class="flex-row-center poster-info-title">信息确认</view>
                    <view style="width: 100%;height: 0rpx;border-bottom: 3rpx dashed #C4C4C4;"></view>
                    <view class="flex-row-sb poster-info-item">
                        <view>店名</view>
                        <view class="flex-row-sb">
                            <view class="poster-info-item-edittext">花椒喜剧</view>
                            <view><img class="edit-icon" src="http://159.138.147.87/statics/img/dm_edit_icon.png"
                                    alt="">
                            </view>
                        </view>
                    </view>
                    <view class="flex-row-sb poster-info-item">
                        <view>DM</view>
                        <view class="flex-row-sb">
                            <view class="poster-info-item-edittext">易达</view>
                            <view><img class="edit-icon" src="http://159.138.147.87/statics/img/dm_edit_icon.png"
                                    alt="">
                            </view>
                        </view>
                    </view>
                </view>
                <view style="width: 90%;margin-bottom: 20rpx;" class="button">生成并发送</view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.poster-info-item-edittext {
    color: #EA6A00;
    margin-right: 20rpx;
}

.poster-info-title {
    height: 50rpx;
    margin-bottom: 30rpx;
}

.poster-info {
    width: 90%;
    background-color: #F7F7F7;
    border-radius: 25rpx;
    padding: 30rpx;
    box-sizing: border-box;
}

.poster-info-item {
    width: 100%;
    background-color: #EEEEEE;
    border-radius: 20rpx;
    height: 90rpx;
    padding: 30rpx;
    box-sizing: border-box;
    margin-top: 30rpx;
}

.edit-icon {
    width: 35rpx;
    height: 35rpx;
    margin-top: 7rpx;
}

.qa-box {
    gap: 200rpx;
    margin-top: 30rpx;
}

.evidence-avatar-box {
    gap: 200rpx;
    margin-top: 30rpx;
    margin-bottom: 30rpx
}

.survey-box {
    width: 100%;
    height: 100rpx;
    background-color: #EEEEEE;
    margin-top: 20rpx;
    border-radius: 24.5rpx;
    overflow: hidden;
}

.survey-title {
    margin-left: 120rpx;
}

.evidence-box-location {
    padding: 10rpx;
}

.evidence-box-location-selected {
    border-bottom: black solid 2rpx;
}

.evidence-box {
    background-color: #EEEEEE;
    padding: 40rpx;
    border-radius: 25rpx;
    margin-top: 20rpx;

}

.evidence-avatar {
    order: 2px dashed #C4C4C4;
    background-color: #EEEEEE;
    box-sizing: border-box;
}

.avatar {
    width: 130rpx;
    height: 130rpx;
    border-radius: 999rpx;
    background-color: #ccc;
}

.avatar-selected {
    background-color: #EA6A00;
}

.location-box {
    width: 122.5rpx;
    height: 84rpx;
    background-color: #EEEEEE;
    border-radius: 20rpx;
    overflow: hidden;
    font-size: 24.5rpx;
}

.task-box {
    /* padding: 25rpx 0; */
    /* height: 0rpx; */
    height: 55rpx;
    font-size: 24.5rpx;
}

.hunchuan-title {
    width: 680rpx;
    aspect-ratio: 5.9/1;
    margin-bottom: 20rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
}

.hunchuan-details-box {
    gap: 6.5rpx;
    align-items: center;
    padding-bottom: 11.5rpx;
    margin-top: -23rpx;
}

.hunchuan-details {
    width: 612.5rpx;
    background-color: #F7F7F7;
    border-radius: 28rpx;
    /* height: 101.5rpx; */
    padding: 24.5rpx 39.5rpx 24.5rpx 24.5rpx;
    box-sizing: border-box;
}

.name {
    font-size: 28rpx;
}

.hunchuan-info {
    display: flex;
    flex-direction: column;
    gap: 15rpx;
}

.status {
    width: 80rpx;
    aspect-ratio: 3.28/1;
    border-radius: 80rpx 80rpx 80rpx 0px;
    /* background: #FFE45B; */
    font-size: 17rpx;
    color: #FFFFFF;
}

.location-status {
    margin-top: 60rpx;
    margin-left: 45rpx;
}

.survey-status {
    margin-left: 470rpx;
    margin-top: 70rpx;
}

.match-status-0 {
    background-color: #C4C4C4;
}

.match-status-3 {
    background-color: #8AEB99;
}

.status-0 {
    background: #E4E4E4;
}

.status-1 {
    background: #FFE45B;
}

.status-2 {
    background: #8AEB99;
}

.status-3 {
    background: #EA6A00;
}

.hunchuan-box-01 {
    background-color: #F7F7F7;
    margin-bottom: 24.5rpx;
}

.hunchuan-box-0 {
    background-color: #F0F0F0;
    margin-bottom: 24.5rpx;
}

.hunchuan-box-1 {
    background-color: #FFFFFF;
    margin-bottom: 24.5rpx;
}

.hunchuan-box-2 {
    background-color: #FFFFFF;
    margin-bottom: 24.5rpx;
}

.hunchuan-box-3 {
    background: linear-gradient(0deg, rgba(234, 106, 0, 0.12), rgba(234, 106, 0, 0.12)), #F7F7F7;
    margin-bottom: 24.5rpx;
}

.switch {
    margin-right: -40rpx;
    transform: scale(0.7);
}

.mask {
    z-index: 9999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
}

.toast {
    width: 680rpx;
    aspect-ratio: 4.46/1;
    border-radius: 28rpx;
    background-color: rgba(0, 0, 0, 0.6);
    color: #FFFFFF;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.09);
}

.fupan-button {
    width: 108rpx;
    height: 49rpx;
    border-radius: 17.5rpx;
    font-size: 17.5rpx;
}
</style>