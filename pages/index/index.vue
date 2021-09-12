<template>
	<view class="home">
		<u-image :src="bannerSrc" mode="widthFix" :lazy-load="true"></u-image>
		<view class="content">
		<view class="banner">
			<view class="shop-header">
				<view class="top-info">
					<view class="top-title">{{shop.mSignName}}</view>
					<view class="top-address">
						<u-icon name="w-location" custom-prefix="custom-icon" color="#2d8cf0" size="36"></u-icon>
						<view>{{shop.address}}</view>
					</view>
				</view>
				<vue-qr :text="shop.qrCode" class="logo" colorDark="green" colorLight="#fff" :logoSrc="logoSrc"
					:margin="0"></vue-qr>
			</view>
			<scroll-view scroll-x class="image-list">
				<image :src="item" mode="widthFix" v-for="(item,index) in shop.blPath" :key="index" :lazy-load="true"
					@click="imgListPreview(item)" class="scroll-view-item"></image>
			</scroll-view>
		</view>
		<view class="home-body">
			<u-cell-group title="商家信息" :border="false" :title-style="titleStyle">
				<u-cell-item icon="bag" title="经营范围" hover-class="none" :arrow="false" :icon-style="iconStyle" :title-style="subTitleStyle">
					<view slot="right-icon" class="tag-wrapper">
						<u-tag v-for="(item,index) in shop.mType" :key="index" :text="item" mode="plain" type="info"
							class="type-tag" />
					</view>
				</u-cell-item>
				<u-cell-item icon="photo" title="营业执照" :value="shop.bussinessLicense" hover-class="none" :arrow="false"
					:icon-style="iconStyle"></u-cell-item>
				<u-cell-item title="营业执照名称" :title-style="noIconTitleStyle" :value="shop.blName" hover-class="none" :arrow="false"></u-cell-item>
				<u-cell-item title="统一社会信用代码" :title-style="noIconTitleStyle" :value="shop.blCode" hover-class="none" :arrow="false"></u-cell-item>
				<u-cell-item icon="photo" title="经营场所面积" :value="shop.area" hover-class="none" :arrow="false"
					:border-bottom="false" :icon-style="iconStyle"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="home-footer">
			<comment />
		</view>
	</view>
	</view>
</template>
<script>
	import vueQr from 'vue-qr'
	import comment from '../comment/reply.vue'
	export default {
		components: {
			vueQr,
			comment
		},
		data() {
			return {
				logoSrc: require('../../static/img/logo.png'),
				bannerSrc: require('../../static/img/banner.png'),
				titleStyle: {
					'font-size': '30rpx',
					'font-weight': 'bold',
					'color': '#2F2F2F'
				},
				subTitleStyle: {
					'width': '240rpx'
				},
				iconStyle: {
					'color': '#3296FA'
				},
				noIconTitleStyle: {
					'padding-left': '40rpx'
				},
				shop: {
					mSignName: '朱小贝的小吃店', // 商户名称
					mType: ['水果店', '餐饮服务'], // 服务类型
					address: '浙江省杭州市余杭区良渚街道金家渡中苑35-1', // 商户地址
					bussinessLicense: 1, //营业执照 1有2无3过期
					blPath: ['/static/license.jpg', '/static/license.jpg', '/static/shop.jpg', '/static/license.jpg', '/static/shop.jpg', '/static/license.jpg', '/static/shop.jpg'], // 营业执照照片
					blName: '', // 营业执照名称
					blCode: '', // 社会信用代码
					operators_name: '', // 经营者姓名
					phone: '', // 联系电话
					area: '25平米', // 经营场所面积
					qrCode: 'http://strawburry.top', // 二维码
					status: 0 // 0正常营业
				}
			}
		},
		onLoad(option) {
			const { id } = option
			if (id) {
				this.$u.api.getShopInfo(option.id).then(res => {
					console.log(res)
				})
			}
		},
		methods: {
			imgListPreview(item) {
				uni.previewImage({
					indicator: 'number',
					loop: 'true',
					urls: this.shop.blPath,
					current: item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-top: -160rpx;
		padding: 0 16rpx;
		background-color: #3296FA;
		.banner {
			margin-bottom: 24rpx;
			padding: 32rpx;
			background: #fff;
			border-radius: 12rpx;
			z-index: 99;
			.shop-header {
				display: flex;
				justify-content: space-between;
				gap: 40rpx;
				.top-title {
					font-size: 40rpx;
					color: #000;
					font-weight: bold;
				}

				.top-address {
					display: flex;
					align-items: flex-end;
					justify-content: flex-start;
					margin-top: 32rpx;
					font-size: 28rpx;
					color: #303133
				}

				.logo {
					height: 180rpx;
					width: 180rpx;
				}
			}

			.image-list {
				// display: flex;
				// justify-content: space-between;
				// gap: 8rpx;
				margin-top: 20rpx;
				width: 100%;
				white-space: nowrap;
				width: 654rpx;
				overflow: hidden;
				image {
					display:inline-block;
					width: 190rpx;
					height: 136rpx;
					margin-right: 8rpx;
				}
			}
		}

		.home-body,
		.home-footer {
			width: 100%;
			background: #fff;
			border-radius: 12rpx;
			margin-bottom: 24rpx;

			.u-cell {
				padding: 20rpx 32rpx;
				align-items: flex-end;
				color: #2F2F2F;
			}

			.tag-wrapper {
				text-align: right;

				.type-tag {
					margin: 0 0 12rpx 8rpx;
					color: #2F2F2F;
					border: 2rpx solid #D5D5D5;
				}
			}

		}

		.sub-title {
			font-size: 30rpx;
			color: #2F2F2F;
			font-weight: bold;
		}

	}
</style>
