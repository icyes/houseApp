<template>
	<view class=" cu-bar bg-white solid-bottom ">
		<view class="action">
			<!-- <text class="cuIcon-title text-orange "></text> -->
			
			<view  class=" cu-capsule round">
				<view class=" cu-tag bg-blue">{{text}}总数</view>
				<view class=" cu-tag line-blue">{{total||0}}条 </view>
			</view>
		</view>
		<view class="action">
			<button class="cu-btn round bg-green margin-right" @tap="showModal" data-target="formModal">添加</button>
			<button class="cu-btn round bg-orange " @tap="showModal" data-target="filtrateModal">搜索</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		modalName: {
			type: String,
			default: ''
		},
		text:{
			type:String,
			default:""
		},
		total:{
			type:Number,
			default:null
		}
	},
	methods: {
		showModal(e) {
			let modalName = e.currentTarget.dataset.target;
			this.$emit('showModal', modalName);
		}
	}
};
</script>

<style></style>
