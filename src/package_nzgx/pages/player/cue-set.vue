<script setup lang='ts'>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import audioplay from '@/package_nzgx/pages/player/components/audioplay.vue';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { allClues } from '@/package_nzgx/services/clues';
import { onShow } from '@dcloudio/uni-app';
import { addNewItem } from '@/package_nzgx/services/info';
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const setClass = ['物品', '音频', '记录']
const classIndex = ref(0)
const cluesIndex = ref(-1)
const props = defineProps({
    dialogObj: Object,
    userInfo: Object,
    teamInfo: Object,
    currentPage:Object
});
interface AudioItem {
    src: string;
    isPlaying: boolean;
    context: UniApp.InnerAudioContext | null;
    roles: string;
    location: string;
    content: string;
    scrollText: string;
    scrollPosition: number;
    scrollOffset: number; // 新增
    scrollAnimationFrame: number; // 新增
}


const audioList = computed<AudioItem[]>(() => {
    return memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.audio.map(audio => ({
        roles: allClues[audio.name].name,
        location: allClues[audio.name].content1,
        content: allClues[audio.name].content2,
        src: allClues[audio.name].url + '.mp3',
        isPlaying: false,
        context: null,
        scrollText: allClues[audio.name].content2,
        scrollPosition: 0,
        scrollOffset: 0,
        scrollAnimationFrame: 0,
    }));});
const replayIndex = ref(-1)

const sortedClues = ref();

watch(() => props.currentPage, (a,b) => {
    sortClues()
    console.log(props.currentPage,'ccc')
},
{ deep: true })
const sortClues = () => {
    const clues = memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues;

    // 创建新数组并排序
    sortedClues.value = [...clues].sort((a, b) => {
        if (a.isRead === b.isRead) {
            return 0; // 保持原有顺序
        } else if (a.isRead === false && b.isRead === true) {
            return -1; // a 排在 b 之前
        } else {
            return 1; // b 排在 a 之前
        }
    });
    memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues = sortedClues.value
};
const updateInfo = (info: any) => {
    webSocketStore.gameSend(
        info
    )
}
const readClue = (name: string) => {

    console.log(name, memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues.find(clue => clue.name === name))
    memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues.find(clue => clue.name === name).isRead = true;


};

const firstClue = (index: number, name: string) => {
    readClue(name)
    // if (classIndex.value === index) return
    // classIndex.value = 0
    console.log('indexindex', index)
    if (index !== 0) {
        const clues = memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues;

        // 移动选中的元素到数组的第一个位置
        const selectedClue = clues.splice(index, 1)[0]; // 删除并获取目标元素
        clues.unshift(selectedClue); // 将目标元素插入到第一个位置

        // 更新原始数组（假设 memberStore.info.characters[userIndex.value].cueset.clues 是响应式的）
        memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues = clues;
    }
    cluesIndex.value === index ? cluesIndex.value = -1 : cluesIndex.value = 0;
    updateInfo(memberStore.info)
}
const a = () =>{
    addNewItem(0,'clue19',0,'audio','')
}
</script>

