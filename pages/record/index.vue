<template>
	<view class="content">
		<u-cell-group class="record-wrap">
			<u-cell-item v-for="(item, index) in recordList" :title="item.title" :label="item.result" class="u-m-b-20" bg-color="#fff">
				<view slot="icon" class="circle"></view>
				<view slot="right-icon" class="person">
					<u-icon name="server-man" color="#2979ff" size="28"></u-icon>执法队员：{{item.person}}
				</view>
			</u-cell-item>
			<view class="empty" v-if="recordList.length === 0">
				<!-- <image class="empty-image" src="../../static/empty.png" mode="widthFix"></image> -->
				<image class="empty-image" src="../../static/shop.jpg" mode="widthFix"></image>
				<text class="empty-title">无巡查记录</text>
			</view>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordList: [
					{
						title: '2021-08-22',
						result: '扣分0，无不合格项',
						person: '朱小贝'
					},
					{
						title: '2021-08-22',
						result: '扣分0，无不合格项',
						person: '朱小贝'
					},
					{
						title: '2021-08-22',
						result: '扣分0，无不合格项',
						person: '朱小贝'
					}
				]
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
		padding: 0 24rpx;
		.record-wrap ::v-deep .u-cell-item-box {
			background-color: #f3f3f3;
		}
		.u-cell {
			align-items: start;
			border-radius: 12rpx;
		}
		.circle {
			width: 20rpx;
			height: 20rpx;
			margin:  20rpx 20rpx 0 0;
			border: 2rpx solid $u-type-primary;
			border-radius: 50%;
		}
		.person {
			padding: 12rpx;
			margin: 48rpx -30rpx 0 0;
			border-radius: 32rpx;
			border: 2rpx solid $u-type-primary;
		}
		.empty-image {
			margin: 0 auto;
		}
		.empty-title {
			display: block;
			width: 100%;
			margin-top: -120rpx;
			font-size: 36rpx;
			color: #c0c4cc;
			text-align: center;
		}
	}
</style>
