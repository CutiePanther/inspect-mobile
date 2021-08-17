<template>
	<view class="content">
		<view class="banner">
			<view class="shop-header">
				<view class="top-info">
					<view class="top-title">{{shop.mSignName}}</view>
					<view class="top-address">
						<u-icon name="map" color="#2d8cf0" size="36"></u-icon>
						<view>{{shop.address}}</view>
					</view>
				</view>
				<vue-qr :text="shop.qrCode" class="logo" colorDark="green" colorLight="#fff" :logoSrc="logoSrc"
					:margin="0"></vue-qr>
			</view>
			<view class="image-list">
				<view v-for="(item,index) in shop.blPath" :key="index">
					<u-image :src="item" mode="widthFix" :lazy-load="true"></u-image>
				</view>
			</view>
		</view>
		<view class="home-body">
			<view class="sub-title">商家信息</view>
			<u-cell-group title="设置喜好">
				<u-cell-item icon="setting-fill" title="个人设置"></u-cell-item>
				<u-cell-item icon="integral-fill" title="会员等级" value="新版本"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="home-footer">
			评论信息
		</view>
	</view>
</template>

<script>
	import vueQr from 'vue-qr'
	export default {
		components: {
			vueQr
		},
		data() {
			return {
				logoSrc: require('../../static/logo.png'),
				shop: {
					mSignName: '朱小贝的小吃店', // 商户名称
					mType: '', // 服务类型
					address: '浙江省杭州市余杭区良渚街道金家渡中苑35-1', // 商户地址
					bussinessLicense: 1, //营业执照 1有2无3过期
					blPath: ['/static/logo.png', '/static/logo.png', '/static/logo.png', '/static/logo.png'], // 营业执照照片
					blName: '', // 营业执照名称
					blCode: '', // 社会信用代码
					operators_name: '', // 经营者姓名
					phone: '', // 联系电话
					area: '', // 经营场所面积
					qrCode: 'http://strawburry.top', // 二维码
					status: 0 // 0正常营业
				}
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.banner {
			width: 92%;
			margin: 120rpx 12rpx 12rpx;
			padding: 32rpx;
			background: #fff;
			border-radius: 12rpx;
			.shop-header {
				display: flex;
				justify-content: space-between;

				.top-title {
					font-size: 32rpx;
					color: #000;
					font-weight: bold;
				}

				.top-address {
					display: flex;
					align-items: end;
					justify-content: flex-start;
					margin-top: 32rpx;
					font-size: 24rpx;
					color: #303133
				}

				.logo {
					height: 180rpx;
					width: 180rpx;
				}
			}
			.image-list {
				display: flex;
				justify-content: flex-start;
				image {
					width: 200rpx;
				}
			}
		}

	}
</style>
