<script setup lang='ts'>
import dmDialog from '@/package_nzgx/components/dmDialog.vue';
import { computed, ref } from 'vue';
import { charactersStore } from '@/package_nzgx/stores';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { addNewItem, scoreChange } from '@/package_nzgx/services/info';
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
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
            // newInfo.flow[newInfo.teamInfo.flowIndex + 1].status = 1
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
                newInfo.flow[newInfo.teamInfo.flowIndex].status = 2
                newInfo.flow[newInfo.teamInfo.flowIndex + 1].status = 1
                updateInfo(newInfo)
            }
        }
    }
}

const onConfirm = ref<Function>();
const onChangeDetail = (ev: any, item: any, index: number) => {
    // 如果当前状态是 2 或 3，直接返回，不执行后续逻辑
    if (item.status === 2 || item.status === 3) return;
    const { flow, teamInfo, characters } = memberStore.info;
    const currentFlow = flow[teamInfo.flowIndex].inner[index];
    const previousFlow = flow[teamInfo.flowIndex].inner[index - 1];
    if (currentFlow.title === '开启逐风') {
        currentFlow.status = 3;
        currentFlow.isSwitchOn = true;
        updateInfo(memberStore.info);
        dialogObj.value.type = currentFlow.title;
        return
    }
    const showWarning = () => {
        updateSwitch.value = false;
        setTimeout(() => {
            updateSwitch.value = true;
        }, 0);
        ShowToast('请按照游戏流程逐步开启');
    };

    // 提前执行逻辑判断
    if (currentFlow.title === '个人线索发放+个人问题') {
        if (!(previousFlow.status === 3 && currentFlow.status === 0)) {
            showWarning();
            return; // 如果不满足条件，阻止弹窗的显示
        }
    } else if (!(previousFlow.title === '个人线索发放+个人问题' || previousFlow.status === 3)) {
        showWarning();
        return; // 如果不满足条件，阻止弹窗的显示
    }

    // 如果前面的判断通过，显示确认弹窗
    dialogObj.value.title = '注意';
    dialogObj.value.content = '确认开启下一环节吗，开启后不可返回';
    dialogObj.value.confirmText = '确认';
    dialogObj.value.cancelText = '取消';
    dialogObj.value.type = '开启下一环节'
    updateSwitch.value = false;
    setTimeout(() => {
        updateSwitch.value = true;
    }, 0);
    showDialog();

    onConfirm.value = () => {
        console.log(index);

        if (!ev.detail.value) return;

        const updateFlowStatus = (status: number, isSwitchOn: boolean) => {
            currentFlow.status = status;
            currentFlow.isSwitchOn = isSwitchOn;
            updateInfo(memberStore.info);
            dialogObj.value.type = currentFlow.title;
        };

        const addCluesAndMasks = () => {
            currentFlow.clues.forEach(element => {
                addNewItem(0, element, 1, 'clues', '')
            });
            currentFlow.content.forEach(element => {
                characters[element.userIndex].mask.push({
                    qa: element.qalist,
                    isRead: false,
                    isNew: true,
                    isError: false,
                    type: -1,
                });
            });
        };

        if (currentFlow.title === '个人线索发放+个人问题') {
            if (previousFlow.status === 3 && currentFlow.status === 0) {
                addCluesAndMasks();
                updateFlowStatus(2, true);
            }
        } else if (currentFlow.title === '开启逐风') {
            updateFlowStatus(3, true);
        } else {
            if (previousFlow.title === '个人线索发放+个人问题' || previousFlow.status === 3) {
                updateFlowStatus(2, true);
            }
        }
    };
};


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
const showQaDialog = (index: number, qa: any, userIndex: number, deepclue: string, clue: string) => {
    dialogObj.value.title = '注意'
    dialogObj.value.content = '请DM确认向以下用户提问并核对答案:'
    dialogObj.value.confirmText = '回答正确'
    dialogObj.value.cancelText = '回答错误'
    dialogObj.value.qa_index = index
    dialogObj.value.type = '个人线索发放+个人问题'
    dialogObj.value.userIndex = userIndex
    dialogObj.value.qa = qa
    dialogObj.value.deepClue = deepclue
    dialogObj.value.clue = clue
    showDialog()
}
const statusText = ref(['待开启', '待开启', '进行中', '已完成'])
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
    deepClue: '',
    zst_index: 0,
    qa_index: 0,
    userIndex: 0,
    qa: []
})

