<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import { charactersStore } from '@/package_nzgx/stores';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const charactersList = charactersStore().characters
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    dialogObj: Object
});

const emit = defineEmits(['updateDialogObj']);

const modifyDialog = () => {
    dialogObj.value.dialogVisible = true
    emit('updateDialogObj', dialogObj);
};
const locationList = ref(
    [
        {
            name: '医务室',
            position: {
                top: '30rpx',
                left: '320rpx',
                iconTop: '110rpx',
                iconLeft: '330rpx'
            },
            isShow: true
        },
        {
            name: '后山',
            position: {
                top: '70rpx',
                left: '530rpx',
                iconTop: '170rpx',
                iconLeft: '540rpx'
            },
            isShow: true
        },
        {
            name: '操场',
            position: {
                top: '180rpx',
                left: '340rpx',
                iconTop: '260rpx',
                iconLeft: '350rpx'
            },
            isShow: true
        },
        {
            name: '厕所',
            position: {
                top: '220rpx',
                left: '130rpx',
                iconTop: '240rpx',
                iconLeft: '110rpx'
            },
            isShow: true
        },
        {
            name: '花坛',
            position: {
                top: '300rpx',
                left: '520rpx',
                iconTop: '320rpx',
                iconLeft: '500rpx'
            },
            isShow: true
        },
        {
            name: '教学楼',
            position: {
                top: '365rpx',
                left: '210rpx',
                iconTop: '450rpx',
                iconLeft: '220rpx'
            },
            isShow: true
        },
        {
            name: '保安室',
            position: {
                top: '455rpx',
                left: '20rpx',
                iconTop: '410rpx',
                iconLeft: '30rpx'
            },
            isShow: true
        },
        {
            name: '校公告栏',
            position: {
                top: '520rpx',
                left: '490rpx',
                iconTop: '540rpx',
                iconLeft: '460rpx'
            },
            isShow: true
        },
        {
            name: '食堂',
            position: {
                top: '535rpx',
                left: '250rpx',
                iconTop: '630rpx',
                iconLeft: '260rpx'
            },
            isShow: true
        },
        {
            name: '洗衣房',
            position: {
                top: '670rpx',
                left: '540rpx',
                iconTop: '750rpx',
                iconLeft: '690rpx'
            },
            isShow: true
        },
        {
            name: '图书馆',
            position: {
                top: '760rpx',
                left: '340rpx',
                iconTop: '850rpx',
                iconLeft: '410rpx'
            },
            isShow: true
        },
        {
            name: '活动楼',
            position: {
                top: '790rpx',
                left: '40rpx',
                iconTop: '870rpx',
                iconLeft: '50rpx'
            },
            isShow: true
        },
        {
            name: '宿舍',
            position: {
                top: '980rpx',
                left: '490rpx',
                iconTop: '930rpx',
                iconLeft: '630rpx'
            },
            isShow: true
        },
        {
            name: '教务处',
            position: {
                top: '1050rpx',
                left: '60rpx',
                iconTop: '1070rpx',
                iconLeft: '40rpx'
            },
            isShow: true
        },
        {
            name: '独栋小楼',
            position: {
                top: '1150rpx',
                left: '290rpx',
                iconTop: '1230rpx',
                iconLeft: '310rpx'
            },
            isShow: true
        },
    ]
)
const audioIndex = ref(0)
const audioList = ref([
    {
        name: '图书馆',
        position: {
            top: '245rpx',
            left: '210rpx',
        },
        users: [-1, 2]
    },
    {
        name: '图书馆',
        position: {
            top: '730rpx',
            left: '490rpx',
        },
        users: [1, -1]
    }
])
const dialogObj = ref({
    dialogVisible: false,
    title: '请输入您的昵称',
    content: '推荐使用昵称不超过五个字',
    confirmText: '确定',
    cancelText: '取消',
    showCancel: false, // 是否显示按钮
    type: 'changeTeamName',
})
const isRotate = ref(false)
const isScale = ref(false)
const ani = () => {
    setTimeout(() => {
        isRotate.value = !isRotate.value
    }, 1000);
    setTimeout(() => {
        isScale.value = !isScale.value
    }, 2000);
}
const faq = (item: any) => {
    console.log('aa')
    memberStore.info.characters[memberStore.virtualRoleId].cueset.qa.slice(-1)[0].isNew = true
    dialogObj.value.dialogVisible = true
    dialogObj.value.title = '你当前收到一条个人任务'
    dialogObj.value.confirmText = '确定'
    dialogObj.value.content = item.q
    dialogObj.value.type = 'newTask2'
}
const updateInfo = (info: any) => {
    webSocketStore.gameSend(
        info
    )
}
const updateClues = () => {
    const newInfo = memberStore.info
    newInfo.characters[memberStore.virtualRoleId].cueset.clues.forEach(element => {
        element.isNew = false
        element.type = 0
    });
    updateInfo(newInfo)
}

