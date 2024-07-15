const TokenKey = "Authorization";
const PlayTokenKey = "PlayToken";

// 商家端TOKEN
export const LemToken = {
	get() {
		try {
			return uni.getStorageSync(TokenKey)
		} catch (e: any) {
			return null
		}
	},
	set(token: string) {
		try {
			uni.setStorageSync(TokenKey, token)
		} catch (e: any) {
			console.log(e)
		}
	},
	clear() {
		try {
			uni.removeStorageSync(TokenKey)
		} catch (e) {
			// error
		}
	},
};

// 开本服务端TOKEN
export const PlayToken = {
	get() {
		try {
			return uni.getStorageSync(PlayTokenKey)
		} catch (e: any) {
			return null
		}
	},
	set(token: string) {
		try {
			uni.setStorageSync(PlayTokenKey, token)
		} catch (e: any) {
			console.log(e)
		}
	},
	clear() {
		try {
			uni.removeStorageSync(PlayTokenKey)
		} catch (e) {
			// error
		}
	},
}