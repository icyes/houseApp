<template>
	<!-- 添加弹窗 -->
	<view class="cu-modal" :class="modalName == 'formModal' ? 'show' : ''" @tap="$emit('hideModal', null)" @touchmove.stop>
		<view class="cu-dialog" @tap.stop style="margin-top:100rpx;">
			<view class="cu-bar bg-white justify-end shadow-lg solid-bottom">
				<view class="content">{{ isUpdate ? '编辑' : '添加' }}{{ text }}</view>
				<view class="action" @tap="$emit('hideModal', null)"><text class="cuIcon-close text-red"></text></view>
			</view>
			<scroll-view :scrollTop="scrollTop" scroll-y="true" class="scroll-Y" enable-back-to-top :style="[{ maxHeight: modalHeight + 'px' }]"><slot></slot></scroll-view>
			<view class="cu-bar bg-white justify-center shadow-warp">
				<view class="action">
					<button class="cu-btn line-green text-green" @tap="$emit('hideModal', null)">取消</button>
					<button class="cu-btn bg-green margin-left" @tap="$emit('submit')">提交</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 弹窗高度
			modalHeight: this.WindowHeight * 0.6
		};
	},
	props: {
		text:{
			type: String,
			default: ''
		},
		modalName: {
			type: String,
			default: ''
		},
		isUpdate:{
			type:Boolean,
			default:false,
		}
	},
	methods: {}
};
</script>

<style></style>