const isNewClueShow = ref(false)
const isDeepClue = ref(false)
const voiceIndex = ref(-1)
const newClueSrc = ref('http://159.138.147.87/statics/img/clue2.png')
watch(() => memberStore.info.characters[memberStore.virtualRoleId].cueset.clues, () => {
    //   console.log(memberStore.info.characters[memberStore.virtualRoleId].cueset.clues[0])
    const newclue = memberStore.info.characters[memberStore.virtualRoleId].cueset.clues.slice(-1)[0]
    if (newclue.type === 0) {
        if (newclue.isNew) {
            if (newclue.type === 0) {
                isNewClueShow.value = true
                isDeepClue.value = false
                newClueSrc.value = `http://159.138.147.87/statics/img/${newclue.name}.png`
            }
        }
    } else if (newclue.type === 1) {
        dialogObj.value.title = '获得新线索'
        dialogObj.value.content = '您获得新的6条个人线索，请前往线索集查看'
        dialogObj.value.type = 'getClues'
        dialogObj.value.confirmText = '查看'
        modifyDialog()
    } else if (newclue.type === 3) {
        dialogObj.value.title = '个人任务成功'
        dialogObj.value.content = '获得一条深入线索'
        dialogObj.value.type = 'success'
        dialogObj.value.confirmText = '查看'
        memberStore.info.characters[memberStore.virtualRoleId].cueset.qa.slice(-1)[0].isNew = true
        memberStore.info.characters[memberStore.virtualRoleId].cueset.qa.slice(-1)[0].type = 2
        modifyDialog()
    } else if (newclue.type === 2) {
        isNewClueShow.value = true
        isDeepClue.value = true
        newClueSrc.value = `http://159.138.147.87/statics/img/${newclue.name}.png`
    }

})
</script>

