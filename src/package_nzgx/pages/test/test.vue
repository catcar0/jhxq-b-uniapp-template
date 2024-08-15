<script setup lang='ts'>
import { postLoginWxMinAPI } from '@/package_nzgx/services/login'
import { postRoomsnAPI } from '@/package_nzgx/services/openbook'
import { useMemberStore } from '@/package_nzgx/stores'
import type { LoginResult } from '@/package_nzgx/types/member'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, onUnmounted, ref } from 'vue'
import { WebSocketService } from '@/package_nzgx/services/WebSocketService'
import { initAllInfo } from '@/package_nzgx/services/initInfo'
import { Authorization, BindWechat, QuickLogin } from '@/services/auth'
import { AuthorizationPlayer } from '@/services/play'


const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();

const code = ref('')
const login = async () => {
  memberStore.setInfo(initAllInfo)
  const res = await AuthorizationPlayer(code.value)
  console.log(res.token)
  loginSuccess(res)
}

const getCode = () => {

  // 获取code
  uni.login({
    provider: 'weixin',
    success: res => {
      console.log(res.code);
      code.value = res.code
    }
  });
}
const loginSuccess = (profile: LoginResult) => {
  //保存会员信息
  memberStore.setProfile(profile)
  // webSocketStore.webSocketService = new WebSocketService(`ws://132.232.57.64:8010/?token=${profile.token}`), // 替换为你的 WebSocket URL
  //   webSocketStore.connect();
  uni.showToast({ icon: 'success', title: '登录成功' })

}
const openBook = async () => {
  uni.showLoading({
        title: '加载中'
    });
  const res = await postRoomsnAPI({
    name: '测试房间',
    expire_time:'21600000'
  })
  memberStore.setRoomId(res.room.id)
  // console.log(res.rooom.expire_time.$date.$numberLong)
  // memberStore.setTime(res.rooom.created_at.$date.$numberLong,res.rooom.expire_time.$date.$numberLong)
  setTimeout(() => {
    joinGame('gm')
    uni.hideLoading()
  }, 2000);
}
const joinRoom2 = (_role: string) => {
  memberStore.setVirtualRoleId(_role)
  uni.navigateTo({
    url: `/package_nzgx/pages/player/player`
  })
}
const joinGame = (_role: string) => {
  // let avatarUrl:string
  //   let nickName:string
  //   uni.getUserProfile({
  //       desc: '用于完善用户资料', // 必填，描述获取用户信息的用途
  //       success: (res) => {
  //           const userInfo = res.userInfo;
  //           console.log('用户信息:', userInfo);

  //           // 获取到的微信头像和昵称
  //           avatarUrl = userInfo.avatarUrl;
  //           nickName = userInfo.nickName;
  //           memberStore.avatar = avatarUrl
  //           console.log('微信头像:', avatarUrl);
  //           console.log('微信昵称:', nickName);
  //       },
  //       fail: (err) => {
  //           console.error('获取用户信息失败:', err);
  //       }
  //   });
  memberStore.setVirtualRoleId(_role);

  // 创建 WebSocket 连接
  const wsService = new WebSocketService(`ws://132.232.57.64:8030/?token=${memberStore.profile.token}&room_id=${memberStore.roomId}&virtual_role_id=${memberStore.virtualRoleId}`);
  wsService.connect()
  // 监听 WebSocket 连接成功事件
  wsService.onOpen = () => {
    console.log("WebSocket 连接成功");

    // 连接成功后执行后续操作
    webSocketStore.gameWebSocketService = wsService;
    // webSocketStore.gameConnect();
    // webSocketStore.updateInfo(nickName, avatarUrl)
    setTimeout(() => {
      // uni.navigateTo({
      //   url: `/package_nzgx/pages/dm/dm`
      // });
      initInfo();
    }, 500);
  };

  // 监听连接错误或关闭事件
  wsService.onError = (error) => {
    console.error("WebSocket 连接失败", error);
    // 在这里可以添加错误处理逻辑
  };

  wsService.onClose = () => {
    console.log("WebSocket 连接已关闭");
    // 在这里可以添加连接关闭后的处理逻辑
  };
}

const initInfo = () => {
  webSocketStore.gameSend(
    initAllInfo
  )
}


onMounted(() => {
  if (code.value === '') {
    getCode()
  }
});

onUnmounted(() => {
});
</script>

<template>
  <view class="flex-column-sb ">
    <button @tap="login">用户登录</button>
    <button @tap="code='0b3Guqml24nqYd4Ex3nl2rm2fn1Guqmk';login()">用户浏览器登录</button>
    <button @tap="openBook">DM创建房间并加入游戏</button>
    <button @tap="joinGame('gm')">DM加入游戏</button>
    <!-- <button @tap="joinRoom('gm')">DM加入房间</button> -->
    <button @tap="joinRoom2('1')">玩家1加入游戏</button>
    <button @tap="joinRoom2('2')">玩家2加入游戏</button>
    <button @tap="joinRoom2('3')">玩家3加入游戏</button>
    <button @tap="joinRoom2('4')">玩家4加入游戏</button>
    <button @tap="joinRoom2('5')">玩家5加入游戏</button>
    <button @tap="joinRoom2('6')">玩家6加入游戏</button>
    <!-- <button @tap="joinGame('1')">玩家1加入游戏</button> -->
    <!-- <button @tap="startGame">开始游戏</button> -->
    <button @tap="initInfo">初始化游戏数据</button>
    <!-- <button @tap="code">
      获取code
    </button>
    <button @tap="AuthorizationPlayer(c)">
      获得玩家登录token
    </button> -->
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