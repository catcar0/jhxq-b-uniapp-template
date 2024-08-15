<script setup lang='ts'>
import DMTabBar from "@/package_nzgx/components/DM-TabBar/index.vue"
import dmDialog from '@/package_nzgx/components/dmDialog.vue';
import { computed, ref } from "vue";
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { allClues } from '@/package_nzgx/services/clues';
import { onLoad, onShow } from "@dcloudio/uni-app";
import { scoreChange } from '@/package_nzgx/services/info';
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const getContent = (title: string) => {
    return computed(() => memberStore.info?.flow[flowIndex.value].inner?.find((item: { title: string; }) => item.title === title)?.content ?? null);
};
const glContent = getContent('卦灵');
// 关闭弹窗
const closeDialog = () => {
    dialogObj.value.dialogVisible = false

}
const confirm = () => {
    if (dialogObj.value.type === 'checkAnswersAndSetStatus') {
        checkAnswersAndSetStatus(qaList.value[0].qa)
    }
    if (dialogObj.value.type === 'giveReplay') {
        console.log(memberStore.info.teamInfo.replay[flowIndex.value],glType.value)
        if (glType.value === 'all'){
            if (replayName.value === '还原问卷') memberStore.info.teamInfo.replay[flowIndex.value].hy = qaList.value[0].replay 
            else memberStore.info.teamInfo.replay[flowIndex.value].xa = qaList.value[1].replay 
        }else memberStore.info.teamInfo.replay[flowIndex.value][glType.value] = qaList.value[0].replay 
    }
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
const flowIndex = ref(0)
const statusList = ref(['未提交', '待验证', '正确', '错误'])
const replayShow = ref(false)
const glType = ref('')
const verifyQa = () => {
    // if(!qaList.value[0].qa.every(question =>question.usersAnswer.every(userAnswer => userAnswer.answer.length === 0))){
    //     uni.showToast({ icon:'none', title: '请待玩家全部作答完毕后再尝试' })
    //     return
    // }
    dialogObj.value.title = '注意'
    dialogObj.value.content = '将会验证所有问题'
    dialogObj.value.type = 'checkAnswersAndSetStatus'
    showDialog()
}
const giveReplay = () => {
    dialogObj.value.title = '注意'
    dialogObj.value.content = '确定要发送复盘给所有玩家吗？更推荐主持人口述。'
    dialogObj.value.type = 'giveReplay'
    showDialog()
}
const updateInfo = (info: any) => {
    webSocketStore.gameSend(
        info
    )
}
const checkAnswersAndSetStatus = (qa: any[]) => {
    qa.forEach(question => {
        const correctAnswers = question.answer.slice().sort(); // 对正确答案进行排序

        // 特殊问题处理：判断问题是否是“凶手是谁”
        if (question.question === '凶手是谁？') {
            let correctUserCount = 0;

            // 统计回答正确的用户数量
            question.usersAnswer.forEach(userAnswer => {
                const userAnswers = userAnswer.answer.slice().sort(); // 对用户答案进行排序
                const isCorrect = correctAnswers.length === userAnswers.length &&
                    correctAnswers.every((answer, index) => answer === userAnswers[index]);

                if (isCorrect) {
                    correctUserCount++;
                }
            });

            // 如果正确的用户人数大于等于 3，所有用户都算回答正确
            if (correctUserCount >= 3) {
                question.usersAnswer.forEach((userAnswer, questionIndex) => {
                    userAnswer.status = 2;
                    scoreChange('user', qaList.value[0].score, [questionIndex]);
                    scoreChange('team', 1, []);
                });
            } else {
                // 如果不满足条件，则按原逻辑处理
                question.usersAnswer.forEach((userAnswer, questionIndex) => {
                    const userAnswers = userAnswer.answer.slice().sort(); // 对用户答案进行排序
                    const isCorrect = correctAnswers.length === userAnswers.length &&
                        correctAnswers.every((answer, index) => answer === userAnswers[index]);

                    if (isCorrect) {
                        userAnswer.status = 2;
                        console.log('score', qaList.value[0].score);
                        scoreChange('user', qaList.value[0].score, [questionIndex]);
                    } else {
                        userAnswer.status = 3;
                        scoreChange('user', (qaList.value[0].score * -0.5), [questionIndex]);
                    }
                });
            }
        } else {
            // 对于其他问题，按原逻辑处理
            question.usersAnswer.forEach((userAnswer, questionIndex) => {
                const userAnswers = userAnswer.answer.slice().sort(); // 对用户答案进行排序
                const isCorrect = correctAnswers.length === userAnswers.length &&
                    correctAnswers.every((answer, index) => answer === userAnswers[index]);

                if (isCorrect) {
                    userAnswer.status = 2;
                    console.log('score', qaList.value[0].score);
                    scoreChange('user', qaList.value[0].score, [questionIndex]);
                } else {
                    userAnswer.status = 3;
                    scoreChange('user', (qaList.value[0].score * -0.5), [questionIndex]);
                }
            });
        }
    });

    if (qaList && qaList.value.length > 0) {
        qaList.value[0].canReplay = true;
        // qaList.value[0].status = 3;
    }

    updateInfo(memberStore.info);
};


const replayContext = ref()
const qaList = computed(() => {
    glContent.value.hy.selectedIndex = 0
    glContent.value.xa.selectedIndex = 0
    if (glType.value === 'hy') {
        return [glContent.value.hy];
    } else if (glType.value === 'xa') {
        return [glContent.value.xa];
    }
    return [glContent.value.hy,glContent.value.xa]; 
});
const replayName = ref('')
const createReplay = (allitem:any) =>{
    replayName.value = allitem.name
    replayShow.value = true
    replayContext.value = allitem.replay
    // qaList.value[0].status = 3
    memberStore.info.flow[flowIndex.value].inner.find((item: { title: string; }) => item.title === '卦灵').content[glType.value].status = 3
    if (glType.value === 'xa') {
        memberStore.info.flow[flowIndex.value].inner.find((item: { title: string; }) => item.title === '卦灵').status = 3
    }
    updateInfo(memberStore.info)
}
// 初次加载时设置 glType.value
onLoad((Option) => {
    const dataKey = Option!.name;
    flowIndex.value =  Option!.index
    if (dataKey === '还原问卷') {
        console.log('hy');
        glType.value = 'hy';
    } else if (dataKey === '凶案问卷') {
        console.log('xa');
        glType.value = 'xa';
    } else {
        glType.value = 'all'
    }
});
onShow(()=>{
    // replayShow.value = false
})
</script>

<template>
    <scroll-view scroll-y>
        <view class="questionnaire">
            <!-- 问卷 -->
            <view v-show="!replayShow" v-if="qaList" v-for="(allitem, index) in qaList">
                <view class="shadow-box questionnaire-box" >
                    <view class="flex-row-sb">
                        <view @tap="allitem.selectedIndex = index" v-for="(item, index) in allitem.qa"
                            :class="allitem.selectedIndex === index ? 'question-selected' : 'question-select'">{{ item.name }}
                        </view>
                    </view>
                    <view style="text-align: center;margin-top: 10rpx;margin-bottom: 10rpx;">
                        {{ allitem.qa[allitem.selectedIndex].question }}</view>
                    <view class="flex-row-sb" style="margin-top: 20rpx;"
                        v-for="(item, index) in allitem.qa[allitem.selectedIndex].usersAnswer" :key="index">
                        <view> {{ memberStore.info.characters[index].name }} ：</view>
                        <view v-if="allitem.usersSubmit[index] !== 0" v-for="(clue,index) in item.answer">
                            {{ allClues[clue].name}}
                        </view>
                        <view v-if="allitem.usersSubmit[index] === 0" class="status flex-row-center"
                            :class="'status-' + item.status">{{ statusList[0] }}</view>
                        <view v-else-if="allitem.usersSubmit[index] !== 0 && item.status === 0"
                            class="status flex-row-center status-1">{{ statusList[1] }}</view>
                        <view v-else class="status flex-row-center" :class="'status-' + item.status">{{
                            statusList[item.status] }}</view>
                    </view>
                </view>
                <view @tap="verifyQa" v-if="allitem.status !== 3 && !allitem.canReplay" style="margin-top: 30rpx;"
                    class="button">验证全部问题</view>

                <view @tap="createReplay(allitem)" v-if="allitem.status !== 3 && allitem.canReplay && !replayShow"
                    style="margin-top: 30rpx;" class="button">生成整体复盘</view>

                <view @tap="createReplay(allitem)" v-if="allitem.status === 3" style="margin-top: 30rpx;" class="button">查看{{ allitem.name ===
                    '还原问卷' ? '还原' : '凶案' }}复盘</view>
            </view>



            <!-- 复盘 -->
            <view v-if="replayShow">
                <view  class="shadow-box questionnaire-box">
                    <view style="text-align: center;">{{ `问题${replayContext[0].charAt(0)}-${replayContext.slice(-1)[0].charAt(0)}` }}</view>
                    <view v-for="(item,index) in replayContext" style="display: flex;margin-top: 30rpx;gap: 20rpx;font-weight: 700;font-size: 25rpx;">
                        <view>{{ item.charAt(0) }}.</view>
                        <view>{{ item.slice(1) }}</view>
                    </view>
                </view>
                <view @tap="giveReplay()" 
                    style="margin-top: 30rpx;" class="button">分发到玩家</view>
            </view>
        </view>
    </scroll-view>
    <dmDialog :dialogObj="dialogObj" @cancel="closeDialog" @confirm="confirm" />
    <DMTabBar></DMTabBar>
</template>

<style scoped>
.questionnaire {
    padding: 2px 35rpx;
    box-sizing: border-box;
}

.questionnaire-box {
    padding: 30rpx;
    margin-top: 30rpx;
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

.status {
    width: 70rpx;
    height: 28rpx;
    box-sizing: border-box;
    font-size: 17.5rpx;
}

.status-0 {
    background-color: #AAAAAA;
    color: black;
}

.status-1 {
    background-color: #EEEEEE;
    color: black;
}

.status-2 {
    background-color: #8AEB99;
    color: black;
}

.status-3 {
    background-color: #FE0000;
    color: #FFFFFF;
}
</style>