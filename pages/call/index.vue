<template>
	<view class="flex-full overhide-x">
		<cu-custom bgColor="bg-gradual-blue" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">来电登记</block>
			<block slot="right">
				<view class="action"><view class="cu-load load-cuIcon" :class="!isLoad ? 'loading' : 'over'"></view></view>
			</block>
		</cu-custom>
		<!-- 列表头部 -->
		<list-bar text="来电登记" :total="total" @showModal="v =>{this.form=Object.assign({},defForm);this.modalName = v}" />
		<!-- 顶部搜搜弹窗 -->
		<filtrate-modal :keyWord="keyWord" @input="v => (this.keyWord = v)" :modalName="modalName" @hideModal="hideModal" @reset="searchReset" @sure="search" />
		<!-- 添加弹窗 -->
		<cu-modal :modalName="modalName" text="来电登记" @submit="submit" @hideModal="hideModal" :isUpdate="isUpdate">
			<view class="cu-list sm-border menu text-left solid-top">
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">客户姓名</text></view>
					<view class="action flex-treble"><input type="text" placeholder="来电客户姓名" placeholder-class="text-gray" v-model="form.name" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">手机号</text></view>
					<view class="action flex-treble"><input type="text" placeholder="来电客户手机号" placeholder-class="text-gray" v-model="form.mobile" /></view>
				</view>

				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">性别</text></view>
					<picker
						class="flex-treble"
						@change="
							e => {
								this.form.sex = Number(e.target.value) + 1;
							}
						"
						:value="sexIdx"
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
							mode="date"
							:value="form.callTime"
							:start="startDate"
							:end="endDate"
							@change="
								e => {
									this.form.callTime = e.target.value;
								}
							"
						>
							<view v-if="form.callTime" class="uni-input">{{ form.callTime }}</view>
							<view v-else class="text-gray">选择来电日期</view>
						</picker>
					</view>
				</view>

				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">获取途径</text></view>
					<picker class="flex-treble" @change="bindSourceWayChange" :value="form.acquiringWay - 1" :range="sourceWayArray">
						<view v-if="form.acquiringWay" class="uni-input">{{ sourceWayArray[form.acquiringWay - 1] }}</view>
						<view v-else class="text-gray">选择获取途径</view>
					</picker>
				</view>

				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">询问内容1</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写询问内容1" placeholder-class="text-gray" v-model="form.askContentOne" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">询问内容2</text></view>
					<view class="action flex-treble"><input type="text" placeholder="填写询问内容2" placeholder-class="text-gray" v-model="form.askContentTwo" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">备注</text></view>
					<view class="action flex-treble"><input style="width: unset;" auto-height placeholder="填写备注" placeholder-class="text-gray" v-model="form.remark" /></view>
				</view>
			</view>
		</cu-modal>
		<!-- 暂无数据 -->
		<empty-data :show="isEmpty"></empty-data>
		<!-- 列表 -->
		<view :class="!isEmpty ? 'show' : 'hide'">
			<view class="cu-list menu-avatar">
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
						<view class="flex justify-between padding-bottom-sm align-center text-df">
							<view class="text-grey">
								{{ item.name }}
								<text class="margin-left-sm" :class="item.sex === 1 ? 'text-blue cuIcon-male' : 'text-pink cuIcon-female'"></text>
							</view>

							<view class="text-df cu-capsule">
								<text class="cu-tag bg-cyan text-white padding-xs">
									<text class="cuIcon-time margin-right-xs"></text>
									来电日期:
								</text>
								<text class="cu-tag line-cyan">{{ item.callTime.substr(0, 10) }}</text>
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-phone padding-right-xs"></text>
								手机号：{{ item.mobile }}
							</view>
							<view>
								<text class="cuIcon-radiobox padding-right-xs"></text>
								获取途径：{{ item.acquiringWay ? sourceWayArray[item.acquiringWay - 1] : '--' }}
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center text-df">
							<view class="text-df text-cut">
								<text class="cuIcon-service   margin-right-xs"></text>
								询问内容一:{{ item.askContentOne }}
							</view>
						</view>
						<view class=" text-df text-cut">
							<text class="cuIcon-service   margin-right-xs"></text>
							询问内容二:{{ item.askContentTwo }}
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
import api from '@/api/call.js';
import util from '@/utils/index.js';
import { gender, statusArray, customerSource } from '@/utils/common/data.js';
const defForm = {
	id: null, //*
	projectId: null, //项目id
	name: null, //来电客户姓名
	mobile: null, //手机号
	sex: 1, //来电客户性别
	callTime: '', //*来电日期
	acquiringWay: '', //获取途径
	askContentOne: '', //询问内容1
	askContentTwo: '', //询问内容2
	remark: '' //备注
	// "customerId": 0, //*客户表主键
};
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			total:null,
			// 滚动窗口位置
			scrollTop: 0,

			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			// 性别选择索引下标
			sourceWayArray: customerSource,
			statusArray: statusArray,
			sexArray: gender,
			defForm,
			form: defForm,
			// 列表
			list: null,
			keyWord: '', //搜索关键字姓名和手机
			// 分页
			isLastPage: false, //是否最后一页
			pageNum: 1, //页数
			pageSize: 15, //每页条数
			isLoad: true, //加载状态
			backTop: false //回到顶部按钮显示状态
		};
	},
	onLoad(option) {
		this.form.projectId = Number(option.id);
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
		this.pageNum = 1;
		this.isLastPage = false;
		this.getList();
		this.isRefresh = false;
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉触底
	onReachBottom() {
		if (this.isRefresh) return;
		console.log('----bottom');
		if (this.isLastPage) return;
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
			if (!this.isLoad) return;
			this.isLoad = false;
			let data = {
				objectId: this.form.projectId,
				keyWord: this.keyWord,
				page: this.pageNum,
				pageSize: this.pageSize
			};
			api.list(data).then(res => {
				this.total = res.total;
				this.isLastPage = res.isLastPage;
				console.log('pageNum', this.pageNum);
				if (this.pageNum > 1) this.list = this.list.concat(res.list);
				else this.list = res.list;

				setTimeout(() => {
					this.isLoad = true;
					this.$forceUpdate();
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
		// 选择来电日期
		bindDateChange: function(e) {
			this.form.callTime = e.target.value;
		},
		// 选择性别
		bindSexChange: function(e) {
			this.form.sex = Number(e.target.value) + 1;
		},
		//  客户来源选择
		bindSourceWayChange: function(e) {
			this.form.acquiringWay = Number(e.target.value) + 1;
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
			/*  
			"callTime":, //*来电日期
			"customerId //客户
			*/
			let { callTime, customerId } = this.form;
			if (!callTime) {
				util.toast('来电日期不能为空');
				result = false;
			} else if (!customerId) {
				util.toast('客户不能为空');
				result = false;
			}
			return result;
		},
		// 提交表单
		submit() {
			// if (!this.check()) return;
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
