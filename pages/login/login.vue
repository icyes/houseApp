<template>
	<view v-if="isLoad" class="flex-sub flex flex-direction">
		<cu-custom bgColor="bg-gradual-blue"><block slot="content">登陆</block></cu-custom>
		<view class="cu-card case flex-sub flex align-center">
			<view class="login cu-item radius shadow-warp bg-white margin-top flex-sub">
				<view class="flex  p-xs margin-bottom-sm mb-sm align-center solid-bottom ani-show">
					<view class="flex-sub  padding-sm margin-xs radius">用户名</view>
					<input class="flex-treble margin-xs radius" v-model="name" placeholder="用户名" />
				</view>
				<view class="flex  p-xs margin-bottom-sm mb-sm align-center solid-bottom ani-show">
					<view class="flex-sub  padding-sm margin-xs radius">密码</view>
					<input class="flex-treble margin-xs radius" v-model="password" type="password" placeholder="密码" />
				</view>
				<view class="padding flex flex-direction ani-show"><button class="cu-btn bg-grey lg" @click="submit">登陆</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import login from '@/api/login.js';
import util from '@/utils/index.js';
import storage from '@/utils/storage.js';
export default {
	data() {
		return {
			name: null,
			password: null,
			isLoad:false
		};
	},
	onLoad() {
		if (storage.getToken()) this.goHome();
		else this.isLoad = true;
	},
	methods: {
		check() {
			let { name, password } = this;
			let pret = '请填写';
			let result = true;
			if (!name) {
				util.toast(pret + '用户名');
				result = false;
			} else if (!password) {
				util.toast(pret + '密码');
				result = false;
			}
			return result;
		},
		/**
		 * loginClient 1 网页 2 小程序 3 全部
		 */
		submit() {
			let { name, password } = this;
			if (!this.check()) return;
			let data = {
				name,
				password,
				loginClient: 2
			};
			login.login(data).then(res => {
				let { token } = res;
				storage.setToken(token);
				this.goHome();
			});
		},
		goHome() {
			util.navigateTo('/pages/index/index');
		}
	}
};
</script>

<style>
.login {
	padding: 40rpx 20rpx;
	min-height: 98%;
	margin: 20rpx !important;
}

.ani-show {
	animation: show 1s ease-out;
}
</style>
