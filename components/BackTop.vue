<template>
	<view v-if="show">
		<!-- 回到顶部按钮 -->
		<button class="cu-btn cuIcon backTop line-cyan shadow flex flex-direction" @tap="$emit('backTop')">
			<text class="lg text-gray" :class="'cuIcon-top'" />
			Top
		</button>
	</view>
</template>

<script>
import util from '@/utils/index.js';
export default {
	data() {
		return {
		};
	},
	props:{
		show:{
			type:Boolean,
			default:false,
		}
	},
	methods: {
		
	}
};
</script>

<style>
	/* 回到顶部按钮 */
	.backTop {
		position: fixed !important;
		right: 40rpx;
		bottom: 100rpx;
		width: 100rpx !important;
		height: 100rpx !important;
		background: #fff !important;
	}
	
	.backTop text {
		color: unset !important;
	}
	
	.backTop.cu-btn[class*="line"]::after {
		border-radius: 50%;
	}
	
</style>
