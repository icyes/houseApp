<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ form.name }}</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom sticky-top" :class="isEdit ? 'margin-top' : ''">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text>
				认购详情
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
						<view class="content flex-sub"><text class="text-grey">客户姓名</text></view>
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type="text" placeholder="客户姓名" placeholder-class="text-gray" v-model="form.name" />
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
							:value="form.sex ? form.sex - 1 : 0"
							:range="sexArray"
						>
							<view v-if="form.sex" class="uni-input">{{ sexArray[form.sex - 1] }}</view>
							<view v-else class="text-gray">选择性别</view>
						</picker>
					</view>
					<view class="cu-item flex" @click="isEdit ? false : util.makePhoneCall(form.mobile)">
						<view class="content flex-sub"><text class="text-grey">电话</text></view>
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type="text" placeholder="电话" placeholder-class="text-gray" v-model="form.mobile" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">身份证</text></view>
						<view class="action flex-treble">
							<input :disabled="isEdit ? false : true" type="text" placeholder="身份证" placeholder-class="text-gray" v-model="form.idCard" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">通讯地址</text></view>
						<view class="action flex-treble">
							<!-- <input :disabled="isEdit ? false : true" type="text" placeholder="通讯地址" placeholder-class="text-gray" v-model="form.address" /> -->
						<textarea  :disabled="isEdit ? false : true" style="width: unset;" auto-height type="text"  placeholder="通讯地址" placeholder-class="text-gray" v-model="form.address" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">认购日期</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								mode="date"
								:value="form.offerBuyTime"
								:start="startDate"
								:end="endDate"
								@change="
									e => {
										this.form.offerBuyTime = e.target.value.substr(0,10);
									}
								"
							>
								<view v-if="form.offerBuyTime" class="uni-input">{{ form.offerBuyTime.substr(0,10)}}</view>
								<view v-else class="text-gray">选择认购日期</view>
							</picker>
						</view>
					</view>
					<!-- 		<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">定金</text></view>
					<view class="action flex-treble"><input type="text" placeholder="定金" placeholder-class="text-gray" v-model="form.prePrice" /></view>
				</view> -->
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">房屋</text></view>
						<view class="action flex-treble" @tap="()=>{
							if(this.isEdit) (this.modalName = 'DrawerModalL')
						} ">
							<input  :disabled="isEdit ? false : true" type="text" disabled="true" placeholder="房屋" placeholder-class="text-gray" v-model="form.houseName" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">工作区域</text></view>
						<view class="action flex-treble">
							<!-- <input type="text" placeholder="工作区域" placeholder-class="text-gray" v-model="form.workAddress" /> -->
						<textarea  :disabled="isEdit ? false : true" style="width: unset;" auto-height type="text"  placeholder="工作区域" placeholder-class="text-gray" v-model="form.workAddress" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">职业类型</text></view>
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
						<!-- <view class="action flex-treble"><input type="text" placeholder="年龄" placeholder-class="text-gray" v-model="form.age" /></view> -->
				<picker
				:disabled="isEdit ? false : true"
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
						<view class="content flex-sub"><text class="text-grey">家庭结构</text></view>
						<picker
							:disabled="isEdit ? false : true"
							class="flex-treble"
							@change="
								e => {
									this.form.homeStructure = family[e.target.value];
								}
							"
							:value="family.indexOf(form.homeStructure) !== -1 ? family.indexOf(form.homeStructure) : 0"
							:range="family"
						>
							<view v-if="form.homeStructure" class="uni-input">{{ form.homeStructure }}</view>
							<view v-else class="text-gray">选择家庭结构</view>
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
						<view class="content flex-sub"><text class="text-grey">客户来源</text></view>
						<picker
							:disabled="isEdit ? false : true"
							class="flex-treble"
							@change="
								e => {
									this.form.sourceWay = Number(e.target.value) + 1;
								}
							"
							:value="form.sourceWay"
							:range="sourceWayArray"
						>
							<view v-if="form.sourceWay" class="uni-input">{{ sourceWayArray[form.sourceWay - 1] }}</view>
							<view v-else class="text-gray">选择客户来源</view>
						</picker>
					</view>
					<view v-if="isEdit" class="padding-lg flex flex-direction"></view>
					<view v-if="isEdit" class="fixed-bottom padding flex flex-direction"><button @click="submit" class="cu-btn bg-green lg shadow-blur round">提交</button></view>
				</view>
			</view>
		</view>
		<drawer-modal :modalName="modalName" @hideModal="hideModal">
			<view slot="DrawerModalL">
				<view class="padding-xl cu-bar search">
					<view class="search-form round" style="background: #fff;">
						<text class="cuIcon-search"></text>
						<input type="text" v-model="housekeyWord" @input="getHouse" placeholder="输入房屋名字" confirm-type="search" />
					</view>
				</view>
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item, index) in house" :key="index">
						<view class="content" @tap="chooseHouse(item)">
							<view>{{ item.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</drawer-modal>
	</view>
</template>

<script>
import api from '@/api/offerbuy.js';
import util from '@/utils';
import house from '@/api/house.js';
import {Age, gender, realEstate, statusArray, customerSource, family, professional } from '@/utils/common/data.js';
import {check,defForm} from "./verify.js"
export default {
	data() {
		return {
			util,
			modalName:"",
			house: [],
			isEdit: false,
			sourceWayArray: customerSource,
			statusArray: statusArray,
			realEstate, //置业动机
			family, //家庭结构
			professional, //职业类型
			Age,
			form: defForm,
			sexArray: gender
		};
	},
	onLoad(option) {
		console.log(option);
		let { id, indexes } = option;
		this.id = id;
		this.indexes = indexes;
		this.getDetail();
		this.getHouse();
		console.log('page', getCurrentPages());
	},
	computed: {
		oldCusomterShow() {
			return this.form.sourceWay == 3;
		}
	},
	methods: {
		// 影藏弹窗
		hideModal(e) {
			this.modalName = null;
			// 为了让窗口显示时，滚动到最顶部，先改变滚动位置，才能生效
			setTimeout(() => {
				this.scrollTop = 100;
			}, 300);
		},
		chooseHouse(item) {
			this.form.houseId = item.id;
			this.form.houseName = item.name;
			this.modalName = '';
			this.$forceUpdate();
		},
		getHouse() {
			let data = {status:1, page: 1, pageSize: 999, projectId: this.form.projectId, keyWord: this.housekeyWord };
			house.list(data).then(res => {
				console.log('l-', res);
				this.house = res.list;
				// if (this.pageNum == 1) this.list = res.list;
				// else this.list = this.list.concat(res.list);
			});
		},
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
			if (!check(this.form)) return;
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
