<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ form.name }}</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom sticky-top flex justify-between" :class="isEdit ? '' : ''">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text>
				拓展客户详情
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
							<input type="text" :disabled="isEdit ? false : true" placeholder="填写姓名" placeholder-class="text-gray" v-model="form.name" />
						</view>
					</view>
					<view class="cu-item flex" @click="isEdit ? false : util.makePhoneCall(form.mobile)">
						<view class="content flex-sub"><text class="text-grey">手机号</text></view>
						<view class="action flex-treble">
							<input type="text" :disabled="isEdit ? false : true" placeholder="填写手机号码" placeholder-class="text-gray" v-model="form.mobile" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">年龄</text></view>
						<view class="action flex-treble">
							<!-- 
							<input type=" number" :disabled="isEdit ? false : true" placeholder="填写年龄" placeholder-class="text-gray" v-model="form.age" /> -->
							<picker
							:disabled="isEdit ? false : true"
								class="flex-treble"
								@change="
									e => {
										this.form.age = Age[e.target.value];
									}
								"
								:value="Age.indexOf(form.age) !== -1 &&Age.indexOf(form.age)<Age.length? Age.indexOf(form.age) : 0"
								:range="Age"
							>
								<view v-if="form.age" class="uni-input">{{ form.age }}</view>
								<view v-else class="text-gray">选择客户年龄</view>
							</picker>
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">性别</text></view>
						<picker class="flex-treble" :disabled="isEdit ? false : true" @change="bindSexChange" :value="sexIdx" :range="sexArray">
							<view v-if="form.sex" class="uni-input">{{ sexArray[form.sex - 1] }}</view>
							<view v-else class="text-gray">选择性别</view>
						</picker>
					</view>
					
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">职业类型</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								class="flex-treble"
								@change="
									e => {
										this.form.profession = professional[e.target.value];
									}
								"
								:value="professional.indexOf(form.productRequirement) !== -1 ? professional.indexOf(form.productRequirement) : 0"
								:range="professional"
							>
								<view v-if="form.profession" class="uni-input">{{ form.profession }}</view>
								<view v-else class="text-gray">选择职业类型</view>
							</picker>
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">拓客区域</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="填写拓客区域" placeholder-class="text-gray" v-model="form.tookeenAddress" /></view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">意向产品</text></view>
						<view class="action flex-treble"><input :disabled="isEdit ? false : true" type="text" placeholder="填写意向产品" placeholder-class="text-gray" v-model="form.purposePro" /></view>
					</view>
					
					
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">备注</text></view>
						<view class="action flex-treble padding-sm">
							<!-- <input  type="text" :disabled="isEdit ? false : true" placeholder="填写备注" placeholder-class="text-gray" v-model="form.remark" /> -->
						<textarea  :disabled="isEdit ? false : true" style="width: unset;" auto-height type="text"  placeholder="填写备注" placeholder-class="text-gray" v-model="form.remark" />
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
import tookeen from '@/api/tookeen.js';
import util from '@/utils';
import {
	businessPrise,
	residentialPrice,
	floor,
	customerIntention,
	productDemand,
	residentialDemand,
	gender,
	realEstate,
	statusArray,
	customerSource,
	family,
	professional,
	Age
} from '@/utils/common/data.js';
const defForm = {
	projectId: null, //项目id
	id: null, //[up *]
	name: '', //* 姓名
	sex: 0, //性别
	mobile: '', //* 联系方式
	age: null, //年龄
	profession: '', //职业类型
	purposePro: '', // 意向产品
	tookeenAddress: '', //拓客区域
	remark: '' //备注
};
export default {
	data() {
		return {
			util,
			isload: false,
			isEdit: false,
			projectId:null,
			// 性别选择索引下标
			sourceWayArray: customerSource,
			sexArray: gender,
			form: defForm,
			purposePrice: [['商业', '住宅'], businessPrise],
			businessPrise, //商业价格
			residentialPrice, //住宅价格
			family,
			Age,
			floor, //意向楼层
			customerIntention, //客户意向
			professional, //职业类型
			productDemand: productDemand, //产品需求
			residentialDemand // 住宅需求
		};
	},
	onLoad(option) {
		console.log(option);
		let { id, indexes,projectId } = option;
		this.id = id;
		this.projectId = projectId;
		console.log('this.pp--',this.projectId);
		this.indexes = indexes;
		this.getDetail();
	},
	computed: {
		oldCusomterShow() {
			return this.form.sourceWay == 3;
		}
	},
	methods: {
		addFollow(){
			let form = this.form;
			let projectId = this.projectId;
			console.log('this.projectId',projectId);
			let url = `/pages/follow/index?id=${projectId}&name=${form.name}&mobile=${form.mobile}&showAddModal=${true}`;
			util.navigateTo(url);
		},
		onPurposePrice: function(e) {
			let {
				target: { value }
			} = e;
			let i_0 = !!value[0] ? value[0] : 0;
			let i_1 = !!value[1] ? value[1] : 0;
			this.form.purposePrice = this.purposePrice[1][i_1];
		},
		changePurposePrice: function(e) {
			let {
				detail: { column, value }
			} = e;
			if (column === 0 && value === 0) this.purposePrice.splice(1, 1, businessPrise);
			else if (column === 0 && value === 1) this.purposePrice.splice(1, 1, residentialPrice);
			this.$forceUpdate();
		},
		onProductDemand: function(e) {
			console.log(e);
			let {
				target: { value }
			} = e;
			console.log(value);
			let i_0 = !!value[0] ? value[0] : 0;
			let i_1 = !!value[1] ? value[1] : 0;
			this.form.productRequirement = this.productDemand[0][i_0] + ':' + this.productDemand[1][i_1];
		},
		changeProductDemand: function(e) {
			console.log('this.productDemand', e);
			let {
				detail: { column, value }
			} = e;
			if (column === 0 && value === 0) this.productDemand.splice(1, 1, ['凤大公路底商', '购物中心商铺', '主题街区商铺', '办公']);
			else if (column === 0 && value === 1) this.productDemand.splice(1, 1, ['高层', '洋房', '排屋', '公寓']);
			this.$forceUpdate();
		},
		// 获得用户详情
		getDetail() {
			tookeen.info(this.id).then(res => {
				console.log(res);
				this.form = { ...res };
				this.oldform = { ...res };
				this.isload = true;
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
			} 
			return result;
		},
		// 提交表单
		submit() {
			if (!this.check()) return;
			let data = { ...this.form };
			let indexes = this.indexes;
			data = this.objFilter(data);
			tookeen.update(data).then(r => {
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
