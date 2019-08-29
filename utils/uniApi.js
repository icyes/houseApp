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
			confirmColor:'#e54d42',
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

export default {
	toast,
	navigateTo,
	pageScrollTo,
	showModal
}
