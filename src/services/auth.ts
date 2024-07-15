import type { IResultData } from "@/utils/LemFetch";
import { BFetcher } from "./index";

export interface Userinfos {
	avatar: string,
	business_id: number,
	created_at: string,
	id: number,
	bind_wechat: boolean,
	account_type: 1 | 2, // 1 商家；2 DM
	dm_id?: number
	dm_type?: 1|2 // 1兼职DM 2全职DM
	name: string
	phone: string
	updated_at: string
}

export const GetPhoneAuthCode = (data: { phone: string, account_type: 1 | 2 }) => {
	return BFetcher().post("/verification", data);
}

export const GetUserInfos = (): Promise<IResultData<Userinfos>> => {
	return BFetcher().get("/getUserInfo");
}

export interface AuthorizationData {
	verification_key: string,
	verification_code: string
}

export interface AuthorizationRes {
	code?: number,
	toke: string,
	userinfo: Userinfos
}

// 登录验证
export const Authorization = (data?: AuthorizationData): Promise<AuthorizationRes> => {
	return BFetcher().post("/authorization", data)
}

// 绑定微信
export const BindWechat = (code?: any) => {
	return BFetcher().post("/bind_wechat", {
		code
	})
}

export interface QuickLoginData {
	account_type: 1 | 2, // 登陆端 1=商家 2=DM
	iv: string,
	encryptedData: string,
	code: string
}

// 快速登录
export const QuickLogin = (data: QuickLoginData): Promise<AuthorizationRes> => {
	return BFetcher().post("/quick_mobile_login", data)
}

// 快速登录(test)
export const QuickLoginTest = (data: QuickLoginData): Promise<AuthorizationRes> => {
	return BFetcher().post("/quick_mobile_login2", data)
}

export interface SilentLoginData {
	account_type: 1 | 2, // 登陆端 1=商家 2=DM
	code: string
}

// 静默登录
export const SilentLogin = (data: SilentLoginData): Promise<AuthorizationRes> => {
	return BFetcher().post("/silent_login", data)
}


// 获取旧手机验证码
export const GetOldPhoneCode = (): Promise<{ verification_key: string }> => {
	return BFetcher().post("/user/changeBindBefore", {});
}

// 获取新手机验证码
export interface NewPhoneData {
	phone: any, // 现手机号
	verification_key: any, // 验证码key 原
	code: any // 验证码code 原
}
export const GetNewPhoneCode = (data: NewPhoneData): Promise<{ verification_key: string }> => {
	return BFetcher().post("/user/changeBindAfter", data);
}

// 换绑手机号
export const RebindPhone = (data: {
	verification_key: any,
	code: any
}) => {
	return BFetcher().put("/user/changeBindPhone", data);
}