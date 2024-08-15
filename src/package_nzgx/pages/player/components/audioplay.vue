<script setup lang='ts'>
import { onShow } from '@dcloudio/uni-app';
import { defineProps, onBeforeUnmount, onMounted, watch } from 'vue';

interface AudioItem {
    src: string;
    isPlaying: boolean;
    context: UniApp.InnerAudioContext | null;
    roles: string;
    location: string;
    content: string;
    scrollText: string;
    scrollPosition: number;
    scrollOffset: number;
    scrollAnimationFrame?: number; // 修改为 `number` 类型
}

const props = defineProps<{ audioList: AudioItem[], isDialog: boolean }>();

const updatePlayingState = (index: number, isPlaying: boolean) => {
    if (props.audioList[index]) {
        props.audioList[index].isPlaying = isPlaying;
    }
};

const updateScrollPosition = (index: number) => {
    const audio = props.audioList[index];
    if (audio.context) {
        const duration = audio.context.duration;
        const currentTime = audio.context.currentTime;
        audio.scrollPosition = (currentTime / duration) * 100;

        // 更新 scrollOffset
        const textWidth = 315; // 根据 audio-content 的宽度
        const scrollSpeed = 1; // 你可以调整这个值来改变滚动速度
        audio.scrollOffset = (currentTime / duration) * (textWidth + audio.scrollText.length * 10) * scrollSpeed;
        console.log(`Scroll Offset for index ${index}:`, audio.scrollOffset);
    }
};

const togglePlayPause = (index: number) => {
    console.log('aa')
    const audio = props.audioList[index];
    if (!audio.context) {
        console.error(`Audio context for index ${index} is not initialized.`);
        return;
    }

    if (audio.isPlaying) {
        audio.context.pause();
        clearTimeout(audio.scrollAnimationFrame); // 停止滚动动画
    } else {
        // 先暂停所有其他音频
        props.audioList.forEach((audioItem, idx) => {
            if (idx !== index && audioItem.isPlaying) {
                audioItem.context?.pause();
                clearTimeout(audioItem.scrollAnimationFrame); // 停止滚动动画
            }
        });
        audio.context.play();
        startScrollAnimation(index); // 开始滚动动画
    }
};

const startScrollAnimation = (index: number) => {
    const audio = props.audioList[index];
    const step = () => {
        if (audio.isPlaying) {
            audio.scrollOffset += 1; // 你可以调整这个值来改变滚动速度
            console.log(`Animating scroll for index ${index}, offset: ${audio.scrollOffset}`);
            if (audio.scrollOffset > 315) { // 根据 audio-content 的宽度
                audio.scrollOffset = -audio.scrollText.length * 10; // 重置滚动偏移量
            }
            audio.scrollAnimationFrame = setTimeout(step, 16); // 模拟 60FPS，每帧约 16ms
        }
    };
    audio.scrollAnimationFrame = setTimeout(step, 16);
};
onMounted(() => {
    console.log('mounted')
});
onShow(() => {
    console.log('show')
});
watch(() => props.audioList.length, (newLength, oldLength) => {
    console.log('11');

    props.audioList.forEach((audio, index) => {
        const context = uni.createInnerAudioContext();
        context.src = audio.src;
        context.onPlay(() => {
            updatePlayingState(index, true);
            startScrollAnimation(index); // 开始滚动动画
        });
        context.onPause(() => {
            updatePlayingState(index, false);
            clearTimeout(audio.scrollAnimationFrame); // 停止滚动动画
        });
        context.onStop(() => {
            updatePlayingState(index, false);
            clearTimeout(audio.scrollAnimationFrame); // 停止滚动动画
        });
        context.onEnded(() => {
            updatePlayingState(index, false);
            clearTimeout(audio.scrollAnimationFrame); // 停止滚动动画
        });
        context.onTimeUpdate(() => {
            updateScrollPosition(index);
        });
        audio.context = context;
        audio.scrollOffset = 0; // 初始化滚动偏移量
    });
}, { immediate: true }); // 如果需要立即运行一次



onBeforeUnmount(() => {
    props.audioList.forEach(audio => {
        audio.context?.stop();
        clearTimeout(audio.scrollAnimationFrame); // 停止滚动动画
    });
});
</script>


<template>
    <view class="flex-row-sb" :class="isDialog ? 'audio-box2' : 'audio-box'" v-for="(item, index) in audioList"
        :key="index">
        <view class="audio-icon1 flex-row-center" @tap="togglePlayPause(index)">
            <img class="audio-icon1-img"
                :src="`http://159.138.147.87/statics/img/${item.isPlaying ? 'pause' : 'play'}.png`" alt="">
        </view>
        <view class="flex-column-sb audio-info">
            <text class="audio-roles">{{ item.roles }}</text>
            <text class="audio-location">{{ item.location }}</text>
        </view>
        <view>
            <view v-show="item.isPlaying" class="audio-content">
                <view :style="{ transform: `translateX(-${item.scrollOffset}px)` }"> {{ item.scrollText }} </view>
            </view>
            <img v-show="!item.isPlaying" class="audio-icon2" src="http://159.138.147.87/statics/img/voice_icon.png"
                alt="">
        </view>
    </view>
</template>

<style scoped>
.audio-box2 {
    background: url('http://159.138.147.87/statics/img/paper3.png') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    height: 121rpx;
    width: 625rpx;
    transform: scale(0.8);
    /* margin-top: 20rpx; */
    margin-bottom: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
}

.audio-box {
    background-color: #D3B58B;
    height: 121rpx;
    width: 625rpx;
    /* margin-top: 20rpx; */
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
    font-size: 27rpx;
    color: #8F5843;
    /* display: flex;
    align-items: center; */
}

.audio-info {
    height: 85rpx;
}
</style>