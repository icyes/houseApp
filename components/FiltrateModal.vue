<!-- 筛选弹窗 -->
<template>
	<view class="cu-modal top-modal" :class="modalName == 'filtrateModal' ? 'show' : ''" @tap="$emit('hideModal', null)" @touchmove.stop>
		<view class="cu-dialog" @tap.stop>
			<view class="padding-xl cu-bar bg-gray search">
				<view class="search-form round" style="background: #fff;">
					<text class="cuIcon-search"></text>
					<input type="text" :value="keyWord" @input="$emit('input', $event.target.value)" placeholder="输入姓名或手机号" confirm-type="search" />
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action"><button @tap="$emit('reset')" class="cu-btn bg-grey light shadow-blur round">重置</button></view>
				<view class="action"><button @tap="$emit('sure')" class="cu-btn bg-gradual-green shadow-blur round">确定</button></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	model: {
		prop: 'keyWord',
		event: 'input'
	},
	props: {
		keyWord: {
			type: String,
			default: ''
		},
		modalName: {
			type: String,
			default: ''
		}
	},
	methods: {}
};
</script>

<style></style>
