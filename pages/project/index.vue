<template>
	<view class="flex-full">
<!-- 		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">项目列表</block>
		</cu-custom> -->
		<div class="box-ellipse relative flex-center">
			<image :src="topImg"
			 mode="widthFix" class="response"></image>
			 <text class="text-bold absolute text-white text-shadow -black" style="font-size: 30px;top:100px;opacity:0.9;">华和置业</text>
		</div>
		
		<!-- 退出 -->
		<div class="fixed shadow text-right bg-white padding-sm padding-right text-gray" 
		style="top:200px;width: 80px;border-radius:0 50px 50px 0;animationDelay:1.5s"
		:class="[toggleDelay?'animation-slide-left':'']"
		@tap="logout()"
		>
				登出<text class="cuIcon-expressman padding-lr-xs"></text>
		</div>

		<!-- 顶部搜搜弹窗 -->
		<filtrate-modal v-model="keyWord" :modalName="modalName" @hideModal="hideModal" @reset="searchReset" @sure="search" />
		<!-- 暂无数据 -->
		<empty-data :show="list && list.length == 0"></empty-data>
		<!-- 列表 -->
		<view class="nav-list" >
			<block v-for="(item, index) in list">
				
			<div v-key="index" hover-class="none" class="nav-li bg-cyan" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
			 @tap="link(`/pages/project/detail?id=${item.id}&name=${item.projectName}`)"
			 style="width: 100%;"
			 >
				<view class="nav-title">{{ item.projectName }}</view>
				<view class="nav-name"></view>
				<text class="cuIcon-all"></text>
			</div>
			</block>
		</view>
		</view>
	</view>
</template>

<script>
import api from '@/api/project.js';
import util from '@/utils/index.js';
import storage from "@/utils/storage.js"
import topImg from "@/static/BasicsBg.png"
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
			// 退出按钮左移位置
			outleft:false,
			// 退出按钮动画显影
			toggleDelay: false,
			topImg,
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
		this.ToggleDelay()
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
		logout(){
			this.ToggleDelay();
			util.showModal("确认退出当前账号").then(()=>{
				storage.clear()
				util.navigateTo('/pages/login/login')
			})
		},
		// 实时监听滚动
		scroll: function(e) {
			this.scrollTop = e.detail.scrollTop;
		},
		ToggleDelay() {
			this.toggleDelay= true;
			setTimeout(()=>{
				this.toggleDelay= false
			}, 1000)
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
