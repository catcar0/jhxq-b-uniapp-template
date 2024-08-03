<script setup lang='ts'>
import { ref } from 'vue';
import { charactersStore } from '@/package_nzgx/stores';
const characterIndex = ref(0)
const isVerify = ref(false)
const charactersList = charactersStore().characters
const clues = ['clue1', 'clue2', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3', 'clue3',]
const cluesIndex = ref(0)
const glIndex = ref(-1)
const glList = ref([
    {
        question: '在今天以前，我们对春天做了什么',
        clue: '',
        verify: 0
    },
    {
        question: '凶手是谁',
        clue: '',
        verify: 1
    },
    {
        question: '对于我们的行为，春天有什么反应',
        clue: '',
        verify: 1
    },
    {
        question: '为什么何阑会对李梦是 “有人比我们更着急？这和春天的死有没有联系”',
        clue: '',
        verify: 0
    },
])
</script>

<template>
    <view class="gualing">
        <view class="gualing-introduce flex-column-sb-center" v-show="false">
            <view class="class-title">
                卦灵
            </view>
            <img class="gualing-introduce-img" src="http://159.138.147.87/statics/img/turtle_shell.png" alt="">
            <text>
                我是卦灵，我可以帮你们对每一次魂穿获取到的信息进行提问，我会对你们的回答进行逻辑验证。
            </text>
        </view>
        <view class="gualing-inner">
            <view class="transform-box">
                <view class="class-title hyshtj">
                    卦灵
                </view>

                <view class="qa-box" v-if="glIndex === -1">
                    <view v-for="(item, index) in glList" :key="index" @tap="glIndex = index">
                        <view class="question">{{ item.question }}</view>
                        <view class="anser">
                            <img v-if="item.clue === ''" class="anser-select-icon"
                                src="http://159.138.147.87/statics/img/gl_select_icon.png" alt="">
                            <view v-if="item.clue !== ''" class="clues-item">
                                <img v-if="item.clue.length < 6" class="clue-selected-border2"
                                    src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                                <img v-else="item.clue.length < 6" class="clue-selected-border5"
                                    src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                                <view v-if="item.clue.length < 6" class="clue-small-image clue-selected-border1"
                                    :style="{ backgroundImage: `url(http://159.138.147.87/statics/img/${item.clue}.png)` }">
                                </view>
                                <img v-else class="clue-small-image" :src="item.clue" alt="">
                                <!-- <view v-else class="clue-small-image clue-selected-border1"
                            :style="{ backgroundImage: item.clue }">
                        </view> -->
                            </view>

                            <view v-show="isVerify" class="verify-icon-box">
                                <img class="verify-icon" v-show="item.question !== '凶手是谁'"
                                    :src="`http://159.138.147.87/statics/img/${item.verify === 0 ? 'gl_correct_icon' : 'gl_wrong_icon'}.png`"
                                    alt="">
                                <img class="verify-icon" v-show="item.question === '凶手是谁'"
                                    :src="`http://159.138.147.87/statics/img/${item.verify === 0 ? 'gl_mission_success_icon' : 'gl_mission_fail_icon'}.png`"
                                    alt="">
                            </view>
                        </view>
                    </view>
                    <view @tap="isVerify = true" class="theme-button button">
                        <view class="theme-button-clear"></view>
                        <view>确定</view>
                    </view>
                </view>

                <view class="select-clue" v-if="glIndex !== -1 && glList[glIndex].question !== '凶手是谁'">
                    <view>{{ glList[glIndex].question }}</view>
                    <img class="clue-selected-border3" src="http://159.138.147.87/statics/img/cue_seleted2.png" alt="">
                    <img class="clue-big-image" :src="`http://159.138.147.87/statics/img/${clues[cluesIndex]}.png`"
                        alt="">
                    <view class="flex-row-center clue-text">
                        举报他们了，你也受不了他们很久了吧？这次我一定会配合你（是春天的字迹）
                    </view>
                    <view class="clues-box flex-row-center">
                        <view v-for="(item, index) in clues" :key="index" @tap="cluesIndex = index" class="clues-item"
                            :class="cluesIndex === index ? 'clue-selected-border1' : ''">
                            <img class="clue-selected-border2" v-show="cluesIndex === index"
                                src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                            <view class="clue-small-image"
                                :style="{ backgroundImage: `url(http://159.138.147.87/statics/img/${item}.png)` }">
                            </view>
                            <text>海报</text>
                        </view>
                    </view>
                    <view @tap="glList[glIndex].clue = clues[cluesIndex]; glIndex = -1" class="theme-button button">选择
                    </view>
                </view>

                <view class="select-clue" v-if="glIndex !== -1 && glList[glIndex].question === '凶手是谁'">
                    <view>{{ glList[glIndex].question }}</view>
                    <img class="clue-selected-border3" src="http://159.138.147.87/statics/img/cue_seleted2.png" alt="">
                    <img class="clue-big-image" :src="charactersList[characterIndex].avatar" alt="">
                    <view class="flex-row-center clue-text">
                        举报他们了，你也受不了他们很久了吧？这次我一定会配合你（是春天的字迹）
                    </view>
                    <view class="clues-box flex-row-center">
                        <view v-for="(item, index) in charactersList" :key="index" @tap="characterIndex = index"
                            class="clues-item" :class="characterIndex === index ? 'clue-selected-border1' : ''">
                            <img class="clue-selected-border4" v-show="characterIndex === index"
                                src="http://159.138.147.87/statics/img/cue_seleted.png" alt="">
                            <!-- <view class="clue-small-image"
                            :style="{ backgroundImage: item.avatar }">
                        </view> -->
                            <img class="clue-small-image" :src="item.avatar" alt="">
                            <text>{{ item.name }}</text>
                        </view>
                    </view>
                    <view @tap="glList[glIndex].clue = charactersList[characterIndex].avatar; glIndex = -1"
                        class="theme-button button">
                        <view class="theme-button-clear"></view>
                        <view>确定</view>
                    </view>
                </view>

            </view>
        </view>
    </view>
</template>

<style scoped>
.verify-icon-box {
    margin-left: 100rpx;
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
    width: 122rpx;
    height: 122rpx;
    background-color: #CAA16A;
    text-align: center;
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
    margin-left: -66rpx;
    margin-top: -7rpx;
    width: 132rpx;
    height: 132rpx;
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
    margin-left: -30rpx;
    width: 670rpx;
    height: 363rpx;
    margin-top: 20rpx;
    display: flex;
    flex-wrap: wrap;
    gap: 40rpx;
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

.gualing {
    width: 100%;
    height: 100vh;
    background: url('http://159.138.147.87/statics/img/gualing_bg2.png') no-repeat;
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
    transform: rotate(-1deg);
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
    transform: rotate(-1deg);
}
</style>