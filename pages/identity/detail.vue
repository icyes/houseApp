<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ form.name }}</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom sticky-top" :class="isEdit ? 'margin-top' : ''">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text>
				认筹详情
			</view>
			<view class="action">
				<text :class="isEdit ? 'text-green' : 'text-grey'" class="padding-lr">编辑</text>
				<switch :class="isEdit ? 'checked' : ''" :checked="isEdit ? true : false" @change="IsEdit"></switch>
			</view>
		</view>
		<view class="cu-card dynamic" :class="isEdit ? '' : 'no-card'">
			<view class="cu-item shadow-warp">
				<view class="cu-list sm-border menu text-left solid-top">
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">姓名</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="填写姓名" placeholder-class="text-gray" v-model="form.name" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">手机号</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="填写手机号码" placeholder-class="text-gray" v-model="form.mobile" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">身份证</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="idcard" placeholder="身份证" placeholder-class="text-gray" v-model="form.idCard" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">身份证地址</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="身份证地址" placeholder-class="text-gray" v-model="form.idAddress" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">单位地址</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="工作单位地址" placeholder-class="text-gray" v-model="form.companyAddress" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">认筹金</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="digit" placeholder="认筹金" placeholder-class="text-gray" v-model="form.identifyPrice" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">vip卡号</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="vip卡号" placeholder-class="text-gray" v-model="form.vipCard" /></view>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">认筹日期</text></view>
						<picker
						:disabled="isEdit ? false : true"
							class="flex-treble"
							mode="date"
							:value="form.identifyTime"
							:start="startDate"
							:end="endDate"
							@change="
								e => {
									this.form.identifyTime = e.target.value ? e.target.value.substr(0, 10) : '--';
								}
							"
						>
							<view v-if="form.identifyTime" class="uni-input">{{ $moment(form.identifyTime).format("YYYY-MM-DD") }}</view>
							<view v-else class="text-gray">选择认筹日期</view>
						</picker>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">职业</text></view>
						<picker
						:disabled="isEdit ? false : true"
							class="flex-treble"
							@change="
								e => {
									this.form.profession = professional[e.target.value];
								}
							"
							:value="professional.indexOf(form.profession) !== -1 ? professional.indexOf(form.profession) : 0"
							:range="professional"
						>
							<view v-if="form.profession" class="uni-input">{{ form.profession }}</view>
							<view v-else class="text-gray">选择职业类型</view>
						</picker>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">年龄</text></view>
						<picker
							class="flex-treble"
							@change="
								e => {
									this.form.age = Age[e.target.value];
								}
							"
							:value="Age.indexOf(form.age) !== -1 && Age.indexOf(form.age) < Age.length ? Age.indexOf(form.age) : 0"
							:range="Age"
						>
							<view v-if="form.age" class="uni-input">{{ form.age }}</view>
							<view v-else class="text-gray">选择客户年龄</view>
						</picker>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">产品需求</text></view>
						<picker :disabled="isEdit ? false : true" class="flex-treble" mode="multiSelector" @change="onProductDemand" @columnchange="changeProductDemand" :range="productDemand">
							<view v-if="form.productRequirement" class="uni-input">{{ form.productRequirement }}</view>
							<view v-else class="text-gray">选择产品需求</view>
						</picker>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">购买力评估</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="购买力评估" placeholder-class="text-gray" v-model="form.purpose" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">认筹途径</text></view>
						<picker
						:disabled="isEdit ? false : true"
							class="flex-treble"
							@change="
								e => {
									this.form.sourceWay = Number(e.target.value) + 1;
								}
							"
							:value="form.sourceWay ? form.sourceWay - 1 : 0"
							:range="sourceWayArray"
						>
							<view v-if="form.sourceWay" class="uni-input">{{ sourceWayArray[form.sourceWay - 1] }}</view>
							<view v-else class="text-gray">选择认筹途径</view>
						</picker>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">置业动机</text></view>
						<picker
						:disabled="isEdit ? false : true"
							class="flex-treble"
							@change="
								e => {
									this.form.buyMotive = realEstate[e.target.value];
								}
							"
							:value="realEstate.indexOf(form.buyMotive) !== -1 ? realEstate.indexOf(form.buyMotive) : 0"
							:range="realEstate"
						>
							<view v-if="form.buyMotive" class="uni-input">{{ form.buyMotive }}</view>
							<view v-else class="text-gray">选择置业动机</view>
						</picker>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">意向价格</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="意向价格" placeholder-class="text-gray" v-model="form.purposePrice" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">备注</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="备注" placeholder-class="text-gray" v-model="form.remark" /></view>
					</view>
					<view v-if="isEdit" class="padding-lg flex flex-direction"></view>
					<view v-if="isEdit" class="fixed-bottom padding flex flex-direction"><button @click="submit" class="cu-btn bg-green lg shadow-blur round">提交</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api/identify.js';
