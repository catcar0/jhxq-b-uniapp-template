<script setup lang='ts'>
import { computed, ref } from 'vue';
import { charactersStore } from '@/package_nzgx/stores';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { allClues } from '@/package_nzgx/services/clues';
import { onLoad } from "@dcloudio/uni-app";
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const emit = defineEmits(['updateDialogObj']);
const modifyDialog = () => {
    dialogObj.value.dialogVisible = true
    emit('updateDialogObj', dialogObj);
};
const dialogObj = ref({
    dialogVisible: false,
    title: '请输入您的昵称',
    content: '推荐使用昵称不超过五个字',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: false, // 是否显示按钮
    type: 'changeTeamName',
    hideCloseIcon: false,
    clue: '',
    glstatus: 0,
    gltype: ''
})
const getContent = (title: string) => {
    return computed(() => memberStore.info?.flow[memberStore.info.teamInfo.flowIndex].inner?.find((item: { title: string; }) => item.title === title)?.content ?? null);
};
const btnText = computed(() => {
    console.log(qaList.value.usersSubmit[memberStore.virtualRoleId - 1])
    if (qaList.value.usersSubmit[memberStore.virtualRoleId - 1] === 0) {
        return '确定'
    } else return '再次提交'
})
const glContent = getContent('卦灵');
const glType = ref('')
const qaList = computed(() => {
    if(!glContent.value) return null
    if (glContent.value.xa.status === 1) {
        glType.value = 'hy'
        return glContent.value.hy;
    } else if (glContent.value.xa.status === 2) {
        glType.value = 'xa'
        return glContent.value.xa;
    } else {
        return null; // 或者根据需要返回 undefined
    }
})
const characterIndex = ref(0)
const charactersList = charactersStore().characters
const cluesIndex = ref(-1)
const glIndex = ref(-1)
const addOrUpdate = ref('add')
const updateClueIndex = ref(0)
const avatarIndex = ref(0)
const avatarList = ['clue22', 'clue23', 'clue24', 'clue25', 'clue26', 'clue27',]
const updateClue = (clue: string) => {
    console.log(glType.value, glIndex.value)
    if (addOrUpdate.value === 'add') {
        memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '卦灵').content[glType.value].qa[glIndex.value].usersAnser[memberStore.virtualRoleId - 1].anser.push(
            clue
        )
    } else {
        memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '卦灵').content[glType.value].qa[glIndex.value].usersAnser[memberStore.virtualRoleId - 1].anser[updateClueIndex.value] = clue
    }
    glIndex.value = -1
    updateInfo(memberStore.info)
}
const updateInfo = (info: any) => {
    webSocketStore.gameSend(
        info
    )
}
const submit = (status: number) => {
    if (qaList.value.qa.every((question) => question.usersAnser[memberStore.virtualRoleId - 1].anser.length === 0)) {
        uni.showToast({ icon: 'none', title: '还有问题未作答' })
        return
    }
    // if()
    if (status === 0) {
        dialogObj.value.title = '注意'
        dialogObj.value.content = '确定后数据将上传提交'
    } else {
        dialogObj.value.title = '注意'
        dialogObj.value.content = '确定后数据将再次提交切覆盖上一次提交'
    }
    dialogObj.value.gltype = glType.value
    dialogObj.value.type = 'submit'
    dialogObj.value.glstatus = status
    modifyDialog()
}
</script>

