const toast = (op) => {
	op = typeof op === 'object' ? op : {
		title: op
	}
	let defop = {
		title: '标题',
		icon: 'none',
		duration: 2000,
	}
	op = Object.assign(defop, op)
	uni.showToast(op);
}


const navigateTo = (op) => {
	op = typeof op === 'object' ? op : {
		url: op
	}
	let defop = {

	}
	op = Object.assign(defop, op)
	uni.navigateTo(op);
}

// 关闭当前页面，跳转到应用内的某个页面。
const redirectTo = (op) => {
	op = typeof op === 'object' ? op : {
		url: op
	}
	let defop = {

	}
	op = Object.assign(defop, op)
	uni.redirectTo(op);
}

const pageScrollTo = (op) => {
	op = typeof op === 'object' ? op : {
		scrollTop: op
	}
	let defop = {
		scrollTop: 0,
		duration: 0
	}
	op = Object.assign(defop, op)
	uni.pageScrollTo(op);
}

const showModal = (op) => {
	op = typeof op === 'object' ? op : {
		content: op
	}

	return new Promise((resolve, reject) => {
		let defop = {
			title: '提示',
			content: '这是一个模态弹窗',
			confirmColor: '#e54d42',
			success: function(res) {
				if (res.confirm) {
					resolve()
				} else if (res.cancel) {
					reject()
				}
			}
		}
		op = Object.assign(defop, op)
		uni.showModal(op);
	})

}

// 打电话
const makePhoneCall = (phoneNumber) => {
	if (!phoneNumber) {
		util.toast("请先添加电话号码");
		return
	}
	uni.makePhoneCall({
		phoneNumber,
	});
}

// 显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框。
const showLoading = (op={})=>{
	op = typeof op === 'object' ? op : {
		title: op
	}
	let defop = {
		title: '加载中...',
		mask:true
	}
	op = Object.assign(defop, op)
	uni.showLoading(op);
}

// 隐藏 loading 提示框。
const hideLoading = ()=>{
	
	setTimeout(function () {
	    uni.hideLoading();
	}, 500);
}


export default {
	toast,
	navigateTo,
	pageScrollTo,
	showModal,
	makePhoneCall,
	redirectTo,
	showLoading,
	hideLoading
}