import util from '@/utils';
import { sellStatus, professional, Age, productDemand,realEstate,sourceWayArray, } from '@/utils/common/data.js';
import {check,defForm} from "./verify.js"
export default {
	data() {
		return {
			isEdit: false,
			form: defForm,
			statusArray: ['来电', '认筹', '签约', '购买'],
			sexArray: ['男', '女'],
			// dataArray--
			Age, //年龄
			productDemand, //产品需求
			professional, //职业
			sellStatus, //售卖状态
			realEstate,//置业动机
			sourceWayArray,
		};
	},
	onLoad(option) {
		console.log(option);
		let { id, indexes } = option;
		this.id = id;
		this.indexes = indexes;
		this.getDetail();
		console.log('page', getCurrentPages());
	},
	computed:{
		oldCusomterShow() {
			return this.form.sourceWay == 3;
		}
	},
	methods: {
		// 产品需求
		onProductDemand: function(e) {
			let {
				target: { value }
			} = e;
			let i_0 = !!value[0] ? value[0] : 0;
			let i_1 = !!value[1] ? value[1] : 0;
			this.form.productRequirement = this.productDemand[0][i_0] + ':' + this.productDemand[1][i_1];
		},
		changeProductDemand: function(e) {
			let {
				detail: { column, value }
			} = e;
			if (column === 0 && value === 0) this.productDemand.splice(1, 1, ['凤大公路底商', '购物中心商铺', '主题街区商铺', '办公']);
			else if (column === 0 && value === 1) this.productDemand.splice(1, 1, ['高层', '洋房', '排屋', '公寓']);
			this.$forceUpdate();
		},
		// 获得用户详情
		getDetail() {
			api.info(this.id).then(res => {
				console.log(res);
				this.form = { ...res };
				this.oldform = {...res};
			});
		},
		// 切换编辑
		IsEdit(e) {
			let {value} = e.detail
			if(!value) this.form = {...this.oldform} 
			this.isEdit = value;
		},

		// 提交表单
		submit() {
			if (!check(this.form)) return;
			let data = { ...this.form };
			let indexes = this.indexes;
			data = this.objFilter(data);
			api.update(data).then(r => {
				util.toast('更新成功');
				this.isEdit = false;
				this.oldform = {...this.form}
				  uni.$emit('update',{indexes,data})
			});
		},
		// 选择来访日期
		bindDateChange: function(e) {
			this.form.comingTime = e.target.value;
		},
		// 选择性别
		bindSexChange: function(e) {
			this.form.sex = Number(e.target.value) + 1;
		},
		//  客户来源选择
		bindSourceWayChange: function(e) {
			this.form.sourceWay = Number(e.target.value) + 1;
		},
		// 客户状态选择
		bindStatusChange: function(e) {
			this.form.status = Number(e.target.value);
		},
		// 获取日历时间
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
		
			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
	}
};
</script>

<style>
switch::after,
switch::before {
	content: '';
}
</style>
