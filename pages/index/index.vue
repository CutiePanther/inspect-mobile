<template>
	<view class="home">
		<u-image :src="bannerSrc" mode="widthFix" :lazy-load="true"></u-image>
		<view class="login-btn" @tap="link2login" v-if="!userType">
			<u-icon name="user" custom-prefix="custom-icon" class="login-icon"></u-icon>登录
		</view>
		<view class="login-btn" @tap="logout" v-if="userType">
			<u-icon name="user" custom-prefix="custom-icon" class="login-icon"></u-icon>登出
		</view>
		<view class="content">
			<view class="banner">
				<view class="shop-header">
					<view class="top-info">
						<view class="top-title">{{shop.m_SignName}}</view>
						<view class="top-address">
							<u-icon name="w-location" custom-prefix="custom-icon" size="36" color="#3296FA"></u-icon>
							<view>{{shop.address}}</view>
						</view>
					</view>
					<vue-qr :text="shop.qrCode" class="logo" :colorDark="codeColor" colorLight="#fff" :logoSrc="logoSrc"
						:margin="0"></vue-qr>
				</view>
				<scroll-view scroll-x class="image-list">
					<image :src="item" mode="widthFix" v-for="(item,index) in shop.paths" :key="index" :lazy-load="true"
						@click="imgListPreview(item)" class="scroll-view-item"></image>
				</scroll-view>
			</view>
			<view class="home-body">
				<u-cell-group title="商家信息" :border="false" :title-style="titleStyle">
					<u-cell-item title="经营范围" hover-class="none" :arrow="false">
						<u-icon slot="icon" name="briefcase" custom-prefix="custom-icon"></u-icon>
						<view slot="right-icon" class="tag-wrapper">
							<!-- <u-tag v-for="(item,index) in shop.MType" :key="index" :text="item" mode="plain" type="info" class="type-tag" /> -->
							<u-tag :text="shop.m_Type" mode="plain" type="info" class="type-tag" />
						</view>
					</u-cell-item>
					<u-cell-item title="营业执照" :v-if="shop.bussinessLicense === 1" value="有" hover-class="none" :arrow="false"
						:border-bottom="false">
						<u-icon slot="icon" name="licenseicon" custom-prefix="custom-icon"></u-icon>
					</u-cell-item>
					<u-cell-item title="营业执照名称" :title-style="noIconTitleStyle" :value="shop.blName" hover-class="none"
						:arrow="false" :border-bottom="false"></u-cell-item>
					<u-cell-item title="统一社会信用代码" :title-style="noIconTitleStyle" :value="shop.blCode"
						hover-class="none" :arrow="false"></u-cell-item>
					<u-cell-item title="经营者姓名" :value="shop.operatorsName" hover-class="none" :arrow="false">
						<u-icon slot="icon" name="user" custom-prefix="custom-icon"></u-icon>
					</u-cell-item>
					<u-cell-item title="联系电话" :value="shop.phone" hover-class="none" :arrow="false">
						<u-icon slot="icon" name="Phone" custom-prefix="custom-icon"></u-icon>
					</u-cell-item>
					<u-cell-item title="经营场所面积" :value="shop.area" hover-class="none" :arrow="false"
						:border-bottom="false">
						<u-icon slot="icon" name="mianji" custom-prefix="custom-icon"></u-icon>
					</u-cell-item>
				</u-cell-group>
			</view>
			<view v-if="!userType" class="home-footer">
				<comment />
			</view>
			<view class="operate-wrapper">
				<u-button v-if="userType!==0" size="medium" type="primary" plain @tap="link2record">巡查记录</u-button>
				<u-button v-if="userType===1" size="medium" type="primary" plain @tap="link2modify">编辑商铺</u-button>
				<u-button v-if="userType===2" size="medium" type="primary" plain @tap="link2patrol">巡查上报</u-button>
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
				noIconTitleStyle: {
					'padding-left': '40rpx'
				},
				userType: '',
				codeColor: '', // 二维码颜色 'range'
				shop: {
					m_SignName: '', // 商户名称
					m_Type: '', // 服务类型
					address: '', // 商户地址
					bussinessLicense: 1, //营业执照 1有2无3过期
					inspectionScore: 99,
					paths: ['/static/license.jpg', '/static/license.jpg', '/static/shop.jpg', '/static/license.jpg',
						'/static/shop.jpg', '/static/license.jpg', '/static/shop.jpg'
					], // 营业执照照片
					blName: '', // 营业执照名称
					blCode: '', // 社会信用代码
					operatorsName: '', // 经营者姓名
					phone: '', // 联系电话
					area: '', // 经营场所面积
					qrCode: 'http://123.153.1.134:4399/h5/#/', // 二维码
					status: 0 // 0正常营业
				}
			}
		},
		async onShow() {
			let typeMap = {}
			let areaMap = {}
			let scoreRange = ''
			if (uni.getStorageSync('scoreRange')) {
				typeMap = uni.getStorageSync('typeMap')
				areaMap = uni.getStorageSync('areaMap')
				scoreRange = uni.getStorageSync('scoreRange')
			} else {
				const dic = await this.$u.api.getDirectory()
				typeMap = dic['02']
				areaMap = dic['03']
				scoreRange = dic['04']['0401']
				uni.setStorageSync('typeMap', typeMap)
				uni.setStorageSync('areaMap', areaMap)
				uni.setStorageSync('scoreRange', scoreRange)
			}
			let pages = getCurrentPages()
			let currentPage = pages[pages.length - 1]
			const { id } = currentPage.options
			this.userType = uni.getStorageSync('userType') // 判断登录状态
			console.log('userType', this.userType)
			if (id) {
				let shop = await this.$u.api.getShopInfo(id)
				uni.setStorageSync('id', id) // 存储商户id
				this.id = id
				this.codeColor = this.computeSocre(shop.inspectionScore, scoreRange)
				if (shop.paths.length) {
					// shop.paths = shop.paths.map(v => `${location.origin}/pic/getImageByte/${v}`)
					shop.paths = shop.paths.map(v => `http://123.153.1.134:4399/pic/getImageByte/${v}`)
				}
				this.shop = {
					...this.shop,
					qrCode: `http://123.153.1.134:4399/h5/#/?id=${id}`,
					...shop,
					m_Type: typeMap[shop.m_Type],
					area: areaMap[shop.area]
				}
			}
		},
		methods: {
			computeSocre(socre, range) {
				if (range.length) {
					let [zore, low, mid, height] = range.split('-')
					if (socre < low) {
						return 'red'
					} else if (socre >= low && socre < mid) {
						return 'yellow'
					} else {
						return 'green'
					}
				}
			},
			imgListPreview(item) {
				uni.previewImage({
					indicator: 'number',
					loop: 'true',
					urls: this.shop.paths,
					current: item
				})
			},
			link2login(e) {
				console.log(e)
				this.$u.route('pages/login/index')
			},
			logout(e) {
				console.log(e)
				this.$u.api.logout().then(res => {
					console.log(res)
					uni.removeStorageSync('userType') // 清除用户登录状态
					this.$u.route({
						url: '/',
						type: 'reLaunch',
						params: {
							id: this.id
						}
					})
				})
			},
			link2record(e) {
				this.$u.route('pages/record/index')
			},
			link2modify(e) {
				this.$u.route('pages/shop/modify')
			},
			link2patrol(e) {
				this.$u.route('pages/patrol/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-btn {
		position: absolute;
		top: 24rpx;
		right: 16rpx;
		width: 116rpx;
		height: 44rpx;
		background: #FFFFFF;
		opacity: 0.9;
		border-radius: 20rpx;
		line-height: 44rpx;
		font-size: 24rpx;
		color: #3296FA;
		text-align: center;

		.login-icon {
			margin-right: 4rpx;
		}
	}

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
					align-items: flex-start;
					justify-content: flex-start;
					margin-top: 32rpx;
					font-size: 28rpx;
					color: #303133;

					.u-icon {
						margin-right: 6rpx;
					}
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
					display: inline-block;
					width: 190rpx;
					height: 136rpx;
					margin-right: 12rpx;
				}
			}
		}

		.home-body {
			::v-deep .u-icon {
				margin-right: 10rpx;
				font-size: 32rpx;
				color: #3296FA;
			}
		}

		.operate-wrapper {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin: 48rpx 0;
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
