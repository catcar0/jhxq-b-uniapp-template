<script setup lang='ts'>
import { setPageOverflow } from '@/utils/uniUtils';
import { computed, onUnmounted, ref, watch } from 'vue';
import type { DmDialog } from '@/package_nzgx/types/dialog'
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { charactersStore } from '@/package_nzgx/stores';
import { addNewItem, scoreChange } from '@/package_nzgx/services/info';
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const updateInfo = (info: any) => {
    webSocketStore.gameSend(
        info
    )
}
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
const charactersList = charactersStore().characters
const props = defineProps<{ dialogObj: any, onConfirm: Function }>()

const emit = defineEmits(["update:show", "confirm", "cancel"]);

watch(() => props, (value) => {
    setPageOverflow(value ? 'hidden' : 'auto');
})

onUnmounted(() => {
    setPageOverflow('auto');
})

const hide = () =>{
    emit('update:show', false);
    emit('cancel');
}
const close = () => {
    emit('update:show', false);
    emit('cancel');
    if (props.dialogObj.type === '个人线索发放+个人问题') {
        memberStore.info.characters[props.dialogObj.userIndex].mask.slice(-1)[0].isError = true
        // scoreChange('user', 0, [props.dialogObj.userIndex])
        updateInfo(memberStore.info)
    }
}

const confirm = () => {
    emit('confirm');
    console.log(props.dialogObj.type)
    console.log(props.dialogObj.clue, '--', props.dialogObj.deepClue)
    // if (props.dialogObj.type === '开启下一环节') {
    //     props.onConfirm;
    // }
    if (props.dialogObj.type === '找尸体') {
        zst(zstselectIndex.value, props.dialogObj.clue, props.dialogObj.zst_index)
    }
    if (props.dialogObj.type === '个人线索发放+个人问题' && props.dialogObj.clue && props.dialogObj.deepClue) {
        const flowItem = memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '个人线索发放+个人问题');

        if (flowItem) {
            flowItem.content[props.dialogObj.qa_index].status = 3;

            // 检查 content 数组中的每个元素的 status 是否都为 3
            const allStatusesAreThree = flowItem.content.every((element: { status: number }) => element.status === 3);

            if (allStatusesAreThree) {
                flowItem.status = 3
            }
            scoreChange('user', 50, [props.dialogObj.userIndex]);
            addNewItem(props.dialogObj.userIndex, props.dialogObj.clue, 3, 'clues', props.dialogObj.deepClue);
        }
    }

    if (props.dialogObj.type === 'editTeamName') {
        memberStore.info.teamInfo.name = inputText.value
        updateInfo(memberStore.info)
    }
    if (props.dialogObj.type === 'editShopName') {
        memberStore.info.teamInfo.location = shopName.value
        updateInfo(memberStore.info)
    }
    if (props.dialogObj.type === 'editDmName') {
        memberStore.info.teamInfo.dmName = dmName.value
        updateInfo(memberStore.info)
    }
}
const zst = (userIndex: number, clue: string, index: number) => {
    if (!clue) return
    memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '找尸体').content[index].status = 3
    scoreChange('user', 10, [userIndex])
    if (memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '找尸体').content.every((contentItem: { status: number }) => contentItem.status === 3)) {
        memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner.find((item: { title: string; }) => item.title === '找尸体').status = 3;
        // updateInfo(memberStore.info)
    }
    addNewItem(userIndex, clue, 0, 'clues', '')
}
// const fun = (content: any) => {
//   const newInfo = memberStore.info
//   newInfo.aa.bb = content
//   updateInfo(newInfo)
// }
const zstselectIndex = ref<number>(0)
const zstSelectUser = (index: number) => {
    zstselectIndex.value = index
}
const inputText = ref(props.dialogObj.initInput ?? '')
const shopName = ref(memberStore.info.teamInfo.location)
const dmName = ref(memberStore.info.teamInfo.dmName)
</script>

