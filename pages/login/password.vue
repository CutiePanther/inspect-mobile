<template>
	<view class="wrap">
		<view class="content">
			<image class="logo" src="../../static/img/logo.png" mode="widthFix"></image>
			<u-input class="login-item" type="password" v-model="newPassword" placeholder="请输入新密码" :password-icon="true" height="100">
				<u-icon name="password" custom-prefix="custom-icon" class="login-icon"></u-icon>
			</u-input>
			<u-input class="login-item" type="password" v-model="confirmPassword" placeholder="请确认密码" :password-icon="true" height="100">
				<u-icon name="password" custom-prefix="custom-icon" class="login-icon"></u-icon>
			</u-input>
			<button @tap="submit" class="login-btn">提 交</button>
		</view>
		<view class="buttom">
			<view class="hint">
				孝城码信息管理系统
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			oldPassword: '123456',
			newPassword: '',
			confirmPassword: ''
		}
	},
	onShow() {
		let pages = getCurrentPages()
		let currentPage = pages[pages.length - 1]
		const { user } = currentPage.options
		this.username = user
	},
	methods: {
		submit() {
			if(this.newPassword !== this.confirmPassword) {
				this.$u.toast('两次输入不一致')
				return false
			}
			this.$u.api.settingPassword({'userName': this.username, 'password': this.oldPassword, 'newPassword': this.newPassword}).then(res => {
				console.log(res)
				// 重新登录
				this.$u.toast('修改成功，请重新登录')
				setTimeout(() => this.$u.route('pages/login/index'), 2000)
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
