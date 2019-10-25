import util from '@/utils/index.js';
// 访客记录表
export const defForm = {
	projectId: null, //项目id
	id: null, //[up *]
	name: '', //* 姓名
	sex: null, //性别
	mobile: '', //* 联系方式
	comingTime: '', //*来访日期
	age: null, //年龄
	address: '', //居住地址
	profession: '', //职业类型
	homeStructure: '', //家庭结构
	sourceWay: null, //客户来源
	buyMotive: null, //置业动机
	productRequirement: '', //产品需求
	acreageRequirement: '', //面积需求
	purposeFloor: '', //意向楼层
	purposePrice: '', //意向价格
	purpose: '', // 客户意向
	payWay: '', //付款方式
	focusPoint: '', //关注点
	resistPoint: '', //抗拒点
	remark: '' //备注
	// userId: 0 // 置业顾问Id
};
// 验证表单
export const check = function(form) {
	let result = true;
	if (!form.comingTime) {
		util.toast('来访日期不能为空');
		result = false;
	} else if (!form.name) {
		util.toast('姓名不能为空');
		result = false;
	} else if (!form.sex) {
		util.toast('性别不能为空');
		result = false;
	} else if (!form.mobile) {
		util.toast('手机号码不能为空');
		result = false;
	} else if (!form.age) {
		util.toast('年龄不能为空');
		result = false;
	} else if (!form.address) {
		util.toast('居住地址不能为空');
		result = false;
	} else if (!form.profession) {
		util.toast('职业类型不能为空');
		result = false;
	} else if (!form.homeStructure) {
		util.toast('家庭结构不能为空');
		result = false;
	} else if (!form.sourceWay) {
		util.toast('客户来源不能为空');
		result = false;
	} else if (!form.productRequirement) {
		util.toast('产品需求不能为空');
		result = false;
	} else if (!form.acreageRequirement) {
		util.toast('面积需求不能为空');
		result = false;
	} else if (!form.purposeFloor) {
		util.toast('意向楼层不能为空');
		result = false;
	} else if (!form.purposePrice) {
		util.toast('意向价格不能为空');
		result = false;
	} else if (!form.purpose) {
		util.toast('客户意向不能为空');
		result = false;
	} else if (!form.focusPoint) {
		util.toast('关注点不能为空');
		result = false;
	} else if (!form.resistPoint) {
		util.toast('抗拒点不能为空');
		result = false;
	}
	return result;
}
