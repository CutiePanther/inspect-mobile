<template>
	<view class="wrap">
		<view class="content">
			<image class="logo" src="../../static/img/logo.png" mode="widthFix"></image>
			<u-input class="login-item" type="number" v-model="userName" placeholder="请输入手机号" height="100" :focus="true">
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
export default {
	data() {
		return {
			userName: '',
			password: ''
		}
	},

	methods: {
		submit() {
			if(!this.$u.test.mobile(this.userName)) {
				this.$u.toast('手机号填写错误')
				return false
			}
			this.$u.api.login({'userName': this.userName, 'password': this.password}).then(res => {
				console.log(res)
				const id = uni.getStorageSync('id')
				uni.setStorageSync('userType', res.userType)
				this.$u.route({url:'/', type: 'reLaunch',params: {id}})
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
	background-size: cover;
	background: url(../../static/img/login.png);
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
