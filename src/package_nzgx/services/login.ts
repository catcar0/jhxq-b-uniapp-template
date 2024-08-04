import type { LoginResult } from '@/package_nzgx/types/member'
import { http } from '@/package_nzgx/utils/https'
type LoginParams = {
    code: string
    // encryptedData: string
    // iv: string
    is_admin:boolean
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
    return http<LoginResult>({
        method: 'POST',
        url: '/api/login',
        data,
    })
}