<template>
    <view class="dialog-mask" :class="{ show: dialogObj.dialogVisible }">
        <view class="dialog-inner">
            <view class="dialog-header">
                <text>{{ dialogObj.title }}</text>
                <image v-if="dialogObj.showCancel" @tap="hide" src="@/static/icons/common_close.png"
                    :mode="'widthFix'" />
            </view>
            <view class="dialog-content" v-html="dialogObj.content">
            </view>
            <view class="input-box flex-row-center" v-show="dialogObj.type === 'editTeamName'">
                <input style="text-align: center;" v-model="inputText" type="text">
            </view>
            <view class="input-box flex-row-center" v-show="dialogObj.type === 'editShopName'">
                <input style="text-align: center;" v-model="shopName" type="text">
            </view>
            <view class="input-box flex-row-center" v-show="dialogObj.type === 'editDmName'">
                <input style="text-align: center;" v-model="dmName" type="text">
            </view>
            <view style="height: 200rpx;font-weight: 700;font-size: 34rpx;" class="flex-row-center"
                v-show="dialogObj.type === 'nextHunchuan'">开启后无法返回下一环节</view>
            <!-- 找尸体地点 -->
            <view v-if="dialogObj.type === '找尸体'">
                <view style="width: 100%;height: 200prx;" class="flex-row-center">
                    <img class="big-avatar" :src="charactersList[zstselectIndex!].avatar" alt="">
                </view>
                <view style="width: 100%;height: 170rpx;font-size: 36rpx;" class="flex-row-center">{{ dialogObj.location
                    }}</view>
                <view class="flex-row-sb">
                    <view @tap="zstSelectUser(index)" v-for="(item, index) in charactersList" :key="item.name">
                        <img class="avatar" :class="zstselectIndex == index ? 'avatar-selected' : ''" :src="item.avatar"
                            alt="">
                            <view style="font-size: 20rpx;margin-left: 20rpx;">{{ item.name }}</view>
                    </view>
                </view>
            </view>
            <!-- 个人线索发放＋个人问题 -->
            <view v-if="dialogObj.type === '个人线索发放+个人问题'">
                <view class="flex-row-center" style="gap: 200rpx;margin-top: 30rpx;">
                    <view class="flex-column-sb-center" style="gap:10rpx" v-for="(item, index) in grContent">
                        <img class="qa-avatar"
                            :style="{ backgroundColor: dialogObj.qa_index === index ? '#F09235' : '#C4C4C4' }"
                            :src="memberStore.info.characters[item.userIndex].avatar" alt="">
                        <text>{{ memberStore.info.characters[item.userIndex].name }}</text>
                    </view>
                </view>
                <view v-for="qaitem in grContent[dialogObj.qa_index].qalist">
                    <view>Q:{{ qaitem.question }}</view>
                    <text style="text-decoration: underline;">A:{{ qaitem.answer }}</text>
                </view>
            </view>

            <view class="dialog-control">
                <button @tap="confirm" :class="dialogObj.type === 'giveReplay' ? 'cancel-button':'button'" class="theme-button">{{ dialogObj.confirmText || '确认' }}</button>
                <button v-if="dialogObj.showCancel" @tap="close" :class="dialogObj.type === 'giveReplay' ? 'button':'cancel-button'" class="theme-button ">{{
                    dialogObj.cancelText || '取消'
                    }}</button>
            </view>
        </view>
    </view>
</template>

<style scoped>
.input-box {
    background-color: #EA6A00;
    border-radius: 30rpx;
    height: 80rpx;
    width: 70%;
    margin-left: 15%;
    color: white;
}

.big-avatar {
    width: 200rpx;
    height: 200rpx;
    border-radius: 999rpx;
    background-color: #C4C4C4;
}

.avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 999rpx;
    border: #C4C4C4 solid 2px;
    box-sizing: border-box;
}

.avatar-selected {
    background-color: #EA6A00;
}

.qa-avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 999rpx;
    background-color: #C4C4C4;
}

.qa-avatar-selected {
    background-color: #EA6A00;
}

.dialog-mask {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40rpx;
    box-sizing: border-box;
    opacity: 0;
    pointer-events: none;
    transition: .3s ease;
    transition-property: opacity;
}

.dialog-mask.show {
    opacity: 1;
    pointer-events: unset;
}

.dialog-mask.show>.dialog-inner {
    transform: translateY(0px);
}

.dialog-inner {
    width: 100%;
    /* max-width: 600rpx; */
    background-color: #FFF;
    border-radius: 24px;
    padding: 40rpx;
    box-sizing: border-box;
    transform: translateY(20px);
    transition: .3s ease;
    transition-property: transform;
}

.dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dialog-header>text {
    font-size: 34rpx;
    font-weight: bold;
}

.dialog-header>image {
    width: 48rpx;
    min-width: 48rpx;
    height: 48rpx;
}

.dialog-content {
    padding: 30rpx 0;
    color: #747474;
    font-size: 28rpx;
}

.dialog-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24rpx;
    margin-top: 40rpx;
}

.theme-button {
    width: 100%;
    line-height: 100rpx;
    font-size: 28rpx;
    border-radius: 16px;
    font-weight: bold;
}

.cancel-button {
    background: #D8D8D8;
    color: #FFFFFF;
}
</style>
<style>
@import url("@/package_nzgx/static/fonts/stylesheet.css");
@import url("@/package_nzgx/styles/common.css");

.almm {
  font-family: 'Alimama ShuHeiTi';
}

.hyshtj {
  font-family: 'hyshtj';
}</style>