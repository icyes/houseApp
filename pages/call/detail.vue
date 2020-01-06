<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ form.name }}</block>
		</cu-custom>
		<view v-if="showMenu" class="page-mask" @touchmove.stop="() => false" @click="showMenu = false" />
		<view class="cu-bar bg-white solid-bottom  flex justify-between" :class="[!showMenu ? 'sticky-top' : '', isEdit ? 'margin-top' : '']">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text>
				来电详情
			</view>
			<view class="cu-btn round line-green relative" style="z-index: 12;">
				<span @click="showMenu = !showMenu" style="z-index: 10;">
					<text class="cuIcon-forward"></text>
					拓联
				</span>

				<view class="absolute" style="height: 100%;z-index: 1;">
					<view
						@click="addFollow('follow')"
						class="cu-btn round bg-green "
						style="transition: all .5s ease-in;  "
						:style="showMenu ? 'left: 160rpx;;opacity:1' : 'left: 0rpx;opacity:0'"
					>
						跟进
					</view>
					<view
						@click="addFollow('identity')"
						class="cu-btn round bg-green "
						style="transition: all .5s ease-in;  "
						:style="showMenu ? 'left: 100rpx;top: 20px;opacity:1' : 'left: 0rpx;top: -40px;opacity:0'"
					>
						认筹
					</view>
					<view
						@click="addFollow('offer')"
						class="cu-btn round bg-green "
						style="transition: all .5s ease-in;  "
						:style="showMenu ? 'left: 0rpx;top:30px;;opacity:1' : 'left: 0rpx;top:-60px;opacity:0'"
					>
						认购
					</view>
				</view>
			</view>
			<!-- <button class="cu-btn  bg-orange margin-right" @tap="() => addFollow()">添加跟进</button> -->
			<view class="action">
				<text :class="isEdit ? 'text-green' : 'text-grey'" class="padding-lr">编辑</text>
				<switch :class="isEdit ? 'checked' : ''" :checked="isEdit ? true : false" @change="IsEdit"></switch>
			</view>
		</view>
		<view class="cu-card dynamic" :class="isEdit ? '' : 'no-card'">
			<view class="cu-item shadow-warp">
				<view class="cu-list sm-border menu text-left solid-top">
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">客户姓名</text></view>
						<view class="action flex-treble">
							<input type="text" :disabled="isEdit ? false : true" placeholder="来电客户姓名" placeholder-class="text-gray" v-model="form.name" />
						</view>
					</view>
					<view class="cu-item flex" @click="isEdit? false:util.makePhoneCall(form.mobile)">
						<view class="content flex-sub"><text class="text-grey">手机号</text></view>
						<view class="action flex-treble">
							<input type="text" :disabled="isEdit ? false : true" placeholder="来电客户手机号" placeholder-class="text-gray" v-model="form.mobile" />
						</view>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">性别</text></view>
						<picker
							:disabled="isEdit ? false : true"
							class="flex-treble"
							@change="
								e => {
									this.form.sex = Number(e.target.value) + 1;
								}
							"
							:value="form.sex - 1"
							:range="sexArray"
						>
							<view v-if="form.sex" class="uni-input">{{ sexArray[form.sex - 1] }}</view>
							<view v-else class="text-gray">选择性别</view>
						</picker>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">来电日期</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								mode="date"
								:value="form.callTime.substr(0, 10)"
								:start="startDate"
								:end="endDate"
								@change="
									e => {
										this.form.callTime = e.target.value;
									}
								"
							>
								<view v-if="form.callTime" class="uni-input">{{ form.callTime.substr(0, 10) }}</view>
								<view v-else class="text-gray">选择来电日期</view>
							</picker>
						</view>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">获取途径</text></view>
						<picker
							:disabled="isEdit ? false : true"
							class="flex-treble"
							@change="
								e => {
									this.form.acquiringWay = Number(e.target.value) + 1;
								}
							"
							:value="form.acquiringWay - 1"
							:range="sourceWayArray"
						>
							<view v-if="form.acquiringWay" class="uni-input">{{ sourceWayArray[form.acquiringWay - 1] }}</view>
							<view v-else class="text-gray">选择获取途径</view>
						</picker>
					</view>

					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">询问内容1</text></view>
						<view class="action flex-treble">
							<!-- <input type="text" :disabled="isEdit ? false : true" placeholder="填写询问内容1" placeholder-class="text-gray" v-model="form.askContentOne" /> -->
						<textarea  :disabled="isEdit ? false : true" style="width: unset;" auto-height type="text"  placeholder="填写询问内容1" placeholder-class="text-gray" v-model="form.askContentOne" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">询问内容2</text></view>
						<view class="action flex-treble">
							<!-- <input type="text" :disabled="isEdit ? false : true" placeholder="填写询问内容2" placeholder-class="text-gray" v-model="form.askContentTwo" /> -->
						<textarea  :disabled="isEdit ? false : true" style="width: unset;" auto-height type="text"  placeholder="填写询问内容2" placeholder-class="text-gray" v-model="form.askContentTwo" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">备注</text></view>
						<view class="action flex-treble">
							<!-- <input type="text" :disabled="isEdit ? false : true" placeholder="填写备注" placeholder-class="text-gray" v-model="form.remark" /> -->
							<textarea
								v-if="!showMenu"
								style="width: unset;"
								auto-height
								type="text"
								:disabled="isEdit ? false : true"
								placeholder="填写备注"
								placeholder-class="text-gray"
								v-model="form.remark"
							/>
							<view v-if="showMenu">{{ form.remark }}</view>
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
import api from '@/api/call.js';
import util from '@/utils';
import { gender, statusArray, customerSource } from '@/utils/common/data.js';
const defForm = {
	id: null, //*
	projectId: null, //项目id
	name: null, //来电客户姓名
	mobile: null, //手机号
	sex: null, //来电客户性别
	callTime: '', //*来电日期
	acquiringWay: '', //获取途径
	askContentOne: '', //询问内容1
	askContentTwo: '', //询问内容2
	remark: '' //备注
};
export default {
	data() {
		return {
			util,
			showMenu: false,
			isEdit: false,
			form: defForm,
			sourceWayArray: customerSource,
			statusArray: statusArray,
			sexArray: gender
		};
	},
	onLoad(option) {
		console.log(option);
		let { id, indexes, projectId } = option;
		this.id = id;
		this.projectId = projectId;
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
		addFollow(target) {
			if(!this.showMenu)return;
			let form = this.form;
			let projectId = this.projectId;
			let url = `/pages/${target}/index?id=${projectId}&name=${form.name}&mobile=${form.mobile}&showAddModal=${true}`;
			this.showMenu = false;
			util.navigateTo(url);
		},
		// 获得用户详情
		getDetail() {
			util.showLoading();
			api.info(this.id).then(res => {
				console.log(res);
				this.form = { ...res };
				this.oldform = { ...res };
				util.hideLoading();
			}).catch(e=>{
				util.hideLoading();
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
