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
		<list-bar
			text="认购列表"
			:total="total"
			@showModal="
				v => {
					this.form=Object.assign({},defForm);
					if (v === 'formModal') {
						this.cumodal = true;
					} else {
						this.cumodal = false;
					}
					this.modalName = v;
				}
			"
		/>
		<!-- 顶部搜搜弹窗 -->
		<filtrate-modal :keyWord="keyWord" @input="v => (this.keyWord = v)" :modalName="modalName" @hideModal="hideModal" @reset="searchReset" @sure="search" />
		<!-- 添加弹窗 -->
		<cu-modal :show="cumodal" text="认购" @submit="submit" @hideModal="hideCuModal" :isUpdate="isUpdate">
			<!--  @tap="modalName = 'DrawerModalL'" -->
			<view class="cu-list sm-border menu text-left solid-top">
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">客户姓名</text></view>
					<view class="action flex-treble"><input type="text" placeholder="客户姓名" placeholder-class="text-gray" v-model="form.name" /></view>
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
						:value="form.sex ? form.sex - 1 : 0"
						:range="sexArray"
					>
						<view v-if="form.sex" class="uni-input">{{ sexArray[form.sex - 1] }}</view>
						<view v-else class="text-gray">选择性别</view>
					</picker>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">电话</text></view>
					<view class="action flex-treble"><input type="text" placeholder="电话" placeholder-class="text-gray" v-model="form.mobile" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">身份证</text></view>
					<view class="action flex-treble"><input type="text" placeholder="身份证" placeholder-class="text-gray" v-model="form.idCard" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">通讯地址</text></view>
					<view class="action flex-treble"><input type="text" placeholder="通讯地址" placeholder-class="text-gray" v-model="form.address" /></view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">认购日期</text></view>
					<view class="action flex-treble">
						<picker
							mode="date"
							:value="form.offerBuyTime"
							:start="startDate"
							:end="endDate"
							@change="
								e => {
									this.form.offerBuyTime = e.target.value?e.target.value.substr(0, 10):'--';
								}
							"
						>
							<view v-if="form.offerBuyTime" class="uni-input">{{ form.offerBuyTime }}</view>
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
					<view class="action flex-treble" @tap="showHouseModal">
						<input type="text" disabled="true" placeholder="房屋" placeholder-class="text-gray" v-model="form.houseName" />
					</view>
				</view>
				<view class="cu-item flex">
					<view class="content flex-sub"><text class="text-grey">工作区域</text></view>
					<view class="action flex-treble"><input type="text" placeholder="工作区域" placeholder-class="text-gray" v-model="form.workAddress" /></view>
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
					<view class="content flex-sub"><text class="text-grey">客户来源</text></view>
					<picker
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
			</view>
		</cu-modal>
		<!-- 暂无数据 -->
		<empty-data :show="isEmpty"></empty-data>
		<!-- 列表 -->
		<view :class="!isEmpty ? 'show' : 'hide'">
			<view class="cu-list menu-avatar ">
				<view
					class="cu-item margin-tb light shadow shadow-lg  bg-white"
					style="min-height: 180px;"
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
							<view class="text-grey">
								<view
									class="tip text-white font-size-12"
									:class="[item.status == 0 ? 'bg-yellow' : '', item.status == 1 ? 'bg-green' : '', item.status == 2 ? 'bg-red' : '']"
								>
									{{ offerSattus[item.status] }}
								</view>
								<text class="margin-left-xl padding-left-sm">{{ item.name }}</text>
								<text class="margin-left-sm" :class="item.sex === 1 ? 'text-blue cuIcon-male' : 'text-pink cuIcon-female'"></text>
								<view class="cu-tag round line-green light shadow margin-left text-cut">房屋:{{ item.houseName }}</view>
							</view>
							<view v-if="item.prePrice" class="text-df cu-capsule">
								<text class="cu-tag radius shadow bg-red text-white padding-xs">
									<text class="cuIcon-recharge margin-right-xs"></text>
									定金:
								</text>
								<text class="cu-tag shadow radius line-red">{{ item.prePrice || '--' }}</text>
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-phone padding-right-xs"></text>
								手机号：{{ item.mobile || '--' }}
							</view>
							<view>
								<text class="cuIcon-timefill padding-right-xs"></text>
								<text class="">认购日期：</text>
								{{ item.offerBuyTime }}
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-searchlist padding-right-xs"></text>
								身份证：{{ item.idCard || '--' }}
							</view>
							<view>
								<text class="cuIcon-service padding-right-xs"></text>
								职业：{{ item.profession || '--' }}
							</view>
						</view>
						<view class="flex justify-between padding-bottom-sm align-center">
							<view class="text-df">
								<text class="cuIcon-profile padding-right-xs"></text>
								置业动机：{{ item.buyMotive || '--' }}
							</view>
							<view>
								<text class="cuIcon-radiobox padding-right-xs"></text>
								客户来源：{{ item.sourceWay ? sourceWayArray[item.sourceWay - 1] : '--' }}
							</view>
						</view>
						<view class=" text-df padding-bottom-sm text-cut">
							<text class="cuIcon-location padding-right-xs"></text>
							<text>通讯地址：</text>
							{{ item.address || '--' }}
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
		<drawer-modal :modalName="modalName" @hideModal="hideModal">
			<view slot="DrawerModalL">
				<view class="padding-xl cu-bar search">
					<view class="search-form round" style="background: #fff;">
						<text class="cuIcon-search"></text>
						<input type="text" v-model="housekeyWord" @input="houseSearch()" placeholder="输入房屋名字" confirm-type="search" />
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 500px;" @scrolltolower="houseLower">
					<view class="cu-list menu text-left">
						<view class="cu-item arrow" v-for="(item, index) in house.list" :key="index">
							<view class="content" @tap="chooseHouse(item)">
								<view>{{ item.name }}</view>
							</view>
						</view>
					</view>
					<view v-if="house.isLastPage" class="margin-top text-gray text-df">
						---- 到底了 ----
					</view>
				</scroll-view>
			</view>
		</drawer-modal>
	</view>
