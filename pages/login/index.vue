<template>
	<view class="wrap">
		<view class="content">
			<image class="logo" src="../../static/img/logo.png" mode="widthFix"></image>
			<u-input class="login-item" type="number" v-model="username" placeholder="请输入手机号" height="100" :focus="true">
				<u-icon name="user" custom-prefix="custom-icon" class="login-icon"></u-icon>
			</u-input>
			<u-input class="login-item" type="password" v-model="password" placeholder="请输入密码" :password-icon="true" height="100">
				<u-icon name="password" custom-prefix="custom-icon" class="login-icon"></u-icon>
			</u-input>
			<button @tap="submit" class="login-btn">登 录</button>
		</view>
		<view class="buttom">
			<view class="hint">
				孝城码信息管理系统
			</view>
		</view>
	</view>
</template>

<script>
const CryptoJS = require('crypto-js')
export default {
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		async submit() {
			if(!this.$u.test.mobile(this.username)) {
				this.$u.toast('手机号填写错误')
				return false
			}
			const keyStr = await this.$u.api.getPublicKey(this.username)
			const key = CryptoJS.enc.Utf8.parse(keyStr);
			const iv = '0123456789ABCDEF'
			const encryptedData = CryptoJS.AES.encrypt(this.password, key, {
				iv: CryptoJS.enc.Utf8.parse(iv),
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7
			})
			const encryptedStr = encryptedData.toString();
			console.log(encryptedStr)
			this.$u.api.login({'username': this.username, 'password': encryptedStr}).then(res => {
				if(res) {
					const id = uni.getStorageSync('id')
					uni.setStorageSync('userType', res.userType)
					uni.setStorageSync('userInfo', res)
					this.$u.route('/', {id})
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
uni-page-body {
	height: 100%;
}
.wrap {
	height: 100%;
	padding: 110rpx 90rpx 60rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 28rpx;
	background: url(../../static/img/login.png);
	background-size: cover;
	.content{
		.logo {
			display: block;
			width: 266rpx;
			margin: 0 auto 60rpx;
		}
		.login-item {
			height: 100rpx;
			background: #FFF;
			opacity: 0.8;
			border-radius: 16rpx;
			margin-bottom: 32rpx;
			.login-icon {
				color: #3296FA;
				font-size: 32rpx;
				padding: 0 16rpx 0 32rpx;
			}
			::v-deep .u-input__right-icon {
				margin-right: 24rpx;
			}
		}
		
		.login-btn {
			background-color: #0080FF;
			color: #FFF;
			border: none;
			font-size: 34rpx;
			padding: 6rpx 0;
			border-radius: 16rpx;
			width: 100%;
			&::after {
				border: none;
			}
		}
	}
	
	.buttom {
		.hint {
			text-align: center;
			font-size: 24rpx;
			color: #FFF;
			opacity: 0.6;
		}
	}
}
</style>
