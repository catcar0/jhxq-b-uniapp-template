<script setup lang='ts'>
import { postLoginWxMinAPI} from '@/package_nzgx/services/login'
import { postRoomsnAPI } from '@/package_nzgx/services/openbook'
import { useMemberStore } from '@/package_nzgx/stores'
import type { LoginResult } from '@/package_nzgx/types/member'
import { useWebSocketStore } from '@/package_nzgx/stores'
import { onLoad } from '@dcloudio/uni-app'
import { onMounted, onUnmounted } from 'vue'
// 获取 code 登录凭证
// let code = ''
// onLoad(async () => {
//   const res = await wx.login()
//   code = res.code
// })
const memberStore = useMemberStore()
//模拟快捷登录
const login = async () => {
  const res = await postLoginWxMinAPI({
    code:'111',
    is_admin:false
  })
  loginSuccess(res)
}

const loginSuccess = (profile: LoginResult) => {
  //保存会员信息
  memberStore.setProfile(profile)
  uni.showToast({ icon: 'success', title: '登录成功' })
  // setTimeout(() => {
  //   //跳转
  //   // uni.switchTab({ url: '/pages/my/my' })
  //   uni.navigateBack()
  // }, 500);
}
const openBook = async () => {
  const res = await postRoomsnAPI({
    name:'测试房间'
  })
}
const webSocketStore = useWebSocketStore();
onMounted(() => {
  webSocketStore.connect();
  console.log(typeof WebSocket);
  console.log('aa');
});

onUnmounted(() => {
  webSocketStore.close();
});
</script>

<template>
    <view class="flex-row-center">
      <button @tap="login">登录</button>
      <button @tap="openBook">创建房间</button>
    </view>
    <view style="font-size: 20rpx;width: 100%;">{{ webSocketStore.messages }}</view>
</template>

<style scoped></style>