<script setup lang='ts'>
import { ref, watch } from 'vue';

const keys = ['壹','贰','叁','肆','伍','陆','柒','捌','玖','clear','零','backspace','启']
const roomNumber = ref('')
const play = () =>{
    uni.navigateTo({
    url: './team-info' // 目标页面的路径
  });
}
</script>

<template>
    <view class="room-number hyshtj">
        <view class="fu">
            <view class="input flex-row-center">
                {{ roomNumber }}
            </view>
            <view class="num-key">
                <view v-for="(item, index) in keys" :key="index">
                    <view v-show="item !== 'clear' && item !== 'backspace' && item !== '启'" class="num-key-btn flex-row-center" @tap="roomNumber += item">
                        <text class="number">{{ item }}</text>
                    </view>
                    <view v-show = "item === 'backspace'"  class="num-key-btn flex-row-center" @tap="roomNumber = roomNumber.slice(0, -1)">
                        <img class="icon" src="http://159.138.147.87/statics/img/backspace_icon.png" alt="">
                    </view>
                    <view v-show = "item === 'clear'"  class="num-key-btn flex-row-center" @tap="roomNumber = ''">
                        <img class="icon1" src="http://159.138.147.87/statics/img/clear_icon.png" alt="">
                    </view>
                    <view v-show = "item === '启'"  class="num-key-btn flex-row-center" @tap="play">
                        <text class="number">{{ item }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.room-number{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    background: url('http://159.138.147.87/statics/img/room_bg.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
}
.fu{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input{
    background: url('http://159.138.147.87/statics/img/input_bg.png');
    background-size: contain;
    height: 108.5rpx;
    width: 445.5rpx;
    margin-top: 450rpx;
    color: #FCC825;
    font-size: 42rpx;
}
.num-key{
    width: 515.5rpx;
    height: 600rpx;
    margin-top: 10rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.num-key-btn{
    background: url('http://159.138.147.87/statics/img/number_bg.png');
    background-size: contain;
    width: 170rpx;
    height: 170rpx;
}
.icon{
    width: 35rpx;
    height: 35rpx;
    margin-top: -20rpx;
}
.icon1{
    width: 60rpx;
    height: 60rpx;
    margin-top: -20rpx;
    margin-left: 10rpx;
}
.number{
    font-size: 45rpx;
    margin-top: -20rpx;
}
</style>