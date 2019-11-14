<!-- 访客登记 -->
<template>
	<view class="flex-full overhide-x">
		<!-- header 头 -->
		<cu-custom bgColor="bg-gradual-blue" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">房屋计算</block>
			<block slot="right">
				<view class="action"><view class="cu-load load-cuIcon" :class="!isLoad ? 'loading' : 'over'"></view></view>
			</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="keyWord" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @click="search">搜索</button>
			</view>
		</view>
		<view class="cu-bar bg-white search " :style="[{top:CustomBar + 'px'}]">
			<view class="cu-btn flex-center line-red margin-left-sm">房屋折扣</view>
			<view class="">
				<!-- <input class="bg-gray" type="digit" v-model="discount" placeholder="输入房屋折扣" ></input> -->
				<number-box :value="discount" :min="0" :max="1" :step="0.1" @change="discountChange"/>
			</view>
			<view class="action">
				<button  class="cu-btn bg-gradual-blue" @click="reset">重置</button>
			</view>
		</view>
		<!-- 暂无数据 -->
		<empty-data :show="isEmpty"></empty-data>
		<!-- 列表 -->
		<view class="relative" :class="!isEmpty ? 'show' : 'hide'" :style="[{top: CustomBar + 'px'}]">
			<view class="cu-list menu-avatar ">
				<view
					class="cu-item margin-tb padding-tb light shadow shadow-lg  bg-white"
					style="min-height: 180rpx;"
					:class="modalName == 'move-box-' + index ? 'move-cur' : ''"
					v-for="(item, index) in list"
					:key="index"
					:data-target="'move-box-' + index"
				>
					<!-- <view class="cu-avatar round lg" :style="[{ backgroundImage: 'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100' + (index + 2) + '.jpg)' }]"></view> -->
					<view class="content flex-sub">
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-grey">
								房屋名称:{{ item.name }}
							</view>
							<button class="cu-btn sm round line-red">{{discount == 1?'无折扣':discount*10+'折'}}</button>
						
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cu-tag bg-red text-white padding-xs">
									折扣单价:
								</text>
								<text class="cu-tag line-red">{{ item.acreagePrice*discount }} ￥</text>
							</view>
							<view class="text-df cu-capsule">
								<text class="cu-tag bg-red text-white padding-xs">
									折扣总价:
								</text>
								<text class="cu-tag line-red">{{ item.discount }} ￥</text>
							</view>
						</view>
						
						
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-location padding-right-xs"></text>
								建筑面积：{{ item.acreage }} m²
							</view>
							<view class="text-df">
								<text class="cuIcon-home padding-right-xs"></text>
								房源类别：{{ item.type !=null?houseType[item.type-1].title : '--' }}
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-goods padding-right-xs"></text>
								建面单价：{{ item.acreagePrice }} ￥/m²
							</view>
							<view class="text-df cu-capsule">
								<text class="cu-tag bg-cyan text-white padding-xs">
									状态:
								</text>
								<text class="cu-tag line-cyan">{{ item.status !=null ?houseStatus[item.status ] : '--'  }}</text>
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view>
								<text class="cuIcon-moneybag padding-right-xs"></text>
								商铺总价：{{ item.amountPrice || '--' }} ￥
							</view>
						</view>
			
					</view>
					<view class="action padding-right " style="width: auto;text-align:right"></view>
				</view>
				<paging v-if="pageNum > 1" :loading="!isLastPage" />
			</view>
			<!-- 回到顶部 -->
			<back-top :show="backTop" @backTop="scrollTop = 0" />
		</view>
		<!-- 添加弹窗 -->
		<cu-modal :modalName="modalName == 'viewModal' || modalName == 'formModal' ? 'formModal' : ''" :text="'房屋计算'" @submit="submit" @hideModal="hideModal" :isUpdate="isUpdate">
			<view class="cu-list sm-border menu text-left solid-top">

			</view>
		</cu-modal>
	</view>
</template>

<script>
import house from '@/api/house.js';
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
	Age,
	houseStatus,
	houseType
} from '@/utils/common/data.js';

export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			discount:1,//几折
			houseType,
			houseStatus,
			CustomBar:this.CustomBar,
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
		// 折扣变化
		discountChange(e){
			console.log(e,this.discount);
			this.discount = e;
			 this.list&&this.list.map(m=>{
				 console.log(m);
				m.discount = this.$formatNumber((Number(m.amountPrice)*Number(e)).toFixed(2));	
			})
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
			if (column === 0 && value === 0) this.productDemand.splice(1, 1, ['凤大公路底商', '购物中心商铺', '主题街区商铺', '办公']);
			else if (column === 0 && value === 1) this.productDemand.splice(1, 1, ['高层', '洋房', '排屋', '公寓']);
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
		reset(){
			this.discount = 1;
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
			// this.hideModal();
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
			house.list(data).then(res => {
				this.total = res.total;
				this.isLastPage = res.isLastPage;
				res.list.map(m=>{
					// 折扣价
					m.discount = this.$formatNumber(m.amountPrice*this.discount);
				})
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
	
	page {
		height: 100Vh;
		width: 100vw;
	}
	
</style>
