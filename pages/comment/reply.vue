<template>
	<view class="wrap">
		<view class="comment-header">
			<view class="comment-title">店铺评价</view>
			<view class="add-comment" @tap="link2addComment">
				<u-icon name="plus" class="login-icon"></u-icon>添加评论
			</view>
		</view>
		<view class="empty" v-show="commentList.length === 0">
			<image class="empty-image" src="../../static/comment.png" mode="widthFix"></image>
			<text class="empty-title">暂无评论</text>
		</view>
		<view class="comment-body" v-for="(comment, index) in commentList">
			<view class="comment-info">
				<view class="avator">
					<image :src="avator" mode=""></image>
				</view>
				<view class="right-info">
					<view class="user-info">
						<view class="name">{{ comment.name }}</view>
						<view class="date">06-25 13:58</view>
					</view>
					<view class="rate">
						<span class="shop-rate">商铺评价</span>
						<u-rate v-model="comment.shopFraction" :count="5" :disabled="true" size="13" :colors="colors" gutter="2"></u-rate>
						<span class="service-rate">服务态度</span>
						<u-rate v-model="comment.serverFraction" :count="5" :disabled="true" size="13" :colors="colors" gutter="2"></u-rate>

					</view>
				</view>
			</view>
			<view class="content">{{ comment.evaluation }}</view>
			<scroll-view scroll-x class="image-list">
				<image :src="item" mode="widthFix" v-for="(item, index) in comment.evaPaths" :key="index" :lazy-load="true"
					@click="imgListPreview(item)" class="scroll-view-item"></image>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentList: {
				default: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				avator: require('../../static/img/avator.png'),
				colors: ['#ffc454', '#ffb409', '#ff9500']
			}
		},
		methods: {
			link2addComment() {
				this.$u.route('/pages/comment/add')
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f2f2;
	}

	.wrap {
		padding: 32rpx;

		.comment-header {
			display: flex;
			justify-content: space-between;
			padding-bottom: 32rpx;

			.comment-title {
				font-size: 15px;
				font-weight: bold;
				color: #2F2F2F;
			}

			.add-comment {
				padding: 8rpx;
				background: #3296FA;
				opacity: 0.8;
				border-radius: 20rpx;
				font-size: 24rpx;
				color: #FFFFFF;
				text-align: center;
			}

		}

		.empty-image {
			width: 50%;
			display: block;
			margin: 0 auto;
		}

		.empty-title {
			display: block;
			width: 100%;
			margin: -80rpx 0 24rpx;
			font-size: 36rpx;
			color: #c0c4cc;
			text-align: center;
		}

		.comment-body {
			padding: 32rpx 0;
			font-size: 32rpx;
			background-color: #ffffff;
			&:not(:last-of-type) {
				border-bottom: solid 2rpx $u-border-color;
			}	

			.comment-info {
				display: flex;
				justify-content: space-between;
				margin-bottom: 24rpx;

				.avator {
					image {
						width: 64rpx;
						height: 64rpx;
					}
				}

				.right-info {
					flex: 1;
					margin-left: 10rpx;

					.user-info {
						display: flex;
						justify-content: space-between;

						.name {
							color: #2F2F2F;
							font-size: 28rpx;
							margin-bottom: 4rpx;
						}

						.date {
							font-size: 20rpx;
							color: $u-light-color;
						}
					}

					.rate {
						font-size: 24rpx;
						color: #777;

						.shop-rate {
							margin-right: 8rpx;
						}

						.service-rate {
							margin: 0 8rpx 0 16rpx;
						}
					}

				}
			}

			.content {
				color: #2F2F2F;
				font-size: 24rpx;
			}

			.image-list {
				margin-top: 20rpx;
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
	}
</style>
