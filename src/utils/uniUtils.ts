// 防止弹窗后背景滚动
export const setPageOverflow = (overflow: 'hidden' | 'auto') => {
	wx.setPageStyle({
		style: {
			overflow: overflow
		}
	})
}

// 弹窗
export const Toast = (title: string) => {
	uni.showToast({
		icon: "none",
		title
	})
}