<template>
    <view :class="qaList === null ? 'gualing2' : 'gualing1'">
        <view class="gualing-introduce flex-column-sb-center" v-if="qaList === null">
            <view class="class-title hyshtj">
                卦灵
            </view>
            <img class="gualing-introduce-img" src="http://159.138.147.87/statics/img/turtle_shell.png" alt="">
            <text>
                我是卦灵，我可以帮你们对每一次魂穿获取到的信息进行提问，我会对你们的回答进行逻辑验证。
            </text>
        </view>
        <view class="gualing-inner" v-if="qaList !== null">
            <view class="transform-box">
                <view class="class-title hyshtj">
                    卦灵
                </view>
                <view class="qa-box" v-if="glIndex === -1">
                    <view v-for="(item, index) in qaList.qa" :key="index">
                        <view class="question">{{ item.question }}</view>
                        <view class="anser">

                            <view v-if="item.usersAnser[memberStore.virtualRoleId - 1].anser.length !== 0"
                                v-for="(anser, anser_index) in item.usersAnser[memberStore.virtualRoleId - 1].anser"
                                :key="anser_index">
                                <view class="clues-item"
                                    @tap="addOrUpdate = 'update'; glIndex = index; updateClueIndex = anser_index">

                                    <img v-if="anser.length < 10" class="clue-selected-border2"
                                        src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">

                                    <img v-else class="clue-selected-border5"
                                        src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">

                                    <view v-if="anser.length < 10" class="clue-small-image clue-selected-border1"
                                        :style="{ backgroundImage: `url(http://159.138.147.87/statics/clues/${anser}.png)` }">
                                    </view>
                                    <img v-else class="clue-small-image"
                                        :src="`url(http://159.138.147.87/statics/clues/${anser}.png)`" alt="">

                                </view>
                                <view v-show="item.usersAnser[memberStore.virtualRoleId - 1].status !== 0"
                                    class="verify-icon-box">
                                    <img class="verify-icon" v-show="item.question !== '凶手是谁'"
                                        :src="`http://159.138.147.87/statics/img/${item.usersAnser[memberStore.virtualRoleId - 1].status === 2 ? 'gl_correct_icon' : 'gl_wrong_icon'}.png`"
                                        alt="">
                                    <img class="verify-icon" v-show="item.question === '凶手是谁'"
                                        :src="`http://159.138.147.87/statics/img/${item.usersAnser[memberStore.virtualRoleId - 1].status === 2 ? 'gl_mission_success_icon' : 'gl_mission_fail_icon'}.png`"
                                        alt="">
                                </view>

                            </view>
                            <!-- {{ item.anser.length }}{{ item.usersAnser[memberStore.virtualRoleId - 1].anser.length }} -->
                            <img @tap="addOrUpdate = 'add'; glIndex = index"
                                v-if="item.usersAnser[memberStore.virtualRoleId - 1].anser.length < item.anser.length"
                                class="anser-select-icon" src="http://159.138.147.87/statics/img/gl_select_icon.png"
                                alt="">
                        </view>
                    </view>
                    <view @tap="submit(qaList.usersSubmit[memberStore.virtualRoleId - 1])" class="theme-button button">
                        <view class="theme-button-clear"></view>
                        <view>{{ btnText }}</view>
                    </view>
                </view>

                <view class="select-clue" v-if="glIndex !== -1 && qaList.qa[glIndex].question !== '凶手是谁？' && qaList.qa[glIndex].question !== '谁会担心春天举报成功？'">
                    <view>{{ qaList.qa[glIndex].question }}</view>
                    <scroll-view scroll-y style="height: 60vh;">
                        <img v-if="cluesIndex !== -1" class="clue-big-image"
                            :src="allClues[memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues[cluesIndex].name].url + '.png'"
                            alt="">
                        <view v-if="cluesIndex !== -1" class="flex-row-center clue-text">
                            {{ allClues[memberStore.info.characters[memberStore.virtualRoleId -
                                1].cueset.clues[cluesIndex].name].content1 }}
                            {{ allClues[memberStore.info.characters[memberStore.virtualRoleId -
                            1].cueset.clues[cluesIndex].name].name }}
                        </view>
                        <view class="clues-box flex-row-center">
                            <!-- <view class="make-old2"></view> -->
                            <view
                                v-for="(item, index) in memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues"
                                :key="index">
                                <view @tap="cluesIndex === index ? cluesIndex = -1 : cluesIndex = index"
                                    class="clues-item" :class="cluesIndex === index ? 'clue-selected-border1' : ''">
                                    <img class="clue-selected-border2" v-show="cluesIndex === index"
                                        src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                                    <view class="clue-small-image"
                                        :style="{ backgroundImage: `url(http://159.138.147.87/statics/clues/${item.name}.png)` }">
                                    </view>
                                </view>
                                <view style="padding-top: 15rpx;text-align: center;width: 120rpx;height: 30rpx;">
                                    <text>{{ allClues[item.name].name }}</text>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                    <view
                        @tap="updateClue(memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues[cluesIndex].name)"
                        class="theme-button button">选择
                    </view>
                </view>

                <view class="select-clue" v-if="glIndex !== -1 && (qaList.qa[glIndex].question === '凶手是谁？' || qaList.qa[glIndex].question === '谁会担心春天举报成功？')">
                    <view>{{ qaList.qa[glIndex].question }}</view>
                    <scroll-view scroll-y style="height: 60vh;">
                        <img class="clue-selected-border3" src="http://159.138.147.87/statics/img/cue_seleted2.png" alt="">
                        <img v-if="cluesIndex !== -1" class="clue-big-image"
                            :src="allClues[avatarList[cluesIndex]].url + '.png'" alt="">
                        <view v-if="cluesIndex !== -1" class="flex-row-center clue-text">
                            {{ allClues[avatarList[cluesIndex]].content1 }}
                            {{ allClues[avatarList[cluesIndex]].name }}
                        </view>
                        <view class="clues-box flex-row-center">
                            <!-- <view class="make-old2"></view> -->
                            <view v-for="(item, index) in avatarList" :key="index">
                                <view @tap="cluesIndex === index ? cluesIndex = -1 : cluesIndex = index"
                                    class="clues-item" :class="cluesIndex === index ? 'clue-selected-border1' : ''">
                                    <img class="clue-selected-border2" v-show="cluesIndex === index"
                                        src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                                    <view class="clue-small-image"
                                        :style="{ backgroundImage: `url(http://159.138.147.87/statics/clues/${item}.png)` }">
                                    </view>
                                </view>
                                <view style="padding-top: 15rpx;text-align: center;width: 120rpx;height: 30rpx;">
                                    <text>{{ allClues[item].name }}</text>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                    <view @tap="updateClue(avatarList[cluesIndex])" class="theme-button button">选择
                    </view>
                </view>

            </view>
        </view>
    </view>
