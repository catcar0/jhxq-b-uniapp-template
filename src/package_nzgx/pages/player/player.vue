<script setup lang='ts'>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import dmDialog from '@/package_nzgx/components/playerDialog.vue';
import jump from '@/package_nzgx/pages/player/components/jump.vue';
import RoomNumber from './room-number.vue'
import TeamInfo from './team-info.vue'
import ZfMap from './map.vue'
import Gualing from './gualing.vue'
import CueSet from './cue-set.vue'
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { WebSocketService } from '@/package_nzgx/services/WebSocketService';
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const currentPage = ref('RoomNumber')
const dialogObj = ref({
    dialogVisible: false,
    title: '请输入您的昵称',
    content: '推荐使用昵称不超过五个字',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: false, // 是否显示按钮
    type: 'changeTeamName',
    clue: 'clue19',
    hideCloseIcon: false
})
const closeDialog = (val: any) => {
    console.log(val)
    dialogObj.value.dialogVisible = false
}
const confirm = (val: any) => {
    console.log(val)
    dialogObj.value.dialogVisible = false
}
const updateInfo = (info: any) => {
    webSocketStore.gameSend(
        info
    )
}
const updateDialogObj = (newDialogObj: any) => {
    dialogObj.value = newDialogObj.value
}
const pageJump = (val: any) => {
    console.log(val)
    currentPage.value = val
}

watch(() => memberStore.info.characters[memberStore.virtualRoleId - 1].mask, (a, b) => {
    console.log(a, b)
    if (a.length === 0 || b.length === 0) {
        return
    }
    const newqa = memberStore.info.characters[memberStore.virtualRoleId - 1].mask.slice(-1)[0]
    if (newqa.type === 0) {
        if (newqa.isError) {
            dialogObj.value.dialogVisible = true
            dialogObj.value.title = '个人任务失败'
            dialogObj.value.content = '询问一下同伴吧'
            dialogObj.value.confirmText = '确定'
            dialogObj.value.hideCloseIcon = true
            dialogObj.value.type = 'error'
        }
        if (newqa.isNew) {
            let newContent = '';
            // 遍历 qalist 数组
            newqa.qa.forEach(item => {
                // 使用正则表达式去掉序号部分
                const questionText = item.question.replace(/^\d+\.\s*/, '');
                // 将问题拼接到 newContent 中，并添加换行符
                newContent += questionText + '\n';
            });

            dialogObj.value.dialogVisible = true
            dialogObj.value.title = '你当前收到一条个人任务'
            dialogObj.value.confirmText = '确定'
            dialogObj.value.content = newContent
            dialogObj.value.hideCloseIcon = true
            dialogObj.value.type = 'newTask'
        }
    } else if (newqa.type === -1) {
        setTimeout(() => {
            memberStore.info.characters[memberStore.virtualRoleId - 1].mask.slice(-1)[0].type = 0
            updateInfo(memberStore.info)
        }, 5000);
    }

},
    { deep: true })
const getContent = (title: string) => {
    return computed(() => memberStore.info?.flow[memberStore.info.teamInfo.flowIndex].inner?.find((item: { title: string; }) => item.title === title)?.content ?? null);
};
const glContent = getContent('卦灵');
watch(() => glContent.value.status, (a, b) => {
    if(glContent.value.status === 2){
        currentPage.value = 'Gualing'
    }

},
    { deep: true })
const teamInfo = computed(() => memberStore.info?.teamInfo)
const userInfo = computed(() => memberStore.info?.characters[memberStore.virtualRoleId - 1])
const flow = computed(() => memberStore.info?.flow[memberStore.info.teamInfo.flowIndex])
onMounted(() => {
    // 创建 WebSocket 连接
    if (!(memberStore.profile.token && memberStore.roomId && memberStore.virtualRoleId)) {
        return
    }
    const wsService = new WebSocketService(`ws://132.232.57.64:8030/?token=${memberStore.profile.token}&room_id=${memberStore.roomId}&virtual_role_id=${memberStore.virtualRoleId}`);
    wsService.connect()
    // 监听 WebSocket 连接成功事件
    wsService.onOpen = () => {
        console.log("WebSocket 连接成功");

        // 连接成功后执行后续操作
        webSocketStore.gameWebSocketService = wsService;
        // webSocketStore.gameConnect();
        setTimeout(() => {
            webSocketStore.gameplayerFirstSend()
        }, 500);


    };

    // 监听连接错误或关闭事件
    wsService.onError = (error) => {
        console.error("WebSocket 连接失败", error);
        // 在这里可以添加错误处理逻辑
    };

});

onUnmounted(() => {
    webSocketStore.gameClose();
});
</script>

<template>
    <view>
        <dmDialog :dialogObj="dialogObj" @cancel="closeDialog" @confirm="confirm" @page="pageJump"
            :userInfo="userInfo" />
        <jump v-if="memberStore.info" :hide-index="currentPage" @page="pageJump" :flow="flow" :userInfo="userInfo" />

        <RoomNumber v-show="currentPage === 'RoomNumber'" :dialog-obj="dialogObj" @updateDialogObj="updateDialogObj"
            @page="pageJump" />
        <TeamInfo v-if="memberStore.info" v-show="currentPage === 'TeamInfo'" :dialog-obj="dialogObj"
            :teamInfo="teamInfo" :userInfo="userInfo" @updateDialogObj="updateDialogObj" />
        <ZfMap v-show="currentPage === 'ZfMap'" :dialog-obj="dialogObj" @updateDialogObj="updateDialogObj" :flow="flow"
            :userInfo="userInfo" />
        <Gualing v-show="currentPage === 'Gualing'" :dialog-obj="dialogObj" @updateDialogObj="updateDialogObj" />
        <CueSet v-show="currentPage === 'CueSet'" :dialog-obj="dialogObj" :teamInfo="teamInfo" :userInfo="userInfo" @updateDialogObj="updateDialogObj" />
    </view>
</template>

<style scoped></style>