import { defineStore } from "pinia";
import { GetScriptsTips, type ScriptsTipsData, type BusinessScriptsStatus, GetOpeningScript, type OpeningBook } from "@/services/script";
import { ref } from "vue";
import { PlayToken } from "@/utils/auth";
import { AuthorizationDM, VerifyPlayCode } from "@/services/play";
import { useAuthStore } from "./auth";

// 根据剧本ID换小程序分包地址
const ScriptPackagePath: {
    [key: string]: any
} = {
    11: '/package_dlwh/pages/index/index', // 顶流网红
    15: '/package_lan/pages/index/index', // 恋爱脑
    19: '/package_hs/pages/index/index', // 花束
    20: '/package_nzgx/pages/index/index' // 女子高校
}

export const useScriptStore = defineStore('script', () => {
    const AuthStore = useAuthStore();
    const OpeningBooks = ref<OpeningBook[]>();
    // 是否模拟开本
    const IsTestPlay = ref<boolean>(false);
    const PlayTag = ref<BusinessScriptsStatus>(1);
    // 未读剧本提示
    const unreadScriptTips = ref<ScriptsTipsData>({
        fail: 0,
        wait: 0
    });

    // 设置play页面的tag
    const SetPlayTag = (status: BusinessScriptsStatus) => {
        PlayTag.value = status;
    }

    // 获取剧本未读信息
    const GetUnreadScriptsTips = async () => {
        if(AuthStore.Userinfos.dm_type == 1) return; // 兼职DM排除
        try {
            let res = await GetScriptsTips();
            unreadScriptTips.value = res;
        } catch (err: any) { }
    }

    // 开本
    const OpenBook = async (openCode: string, script_id: number) => {
        uni.showLoading({
            mask: true,
            title: '进入中...'
        })
        if (openCode.slice(0, 6) == '686868') {
            // 模拟开本
            uni.setStorageSync('IsTestPlay', true);
            IsTestPlay.value = true;
        } else {
            uni.removeStorageSync('IsTestPlay');
            IsTestPlay.value = false;
        }
        let packagePath = ScriptPackagePath[script_id];
        try {
            if([15,19,20].includes(script_id)){
                // TODO: 此处为新版开房逻辑
                // 恋爱脑
                // 验证DM
                let AuthorizationRes = await AuthorizationDM(AuthStore.Token);
                PlayToken.set(AuthorizationRes.token);
                // 验证开本码
                // await VerifyPlayCode(openCode);
            }
            uni.navigateTo({
                url: `${packagePath}?open_code=${openCode}&id=${script_id}`,
            })
        } catch (err: any) {
        } finally {
            uni.hideLoading();
        }
    }

    // 获取正在开本的
    const GetOpening = async () => {
        try {
            let res = await GetOpeningScript();
            OpeningBooks.value = res.data || [];
        } catch (err: any) {

        }
    }

    return {
        PlayTag,
        IsTestPlay,
        unreadScriptTips,
        OpeningBooks,
        SetPlayTag,
        OpenBook,
        GetOpening,
        GetUnreadScriptsTips,
    }
})