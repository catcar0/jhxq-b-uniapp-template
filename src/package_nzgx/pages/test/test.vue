<script setup lang='ts'>
import { postLoginWxMinAPI } from '@/package_nzgx/services/login'
import { postRoomsnAPI } from '@/package_nzgx/services/openbook'
import { useMemberStore } from '@/package_nzgx/stores'
import type { LoginResult } from '@/package_nzgx/types/member'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, onUnmounted } from 'vue'
import { WebSocketService } from '@/package_nzgx/services/WebSocketService'
import { initAllInfo } from '@/package_nzgx/services/initInfo'
// 获取 code 登录凭证
// let code = ''
// onLoad(async () => {
//   const res = await wx.login()
//   code = res.code
// })
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();
//模拟快捷登录
const login = async () => {
  const randomNumber = generateRandomNumber();
  const res = await postLoginWxMinAPI({
    code: randomNumber + '',
    is_admin: false
  })
  loginSuccess(res)
}

const loginSuccess = (profile: LoginResult) => {
  //保存会员信息
  memberStore.setProfile(profile)
  webSocketStore.webSocketService = new WebSocketService(`ws://132.232.57.64:8010/?token=${profile.token}`), // 替换为你的 WebSocket URL
    webSocketStore.connect();
  uni.showToast({ icon: 'success', title: '登录成功' })
  // setTimeout(() => {
  //   //跳转
  //   // uni.switchTab({ url: '/pages/my/my' })
  //   uni.navigateBack()
  // }, 500);
}
const openBook = async () => {
  const res = await postRoomsnAPI({
    name: '测试房间'
  })
  memberStore.setRoomId(res.room.id)
}
const joinRoom = (_role: string) => {
  webSocketStore.send(
    JSON.stringify({
      type: 'join_room',
      room_id: memberStore.roomId,
      role: _role
    })
  )
  setTimeout(() => {
    joinGame('gm')
  }, 500);
  setTimeout(() => {
    initInfo()
    uni.navigateTo({
    url: `/package_nzgx/pages/dm/dm`
  })
  }, 2000);
}
const joinRoom2 = (_role: string) => {
  memberStore.setVirtualRoleId(_role)
  uni.navigateTo({
    url: `/package_nzgx/pages/player/player`
  })
}
const joinGame = (_role: string) => {
  memberStore.setVirtualRoleId(_role)
  webSocketStore.gameWebSocketService = new WebSocketService(`ws://132.232.57.64:8020/?token=${memberStore.profile.token}&room_id=${memberStore.roomId}&virtual_role_id=${memberStore.virtualRoleId}`), // 替换为你的 WebSocket URL
  webSocketStore.gameConnect()
  setTimeout(() => {
    initInfo()
  }, 500);
}
const initInfo = () => {
  webSocketStore.gameSend(
    initAllInfo
  )
}
const updateInfo = (info: any) => {
  webSocketStore.gameSend(
    info
  )
}
const fun = (content: any) => {
  const newInfo = memberStore.info
  newInfo.aa.bb = content
}
const startGame = () => {
  webSocketStore.send(JSON.stringify(
    {
      type: 'start_game'
    }
  ))
}
const generateRandomNumber = (minDigits = 3, maxDigits = 12) => {
  const min = Math.pow(10, minDigits - 1);
  const max = Math.pow(10, maxDigits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getUserInfo = () =>{
  console.log('aa')
  uni.getUserInfo({
        provider: 'weixin',
        success: (res) => {
          console.log('getUserInfo', res);
        },
      });
}
onMounted(() => {
  if (memberStore.profile.token) {
    webSocketStore.connect();
  }
});

onUnmounted(() => {
  webSocketStore.close();
});
</script>

<template>
  <view class="flex-column-sb ">
    <button @tap="login">用户登录</button>
    <button @tap="openBook">DM创建房间</button>
    <button @tap="joinRoom('gm')">DM加入房间</button>
    <button @tap="joinRoom2('1')">玩家1加入房间</button>
    <button @tap="joinGame('gm')">DM加入游戏</button>
    <!-- <button @tap="joinGame('1')">玩家1加入游戏</button> -->
    <!-- <button @tap="startGame">开始游戏</button> -->
    <button @tap="initInfo">初始化info</button>
    <button @tap="getUserInfo">
        微信用户一键登录
      </button>

    <!-- <button @tap="updateInfo">更新info</button>
    <button @tap="fun('dd')">获取并修改info</button> -->
    <!-- <button @tap="joinRoom('player2')">玩家2加入房间</button>
    <button @tap="joinRoom('player3')">玩家3加入房间</button>
    <button @tap="joinRoom('player4')">玩家4加入房间</button>
    <button @tap="joinRoom('player5')">玩家5加入房间</button>
    <button @tap="joinRoom('player6')">玩家6加入房间</button> -->
  </view>
  <view style="font-size: 20rpx;width: 100%;">{{ webSocketStore.messages }}</view>
  <view>{{ memberStore.roomId }}</view>
  <!-- <view style="font-size: 20rpx;width: 100%;">{{ webSocketStore.info }}</view> -->
  <view style="font-size: 20rpx;width: 100%;">{{ memberStore.info }}</view>
</template>

<style scoped></style>