<template>

    <!-- 新线索+深入线索动画弹窗 -->
    <view class="newClue-mask flex-row-center" v-show="isNewClueShow">
        <view :class="isScale ? 'notScale' : 'isScale'" v-if="isDeepClue"
            style="transition: all 2s;;position: absolute;z-index: 13000;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;padding-bottom: 120rpx;">
            <img mode='aspectFit' class="newClue-img-A" :class="isRotate ? 'newClue-img-A-rotate' : ''" @tap="ani()"
                src="http://159.138.147.87/statics/img/clue1.png" alt="">
            <view
                style="transform: rotateY(180deg);width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
                <img mode='aspectFit' class="newClue-img-B" :class="isRotate ? 'newClue-img-B-rotate' : ''"
                    src="http://159.138.147.87/statics/img/clue2.png" alt="">
            </view>
        </view>
        <view class="newClue flex-column-sb-center" :class="isDeepClue ? isScale ? 'show' : 'hide' : ''">
            <view class="newClue-title hyshtj">
               {{ isDeepClue? " 获得一条深入线索":" 获得一条新线索" }}
            </view>
            <img class="newClue-img" :style="{ opacity: isDeepClue ? '0' : '1' }" :src="newClueSrc" alt="">
            <view style="">这里看起来似乎有些不同寻常</view>
            <view class="theme-button2 button" @tap="isNewClueShow = false; updateClues()">
                <view class="theme-button-clear"></view>
                <view class="newClue-btn-text hyshtj">收入线索集</view>
            </view>
        </view>
    </view>

    <view class="map">

        <!-- 地图搜证 -->
        <view class="map-search" v-for="(item, index) in locationList" :key="item.name"
            v-show="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[1].status === 2 && memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].status === 0">
            <view class="location flex-row-center hyshtj" :style="{ top: item.position.top, left: item.position.left }">
                {{ item.name }}
            </view>
            <img :style="{ top: item.position.iconTop, left: item.position.iconLeft }" class="location-icon"
                src="http://159.138.147.87/statics/img/location_icon.png" alt="">
        </view>
        <!-- 音频搜证地点 -->
        <view class="audio-search" @tap="voiceIndex = index"
            v-for="(item, index) in memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content"
            :key="item.name"
            v-show="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].status === 2 && memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[4].status === 0">
            <view class="audio-serach-location flex-row-center hyshtj" @tap="audioIndex = index"
                :style="{ top: item.position.top, left: item.position.left, zIndex: audioIndex === index ? '10011' : '1' }">
                <view v-if="item.users[0] !== -1" class="audio-serach-location-avatar">
                    <img class="audio-serach-location-avatar-img" :src="memberStore.info.characters[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[index].users[0]].avatar" alt="">
                </view>
                <view v-if="item.users[1] !== -1" class="audio-serach-location-avatar"
                    style="margin-left: 80rpx;z-index: -1;">
                    <img class="audio-serach-location-avatar-img" :src="memberStore.info.characters[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[index].users[1]].avatar" alt="">
                </view>
                <!-- {{memberStore.info.characters[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[index].users[1]]}} -->
                <!-- {{ avatar }} -->
                {{ item.name }}
            </view>
        </view>

        <!-- 音频搜证选择地点入座 -->
        <view>
            <view class="dialog-mask" :class="{ show: voiceIndex !== -1 }" v-if="voiceIndex !== -1"
                :style="{ background: dialogObj.dialogVisible ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.6)' }">
                <view class="dialog-inner">
                    <view class="dialog-header">
                    </view>
                    <text class="hyshtj font-player-gradient1 dialog-title">图书馆传来一些声音</text>
                    <view class="dialog-content">
                        这里似乎有人交流过，请找出在此处交流的二人。
                    </view>

                    <view class="flex-row-sb avatar-box">
                            <view class="avatar flex-row-center">
                                <view @tap="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[0] = parseInt(memberStore.virtualRoleId);updateInfo(memberStore.info)" v-if="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[0] === -1">+</view>
                                <img v-else :src="memberStore.info.characters[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[0]].avatar" alt="">
                                <img @tap="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[0] = -1;updateInfo(memberStore.info)" class="out-btn"
                                src="http://159.138.147.87/statics/img/out_btn_icon.png" alt="">
                            </view>
                            <view class="avatar flex-row-center">
                                <view @tap="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[1] = parseInt(memberStore.virtualRoleId);updateInfo(memberStore.info)" v-if="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[1] === -1">+</view>
                                <img v-else :src="memberStore.info.characters[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[1]].avatar" alt="">
                                 <!-- <text v-else>{{ charactersList[memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[1]] }}</text> -->
                                <img @tap="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content[voiceIndex].users[1] = -1;updateInfo(memberStore.info)" class="out-btn"
                                    src="http://159.138.147.87/statics/img/out_btn_icon.png" alt="">
                            </view>
                        <!-- <view
                            v-for="(item, index) in memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[3].content.users"
                            :key="index">
                            <view class="avatar flex-row-center">
                                <view @tap="item = 2" v-if="item === -1">+</view>
                                <img v-else :src="charactersList[item].avatar" alt="">
                                <img @tap="item = -1" class="out-btn"
                                    src="http://159.138.147.87/statics/img/out_btn_icon.png" alt="">
                            </view>
                        </view> -->
                    </view>

                    <view class="dialog-control hyshtj">
                        <view @tap="voiceIndex = -1" class="theme-button button">
                            <view class="theme-button-clear "></view>
                            <view class="font-player-gradient2 hyshtj">返回</view>
                        </view>
                    </view>

                </view>
            </view>
        </view>

        <!-- 答疑解惑 -->
        <view class="FAQ" @tap="faq(memberStore.info.characters[memberStore.virtualRoleId].cueset.qa.slice(-1)[0])"
            v-if="memberStore.info.characters[memberStore.virtualRoleId].cueset.qa.slice(-1)[0] && !memberStore.info.characters[memberStore.virtualRoleId].cueset.qa.slice(-1)[0].isNew">
        </view>

        <!-- 开启逐风 -->
        <view class="newClue-mask"
            v-show="memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[0].status === 3 && memberStore.info.flow[memberStore.info.teamInfo.flowIndex].inner[1].status === 0">
            <view class="zhufeng">
            </view>
            <view class="zhufeng-text">我是逐风，我可以帮你梳理信息，
                并帮你找到最符合逻辑的答案</view>
        </view>
    </view>
</template>

<style scoped>
.audio-serach-location-avatar {
    width: 40rpx;
    height: 40rpx;
    margin-left: 140rpx;
    position: absolute;
    margin-top: -80rpx;
    background-color: #DDCDB8;
    border: 2rpx solid #C2934F;
    /* box-sizing: border-box; */
    border-radius: 999rpx;
}