<template>
    <view class="cue-set">
        <view class="set-class flex-row-sb">
            <view @tap="classIndex = index" v-for="(item, index) in setClass" :key="item" class="flex-row-center"
                :class="index === classIndex ? 'class-selected' : 'class-not-selected'">
                <text class="class-name">{{ item }}</text>
            </view>
        </view>
        <view class="paper">
            <view v-show="classIndex !== 0" class="make-old"></view>
            <!-- 物品 -->
            <view class="class-inner" v-show="classIndex === 0">
                <view class="player-title hyshtj ">
                    <view class="font-player-gradient1" @tap="a">线索集</view>
                </view>
                <scroll-view scroll-y style="height: 71vh;">
                    <view v-if="cluesIndex !== -1" class="clue-big-image flex-row-center">
                        <img mode="heightFix"
                            :src="allClues[memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues[cluesIndex].name].url + '.png'"
                            alt="">
                    </view>
                    <view v-if="cluesIndex !== -1" class="flex-row-center clue-text">
                        {{ allClues[memberStore.info.characters[memberStore.virtualRoleId -
                            1].cueset.clues[cluesIndex].name].content2 }}
                        <!-- {{ allClues[memberStore.info.characters[memberStore.virtualRoleId -
                            1].cueset.clues[cluesIndex].name].name }} -->
                    </view>
                    <view class="clues-box flex-row-center">
                        <!-- <view class="make-old2"></view> -->
                        <view
                            v-for="(item, index) in memberStore.info.characters[memberStore.virtualRoleId - 1].cueset.clues"
                            :key="index">
                            <view @tap="firstClue(index, item.name);" class="clues-item"
                                :class="cluesIndex === index ? 'clue-selected-border1' : ''">
                                <view v-if="!item.isRead"
                                    style="width: 20rpx;height: 20rpx;border-radius: 999rpx;background-color: red;position: absolute;margin-left: 100rpx;margin-top: -5rpx;">
                                </view>
                                <img class="clue-selected-border2" v-show="cluesIndex === index"
                                    src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                                <view class="clue-small-image"
                                    :style="{ backgroundImage: `url(http://159.138.147.87/statics/clues/${item.name}.png)` }">
                                    <!-- <img class="clue-small-image"  :src="`http://159.138.147.87/statics/img/${item}.png`" alt=""> -->
                                </view>
                            </view>
                            <view v-if="allClues[item.name]" class="clue-name"><text>{{ allClues[item.name].name
                                    }}</text></view>
                        </view>
                    </view>
                </scroll-view>

            </view>
            <!-- 音频 -->
            <view class="class-inner" v-show="classIndex === 1">
                <view class="player-title hyshtj ">
                    <view class="font-player-gradient1">调查记录</view>
                </view>
                <scroll-view scroll-y style="width: 625rpx;height: 71vh;padding-top: 20rpx;">
                    <audioplay class="a" :audioList="audioList" :isDialog="false" />
                </scroll-view>
                <!-- <view class="audio-box flex-row-sb" v-for="(item, index) in audioList" :key="index">
                </view> -->
            </view>
            <!-- 记录 -->
            <view class="class-inner" v-show="classIndex === 2">
                <view class="player-title hyshtj ">
                    <view class="font-player-gradient1">调查记录</view>
                </view>
                <scroll-view scroll-y style="width: 625rpx;height: 71vh;padding-top: 20rpx;">
                    <view @tap="replayIndex = index" v-if="replayIndex === -1" v-show="item.hy.length !== 0"
                        class="audio-box flex-row-sb" v-for="(item, index) in memberStore.info?.teamInfo.replay" :key="index">
                        {{ item.name }}
                    </view>
                    <view v-if="replayIndex !== -1"
                        style="display: flex;flex-direction: column;justify-content: space-between;">
                        <view style="display: flex;height: 50%;">
                            <view style="height: 100%;width: 100rpx;" class="flex-row-center">
                                <img style="height: 100rpx;width: 50rpx;"
                                    v-show="replayIndex !== 0 && memberStore.info?.teamInfo.replay.length > 1"
                                    src="http://159.138.147.87/statics/img/left.png" alt="">
                            </view>
                            <view>
                                <view style="font-weight: 700;height: 100rpx;text-align: center;">{{
                                    memberStore.info?.teamInfo.replay[replayIndex].name }}</view>
                                <view v-for="(item, index) in memberStore.info?.teamInfo.replay[replayIndex].hy"
                                    v-if="memberStore.info?.teamInfo.replay[replayIndex].hy.length !== 0"
                                    style="display: flex;margin-top: 30rpx;gap: 20rpx;font-weight: 700;font-size: 25rpx;">
                                    <view>{{ item.charAt(0) }}.</view>
                                    <view>{{ item.slice(1) }}</view>
                                </view>
                                <view v-for="(item, index) in memberStore.info?.teamInfo.replay[replayIndex].xa"
                                    v-if="memberStore.info?.teamInfo.replay[replayIndex].xa.length !== 0"
                                    style="display: flex;margin-top: 30rpx;gap: 20rpx;font-weight: 700;font-size: 25rpx;">
                                    <view>{{ item.charAt(0) }}.</view>
                                    <view>{{ item.slice(1) }}</view>
                                </view>
                            </view>
                            <view style="height: 100%;width: 100rpx;" class="flex-row-center">
                                <img v-show="replayIndex !== memberStore.info?.teamInfo.replay.length && memberStore.info?.teamInfo.replay.length > 1 && memberStore.info?.teamInfo.replay[replayIndex + 1].hy.length !== 0"
                                    style="height: 80rpx;width: 50rpx;transform: rotate(180deg);"
                                    src="http://159.138.147.87/statics/img/left.png" alt="">
                            </view>
                        </view>
                        <view @tap="replayIndex = -1" class="theme-button button">返回
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<style scoped>
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

