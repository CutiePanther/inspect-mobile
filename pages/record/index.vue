<template>
	<view class="content">
		<u-cell-group class="record-wrap">
			<u-cell-item v-for="(item, index) in recordList" :key="index" :title="item.createTime" :label="item.info" class="u-m-b-20" bg-color="#fff" @tap="link2detail(item)">
				<view slot="icon" class="circle"></view>
				<view slot="right-icon" class="person">
					<u-icon name="server-man" color="#2979ff" size="28"></u-icon>执法队员：{{item.name}}
				</view>
			</u-cell-item>
			<view class="empty" v-show="recordList.length === 0">
				<image class="empty-image" src="../../static/empty.png" mode="widthFix"></image>
				<text class="empty-title">无巡查记录</text>
			</view>
		</u-cell-group>
		<u-icon class="add-btn" name="add" custom-prefix="custom-icon" size="90" color="#3296FA" @tap="link2add"></u-icon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordList: []
			}
		},
		onShow() {
			this.getRecordList()
		},
		methods: {
			async getRecordList () {
				let res = await this.$u.api.getRecordList()
				this.recordList = res.pageData
			},
			link2detail(item) {
				console.log(item)
				this.$u.route('/pages/patrol/detail', {id: item.id})
			},
			link2add() {
				console.log('add')
				this.$u.route('/pages/patrol/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}
	.content {
		height: 100%;
		padding: 24rpx;
		.record-wrap {
			height: 100%;
		}
		.record-wrap ::v-deep .u-cell-item-box {
			background-color: #EDEDED;
			max-height: calc(100% - 96rpx);
			overflow: scroll;
		}
		.u-cell {
			align-items: start;
			border-radius: 12rpx;
			padding: 24rpx 32rpx;
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
			width: 100%;
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
		.add-btn {
			position: fixed;
			bottom: 24rpx;
			right: 24rpx;
		}
	}
</style>
