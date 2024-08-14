import type { LoginResult } from '@/package_nzgx/types/member'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<any>()
    const roomId = ref<any>()
    const virtualRoleId = ref<any>()
    const avatar = ref<any>()
    const info = ref<any>()
    const playerInfo = ref<any>()
    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }
    // 保存房间ID，DM创建房间或用户输入房间号时使用
    const setRoomId = (val: any) => {
      roomId.value = val
    }
    // 保存会员信息，登录时使用
    const setVirtualRoleId = (val: any) => {
      virtualRoleId.value = val
    }
    const setAvatar = (val: any) => {
      avatar.value = val
    }
    const setPlayerInfo = (val: any) => {
      playerInfo.value = val
    }
    const setInfo = (val: any) => {
      info.value = val
    }
    // 记得 return
    return {
      info,
      profile,
      virtualRoleId,
      roomId,
      avatar,
      playerInfo,
      setInfo,
      setPlayerInfo,
      setRoomId,
      setProfile,
      setVirtualRoleId,
      setAvatar,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    persist: {
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      }
    },
  },
)
