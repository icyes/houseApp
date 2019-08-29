<template>
	<view>
		<!-- <basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin> -->
		<project v-if="PageCur=='project'"/>
		<home v-if="PageCur=='home'"/>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="project">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/about' + [PageCur == 'project' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'project' ? 'text-green' : 'text-gray'">项目管理</view>
			</view>
			<view class="action" @click="NavChange" data-cur="home">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/component' + [PageCur == 'home' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'home' ? 'text-green' : 'text-gray'">其它</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'project',
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
