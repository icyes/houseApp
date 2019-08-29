<template>
	<view class="empty-data flex align-center flex-direction justify-center flex-sub" :class="show?'show':'hide'">
		<image :src="empty" mode="aspectFill"></image>
		<view class="text-gray">暂无数据</view>
	</view>
</template>

<script>
import empty from '@/static/EmptyData.png';
export default {
	data() {
		return {
			empty
		};
	},
	props:{
		show:{
			type:Boolean,
			default:false
		}
	}
};
</script>

<style>
.empty-data {
	width: 100%;
	height: 100%;
}
.empty-data image {
	width: 500rpx;
	height: 500rpx;
}
</style>