</template>

<script>
import api from '@/api/offerbuy.js';
import house from '@/api/house.js';
import util from '@/utils/index.js';
import { gender, realEstate, statusArray, customerSource, family, professional, Age, offerSattus } from '@/utils/common/data.js';
// 认购信息表
const defForm = {
	projectId: null,
	id: null, //[up *]
	name: null, //认购者信息
	sex: 1, //性别
	mobile: null, //电话
	idCard: null, //身份证
	address: null, //通讯地址
	offerBuyTime: "", //认购日期
	prePrice: '', //* 定金
	houseId: '', //* 房屋Id
	workAddress: null, //工作区域
	profession: null, //职业类型
	age: null, //年龄
	homeStructure: null, //家庭结构
	buyMotive: null, //置业动机
	sourceWay: null //客户来源
};
export default {
	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			total:null,
			defForm,
			housekeyWord: '',
			house: {
				list:[],
				isLastPage: false, //是否最后一页
				pageNum: 1, //页数
			},
			cumodal: false,
			// 滚动窗口位置
			scrollTop: 0,
			sexArray: gender,
			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			// 性别选择索引下标
			sourceWayArray: customerSource,
			statusArray: statusArray,
			realEstate, //置业动机
			family, //家庭结构
			professional, //职业类型
			form: defForm,
			Age,
			offerSattus, //认购状态
			// 列表
			list: null,
			keyWord: '', //搜索关键字姓名和手机
			// 分页
			isLastPage: false, //是否最后一页
			pageNum: 1, //页数
			pageSize: 15, //每页条数
			isLoad: false, //加载状态
			backTop: false, //回到顶部按钮显示状态
			
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
			this.isRefresh = true;
			return false;
		}
		this.pageNum = 1;
		this.isLastPage = false;
		this.getList();
		this.isRefresh = true;
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉触底
	onReachBottom() {
		if (this.isLastPage || this.isRefresh) return;
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
		// 房屋搜索
		houseSearch(){
			console.log("house",this.housekeyWord)
			this.house={list:[],isLastPage:false,pageNum:1}
			this.getHouse()
		},
		// 显示房屋列表
		showHouseModal() {
			this.house={list:[],isLastPage:false,pageNum:1}
			this.getHouse();
			this.modalName = 'DrawerModalL';
		},
		houseLower(e) {
			++this.house.pageNum;
			this.getHouse();
		},
		chooseHouse(item) {
			this.form.houseId = item.id;
			this.form.houseName = item.name;
			this.modalName = '';
			this.$forceUpdate();
		},
		getHouse() {
			if(this.house.isLastPage) return;
			let data = { status: 1, page: this.house.pageNum, pageSize: 15, projectId: this.form.projectId, keyWord: this.housekeyWord };
			house.list(data).then(res => {
				console.log('l-', res);
				this.house.isLastPage = res.isLastPage;
				if (this.house.pageNum == 1) this.house.list = res.list;
				else this.house.list = this.house.list.concat(res.list);
				// if (this.pageNum == 1) this.list = res.list;
				// else this.list = this.list.concat(res.list);
			});
		},
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
				this.total = res.total;
				this.isLastPage = res.isLastPage;
				res.list.map(m=>{
					m.offerBuyTime = m.offerBuyTime?m.offerBuyTime.substr(0, 10):"--";
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
			// this.modalName = 'formModal';
			this.cumodal = true;
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
		bindOfferBuyTimeChange: function(e) {
			this.form.offerBuyTime = e.target.value;
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
			// if (!this.check()) return;
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