.audio-serach-location-avatar-img {
    width: 40rpx;
    height: 40rpx;
}

.show {
    opacity: 1;
    animation: 1s changeShow;
}

.hide {
    opacity: 0;
}

.isScale {
    transform: scale(1.5)
}

.notScale {
    transform: scale(1.1)
}

.newClue-mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 12000;
    background-color: rgba(0, 0, 0, 0.6);
}

.newClue-img {
    opacity: 0;
    width: 70%;
}

.newClue-img-A-rotate {
    transform: rotateY(180deg);
}

.newClue-img-B-rotate {
    transform: rotateY(180deg);
    /* opacity: 0.5; */
}

.newClue-img-A {
    width: 100%;
    position: absolute;
    transition: all 2s;
    z-index: 1;
    backface-visibility: hidden;
}

.newClue-img-B {
    width: 100%;
    position: absolute;
    transition: all 2s;
    object-fit: contain;
    /* transform: rotatey(1turn); */
}

.newClue-title {
    font-size: 35rpx;
    margin-top: -20rpx;
    pointer-events: all;
}

.newClue {
    height: 900rpx;
    width: 90%;
    background: url('http://159.138.147.87/statics/img/paper5.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    padding: 100rpx;
    box-sizing: border-box;
}

@keyframes changeShow {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.newClue-btn-text {
    margin-top: -18rpx;
    -webkit-text-stroke: 2rpx #670100;
    -webkit-text-fill-color: #F4E7D3;
    font-size: 32rpx;
    color: #fff;
    font-weight: 400;
}

.out-btn {
    position: absolute;
    margin-top: -80rpx;
    margin-right: -80rpx;
    width: 40rpx;
    height: 40rpx;
}

.avatar-box {
    gap: 70rpx;
}

.avatar {
    width: 110rpx;
    height: 110rpx;
    border-radius: 999rpx;
    background-color: rgba(194, 147, 79, 70);
}

.map {
    width: 100%;
    height: 100vh;
    background: url('http://159.138.147.87/statics/img/map2.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.audio-serach-location {
    width: 170rpx;
    height: 167rpx;
    background: url('http://159.138.147.87/statics/img/audio_search_location_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    font-size: 26.5rpx;
    padding-bottom: 40rpx;
    padding-left: 5rpx;
    box-sizing: border-box;
    position: fixed;
}

.location {
    width: 201rpx;
    height: 104rpx;
    background: url('http://159.138.147.87/statics/img/location_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    font-size: 31.5rpx;
    padding-bottom: 30rpx;
    padding-left: 10rpx;
    box-sizing: border-box;
    position: fixed;
}

.location-icon {
    width: 47rpx;
    height: 57rpx;
    position: fixed;
}

.FAQ {
    width: 200rpx;
    height: 200rpx;
    position: fixed;
    bottom: -20rpx;
    right: -20rpx;
    background: url('http://159.138.147.87/statics/img/FAQ.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    pointer-events: all;
}

.zhufeng {
    width: 140rpx;
    height: 200rpx;
    top: 20rpx;
    left: 0rpx;
    position: fixed;
    background: url('http://159.138.147.87/statics/img/zhufeng.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.zhufeng-text {
    padding: 70rpx 100rpx 100rpx 180rpx;
    font-size: 30rpx;
    color: #ECD7BD;
}

.dialog-mask {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: flex-end;
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
    /* background-color: #FFF;
    border-radius: 24px; */
    display: flex;
    align-items: center;
    flex-direction: column;
    background: url('http://159.138.147.87/statics/img/player_dialog_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    padding: 60rpx 130rpx 90rpx 130rpx;
    box-sizing: border-box;
    transform: translateY(20px);
    transition: .3s ease;
    transition-property: transform;
    text-align: center;
}

.dialog-header {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

.dialog-title {
    font-size: 40rpx;
}

.dialog-content {
    padding: 20rpx 0;
    color: #000;
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
    width: 245rpx;
    line-height: 94.5rpx;
    font-size: 28rpx;
    /* border-radius: 16px; */
    font-weight: bold;
    background: url('http://159.138.147.87/statics/img/player_dialog_btn1.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.theme-button2 {
    width: 245rpx;
    position: relative;
    z-index: 14000;
    line-height: 124.5rpx;
    font-size: 28rpx;
    /* border-radius: 16px; */
    font-weight: bold;
    background: url('http://159.138.147.87/statics/img/new_clue_btn.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
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
</style>