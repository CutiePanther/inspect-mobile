<template>
	<view class="content">
		<view class="patrol-time">
			<text>{{detail.time}} 巡查记录</text>
		</view>
		<u-table class="patrol-table" border-color="#EDEDED" padding="14rpx 0" color="#2F2F2F">
			<u-tr>
				<u-th width="40%">检查项</u-th>
				<u-th>合格</u-th>
				<u-th>不合格</u-th>
			</u-tr>
			<u-tr>
				<u-td width="40%">五包</u-td>
				<u-td>4项</u-td>
				<u-td>1项</u-td>
			</u-tr>
			<u-tr>
				<u-td width="40%">十不准</u-td>
				<u-td>10项</u-td>
				<u-td>0项</u-td>
			</u-tr>
			<u-tr>
				<u-td width="40%">餐饮单位附加要求</u-td>
				<u-td>5项</u-td>
				<u-td>1项</u-td>
			</u-tr>
		</u-table>
		<u-collapse :accordion="false" class="patrol-item">
			<u-collapse-item :title="item.head" :open="item.open" align="center" v-for="(item,index) in detail.itemList" :key="item.head">
				<view class="item-wrap" v-for="info in item.info" :key="info.title">
					<view class="item-info">
						<view class="item-title">
							{{ info.title }}
						</view>
						<view class="item-desc">
							{{ info.desc }}
						</view>
						<u-radio-group v-model="info.result" @change="radioGroupChange">
							<u-radio name="pass" :disabled="isView">合格</u-radio>
							<u-radio name="deny" :disabled="isView">不合格</u-radio>
						</u-radio-group>
					</view>
					<view v-if="info.result === 'deny'">
						<image :src="info.pic" mode="aspectFit" @tap="imgListPreview(info.pic)"></image>
					</view>
				</view>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isView: false, //查看为true
				detail: {
					time: '2021-08-16',
					result: '扣分0，无不合格项。',
					person: '朱小贝',
					itemList: [{
						head: '五包',
						info: [
							{
								title: '包垃圾分类',
								desc: '做好垃圾分类，定时定点规范投放。',
								result: 'deny',
								pic: '/static/license.jpg'
							}
						],
						open: true
					},
					{
						head: '五包2',
						info: [
							{
								title: '包垃圾分类2',
								desc: '做好垃圾分类，定时定点规范投放。',
								result: 'pass',
								pic: '/static/license.jpg'
							}
						],
						open: false
					},
					]
				}
			}
		},
		onLoad() {

		},
		methods: {
			radioGroupChange(e) {
				console.log(e)
				console.log(typeof(e))
			},
			imgListPreview(item) {
				uni.previewImage({
					indicator: 'number',
					loop: 'false',
					urls: [item],
					current: item
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 24rpx;
		.patrol-time {
			color: #2f2f2f;
			font-size: 32rpx;
			font-weight: bold;
			padding: 16rpx 0 12rpx;
		}
		.patrol-table {
			margin-bottom: 16rpx;
			.u-th {
				background-color: #3296FA;
				color: #FFF;
			}
		}
		.patrol-item {
			.u-collapse-item {
				background-color: #FFF;
				padding: 32rpx;
				margin-bottom: 16rpx;
				border-radius: 12rpx;
				::v-deep .u-collapse-head {
					padding: 8rpx 0;
				}
				::v-deep .u-collapse-title {
					padding-left: 64rpx;
				}
			}
			.item-wrap {
				display: flex;
				justify-content: space-between;
				color: #2F2F2F;
				.item-title {
					font-size: 32rpx;
					padding: 8rpx 0;
				}
				.item-desc {
					font-size: 24rpx;
					margin-bottom: 32rpx;
				}
				image {
					width: 220rpx;
					height: 180rpx;
				}
			}
		}
	}
</style>
