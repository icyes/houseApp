<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ form.name }}</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom sticky-top" :class="isEdit ? 'margin-top' : ''">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text>
				跟进详情
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
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type="text" placeholder="客户姓名" placeholder-class="text-gray" v-model="form.name" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">手机号</text></view>
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type="text" placeholder="客户电话" placeholder-class="text-gray" v-model="form.mobile" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">联系方式</text></view>
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type="text" placeholder="联系方式" placeholder-class="text-gray" v-model="form.contactWay" />
						</view>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">主题</text></view>
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type=" number" placeholder="主题" placeholder-class="text-gray" v-model="form.subject" />
						</view>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">联系详情</text></view>
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type="text" placeholder="联系详情" placeholder-class="text-gray" v-model="form.contactDetail" />
						</view>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">回访日期</text></view>
						<view class="action flex-treble">
							<picker mode="date" :disabled="isEdit ? false : true" :value="form.nextVisitTime" :start="startDate" :end="endDate" @change="e=>{
								this.form.nextVisitTime = e.target.value;
							}">
								<view v-if="form.nextVisitTime" class="uni-input">{{ form.nextVisitTime.substr(0,10) }}</view>
								<view v-else class="text-gray">下次回访日期</view>
							</picker>
						</view>
					</view>
					<view v-if="isEdit" class="padding-lg flex flex-direction"></view>
					<view v-if="isEdit" class="fixed-bottom padding flex flex-direction"><button @click="submit" class="cu-btn bg-green lg shadow-blur round">提交</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api/follow.js';
import util from '@/utils';
const defForm = {
	id: null, //[up *]
	projectId:null,//项目id
	contactWay: '', // 联系方式
	subject: '', // 主题
	contactDetail: '', //联系详情
	nextVisitTime: '', //下次回访日期
	// userId:null,//职业顾问Id
	name: null, //客户姓名
	mobile: null, //客户电话
};
export default {
	data() {
		return {
			isEdit: false,
			form: defForm,
			sourceWayArray: ['自然上访', '员工邀约', '老客户介绍', '路过', '朋友介绍', '广告媒体', '其他'],
			statusArray: ['来电', '认筹', '签约', '购买'],
			sexArray: ['男', '女']
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
	computed: {
		oldCusomterShow() {
			return this.form.sourceWay == 3;
		}
	},
	methods: {
		// 获得用户详情
		getDetail() {
			api.info(this.id).then(res => {
				console.log(res);
				this.form = { ...res };
				this.oldform = { ...res };
			});
		},
		// 切换编辑
		IsEdit(e) {
			let { value } = e.detail;
			if (!value) this.form = { ...this.oldform };
			this.isEdit = value;
		},
		// 验证表单
		check() {
			let result = true;
			/* mobile: '', //* 联系方式
			name: '', //* 姓名
			comingTime: '', //*来访日期 */
			let { mobile, name, comingTime } = this.form;
			if (!mobile) {
				util.toast('联系方式不能为空');
				result = false;
			} else if (!name) {
				util.toast('姓名不能为空');
				result = false;
			} else if (!comingTime) {
				util.toast('来访日期不能为空');
				result = false;
			}
			return result;
		},
		// 提交表单
		submit() {
			// if (!this.check()) return;
			let data = { ...this.form };
			let indexes = this.indexes;
			data = this.objFilter(data);
			api.update(data).then(r => {
				util.toast('更新成功');
				this.isEdit = false;
				this.oldform = { ...this.form };
				uni.$emit('update', { indexes, data });
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
		}
	}
};
</script>

<style>
switch::after,
switch::before {
	content: '';
}
</style>
