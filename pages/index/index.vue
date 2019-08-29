<template>
	<view>
		<!-- <basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin> -->
		<home />
		<!-- <view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/about' + [PageCur == 'basics' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'basics' ? 'text-green' : 'text-gray'">客户管理</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/component' + [PageCur == 'component' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'component' ? 'text-green' : 'text-gray'">认购管理</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/plugin' + [PageCur == 'plugin' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'plugin' ? 'text-green' : 'text-gray'">认筹管理</view>
			</view>
		</view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'basics',
			modalName: null,
			gridCol: 3,
			gridBorder: false,
			menuBorder: false,
			menuArrow: false,
			menuCard: false,
			skin: false,
			listTouchStart: 0,
			listTouchDirection: null
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style></style>
