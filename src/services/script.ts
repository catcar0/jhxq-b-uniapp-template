import type { IResultData } from "@/utils/LemFetch";
import { BFetcher } from "./index";
import type { Business } from "@/services/business"


// 申领状态「0=未申领；1=申领中；2=申领失败；3=待发货(申领通过)；4=待收货(已发货)；5=已拥有(确认收货)」
export type apply_status = 0 | 1 | 2 | 3 | 4 | 5;
export interface Script {
	author: string
	created_at: string
	description: string
	duration: string
	opened: boolean,
	id: number
	issuer_id: number
	issuer_name: string
	keywords: string
	name: string
	people_num: string
	preview: string
	role: any[]
	authors: string[]
	issuers: string[]
	sex_ratio: string
	tag: {
		id: number,
		name: string
	}[]
	updated_at: string
	weight: number
	allow_apply: boolean // 是否可以申领
	if_apply: boolean // 已经申领
	// 状态「1=申领中；2=申领失败；3=待发货(申领通过)；4=待收货(已发货)；5=已拥有(确认收货)」
	apply_status: apply_status,
	repeat_apply: boolean // 重复申领（已申领）
	after_sale_name?: string, // 售后名称
	after_sale?: string // 售后二维码
	after_sale_group?: string, // 售后群二维码
	after_sale_group_name?: string, // 售后群名称
	price?: string | number // 价格
	free_coupon_num?: number // 免费车次
	// 1任务申领,2付费申领
	apply_type: 1 | 2
}

export interface ScriptDetail {
	id: number,
	name: string,
	apply_money: number, // 申领价格
	apply_content: string[],
	apply_tasks: {
		title: string,
		desc: string
	}[],
	open_code: string,
	duration: string,
	people_num: any,
	people: any,
	preview: string,
	price: number,
	exists_openbook: boolean, // 是否已开本
	repeat_apply: boolean // 重复申领（已申领）
	// 1任务申领,2付费申领
	apply_type: 1 | 2,
	apply_status: apply_status,
	free_coupon_num?: number // 免费车次
	free_coupon?: number
}

export interface ScriptPayData {
	script_id: number,
	people_number: number,
	code?: string
}

export type PreType = 1 | 2 | 3// 1调起微信支付；2使用免费开车券；3使用平台币;

export interface PayData {
	code?: number,
	message?: string,
	type: PreType,
	order_no: string,
	param: {
		appId: string
		nonceStr: string
		package: string
		paySign: string
		signType: string
		timeStamp: string
	}
}

export interface ScriptQuery {
	page?: number,
	limit?: number,
}

// 获取剧本
export const GetScripts = (query?: ScriptQuery): Promise<IResultData<Script[]>> => {
	return BFetcher().get("/script", query)
}

export interface ScriptsTipsData {
	fail: number
	wait: number
}

// 获取剧本提示数据（角标）
export const GetScriptsTips = (): Promise<ScriptsTipsData> => {
	return BFetcher().get("/script_tips")
}


// 获取剧本（游客）
export const GetTouristScripts = (): Promise<IResultData<Script[]>> => {
	return BFetcher().get("/tourist/script")
}

export type BusinessScriptsStatus = 1 | 2 | 3; // 状态「1=已拥有，2=申领中，3=待收货」
export interface BusinessScript {
	id: number,
	status: 1 | 2 | 3 | 4 | 5, // 状态「1=申领中；2=申领失败；3=待发货(申领通过)；4=待收货(已发货)；5=已拥有(确认收货)」
	script: Script,
	business: Business,
	business_script_apply: {
		express_company: string
		express_no: string
		fail_reason: string
		id: number
		if_delivery: number
		task: string[]
	}
}
// 获取店铺剧本
export const GetBusinessScripts = (status: BusinessScriptsStatus): Promise<IResultData<BusinessScript[]>> => {
	return BFetcher().get("/business_script/status/" + status)
}


// 获取剧本详情
export const GetScript = (id: any): Promise<IResultData<ScriptDetail>> => {
	return BFetcher().get("/script/" + id)
}

// 获取剧本详情(游客）
export const GetTouristScript = (id: any): Promise<IResultData<ScriptDetail>> => {
	return BFetcher().get("/tourist/script/" + id)
}


export interface ScriptApplyData {
	"script_id": number | string, // 剧本id
	"task": string, // 任务截图
	"remark": string // 任务备注
}
// 剧本申领
export const ScriptApply = (data: ScriptApplyData) => {
	return BFetcher().post("/business_script", data)
}

// 付费剧本申领
export const PayScriptApply = (data: { script_id: number, remark: string, code: string }): Promise<PayData> => {
	return BFetcher().post("/apply_script", data)
}

// 编辑剧本申领
export const UpdateScriptApply = (data: { id: number | string, task: string, remark: string }) => {
	return BFetcher().put("/business_script", data)
}

// 剧本申领详情
export const GetScriptApply = (id: number | string) => {
	return BFetcher().get("/business_script/" + id)
}

// 确认收货剧本
export const ConfirmScriptReceipt = (id: number | string) => {
	return BFetcher().put("/business_script/confirm_receipt/" + id, {})
}



export interface RecordQuery {
	script_id: number,
	page?: number,
	limit?: number,
	time?: string
}

// 获取开本记录
export const GetScriptRecords = (query: RecordQuery): Promise<IResultData<any>> => {
	return BFetcher().get("/open_record", query)
}

// 预支付剧本
export const PrePayScript = (data: ScriptPayData): Promise<{ type: PreType }> => {
	return BFetcher().post("/pre_pay", data)
}

// 支付剧本
export const PayScript = (data: ScriptPayData): Promise<PayData> => {
	return BFetcher().post("/pay", data)
}

export interface PayResult {
	code: number,
	data: {
		open_book_code: any
	}
}

// 支付状态
export const PayStatus = (order_no: any): Promise<PayResult> => {
	return BFetcher().get("/pay/" + order_no)
}


// 获取模拟开本码
export const GetTestOpenCode = (script_id: any): Promise<{
	code?: number
	message?: string,
	data: {
		open_book_code: any
	}
}> => {
	return BFetcher().get("/getOpenBookCode", {
		script_id
	})
}

// 开本中的剧本
export interface OpeningBook {
	code: string
	id: number
	name: string
	operate_name: string
	room_number: string
	start_time: string
	business_name: string
	is_imitate: boolean
	script_id: number
}

// 获取开本中的剧本
export const GetOpeningScript = (): Promise<IResultData<OpeningBook[]>> => {
	return BFetcher().get("/opening")
}