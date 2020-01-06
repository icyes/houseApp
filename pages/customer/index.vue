<!-- 访客登记 -->
<template>
	<view class="flex-full overhide-x">
		<!-- header 头 -->
		<cu-custom bgColor="bg-gradual-blue" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">来访客户</block>
			<block slot="right">
				<view class="action"><view class="cu-load load-cuIcon" :class="!isLoad ? 'loading' : 'over'"></view></view>
			</block>
		</cu-custom>
		<!-- 列表头部  -->
		<div class="sticky-top">
			<list-bar
				text="访客"
				:total="total"
				@showModal="
					v => {
						this.form = Object.assign({}, defForm);
						this.modalName = v;
					}
				"
			/>
		</div>
		<!-- 暂无数据 -->
		<empty-data :show="isEmpty"></empty-data>
		<!-- 列表 -->
		<view :class="!isEmpty ? 'show' : 'hide'">
			<view class="cu-list menu-avatar ">
				<view
					class="cu-item margin-tb padding-tb light shadow shadow-lg  bg-white"
					style="min-height: 180rpx;"
					@tap="link(`./detail?id=${item.id}&indexes=${index}&projectId=${form.projectId}`)"
					:class="modalName == 'move-box-' + index ? 'move-cur' : ''"
					v-for="(item, index) in list"
					:key="index"
					@touchstart="ListTouchStart"
					@touchmove="ListTouchMove"
					@touchend="ListTouchEnd"
					:data-target="'move-box-' + index"
				>
					<!-- <view class="cu-avatar round lg" :style="[{ backgroundImage: 'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100' + (index + 2) + '.jpg)' }]"></view> -->
					<view class="content flex-sub">
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-grey">
								{{ item.name }}
								<text class="margin-left-sm" :class="item.sex === 1 ? 'text-blue cuIcon-male' : 'text-pink cuIcon-female'"></text>
							</view>
							<view class="text-df cu-capsule">
								<text class="cu-tag bg-cyan text-white padding-xs">
									<text class="cuIcon-time margin-right-xs"></text>
									来访日期:
								</text>
								<text class="cu-tag line-cyan">{{ item.comingTime.substr(0, 10) }}</text>
							</view>
						</view>
						<view class=" text-df padding-bottom-sm text-cut" style="width: calc(100%-60rpx);">
							<text class="cuIcon-location padding-right-xs"></text>
							地址：{{ item.address }}
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-phone padding-right-xs"></text>
								手机号：{{ item.mobile }}
							</view>
							<view>
								<text class="cuIcon-service padding-right-xs"></text>
								职业：{{ item.profession || '--' }}
							</view>
						</view>
						<view class="flex justify-between align-center">
							<view class="text-df">
								<text class="cuIcon-home padding-right-xs"></text>
								意向楼层：{{ item.purposeFloor || '--' }}
							</view>
							<view>
								<text class="cuIcon-recharge padding-right-xs"></text>
								意向价格：{{ item.purposePrice || '--' }}
							</view>
						</view>
					</view>
					<view class="action padding-right " style="width: auto;text-align:right"></view>
					<view class="move">
						<view class="bg-cyan" @tap.stop="onEdit(item)">编辑</view>
						<view class="bg-red" @tap.stop="onCheckDel(item.id)">删除</view>
					</view>
				</view>
				<paging v-if="pageNum > 1" :loading="!isLastPage" />
			</view>
			<!-- 回到顶部 -->
			<back-top :show="backTop" @backTop="scrollTop = 0" />
		</view>
		<!-- 顶部搜搜弹窗 -->
		<filtrate-modal :keyWord="keyWord" @input="v => (this.keyWord = v)" :modalName="modalName" @hideModal="hideModal" @reset="searchReset" @sure="search" />
		<!-- 添加弹窗 -->
		<cu-modal :modalName="modalName == 'viewModal' || modalName == 'formModal' ? 'formModal' : ''" :text="'客户'" @submit="submit" @hideModal="hideModal" :isUpdate="isUpdate">
			<view class="cu-list sm-border menu text-left solid-top">
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">来访日期</text></view>
					<view class="action flex-treble">
						<picker mode="date" :value="form.comingTime" :start="startDate" :end="endDate" @change="bindDateChange">
							<view v-if="form.comingTime" class="uni-input">{{ $moment(form.comingTime).format("YYYY-MM-DD") }}</view>
							<view v-else class="text-gray">选择来访日期</view>
						</picker>
					</view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">姓名</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写姓名" placeholder-class="text-gray" v-model="form.name" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">性别</text></view>
					<picker class="flex-treble" @change="bindSexChange" :value="sexIdx" :range="sexArray">
						<view v-if="form.sex" class="uni-input">{{ sexArray[form.sex - 1] }}</view>
						<view v-else class="text-gray">选择性别</view>
					</picker>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">手机号</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写手机号码" placeholder-class="text-gray" v-model="form.mobile" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">年龄</text></view>
					<!-- <view class="action flex-treble"><input type=" number" placeholder="填写年龄" placeholder-class="text-gray" v-model="form.age" /></view> -->
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
					<view class="content flex-sub"><text class="text-grey">居住地址</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写居住地址" placeholder-class="text-gray" v-model="form.address" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">职业类型</text></view>
					<picker
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
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">家庭结构</text></view>
					<picker
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
					<view class="content flex-sub"><text class="text-grey">客户来源</text></view>
					<picker
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
						<view v-else class="text-gray">选择客户来源</view>
					</picker>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">产品需求</text></view>
					<!-- <view class="action flex-treble"><input type="text" placeholder="填写产品需求" placeholder-class="text-gray" v-model="form.productRequirement" /></view> -->
					<picker class="flex-treble" mode="multiSelector" :value="DemandIndex" @change="onProductDemand" @columnchange="changeProductDemand" :range="productDemand">
						<view v-if="form.productRequirement" class="uni-input">{{ form.productRequirement }}</view>
						<view v-else class="text-gray">选择产品需求</view>
					</picker>
				</view>

				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">面积需求</text></view>
					<picker
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
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">意向楼层</text></view>
					<!-- <view class="action flex-treble"><input type="text" placeholder="填写客户意向楼层" placeholder-class="text-gray" v-model="form.purposeFloor" /></view> -->
					<picker
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
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">意向价格</text></view>
					<!-- <view class="action flex-treble"><input type="text" placeholder="填写客户意向价格" placeholder-class="text-gray" v-model="form.purposePrice" /></view> -->
					<picker class="flex-treble" mode="multiSelector" @change="onPurposePrice" :value="multiIndex" @columnchange="changePurposePrice" :range="purposePrice">
						<view v-if="form.purposePrice" class="uni-input">{{ form.purposePrice }}</view>
						<view v-else class="text-gray">选择客户意向价格</view>
					</picker>
				</view>

				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">客户意向</text></view>
					<!-- <view class="action flex-treble"><input type="text" placeholder="填写客户意向" placeholder-class="text-gray" v-model="form.purpose" /></view> -->
					<picker
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
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">关注点</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写关注点" placeholder-class="text-gray" v-model="form.focusPoint" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">抗拒点</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写客户抗拒点" placeholder-class="text-gray" v-model="form.resistPoint" /></view>
				</view>

				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">备注</text></view>
					<view class="action flex-treble"><input  style="width: unset;" auto-height type="text" placeholder="填写备注" placeholder-class="text-gray" v-model="form.remark" /></view>
				</view>
			</view>
		</cu-modal>
	</view>
