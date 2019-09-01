<template>
	<view class="flex-full">
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">项目列表</block>
		</cu-custom>
		<!-- 顶部搜搜弹窗 -->
		<filtrate-modal v-model="keyWord" :modalName="modalName" @hideModal="hideModal" @reset="searchReset" @sure="search" />
		<!-- 暂无数据 -->
		<empty-data :show="list && list.length == 0"></empty-data>
		<!-- 列表 -->
		<view  :class="list && list.length > 0 ? 'show' : 'hide'">
				<view class="cu-card menu-avatar">
					<view
						class="cu-item shadow-warp"
						@tap="link(`/pages/project/detail?id=${item.id}&name=${item.projectName}`)"
						:class="modalName == 'move-box-' + index ? 'move-cur' : ''"
						v-for="(item, index) in list"
						:key="index"
						:data-target="'move-box-' + index"
					>
						<!-- <view class="cu-avatar round lg" :style="[{ backgroundImage: 'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100' + (index + 2) + '.jpg)' }]"></view> -->
						<view class="flex-sub padding ">
							<view class="text-grey text-center padding-bottom-sm text-lg">{{ item.projectName }}</view>
							<view class="flex text-gray text-df text-sm padding-bottom-sm">
								<text class=" text-black  margin-right-xs  flex-zero">居住地址：</text>
								<view>{{item.liveAddressConfig}}</view>
							</view>
							<view class="text-gray text-sm padding-bottom-sm flex">
								<text class=" text-black  margin-right-xs  flex-zero">工作地址：</text>
								<view class="">
									{{item.workAddressConfig}}
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="cu-load bg-grey" :class="!isLastPage ? 'loading' : 'over'"></view> -->
				
			</view>
		<!-- 回到顶部 -->
			<!-- <back-top :show="backTop" /> -->
		</view>
	</view>
</template>

<script>
import api from '@/api/project.js';
import util from '@/utils/index.js';
const defForm = {
	  "id": null,  //*
	  "projectId":null,//项目id
	  "name":null ,//来电客户姓名
	  "mobile":null,//手机号
	  "sex":1 ,//来电客户性别
	  "callTime": "2019-08-27T14:03:29.079Z", //*来电日期
	  "acquiringWay": "string", //获取途径
	  "askContentOne": "string", //询问内容1
	  "askContentTwo": "string", //询问内容2
	  "remark": "string", //备注
	  "customerId": 0, //*客户表主键
};
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
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
	mounted() {
		this.getList();
	},
	onUnload() {
	
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
			// this.isLoad = false;
			let data = {
				page: this.pageNum,
				pageSize: this.pageSize
			};
			api.list(data).then(res => {
				console.log('l-', res);
				// this.isLastPage = res.isLastPage;
				if (this.pageNum == 1) this.list = res;
				else this.list = this.list.concat(res);
// 
// 				setTimeout(() => {
// 					this.isLoad = true;
// 				}, 500);
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
			if (!this.check()) return;
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
