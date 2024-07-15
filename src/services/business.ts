import type { IResultData } from "@/utils/LemFetch";
import { BFetcher } from "./index";
export interface Business {
	"id"?: number,
	"name"?: string, // 店铺名称
	"province_id"?: string | number, // 省id
	"city_id"?: string | number, // 市id
	"area_id"?: string | number, // 区id
	"province"?: string,
	"city"?: string,
	"area"?: string,
	"address"?: string, // 详细地址
	"tel"?: string, // 联系电话
	"contact_name"?: string, // 联系人名称
	"contact_wechat"?: string,// 联系微信
	"license"?: string, // 营业执照
	"fail_reason"?: string, // 失败原因
	"if_auth"?: 1 | 2 | 3, // 是否认证「1=待审核；2=已认证；3=驳回」默认待审核
	"balance"?: number // 余额
	"coupon_num"?: number // 开车券数量
}

// 获取店铺详情
export const GetBusiness = (): Promise<IResultData<Business>> => {
	return BFetcher().get("/business")
}

// 获取店铺认证状态
export const GetBusinessAuthStatus = (): Promise<{ code: number, message: string }> => {
	return BFetcher().get("/business/verify_auth")
}



// 创建店铺
export const CreateBusiness = (business: Business) => {
	return BFetcher().post("/business", business)
}

// 更新店铺
export const UpdateBusiness = (business: Business) => {
	return BFetcher().put("/business", business)
}

export interface DmBusiness {
	account_type: 1 | 2
	business_id: number
	business_name: string
	id: number
	name: string
}

// 获取所有店铺
export const GetAllBusiness = (): Promise<IResultData<DmBusiness[]>> => {
	return BFetcher().get("/dm-business")
}


export interface SwitchBusinessData {
	end_type: 1 | 2,
	id: number
}

export interface SwitchBusinessRes {
	account_type: 1 | 2,
	avatar: string
	bind_wechat: boolean
	business_id: number
	id: number
	name: string
	phone: string
}

// 切换店铺
export const SwitchBusiness = (data: SwitchBusinessData): Promise<IResultData<SwitchBusinessRes>> => {
	return BFetcher().put("/dm-switch-business", data)
}