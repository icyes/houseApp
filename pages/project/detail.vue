<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{ name }}</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>
				项目菜单
			</view>
			<!-- 	<view class="action">
			<button class="cu-btn bg-green shadow" @tap="showModal" data-target="gridModal">设置</button>
		</view> -->
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
			<view class="cu-item" v-for="(item, index) in cuIconList" :key="index" v-if="index < gridCol * 3">
				<navigator :url="item.link + '?id=' + id">
					<view :class="['cuIcon-' + item.cuIcon, 'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge != 0">
							<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
						</view>
					</view>
					<text>{{ item.name }}</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api/customer.js';
import util from '@/utils';
export default {
	data() {
		return {
			id: 0,
			name: '',
			gridCol: 3,
			gridBorder: false,
			cuIconList: [
				{
					cuIcon: 'group',
					color: 'red',
					badge: 0,
					name: '来访客户',
					link: '/pages/customer/index'
				},
				{
					cuIcon: 'phone',
					color: 'orange',
					badge: 0,
					name: '来电登记',
					link: '/pages/call/index'
				},
				{
					cuIcon: 'footprint',
					color: 'yellow',
					badge: 0,
					name: '跟进记录',
					link: '/pages/follow/index'
				},
				{
					cuIcon: 'form',
					color: 'olive',
					badge: 0,
					name: '认筹记录',
					link: '/pages/identity/index'
				},
				{
					cuIcon: 'pay',
					color: 'cyan',
					badge: 0,
					name: '认购登记',
					link: '/pages/offer/index'
				},
				{
					cuIcon: 'friend',
					color: 'purple',
					badge: 0,
					name: '拓展客户',
					link: '/pages/tookeen/index'
				},
				{
					cuIcon: 'sponsor',
					color: 'orange',
					badge: 0,
					name: '房屋计算',
					link: '/pages/compute/index'
				},
			
			]
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.name = option.name;
	},
	methods: {}
};
</script>

<style>
switch::after,
switch::before {
	content: '';
}
</style>
