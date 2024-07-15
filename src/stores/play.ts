import { defineStore } from "pinia";
import { DeleteRoom, GetPlayInfo, type PlayInfos } from "@/services/play";
import { PlayToken } from "@/utils/auth";
import { ref } from "vue";

export const usePlayStore = defineStore('play', () => {
    const PlayInfos = ref<PlayInfos>();

    // 获取房间信息
    const GetRoomInfo = async () => {
        try {
            let res = await GetPlayInfo();
            PlayInfos.value = res;
        } catch (err: any) { }
    }

    // 关闭房间
    const CloseRoom = async () => {
        try {
            await DeleteRoom();
            PlayToken.clear();
            uni.switchTab({
                url: "/pages/play/play"
            })
        } catch (err: any) { }
    }

    return {
        PlayInfos,
        CloseRoom,
        GetRoomInfo
    }
})