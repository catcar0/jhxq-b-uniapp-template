import { useAuthStore } from "@/stores/auth";
import MyFetch from "@/utils/LemFetch";
import { PlayToken } from "@/utils/auth";

// VITE_PLAY_API=https://kaiben.center.wanjuyuanxian.com
// # 商家端API域名
// VITE_B_API=https://api.wanjuyuanxian.com
const B_Api_Url = 'https://api.wanjuyuanxian.com' + "/api/b";
const Play_Api_Url = 'https://kaiben.center.wanjuyuanxian.com' + "/api";

// b端
export const BFetcher = () => {
    console.log(B_Api_Url)
    console.log(Play_Api_Url)
    MyFetch.token = useAuthStore().Token;
    MyFetch.baseUrl = B_Api_Url;
    return MyFetch;
}

// 开本服务中心
export const PlayFetcher = () => {
    MyFetch.token = PlayToken.get();
    MyFetch.baseUrl = Play_Api_Url;
    return MyFetch;
}