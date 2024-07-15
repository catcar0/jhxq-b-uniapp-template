import { useAuthStore } from "@/stores/auth";
import { PlayToken } from "./auth";

export interface IResultData<T> {
	data?: T;
	meta?: any;
	links?: any
}
// LemFetch().ts
class LemFetch {
	public baseUrl?: string;
	public token?: string;

	constructor() {}

	private request<T>(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any): Promise<T> {
		const AuthStore = useAuthStore();
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.baseUrl + url,
				method: method,
				data: data,
				header: {
					// 'Content-Type': "application/x-www-form-urlencoded",
					'token': this.token || null,
					'accept': 'application/json'
				},
				success: (response) => {
					console.log(response.statusCode+':'+url)
					if (response.statusCode === 401) {
						// token过期
						let playToken = PlayToken.get(); // 游戏Token
						if(AuthStore.Token && !playToken){
							AuthStore.$patch({Token:''});
							AuthStore.clearData();
							AuthStore.silentLogin();
						}
					} else if(response.statusCode == 422 || response.statusCode >= 500){
						uni.showToast({
							title: (response.data as any) .message || '服务器错误', 
							icon: 'none',
							mask: false
						})
						reject(response.data);
					} else if (response.statusCode >= 200 && response.statusCode < 300) {
						resolve(response.data as T);
					} else {
						console.log(response.data)
						reject(response.data);
					}
				},
				fail: (error) => reject(error)
			});
		});
	}

	public get<T>(url: string, data?: any): Promise<T> {
		return this.request<T>(url, 'GET', data);
	}

	public post<T>(url: string, data: any): Promise<T> {
		return this.request<T>(url, 'POST', data);
	}

	public put<T>(url: string, data: any): Promise<T> {
		return this.request<T>(url, 'PUT', data);
	}

	public delete<T>(url: string, data?: any): Promise<T> {
		return this.request<T>(url, 'DELETE', data);
	}
}

export default new LemFetch();