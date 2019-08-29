<template>
	<view class="sticky-top cu-bar bg-white solid-bottom ">
		<view class="action">
			<text class="cuIcon-title text-orange "></text>
			{{text}}
		</view>
		<view class="action">
			<button class="cu-btn bg-green shadow" @tap="showModal" data-target="formModal">添加</button>
			<button class="cu-btn margin-left bg-orange shadow" @tap="showModal" data-target="filtrateModal">搜索</button>
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
