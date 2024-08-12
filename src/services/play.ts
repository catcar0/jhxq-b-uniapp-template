import type { IResultData } from "@/utils/LemFetch";
import { PlayFetcher } from "./index";

// 玩家
export interface Player {
    player_avatar: string
    player_name: string
    role_avatar: string
    role_id: number
    role_name: string
}

export const GetPlayerList = (): Promise<IResultData<Player[]>> => {
    return PlayFetcher().get("/player_list", {});
}

// 踢出玩家
export const BanPlayer = (role_id: number) => {
    return PlayFetcher().delete("/room/player", {
        role_id
    });
}
// 玩家登录
export const AuthorizationPlayer = (code: string): Promise<{ code: string }> => {
    return PlayFetcher().post("/authorizations", {
        code
    });
}
// DM登录
export const AuthorizationDM = (token: string): Promise<{ token: string }> => {
    return PlayFetcher().post("/authorizations/dm", {
        token
    });
}

// 获取开本信息
export interface PlayInfos {
    running_room: boolean,
    account_type: "DM" | "player",
    script_id: number,
    script_name: string,
    script_preview: string,
    start_time: number,
    room_number: string,
    room_end_time: string,
    people_number: number,
    DM: string
}
export const GetPlayInfo = (): Promise<PlayInfos> => {
    return PlayFetcher().get("/kaibeninfo", {});
}

// 校验开本码
export interface VerifyPlayCodeRes {
    room_number: string,
    host: string,  // 请求域名
    is_imitate: number // 是否模拟开本
}
export const VerifyPlayCode = (open_book_code: string): Promise<VerifyPlayCodeRes> => {
    return PlayFetcher().post("/verify_open_book_code", {
        open_book_code
    });
}

// 关闭房间
export const DeleteRoom = () => {
    return PlayFetcher().delete("/room", {});
}

export interface BgAudio {
    loop: boolean
    title: string
    url: string
}

// 音频列表
export const GetAudios = (): Promise<IResultData<BgAudio[]>> => {
    return PlayFetcher().get("/audio_list", {});
}
