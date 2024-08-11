<script setup lang='ts'>
import { computed, ref } from 'vue';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const props = defineProps<{ hideIndex:string, flow:any, userInfo: any }>()
const emit = defineEmits(["page"]);
const pages = computed(() => {
    return [
        {
            name: props.flow.inner.find((item: { title: string; }) => item.title === '开启逐风').status === 0 ? '???' : props.flow.inner.find((item: { title: string; }) => item.title === '卦灵').status === 0 ? '逐风' : '卦灵',
            url: props.flow.inner.find((item: { title: string; }) => item.title === '卦灵').status === 0 ? 'ZfMap' : 'Gualing',
            status: props.flow.inner.find((item: { title: string; }) => item.title === '开启逐风').status === 0 ? '0' : '1'
        },
        {
            name: "线索集",
            url: 'CueSet',
            status: props.userInfo.cueset.clues.length === 0 ? '0' : '1'
        },
        {
            name: "业绩表",
            url: 'TeamInfo',
            status: '1'
        }
    ];
});
const jump = (url:string)=>{
    emit('page', url);
}
</script>

<template>
    <view class="jump-box hyshtj">
        <view v-show="hideIndex !== item.url" @tap="jump(item.url)" v-for="(item,index) in pages" :key="index" class="paper flex-row-center " :class="item.status === '0'? 'hide': ''">
            <text class="font-player-gradient1">{{ item.name }}</text>
        </view>
    </view>
</template>

<style scoped>
.hide {
    filter: brightness(50%);
}
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