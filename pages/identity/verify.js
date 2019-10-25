import util from '@/utils/index.js';
	// 认筹登记表
	export const defForm = {
		id: null, //[up *]
		name: '', //* 姓名
		mobile: '', //* 手机号
		idCard: '', //*身份证
		idAddress: '', //身份证地址
		company: null, //工作单位
		companyAddress: '', //工作单位地址
		identifyPrice: '', //认筹金
		vipCard: '', //vip卡号
		sellStatus: null,
		identifyTime: null, //认筹日期
		refundTime: null,
		profession: null,
		age: null,
		productRequirement: null, //产品需求
		purpose: null,
		sourceWay: null,
		buyMotive: null,
		purposePrice: null
	};
	// 验证表单
	export const check = function(form) {
		let result = true;
		if (!form.name) {
			util.toast('姓名不能为空');
			result = false;
		} else if (!form.mobile) {
			util.toast('手机号码不能为空');
			result = false;
		} else if (!form.idCard) {
			util.toast('身份证不能为空');
			result = false;
		} else if (!form.idAddress) {
			util.toast('身份证地址不能为空');
			result = false;
		}  else if (!form.companyAddress) {
			util.toast('工作单位地址不能为空');
			result = false;
		} else if (!form.identifyPrice) {
			util.toast('认筹金不能为空');
			result = false;
		} else if (!form.identifyTime) {
			util.toast('认筹日期不能为空');
			result = false;
		}  else if (!form.profession) {
			util.toast('职业类型不能为空');
			result = false;
		} else if (!form.age) {
			util.toast('年龄不能为空');
			result = false;
		} else if (!form.productRequirement) {
			util.toast('产品需求不能为空');
			result = false;
		} else if (!form.purpose) {
			util.toast('购买力评估不能为空');
			result = false;
		} else if (!form.sourceWay) {
			util.toast('认筹途径不能为空');
			result = false;
		}else if (!form.buyMotive) {
			util.toast('认筹动机不能为空');
			result = false;
		}else if (!form.purposePrice) {
			util.toast('意向价格不能为空');
			result = false;
		}
		return result;
	}
