<template>
	<view class="content">
		<u-cell-group class="record-wrap">
			<u-cell-item v-for="(item, index) in recordList" :key="index" :title="item.createTime" :label="item.info" class="u-m-b-20" bg-color="#fff" @tap="link2detail(item)">
				<view slot="icon" class="circle"></view>
				<view slot="right-icon" class="person">
					<u-icon name="server-man" color="#2979ff" size="28"></u-icon>执法队员：{{item.userId}}
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
				recordList: []
			}
		},
		onLoad() {
			this.getRecordList()
		},
		methods: {
			async getRecordList () {
				let params = {}
				let res = await this.$u.api.getRecordList()
				this.recordList = res.pageData
				console.log(this.recordList)
			},
			link2detail(item) {
				console.log(item)
				this.$u.route('/pages/patrol/detail', item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 24rpx;
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
