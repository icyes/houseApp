<template name="basics">
	<view>
		<scroll-view scroll-y class="page">
			<image src="/static/BasicsBg.png"
			 mode="widthFix" class="response"></image>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 菜单列表
				</view>
			</view>
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
					<navigator :url="item.link">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
					</navigator>
				</view>
			</view>
			<view class="cu-tabbar-height"></view> 
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "home",
		data() {
			return {
				gridCol: 3,
				gridBorder: false,
				cuIconList: [
					{
						cuIcon: 'noticefill',
						color: 'olive',
						badge: 22,
						name: '认筹记录',
						link: '/pages/identity/index'
					},
					{
						cuIcon: 'upstagefill',
						color: 'cyan',
						badge: 0,
						name: '认购登记',
						link: '/pages/offer/index'
					},
					{
						cuIcon: 'clothesfill',
						color: 'blue',
						badge: 0,
						name: '签约登记',
						link: '/pages/sign/index'
					}
				],
			};
		},
		onShow() {
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