const getContent = (title: string) => {
    return computed(() => memberStore.info?.flow[memberStore.info.teamInfo.flowIndex].inner?.find((item: { title: string; }) => item.title === title)?.content ?? null);
};
const zfContent = getContent('开启逐风');
const zstContent = getContent('找尸体');
const grContent = getContent('个人线索发放+个人问题');
const ypContent = getContent('音频搜证');
const dtContent = getContent('地图搜证');
const glContent = getContent('卦灵');
const fyContent = getContent('封印动画');
const fyContent2 = getContent('封印动画2');
const aa = () => {
    console.log(ypContent)
}
const matchResult = (result: string) => {
    memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '音频搜证').content[matchIndex.value].result = result
    if (result === '验证成功') {
        memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '音频搜证').content[matchIndex.value].status = 3
        for (let index = 0; index < 6; index++) {
            memberStore.info.characters[index].cueset.audio.push({
                name: ypContent.value[matchIndex.value].clue,
                isNew: ypContent.value[matchIndex.value].users.includes(index),
                deepClue: '',
                type: 0
            })
        }
    }
    const allStatusAreThree = memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '音频搜证').content.every(item => item.status === 3);
    console.log(allStatusAreThree)
    // 如果所有 status 都为 3，则将最外层的 status 设置为 3
    if (allStatusAreThree) {
        memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '音频搜证').status = 3;
    }
    updateInfo(memberStore.info);
}
const match = (canMatch: boolean, currentContent: any, allContent: any) => {
    if (!canMatch) {
        console.log("匹配失败");
        return;
    }

    const currentUsers = [...currentContent.users].sort((a, b) => a - b);
    const currentAnser = [...currentContent.anser].sort((a, b) => a - b);

    let foundPartialMatch = false;
    let missingUser = null;
    let foundInOtherLocation = false;

    // 检查 currentContent 内部的完全匹配和部分匹配
    if (JSON.stringify(currentUsers) === JSON.stringify(currentAnser)) {
        matchResult("验证成功");
        return;
    } else {
        const partialMatch = currentUsers.filter(user => currentAnser.includes(user));
        if (partialMatch.length > 0) {
            foundPartialMatch = true;

            const missing = currentUsers.filter(user => !currentAnser.includes(user));
            if (missing.length === 1) {
                missingUser = missing[0];
            }
        }
    }

    // 检查在其他地点是否有匹配
    for (const location of allContent) {
        if (location.name === currentContent.name) {
            continue;
        }

        const locationAnser = [...location.anser].sort((a, b) => a - b);
        const commonUsers = currentUsers.filter(user => locationAnser.includes(user));

        if (commonUsers.length > 0) {
            foundInOtherLocation = true;
            break;
        }
    }

    // 根据检查结果输出消息
    if (foundPartialMatch) {
        if (missingUser !== null) {
            matchResult(`这里似乎没有${memberStore.info.characters[missingUser].name}的声音。`);
        } else {
            matchResult("换个地方试试吧。");
        }
    } else if (foundInOtherLocation) {
        matchResult("换个地方试试吧。");
    } else {
        matchResult("TA们似乎没有在此处对话过。");
    }
}
// 关闭弹窗
const closeDialog = () => {
    dialogObj.value.dialogVisible = false
}

const showDialog = () => {
    dialogObj.value.dialogVisible = true
}
const openhy = (index: number) => {
    memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '卦灵').content.hy.status = 2
    updateInfo(memberStore.info);
    uni.navigateTo({
        url: `/package_nzgx/pages/dm/questionnaire?name=${glContent.value.hy.name}&index=${index}`
    })
}
const openxa = (index: number) => {
    if (glContent.value.hy.canReplay) {
        memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '卦灵').content.hy.status = 3
        memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '卦灵').content.xa.status = 2
        updateInfo(memberStore.info);
        uni.navigateTo({
            url: `/package_nzgx/pages/dm/questionnaire?name=${glContent.value.xa.name}&index=${index}`
        })
    } else {
        uni.showToast({ icon: 'none', title: '请先完成还原问卷' })
    }
}
const goAllReplay = (index: number) => {
    uni.navigateTo({
        url: `/package_nzgx/pages/dm/questionnaire?name=all&index=${index}`
    })
}
</script>

