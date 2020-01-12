	import util from '@/utils/index.js';
		// 验证表单
	export const defForm = {
		id: null, //[up *]
		name: null, //认购者信息
		sex: 1, //性别
		mobile: null, //电话
		idCard: null, //身份证
		address: null, //通讯地址
		offerBuyTime: "", //认购日期
		prePrice: '', //* 定金
		houseId: '', //* 房屋Id
		workAddress: null, //工作区域
		profession: null, //职业类型
		age: null, //年龄
		homeStructure: null, //家庭结构
		buyMotive: null, //置业动机
		sourceWay: null //客户来源
	};	
	export const check = function (form) {
			let result = true;
			let { name, //认购者信息
				sex, //性别
				mobile, //电话
				idCard, //身份证
				address, //通讯地址
				offerBuyTime, //认购日期
				prePrice, //* 定金
				houseId, //* 房屋Id
				workAddress, //工作区域
				profession, //职业类型
				age, //年龄
				homeStructure, //家庭结构
				buyMotive, //置业动机
				sourceWay,//客户来源 
				} = form;
			if (!name) {
				util.toast('姓名不能为空');
				result = false;
			} else if (!mobile) {
				util.toast('电话不能为空');
				result = false;
			} else if (!idCard) {
				util.toast('身份证不能为空');
				result = false;
			}else if (!address) {
				util.toast('通讯地址不能为空');
				result = false;
			}else if (!offerBuyTime) {
				util.toast('认购日期不能为空');
				result = false;
			}else if (!houseId) {
				util.toast('房屋不能为空');
				result = false;
			}else if (!workAddress) {
				util.toast('工作区域不能为空');
				result = false;
			}else if (!profession) {
				util.toast('职业类型不能为空');
				result = false;
			}else if (!age) {
				util.toast('年龄不能为空');
				result = false;
			}else if (!homeStructure) {
				util.toast('家庭结构不能为空');
				result = false;
			}else if (!buyMotive) {
				util.toast('置业动机不能为空');
				result = false;
			}else if (!sourceWay) {
				util.toast('客户来源不能为空');
				result = false;
			}
			return result;
		}