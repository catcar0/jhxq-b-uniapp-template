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
})
const closeDialog = (val: any) => {
    console.log(val)
    dialogObj.value.dialogVisible = false
}
const confirm = (val: any) => {
    console.log(val)
    dialogObj.value.dialogVisible = false
}

const updateDialogObj = (newDialogObj: any) => {
    dialogObj.value = newDialogObj.value
}
const pageJump = (val: any) => {
    console.log(val)
    currentPage.value = val
}
watch(() => memberStore.info.characters[memberStore.virtualRoleId].cueset.qa, () => {
    //   console.log(memberStore.info.characters[memberStore.virtualRoleId].cueset.clues[0])
    const newqa = memberStore.info.characters[memberStore.virtualRoleId].cueset.qa.slice(-1)[0]
    if (newqa.type === 0) {
        if (newqa.a === '' && newqa.isNew) {
            setTimeout(() => {
                dialogObj.value.dialogVisible = true
                dialogObj.value.title = '你当前收到一条个人任务'
                dialogObj.value.confirmText = '确定'
                dialogObj.value.content = newqa.q
                dialogObj.value.type = 'newTask'
            }, 10000);
        }
    } else if (newqa.type === 1) {
        // dialogObj.value.title = '获得新线索'
        // dialogObj.value.content = '您获得新的6条个人线索，请前往线索集查看'
        // dialogObj.value.type = 'getClues'
        // dialogObj.value.confirmText = '查看'
        // modifyDialog()
    }

})
onMounted(() => {
    if (memberStore.profile.token && memberStore.roomId && memberStore.virtualRoleId) {
        webSocketStore.gameConnect();
        setTimeout(() => {
            webSocketStore.gameplayerFirstSend()
        }, 500);
    }
});

onUnmounted(() => {
    webSocketStore.gameClose();
});
</script>

<template>
    <view>
        <dmDialog :dialogObj="dialogObj" @cancel="closeDialog" @confirm="confirm" @page="pageJump" />
        <jump v-if="memberStore.info" :hide-index="currentPage" @page="pageJump" />

        <RoomNumber v-show="currentPage === 'RoomNumber'" :dialog-obj="dialogObj" @updateDialogObj="updateDialogObj"
            @page="pageJump" />
        <TeamInfo v-if="memberStore.info" v-show="currentPage === 'TeamInfo'" :dialog-obj="dialogObj"
            @updateDialogObj="updateDialogObj" />
        <ZfMap v-show="currentPage === 'ZfMap'" :dialog-obj="dialogObj" @updateDialogObj="updateDialogObj" />
        <Gualing v-show="currentPage === 'Gualing'" :dialog-obj="dialogObj" @updateDialogObj="updateDialogObj" />
        <CueSet v-show="currentPage === 'CueSet'" :dialog-obj="dialogObj" @updateDialogObj="updateDialogObj" />
    </view>
</template>

<style scoped></style>