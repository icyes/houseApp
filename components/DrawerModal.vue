<template>
	<view class="drawer-modal">
		<!-- 普通窗口 -->
		<view class="cu-modal" :class="modalName == 'Modal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">Modal 内容。</view>
			</view>
		</view>

		<!-- 底部窗口 -->
		<view class="cu-modal bottom-modal" :class="modalName == 'bottomModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">Modal 内容。</view>
			</view>
		</view>

		<!-- 对话窗口 -->
		<view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">Modal 内容。</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName == 'DialogModal2' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl">Modal 内容。</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green " @tap="hideModal">
						<text class="cuIcon-moneybag"></text>
						微信支付
					</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">确定</view>
				</view>
			</view>
		</view>

		<!-- 图片窗口 -->

		<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="bg-img" style="background-image: url('https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg');height:200px;">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal"><text class="cuIcon-close "></text></view>
					</view>
				</view>
				<view class="cu-bar bg-white"><view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view></view>
			</view>
		</view>

		<!-- 单选窗口 -->
		<view class="cu-modal" :class="modalName == 'RadioModal' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item, index) in 5" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">Item {{ index + 1 }}</view>
								<radio
									class="round"
									:class="radio == 'radio' + index ? 'checked' : ''"
									:checked="radio == 'radio' + index ? true : false"
									:value="'radio' + index"
								></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>

		<!-- 多选窗口 -->
		<view class="cu-modal bottom-modal" :class="modalName == 'ChooseModal' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="hideModal">确定</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item, index) in checkbox" class="padding-xs" :key="index">
						<button class="cu-btn orange lg block" :class="item.checked ? 'bg-orange' : 'line-orange'" @tap="ChooseCheckbox" :data-value="item.value">
							{{ item.name }}
							<view class="cu-tag sm round" :class="item.checked ? 'bg-white text-orange' : 'bg-orange'" v-if="item.hot">HOT</view>
						</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 侧边抽屉 -->
		<view class="cu-modal drawer-modal justify-start" :class="modalName == 'DrawerModalL' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{ top: CustomBar + 'px', height: 'calc(100vh - ' + CustomBar + 'px)' }]">
					<slot name="DrawerModalL"/>
				
			</view>
		</view>
		<view class="cu-modal drawer-modal justify-end" :class="modalName == 'DrawerModalR' || show ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{ top: CustomBar + 'px', height: 'calc(100vh - ' + CustomBar + 'px)' }]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item, index) in 5" :key="index">
						<view class="content">
							<view>Item {{ index + 1 }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * modalName：
	 * 1 普通窗口  Modal
	 * 2 底部窗口  bottomModal
	 * 3 对话窗口  DialogModal1  DialogModal2
	 * 4 图片窗口  Image
	 * 5 单选窗口  RadioModal
	 * 6 多选窗口  ChooseModal
	 * 7 侧边抽屉  DrawerModalL  DrawerModalR
	 * 
	 * 
	 */
export default {
	data() {
		return {};
	},
	props: {
		modalName: {
			type: String,
			default: ''
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		hideModal() {
			this.$emit('hideModal', null);
		}
	}
};
</script>

<style>
	.drawer-modal .cu-modal{
		padding-top: 128rpx;
	}
</style>
