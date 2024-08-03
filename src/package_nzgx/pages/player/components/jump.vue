<script setup lang='ts'>
import { ref } from 'vue';
const props = defineProps<{ hideIndex:number }>()
const pages = ref([
    {
        name:"线索集",
        url:'./cue-set'
    },
    {
        name:"业绩表",
        url:'./team-info'
    },
    {
        name:"逐风",
        url:'./map'
    }
])
const jump = (url:string)=>{
    uni.navigateTo({
	url:url
});
}
</script>

<template>
    <view class="jump-box hyshtj">
        <view v-show="hideIndex !== index" @tap="jump(item.url)" v-for="(item,index) in pages" :key="index" class="paper flex-row-center ">
            <text class="font-player-gradient1">{{ item.name }}</text>
        </view>
    </view>
</template>

<style scoped>
.jump-box{
    position: fixed;
    z-index: 10000;
    left: -70rpx;
    bottom: -15rpx;
    transform: rotate(-0deg);

}
.paper{
    margin-top: -20rpx;
    width: 220rpx;
    height: 120rpx;
    background-color: aliceblue;
    background: url('http://159.138.147.87/statics/img/paper2.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    padding-left: 50rpx;
    box-sizing: border-box;
    font-size: 38rpx;
}
</style>