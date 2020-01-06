<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ form.name }}</block>
		</cu-custom>
		<view v-if="showMenu" class="page-mask" @touchmove.stop="()=>false"  @click="showMenu=false"/>
	
		<view class="cu-bar bg-white solid-bottom  flex justify-between" :class="!showMenu ? 'sticky-top' : ''">
			<view class="action">
				<text class="cuIcon-titles text-orange "></text>
				访客详情
			</view>
			<view class="cu-btn round line-green relative" style="z-index: 12;">
				<span @click="showMenu=!showMenu" style="z-index: 10;">
					<text class="cuIcon-forward"></text>
					拓联
				</span>
			
				<view class="absolute" style="height: 100%;z-index: 1;" >
					<view @click="addFollow('follow')" class="cu-btn round bg-green " style="transition: all .5s ease-in;  " :style="showMenu?'left: 160rpx;;opacity:1':'left: 0rpx;opacity:0'">跟进</view>
					<view @click="addFollow('identity')" class="cu-btn round bg-green " style="transition: all .5s ease-in;  " :style="showMenu?'left: 100rpx;top: 20px;opacity:1':'left: 0rpx;top: -40px;opacity:0'">认筹</view>
					<view @click="addFollow('offer')" class="cu-btn round bg-green " style="transition: all .5s ease-in;  " :style="showMenu?'left: 0rpx;top:30px;;opacity:1':'left: 0rpx;top:-60px;opacity:0'">认购</view>
				</view>
			</view>
			<!-- <button class="cu-btn  bg-orange margin-right" @tap="()=>addFollow()">添加跟进</button> -->
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
					<view class="cu-item flex" @click="isEdit? false:util.makePhoneCall(form.mobile)">
						<view class="content flex-sub"><text class="text-grey">手机号</text></view>
						<view class="action flex-treble">
							<input type="text" :disabled="isEdit ? false : true" placeholder="填写手机号码" placeholder-class="text-gray" v-model="form.mobile" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">来访日期</text></view>
						<view class="action flex-treble">
							<picker mode="date" :disabled="isEdit ? false : true" :value="form.comingTime" :start="startDate" :end="endDate" @change="bindDateChange">
								<view v-if="form.comingTime" class="uni-input">{{ form.comingTime.substr(0, 10) }}</view>
								<view v-else class="text-gray">选择来访日期</view>
							</picker>
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">年龄</text></view>
						<view class="action flex-treble">
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
						<view class="content flex-sub"><text class="text-grey">地址</text></view>
						<view class="action flex-treble">
							<input type="text" :disabled="isEdit ? false : true" placeholder="填写居住地址" placeholder-class="text-gray" v-model="form.address" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">面积需求</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								class="flex-treble"
								@change="
									e => {
										this.form.acreageRequirement = residentialDemand[e.target.value];
									}
								"
								:value="residentialDemand.indexOf(form.acreageRequirement) !== -1 ? residentialDemand.indexOf(form.acreageRequirement) : 0"
								:range="residentialDemand"
							>
								<view v-if="form.acreageRequirement" class="uni-input">{{ form.acreageRequirement }}</view>
								<view v-else class="text-gray">选择面积需求</view>
							</picker>
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">关注点</text></view>
						<view class="action flex-treble">
							<input type="text" :disabled="isEdit ? false : true" placeholder="填写关注点" placeholder-class="text-gray" v-model="form.focusPoint" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">家庭结构</text></view>
						<view class="action flex-treble">
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
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">产品需求</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								class="flex-treble"
								mode="multiSelector"
								:value="DemandIndex"
								@change="onProductDemand"
								@columnchange="changeProductDemand"
								:range="productDemand"
							>
								<view v-if="form.productRequirement" class="uni-input">{{ form.productRequirement }}</view>
								<view v-else class="text-gray">选择产品需求</view>
							</picker>
						</view>
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
						<view class="content flex-sub"><text class="text-grey">客户意向</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								class="flex-treble"
								@change="
									e => {
										this.form.purpose = customerIntention[e.target.value];
									}
								"
								:value="customerIntention.indexOf(form.purpose) !== -1 ? customerIntention.indexOf(form.purpose) : 0"
								:range="customerIntention"
							>
								<view v-if="form.purpose" class="uni-input">{{ form.purpose }}</view>
								<view v-else class="text-gray">选择客户意向</view>
							</picker>
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">意向楼层</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								class="flex-treble"
								@change="
									e => {
										this.form.purposeFloor = floor[e.target.value];
									}
								"
								:value="floor.indexOf(form.purposeFloor) !== -1 ? floor.indexOf(form.purposeFloor) : 0"
								:range="floor"
							>
								<view v-if="form.purposeFloor" class="uni-input">{{ form.purposeFloor }}</view>
								<view v-else class="text-gray">选择客户意向楼层</view>
							</picker>
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">意向价格</text></view>
						<view class="action flex-treble">
							<picker
								:disabled="isEdit ? false : true"
								class="flex-treble"
								mode="multiSelector"
								@change="onPurposePrice"
								@columnchange="changePurposePrice"
								:value="multiIndex"
								:range="purposePrice"
							>
								<view v-if="form.purposePrice" class="uni-input">{{ form.purposePrice }}</view>
								<view v-else class="text-gray">选择客户意向价格</view>
							</picker>
						</view>
					</view>
					<view class="cu-item flex ">
						<view class="content flex-sub"><text class="text-grey">抗拒点</text></view>
						<view class="action flex-treble padding-sm">
							<!-- <input type="text" :disabled="isEdit ? false : true" placeholder="填写客户抗拒点" placeholder-class="text-gray" v-model="form.resistPoint" /> -->
						<textarea  :disabled="isEdit ? false : true" style="width: unset;" auto-height type="text"  placeholder="填写抗拒点" placeholder-class="text-gray" v-model="form.resistPoint" />
						</view>
					</view>
					<view class="cu-item flex">
						<view class="content flex-sub"><text class="text-grey">客户来源</text></view>
						<picker class="flex-treble" :disabled="isEdit ? false : true" @change="bindSourceWayChange" :value="form.sourceWay - 1" :range="sourceWayArray">
							<view v-if="form.sourceWay" class="uni-input">{{ sourceWayArray[form.sourceWay - 1] }}</view>
							<view v-else class="text-gray">选择客户来源</view>
						</picker>
					</view>

					<view class="cu-item flex margin-tb-sm">
						<view class="content flex-sub"><text class="text-grey">备注</text></view>
						<view class="action flex-treble">
							<textarea v-if="!showMenu" style="width: unset;" auto-height type="text" :disabled="isEdit ? false : true" placeholder="填写备注" placeholder-class="text-gray" v-model="form.remark" />
							<view v-if="showMenu">
								{{form.remark}}
							</view>
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
import customer from '@/api/customer.js';
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
import {check,defForm} from "./verify.js"
export default {
	data() {
		return {
			util,
			showMenu:false,
			isload: false,
			isEdit: false,
			projectId:null,
			// 性别选择索引下标
			sourceWayArray: customerSource,
			sexArray: gender,
			form: defForm,
			purposePrice: [['商业', '住宅'], businessPrise],
			multiIndex: [0, 0],
			DemandIndex:[0,0],
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
		let { id, indexes,projectId } = option;
		this.id = id;
		this.projectId = projectId;
		this.indexes = indexes;
		this.getDetail();
	},
	computed: {
		oldCusomterShow() {
			return this.form.sourceWay == 3;
		}
	},
	methods: {
		addFollow:function(target){
			if(!this.showMenu)return;
			let form = this.form;
			let projectId = this.projectId;
			let url = `/pages/${target}/index?id=${projectId}&name=${form.name}&mobile=${form.mobile}&showAddModal=${true}&sex={form.sex}&address={form.address}`;
			this.showMenu = false;
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
			if (column == 0 && value == 0) this.purposePrice[1]=businessPrise;
			else if (column == 0 && value == 1) this.purposePrice[1]=residentialPrice;
			if (column == 0)this.multiIndex.splice(1,1,0);
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
			this.form.productRequirement =  this.productDemand[1][i_1];
		},
		changeProductDemand: function(e) {
			let {
				detail: { column, value }
			} = e;
		if (column == 0 && value == 0){
			this.productDemand[1]=['凤大公路底商', '购物中心商铺', '主题街区商铺', '办公'];
			this.DemandIndex.splice(1,1,0);
		} 
		else if (column == 0 && value == 1) {
			this.productDemand[1]=['高层', '洋房', '排屋', '公寓'];
			this.DemandIndex.splice(1,1,0);
		}
			this.$forceUpdate();
		},
		// 获得用户详情
		getDetail() {
			util.showLoading();
			customer.info(this.id).then(res => {
				this.form = { ...res };
				this.oldform = { ...res };
				this.isload = true;
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
		// 提交表单
		submit() {
			if (!check(this.form)) return;
			let data = { ...this.form };
			let indexes = this.indexes;
			data = this.objFilter(data);
			customer.update(data).then(r => {
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