</template>

<style scoped>
.verify-icon-box {
    position: absolute;
    margin-top: -120rpx;
    margin-left: 80rpx;
}

.verify-icon {
    width: 276rpx;
    height: 100rpx;
}

.selected-clue {}

.select-clue {
    text-align: center;
}

.clues-item {
    margin-right: 30rpx;
    width: 112rpx;
    height: 112rpx;
    background-color: #CAA16A;
    text-align: center;
    mix-blend-mode:multiply;
}

.clue-text {
    width: 90%;
    font-size: 23rpx;
    font-weight: 600;
    height: 80rpx;
    line-height: 170%;
    text-align: center;
    margin-top: 10rpx;
}

.clue-selected-border1 {
    box-sizing: border-box;
    border: 4rpx solid rgba(194, 147, 79, 70);
}

.clue-selected-border2 {
    position: absolute;
    margin-left: -62rpx;
    margin-top: -8rpx;
    width: 122rpx;
    height: 122rpx;
    transform: rotate(-2deg);
}

.clue-selected-border3 {
    position: absolute;
    width: 280rpx;
    height: 390rpx;
    margin-top: 15rpx;
    transform: rotate(-1deg);
    margin-left: -6rpx;
}

.clue-selected-border4 {
    position: absolute;
    margin-left: -9rpx;
    margin-top: -7rpx;
    width: 132rpx;
    height: 132rpx;
    transform: rotate(-2deg);
}

.clue-selected-border5 {
    position: absolute;
    margin-left: -8rpx;
    margin-top: -6rpx;
    width: 132rpx;
    height: 132rpx;
    transform: rotate(-2deg);
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

.clue-big-image {
    /* margin-left: 150rpx; */
    margin-top: 20rpx;
    width: 270rpx;
    height: 380rpx;
}

.clue-small-image {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /* object-fit:contain; */
}

.transform-box {
    transform: rotate(1deg);
}

.theme-button-clear {
    position: absolute;
    width: 185rpx;
    height: 95.5rpx;
    background: url('http://159.138.147.87/statics/img/player_dialog_btn2.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    filter: brightness(100) contrast(100%) opacity(0.5);
}

.theme-button {
    margin-left: 190rpx;
    margin-top: 40rpx;
    width: 245rpx;
    line-height: 94.5rpx;
    font-size: 28rpx;
    border-radius: 16px;
    font-weight: bold;
    background: url('http://159.138.147.87/statics/img/player_dialog_btn1.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.gualing1 {
    width: 100%;
    height: 100vh;
    background: url('http://159.138.147.87/statics/img/gualing_bg2.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.gualing2 {
    width: 100%;
    height: 100vh;
    background: url('http://159.138.147.87/statics/img/gualing_bg3.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.class-title {
    width: auto;
    min-width: 130rpx;
    height: 70rpx;
    margin-left: -20rpx;
    padding-left: 50rpx;
    font-size: 40.5rpx;
    display: flex;
    align-items: center;
    background: url('http://159.138.147.87/statics/img/teaminfo_title_bg.png') no-repeat;
    background-size: 175rpx 70rpx;
    background-position: left;
}

.gualing-introduce {
    width: 70%;
    margin-left: 15%;
    transform: rotate(-2deg);
    text-align: center;
    padding-top: 150rpx;
    gap: 30rpx;
}

.gualing-introduce-img {
    width: 216rpx;
    height: 216rpx;
}

.gualing-inner {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    padding: 60rpx 170rpx 50rpx 120rpx;
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

.qa-box {
    width: 100%;
}

.question {
    margin-top: 20rpx;
}

.anser {
    background: url('http://159.138.147.87/statics/img/paper3.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    width: 100%;
    height: 150rpx;
    margin-top: 10rpx;
    display: flex;
    align-items: center;
    padding-left: 10rpx;
    box-sizing: border-box;
}

.anser-select-icon {
    width: 110rpx;
    height: 110rpx;
    transform: rotate(-2deg);
}
</style>