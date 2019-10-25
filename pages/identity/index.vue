<template>
	<view class="flex-full">
		<cu-custom bgColor="bg-gradual-blue" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">认筹记录</block>
			<block slot="right">
				<view class="action"><view class="cu-load load-cuIcon" :class="!isLoad ? 'loading' : 'over'"></view></view>
			</block>
		</cu-custom>
		<!-- 列表头部 -->
		<list-bar
			text="认筹列表"
			:total="total"
			@showModal="
				v => {
					this.form = Object.assign({}, defForm);
					this.modalName = v;
				}
			"
		/>
		<!-- 顶部搜搜弹窗 -->
		<filtrate-modal :keyWord="keyWord" @input="v => (this.keyWord = v)" :modalName="modalName" @hideModal="hideModal" @reset="searchReset" @sure="search" />
		<!-- 添加弹窗 -->
		<cu-modal :modalName="modalName" text="认筹" @submit="submit" @hideModal="hideModal" :isUpdate="isUpdate">
			<view class="cu-list sm-border menu text-left solid-top">
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">姓名</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写姓名" placeholder-class="text-gray" v-model="form.name" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">手机号</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写手机号码" placeholder-class="text-gray" v-model="form.mobile" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">身份证</text></view>
					<view class="action flex-treble"><input type="idcard" placeholder="身份证" placeholder-class="text-gray" v-model="form.idCard" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">身份证地址</text></view>
					<view class="action flex-treble"><input type="text" placeholder="身份证地址" placeholder-class="text-gray" v-model="form.idAddress" /></view>
				</view>

				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">单位地址</text></view>
					<view class="action flex-treble"><input type="text" placeholder="工作单位地址" placeholder-class="text-gray" v-model="form.companyAddress" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">认筹金</text></view>
					<view class="action flex-treble"><input type="digit" placeholder="认筹金" placeholder-class="text-gray" v-model="form.identifyPrice" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">vip卡号</text></view>
					<view class="action flex-treble"><input type="text" placeholder="vip" placeholder-class="text-gray" v-model="form.vipCard" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">认筹日期</text></view>
					<!-- <view class="action flex-treble"><input type="text" placeholder="认筹日期" placeholder-class="text-gray" v-model="form.identifyTime" /></view> -->
					<picker
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
						<view v-if="form.identifyTime" class="uni-input">{{ form.identifyTime }}</view>
						<view v-else class="text-gray">选择认筹日期</view>
					</picker>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">职业</text></view>
					<!-- <view class="action flex-treble"><input type="text" placeholder="职业" placeholder-class="text-gray" v-model="form.profession" /></view> -->
					<picker
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
					<!-- <view class="action flex-treble"><input type="text" placeholder="产品需求" placeholder-class="text-gray" v-model="form.productRequirement" /></view> -->
					<picker class="flex-treble" mode="multiSelector" @change="onProductDemand" @columnchange="changeProductDemand" :range="productDemand">
						<view v-if="form.productRequirement" class="uni-input">{{ form.productRequirement }}</view>
						<view v-else class="text-gray">选择产品需求</view>
					</picker>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">购买力评估</text></view>
					<view class="action flex-treble"><input type="text" placeholder="购买力评估" placeholder-class="text-gray" v-model="form.purpose" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">认筹途径</text></view>
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
						<view v-else class="text-gray">选择认筹途径</view>
					</picker>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">置业动机</text></view>
					<picker
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
					<view class="action flex-treble"><input type="text" placeholder="意向价格" placeholder-class="text-gray" v-model="form.purposePrice" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">备注</text></view>
					<view class="action flex-treble"><input type="text" placeholder="备注" placeholder-class="text-gray" v-model="form.remark" /></view>
				</view>
			</view>
		</cu-modal>
		<!-- 暂无数据 -->
		<empty-data :show="isEmpty"></empty-data>
		<!-- 列表 -->
		<view :class="!isEmpty ? 'show' : 'hide'">
			<view class="cu-list menu-avatar">
				<view
					class="cu-item margin-tb light shadow shadow-lg  bg-white"
					style="min-height: 120px;"
					@tap="link(`./detail?id=${item.id}&indexes=${index}`)"
					:class="modalName == 'move-box-' + index ? 'move-cur' : ''"
					v-for="(item, index) in list"
					:key="index"
					@touchstart="ListTouchStart"
					@touchmove="ListTouchMove"
					@touchend="ListTouchEnd"
					:data-target="'move-box-' + index"
				>
					<!-- <view class="cu-avatar round lg" :style="[{ backgroundImage: 'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100' + (index + 2) + '.jpg)' }]"></view> -->
					<view class="content  padding-tb overhide relative flex-sub">
						<view class="flex justify-between padding-bottom-sm align-center">
							<view
								class="tip text-white font-size-12"
								:class="[item.sellStatus == 0 ? 'bg-yellow' : '', item.sellStatus == 1 ? 'bg-green' : '', item.sellStatus == 2 ? 'bg-red' : '']"
							>
								{{ offerSattus[item.sellStatus] }}
							</view>
							<view class="margin-left-xl padding-left-sm text-grey">{{ item.name }}</view>
							<view v-if="item.vipCard" class="text-df cu-capsule">
								<text class="cu-tag bg-orange text-white padding-xs">
									<text class="cuIcon-vip margin-right-xs"></text>
									vip号:
								</text>
								<text class="cu-tag line-orange">{{ item.vipCard }}</text>
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-phone padding-right-xs"></text>
								手机号：{{ item.mobile }}
							</view>
							<view>
								<text class="text-red cuIcon-coin padding-right-xs"></text>
								认筹金：
								<text>{{ item.identifyPrice || '--' }}</text>
							</view>
						</view>
						<view class="text-df padding-bottom-sm">
							<text class=" cuIcon-searchlist  margin-right-xs"></text>
							身份证：{{ item.idCard }}
						</view>
						<view class="text-df text-cut padding-bottom-sm">
							<text class=" cuIcon-addressbook  margin-right-xs"></text>
							身份证地址：{{ item.idAddress }}
						</view>
	
						<view class="text-df text-cut padding-bottom-sm">
							<text class=" cuIcon-locationfill  margin-right-xs"></text>
							单位地址：{{ item.companyAddress||"--" }}
						</view>

					</view>

					<view class="move">
						<view class="bg-cyan" @tap.stop="onEdit(item)">编辑</view>
						<view class="bg-red" @tap.stop="onCheckDel(item.id)">删除</view>
					</view>
				</view>
				<view v-if="pageNum > 1" class="cu-load bg-grey" :class="!isLastPage ? 'loading' : 'over'"></view>
			</view>
			<!-- 回到顶部 -->
			<back-top :show="backTop" />
		</view>
	</view>
