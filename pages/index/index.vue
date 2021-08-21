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
				<u-image :src="item" mode="widthFix" v-for="(item,index) in shop.blPath" :key="index" :lazy-load="true"
					@click="imgListPreview(item)"></u-image>
			</view>
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
				logoSrc: require('../../static/logo.png'),
				titleStyle: {
					'font-size': '30rpx',
					'font-weight': 'bold',
					'color': '#000'
				},
				subTitleStyle: {
					'width': '240rpx'
				},
				iconStyle: {
					'color': '#2B85E4'
				},
				noIconTitleStyle: {
					'padding-left': '40rpx'
				},
				shop: {
					mSignName: '朱小贝的小吃店', // 商户名称
					mType: ['水果店', '餐饮服务'], // 服务类型
					address: '浙江省杭州市余杭区良渚街道金家渡中苑35-1', // 商户地址
					bussinessLicense: 1, //营业执照 1有2无3过期
					blPath: ['/static/license.jpg', '/static/license.jpg', '/static/shop.jpg'], // 营业执照照片
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
		onLoad() {

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
		padding: 0 18rpx;
		color: #030133;

		.banner {
			margin: 180rpx 0 18rpx;
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
				justify-content: space-between;
				margin-top: 24rpx;
				gap: 24rpx;
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
				align-items: end;
				color: #030133;
			}

			.tag-wrapper {
				text-align: right;

				.type-tag {
					margin: 0 0 8rpx 8rpx;
					color: #303133;
				}
			}

		}

		.sub-title {
			font-size: 30rpx;
			color: #000;
			font-weight: bold;
		}

	}
</style>