</template>

<script>
import customer from '@/api/customer.js';
import util from '@/utils/index.js';
import {check,defForm} from "./verify.js"
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

export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			total: null,
			// 页面抽屉显示判断
			drawerShow: false,
			// 滚动窗口位置
			scrollTop: 0,

			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			// 性别选择索引下标
			sourceWayArray: customerSource,
			sexArray: gender,
			defForm,
			form: defForm,
			purposePrice: [['商业', '住宅'], businessPrise],
			multiIndex: [0, 0],
			DemandIndex:[0,0],
			businessPrise, //商业价格
			residentialPrice, //住宅价格
			family,
			Age, // 年龄
			floor, //意向楼层
			customerIntention, //客户意向
			professional, //职业类型
			productDemand: productDemand, //产品需求
			residentialDemand, // 住宅需求
			// 列表
			list: null,
			keyWord: '', //搜索关键字姓名和手机
			// 分页
			isLastPage: false, //是否最后一页
			pageNum: 1, //页数
			pageSize: 15, //每页条数
			isLoad: false, //加载状态
			backTop: false //回到顶部按钮显示状态
		};
	},

	onLoad(option) {
		this.form.projectId = option.id;
		this.getList();
		uni.$on('update', obj => {
			let { indexes, data } = obj;
			this.list[indexes] = data;
		});
	},
	onUnload() {
		uni.$off('update', function(data) {
			console.log('移除 update 自定义事件');
		});
	},

	// 下拉
	onPullDownRefresh() {
		this.pageNum = 1;
		this.isLastPage = false;
		this.getList();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉触底
	onReachBottom() {
		if (this.isLastPage) return;
		++this.pageNum;
		this.getList();
	},

	// 滚动
	onPageScroll(res) {
		let { scrollTop } = res;
		this.scrollTop = scrollTop;
		if (!this.backTop && scrollTop > 200) {
			this.backTop = true;
		} else if (this.backTop && scrollTop < 200) {
			this.backTop = false;
		}
	},
	computed: {
		isEmpty() {
			return this.list && this.list.length == 0;
		},
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
		oldCusomterShow() {
			return this.form.sourceWay == 3;
		},
		isUpdate() {
			return this.form.id != null;
		}
	},
	methods: {
		onPurposePrice: function(e) {
			let {
				target: { value }
			} = e;
			let i_0 = !!value[0] ? value[0] : 0;
			let i_1 = !!value[1] ? value[1] : 0;
			this.form.purposePrice = this.purposePrice[1][i_1];
		},
		changePurposePrice: function(e) {
			let {column, value } = e.detail;
			if (column == 0 && value == 0) this.purposePrice[1]=businessPrise;
			else if (column == 0 && value == 1) this.purposePrice[1]=residentialPrice;
			if (column == 0)this.multiIndex.splice(1,1,0);
			this.$forceUpdate();
		},
		onProductDemand: function(e) {
			let {
				target: { value }
			} = e;
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
		// 实时监听滚动
		scroll: function(e) {
			this.scrollTop = e.detail.scrollTop;
		},
		// 跳转

		link(url) {
			util.navigateTo(url);
		},
		// 重置搜索
		searchReset() {
			this.keyWord = '';
			this.pageNum = 1;
			this.scrollTop = 0;
			this.isLastPage = false;
			this.getList();
		},
		// 搜索
		search() {
			this.hideModal();
			this.getList();
		},
		// 获取列表
		getList() {
			this.isLoad = false;
			let data = {
				projectId: this.form.projectId,
				keyWord: this.keyWord,
				page: this.pageNum,
				pageSize: this.pageSize
			};
			customer.list(data).then(res => {
				this.total = res.total;
				this.isLastPage = res.isLastPage;
				if (this.pageNum == 1) this.list = res.list;
				else this.list = this.list.concat(res.list);

				setTimeout(() => {
					this.isLoad = true;
				}, 500);
			});
		},
		// 编辑
		onEdit(m) {
			this.form = m;
			this.modalName = 'formModal';
		},
		// 确认删除
		onCheckDel(id) {
			util.showModal('确认删除该选项')
				.then(r => {
					this.onDel(id);
				})
				.catch(e => {
					console.log('no');
				});
		},
		// 删除
		onDel(id) {
			id = typeof id == 'object' ? id : [id];
			customer.del(id).then(r => {
				util.toast('删除成功');
				// this.getList()
				this.list = this.list.filter(m => m.id != id);
			});
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX;
		},

		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
		},

		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target;
			} else {
				this.modalName = null;
			}
			this.listTouchDirection = null;
		},
		// 显示添加弹框
		showModal(e) {
			// 设置页面滚动，防止遮罩层下拉刷新
			util.pageScrollTo(10);
			// 弹窗滚动条
			this.scrollTop = 0;
			this.modalName = e.currentTarget.dataset.target;
		},
		// 影藏弹窗
		hideModal(e) {
			this.modalName = null;
			// 为了让窗口显示时，滚动到最顶部，先改变滚动位置，才能生效
			setTimeout(() => {
				this.form = { ...defForm };
				this.scrollTop = 100;
			}, 300);
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
		// 提交表单
		submit() {
			if (!check(this.form)) return;
			let data = { ...this.form };
			data = this.objFilter(data);
			const save = data => customer.save(data);
			const update = data => customer.update(data);
			const submit = data.id ? update : save;
			submit(data).then(r => {
				let txt = this.isUpdate ? '更新' : '添加';
				util.toast('成功');
				this.hideModal();

				if (this.isUpdate) {
					// this.list.some((m, i,a) => {
					// 	if (m.id == data.id) {
					// 		a[i] = Object.assign(a[i],data);
					// 		return true;
					// 	}
					// });
					this.form = Object.assign(this.form, data);
				} else {
					this.getList();
				}
			});
		}
	}
};
</script>

<style>
	
	.page {
		height: 100Vh;
		width: 100vw;
	}
	
	.page.show {
		overflow: hidden;
	}
</style>