<template>

    <view class="mask flex-row-center" v-show="isShowToast">
        <view class="toast flex-row-center">{{ toastContent }}</view>
    </view>

    <dmDialog :dialogObj="dialogObj" @cancel="closeDialog" @confirm="closeDialog" :onConfirm='onConfirm' />

    <!-- 三次魂穿+海报分享 -->
    <view style="padding-bottom: 300rpx;" @tap="aa">
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
                <view @tap="goAllReplay(index)" v-show="item.status === 3" class="button fupan-button">卦灵复盘</view>
            </view>

            <!-- 魂穿任务 -->
            <view class="flex-column-sb  hunchuan-details-box" v-show="item.status === 2 && index !== 3">

                <view class="hunchuan-details" :class="'hunchuan-box-' + (detail.status === 3 ? 3 : '01')"
                    v-for="(detail, detailIndex) in memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner"
                    :key="detail.title">

                    <!-- 具体魂穿任务名称和状态 -->
                    <view class="flex-row-sb task-box">
                        <view> {{ detailIndex + 1 }}.&nbsp;{{ detail.title }}</view>
                        <switch v-if="updateSwitch" class="switch" :checked="detail.status === 3 || detail.status === 2"
                            :disabled="detail.status === 3 || detail.status === 2"
                            @change="onChangeDetail($event, detail, detailIndex)" />
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
                            <view @tap="showQaDialog(qa_index, qa.qalist, qa.userIndex, qa.deepClue, qa.clue)"
                                class="flex-column-sb-center gap-10" v-for="(qa, qa_index) in detail.content">
                                <img class="avatar" :src="memberStore.info.characters[qa.userIndex].avatar" alt="">
                                <text>{{ memberStore.info.characters[qa.userIndex].name }}</text>
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
                                    class="evidence-box-location flex-row-center">{{ item.name }}</view>
                            </view>
                        </view>

                        <view class="flex-row-center evidence-avatar-box">
                            <view class="flex-column-sb-center gap-10" v-for="(item, index) in 2">
                                <img v-if="ypContent[matchIndex].users[index] !== -1" class="avatar"
                                    :src="memberStore.info.characters[ypContent[matchIndex].users[index]].avatar"
                                    alt="">
                                <view v-else class="avatar evidence-avatar">
                                </view>
                                <text v-if="ypContent[matchIndex].users[index] !== -1">{{
                                    memberStore.info.characters[ypContent[matchIndex].users[index]].name
                                    }}</text>
                                <text v-else>&nbsp;</text>
                            </view>
                        </view>
                        <view class="button"
                            @tap="match((ypContent[matchIndex].users[0] !== -1 && ypContent[matchIndex].users[1] !== -1), ypContent[matchIndex], ypContent)"
                            :style="{ background: (ypContent[matchIndex].users[0] !== -1 && ypContent[matchIndex].users[1] !== -1) ? '#8AEB99' : ' linear-gradient(90deg, #F09235 0%, #EA6A00 100%)' }">
                            匹配判断 </view>
                    </view>

                    <!-- 卦灵 -->
                    <view v-if="detail.status === 2 && detail.title === '卦灵'">
                        <view class="survey-box flex-row-center" @tap="openhy(index)">
                            <text class="absolute-center survey-title">{{ glContent.hy.name }}</text>
                            <view class="flex-row-center status survey-status" :class="'status-' + glContent.hy.status">
                                {{
                                    statusText[glContent.hy.status] }}</view>
                        </view>
                        <view class="survey-box flex-row-center" @tap="openxa(index)">
                            <text class="absolute-center survey-title">{{ glContent.xa.name }}</text>
                            <view class="flex-row-center status survey-status" :class="'status-' + glContent.xa.status">
                                {{
                                    statusText[glContent.xa.status] }}</view>
                        </view>
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