.clue-name {
    padding-top: 15rpx;
    text-align: center;
    width: 120rpx;
    height: 30rpx;
}

.a {
    pointer-events: all;
}

.make-old {
    margin-top: 120rpx;
    margin-left: 40rpx;
    transform: rotate(2deg);
    width: 80%;
    height: 83%;
    position: absolute;
    z-index: 11;
    background: url('http://159.138.147.87/statics/img/make_old3.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    mix-blend-mode: soft-light;
    opacity: 0.8;
    pointer-events: none;
}

.make-old2 {
    width: 80%;
    height: 83%;
    position: absolute;
    z-index: 9999;
    background: url('http://159.138.147.87/statics/img/make_old3.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    mix-blend-mode: soft-light;
    opacity: 0.8;
    pointer-events: none;
}

.cue-set {
    color: #333333;
    width: 100%;
    height: 100vh;
    background: url('http://159.138.147.87/statics/img/cue_set_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}

.set-class {
    color: black;
    position: fixed;
    width: 80%;
    right: 20rpx;
    top: 90rpx;
    transform: rotate(1deg);
}

.class-name {
    margin-top: -20rpx;
    transform: rotate(2deg);
}

.class-selected {
    width: 158rpx;
    height: 105rpx;
    margin-top: -40rpx;
    background: url('http://159.138.147.87/statics/img/set_selected.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    transform: rotate(-2deg);
}

.class-not-selected {
    width: 158rpx;
    height: 105rpx;
    background: url('http://159.138.147.87/statics/img/set_not_selected.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    transform: rotate(-2deg);
}

.paper {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    padding: 0 170rpx 0rpx 50rpx;
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

.class-inner {
    transform: rotate(2deg);
    padding-left: 80rpx;
    padding-top: 50rpx;
}

.class-title {
    width: auto;
    height: 70rpx;
    margin-left: -40rpx;
    padding-left: 60rpx;
    font-size: 45.5rpx;
    display: flex;
    align-items: center;
    background: url('http://159.138.147.87/statics/img/teaminfo_title_bg.png') no-repeat;
    background-size: 175rpx 70rpx;
    background-position: left;
}

.clue-big-image {
    /* margin-left: 100rpx; */
    margin-top: 20rpx;
    height: 500rpx;
    /* 固定高度 */
    width: 100%;
    /* 占据父容器的宽度 */
}

.clues-item {
    width: 112rpx;
    height: 112rpx;
    background-color: #CAA16A;
    text-align: center;
    mix-blend-mode: multiply;
}

.clue-small-image {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    /* object-fit:contain; */
}

.clue-selected-border1 {
    box-sizing: border-box;
    border: 4rpx solid #583400;
}

.clue-selected-border2 {
    position: absolute;
    margin-left: -62rpx;
    margin-top: -8rpx;
    width: 122rpx;
    height: 122rpx;
    transform: rotate(-2deg);
}

.clue-text {
    width: 90%;
    font-size: 28rpx;
    font-weight: 600;
    min-height: 100rpx;
    line-height: 150%;
    text-align: center;
    margin-top: 0rpx;
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

.audio-box {
    background-color: #D3B58B;
    height: 121rpx;
    width: 625rpx;
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
}

.audio-icon1 {
    width: 85rpx;
    height: 85rpx;
    background-color: #A66C2C;
    border-radius: 999rpx;
}

.audio-icon1-img {
    width: 30rpx;
    height: 30rpx;
    margin-left: 2rpx;
    transform: rotate(2deg);
}

.audio-icon2 {
    width: 315rpx;
    height: 85rpx;
    transform: rotate(-2deg);
    filter: brightness(0.9);
}

.audio-roles {
    font-size: 24.5rpx;
}

.audio-location {
    font-size: 21rpx;
}

.audio-content {
    width: 315rpx;
    line-height: 85rpx;
    overflow: hidden;
    white-space: nowrap;
    /* display: flex;
    align-items: center; */
}

.audio-info {
    height: 85rpx;
}
</style>