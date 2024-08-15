<script setup lang='ts'>
import { ref, watch } from 'vue';
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { WebSocketService } from '@/package_nzgx/services/WebSocketService';
const emit = defineEmits(["page"]);
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
const keys = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', 'clear', '零', 'backspace', '启']
const roomNumber = ref('')
const roomId = ref('')

const currentRoomId = (index: number) => {
    if (index >= 0 && index < 9) {
        roomId.value += index + 1 + ''
    } else if (index = 10) {
        roomId.value += '0'
    }
}
const joinRoom = (roomId: string) => {
    webSocketStore.send(
        JSON.stringify({
            type: 'join_room',
            room_id: roomId,
            role: memberStore.virtualRoleId
        })
    )
}
const play = () => {
    let avatarUrl: string
    let nickName: string
    uni.getUserProfile({
        desc: '用于完善用户资料', // 必填，描述获取用户信息的用途
        success: (res) => {
            const userInfo = res.userInfo;
            console.log('用户信息:', userInfo);

            // 获取到的微信头像和昵称
            avatarUrl = userInfo.avatarUrl;
            nickName = userInfo.nickName;
            memberStore.avatar = avatarUrl
            console.log('微信头像:', avatarUrl);
            console.log('微信昵称:', nickName);
        },
        fail: (err) => {
            console.error('获取用户信息失败:', err);
        }
    });
    const _roomId = roomId.value
    console.log(_roomId)
    memberStore.setRoomId(_roomId)
    // 创建 WebSocket 连接
    if (!(memberStore.profile.token && memberStore.roomId && memberStore.virtualRoleId)) {
        return
    }
    //显示加载框
    uni.showLoading({
        title: '加载中'
    });
    const wsService = new WebSocketService(`ws://132.232.57.64:8030/?token=${memberStore.profile.token}&room_id=${memberStore.roomId}&virtual_role_id=${memberStore.virtualRoleId}`);
    wsService.connect()
    setTimeout(() => {
        if (webSocketStore.messages.slice(-1)[0] && webSocketStore.messages.slice(-1)[0].type && webSocketStore.messages.slice(-1)[0].type === 'error') {
            uni.showToast({ icon: 'error', title: webSocketStore.messages.slice(-1)[0].message })
            webSocketStore.messages = []
        } else {
            webSocketStore.gameWebSocketService = wsService;
            webSocketStore.gameplayerFirstSend()
            webSocketStore.updateInfo(nickName, avatarUrl)
            setTimeout(() => {
                uni.hideLoading();
                if (memberStore.info) memberStore.info.characters[memberStore.virtualRoleId - 1].playerAvatar = avatarUrl
                uni.showToast({ icon: 'success', title: '加入成功' })
                emit('page', 'TeamInfo')
            }, 3000);
        }
    }, 1000);
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
                    <view v-show="item !== 'clear' && item !== 'backspace' && item !== '启'"
                        class="num-key-btn flex-row-center" @tap="roomNumber += item; currentRoomId(index)">
                        <text class="number">{{ item }}</text>
                    </view>
                    <view v-show="item === 'backspace'" class="num-key-btn flex-row-center"
                        @tap="roomNumber = roomNumber.slice(0, -1); roomId = roomId.slice(0, -1)">
                        <img class="icon" src="http://159.138.147.87/statics/img/backspace_icon.png" alt="">
                    </view>
                    <view v-show="item === 'clear'" class="num-key-btn flex-row-center"
                        @tap="roomNumber = ''; roomId = ''">
                        <img class="icon1" src="http://159.138.147.87/statics/img/clear_icon.png" alt="">
                    </view>
                    <view v-show="item === '启'" class="num-key-btn flex-row-center" @tap="play">
                        <text class="number">{{ item }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.room-number {
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

.fu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input {
    background: url('http://159.138.147.87/statics/img/input_bg.png');
    background-size: contain;
    height: 108.5rpx;
    width: 445.5rpx;
    margin-top: 450rpx;
    color: #FCC825;
    font-size: 42rpx;
}

.num-key {
    width: 515.5rpx;
    height: 600rpx;
    margin-top: 10rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.num-key-btn {
    background: url('http://159.138.147.87/statics/img/number_bg.png');
    background-size: contain;
    width: 170rpx;
    height: 170rpx;
}

.icon {
    width: 35rpx;
    height: 35rpx;
    margin-top: -20rpx;
}

.icon1 {
    width: 60rpx;
    height: 60rpx;
    margin-top: -20rpx;
    margin-left: 10rpx;
}

.number {
    font-size: 45rpx;
    margin-top: -20rpx;
}
</style>