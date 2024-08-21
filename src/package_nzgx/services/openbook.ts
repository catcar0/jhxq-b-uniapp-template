import { http } from '@/package_nzgx/utils/https'
type RoomsParams = {
    name:string
    end_time:string
}
/**
 * 创建房间/开本
 * @param data 请求参数
 */
export const postRoomsnAPI = (data: RoomsParams) => {
    return http({
        method: 'POST',
        url: '/api/kaiben',
        data,
    })
}