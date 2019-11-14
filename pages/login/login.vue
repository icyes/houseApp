<template>
	<view v-if="isLoad" class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header" style="width: 170px;height: 170px;background-color:unset"><image :src="logoImage" style="width: 100%;height: 100%;"></image></view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="name" type="text" maxlength="11" placeholder="用户名"></wInput>
				<wInput v-model="password" type="password" maxlength="11" placeholder="密码" isShowPass></wInput>
			</view>
			<wButton
				:bgColor="canlogin ? 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.6))' : '#999'"
				text="登 录"
				:rotate="isRotate"
				@click.native="submit()"
			></wButton>
		</view>
	</view>
</template>
<style>
@import url('../../components/watch-login/css/icon.css');
@import url('./css/main.css');
</style>
<script>
import login from '@/api/login.js';
import util from '@/utils/index.js';
import storage from '@/utils/storage.js';

import loginImage from '@/static/logo.png';
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button
export default {
	data() {
		return {
			isRotate: false, //是否加载旋转
			//logo图片 base64
			logoImage: loginImage,
			name: null,
			password: null,
			isLoad: false
		};
	},
	components: {
		wInput,
		wButton
	},
	onLoad() {
		if (storage.getToken()) this.goHome();
		else this.isLoad = true;
	},
	computed: {
		canlogin() {
			return this.name && this.password;
		}
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
			util.showLoading()
			let { name, password } = this;
			if (!this.check()) return;
			let data = {
				name,
				password,
				loginClient: 2
			};
			login.login(data).then(res => {
				util.hideLoading()
				let { token } = res;
				storage.setToken(token);
				this.goHome();
			});
		},
		goHome() {
			util.redirectTo('/pages/index/index');
		}
	}
};
</script>

<style>
page {
	/* background: #fff; */
}
.login {
	width: 90%;
	min-height: 50%;
	margin: 20rpx !important;
}

.ani-show {
	animation: show 1s ease-out;
}

.buttonBorder text{
	font-size: 18px;
}

.main-list {
	height: 40px !important;
	background: rgba(255,255,255,0.8);
}

</style>
