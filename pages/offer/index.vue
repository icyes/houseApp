<template>
	<view class="flex-full">
		<cu-custom bgColor="bg-gradual-blue" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">认购登记</block>
			<block slot="right">
				<view class="action"><view class="cu-load load-cuIcon" :class="!isLoad ? 'loading' : 'over'"></view></view>
			</block>
		</cu-custom>
		<!-- 列表头部 -->
		<list-bar text="客户列表" @showModal="showCuModal" />
		<!-- 顶部搜搜弹窗 -->
		<filtrate-modal v-model="keyWord" :modalName="modalName" @hideModal="hideModal" @reset="searchReset" @sure="search" />
		<!-- 添加弹窗 -->
		<cu-modal :show="cumodal" text="客户" @submit="submit" @hideModal="hideCuModal" :isUpdate="isUpdate">
			<view class="cu-list sm-border menu text-left solid-top">
				<view class="cu-item flex" @tap="modalName = 'DrawerModalL'">
					<view class="content flex-sub"><text class="text-grey">选择客户</text></view>
					<view class="action flex-treble">
						<input type=" number" disabled="true" placeholder="customerId" placeholder-class="text-gray" v-model="form.customerId" />
					</view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">认购总价</text></view>
					<view class="action flex-treble"><input type="text" placeholder="认购总价" placeholder-class="text-gray" v-model="form.offerAmount" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">定金</text></view>
					<view class="action flex-treble"><input type="text" placeholder="定金" placeholder-class="text-gray" v-model="form.prePrice" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">建面单价</text></view>
					<view class="action flex-treble"><input type="text" placeholder="建面单价" placeholder-class="text-gray" v-model="form.acreagePrice" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">房屋</text></view>
					<view class="action flex-treble"><input type="text" placeholder="房屋" placeholder-class="text-gray" v-model="form.houseId" /></view>
				</view>
			</view>
		</cu-modal>
		<!-- 暂无数据 -->
		<empty-data :show="list && list.length == 0"></empty-data>
		<!-- 列表 -->
		<view :class="list && list.length > 0 ? 'show' : 'hide'">
			<view class="cu-list menu-avatar">
				<view
					class="cu-item"
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
					<view class="content" style="left:60rpx">
						<view class="text-grey">{{ item.name }}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							消息未送达
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">22:20</view>
						<view class="cu-tag round bg-grey sm">5</view>
					</view>
					<view class="move">
						<view class="bg-cyan" @tap.stop="onEdit(item)">编辑</view>
						<view class="bg-red" @tap.stop="onCheckDel(item.id)">删除</view>
					</view>
				</view>
				<view class="cu-load bg-grey" :class="!isLastPage ? 'loading' : 'over'"></view>
			</view>
			<!-- 回到顶部 -->
			<back-top :show="backTop" />
		</view>
		<drawer-modal :modalName="modalName" @hideModal="hideModal"></drawer-modal>
	</view>
</template>

<script>
import api from '@/api/offerbuy.js';
import util from '@/utils/index.js';
// 认购信息表
const defForm = {
	id: null, //[up *]
	customerId: null, //客户ID
	offerAmount: null, //认购总价
	prePrice: '', //* 定金
	acreagePrice: '', //*建面单价
	houseId: '' //* 房屋Id
};
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			//
			cumodal: false,
			// 滚动窗口位置
			scrollTop: 0,

			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			// 性别选择索引下标
			sourceWayArray: ['自然上访', '员工邀约', '老客户介绍', '路过', '朋友介绍', '广告媒体', '其他'],
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
	onPullDownRefresh() {
		this.isRefresh = true;
		if (!!this.modalName) {
			uni.stopPullDownRefresh();
			this.isRefresh =true;
			return false;
		}
		this.pageNum = 1;
		this.isLastPage = false;
		this.getList();
		setTimeout(function() {
			uni.stopPullDownRefresh();
			this.isRefresh =true;
		}, 1000);
	},
	// 上拉触底
	onReachBottom() {
		if (this.isLastPage||this.isRefresh) return;
		++this.pageNum;
		this.getList();
	},
	computed: {
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
		//
		showCuModal() {
			util.pageScrollTo(10);
			this.cumodal = true;
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
				console.log('l-', res);
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
		//
		hideCuModal() {
			this.cumodal = false;
			this.form = { ...defForm };
		},
		// 影藏弹窗
		hideModal(e) {
			this.modalName = null;
			// 为了让窗口显示时，滚动到最顶部，先改变滚动位置，才能生效
			setTimeout(() => {
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
			if (!this.check()) return;
			let data = { ...this.form };
			data = this.objFilter(data);
			const save = data => api.save(data);
			const update = data => api.update(data);
			const submit = data.id ? update : save;
			submit(data).then(r => {
				let txt = this.isUpdate ? '更新' : '添加';
				util.toast('成功');
				this.hideCuModal();

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