</template>

<script>
import api from '@/api/identify.js';
import util from '@/utils/index.js';
import { sellStatus, professional, Age, productDemand,realEstate,sourceWayArray,offerSattus } from '@/utils/common/data.js';
import {check,defForm} from "./verify.js"

export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			total: null,
			defForm,
			// 滚动窗口位置
			scrollTop: 0,

			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			// 性别选择索引下标
			// dataArray--
			Age, //年龄
			productDemand, //产品需求
			professional, //职业
			sellStatus, //售卖状态
			realEstate,//置业动机
			sourceWayArray,
			offerSattus,
			// sourceWayArray: ['自然上访', '员工邀约', '老客户介绍', '路过', '朋友介绍', '广告媒体', '其他'],
			statusArray: ['来电', '认筹', '签约', '购买'],
			sexArray: ['男', '女'],
			form: defForm,
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
	onPageScroll(res) {
		// console.log(res);
		if (!this.backTop && res.scrollTop > 200) {
			this.backTop = true;
		} else if (this.backTop && res.scrollTop < 200) {
			this.backTop = false;
		}
	},
	// 下拉
	isPullDown: false,
	onPullDownRefresh() {
		if (this.isPullDown) return;
		this.isPullDown = true;
		this.pageNum = 1;
		this.isLastPage = false;
		this.getList();
		this.isPullDown = false;
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉触底
	onReachBottom() {
		if (this.isLastPage || this.isPullDown) return;
		++this.pageNum;
		this.getList();
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
			api.list(data).then(res => {
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
			api.del(id).then(r => {
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
			// console.log(e);
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
			const save = data => api.save(data);
			const update = data => api.update(data);
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

<style></style>
