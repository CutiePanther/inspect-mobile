<template>
	<view class="wrap">
		<view class="comment" v-for="(comment, index) in commentList">
			<view class="top">
				<view class="left">
					<view class="heart-photo">
						<image :src="avator" mode=""></image>
					</view>
					<view class="user-info">
						<view class="name">{{ comment.name }}</view>
						<view class="date">06-25 13:58</view>
					</view>
				</view>
			</view>
			<view class="content">{{ comment.evaluation }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentList: {
				default: Array,
				default() {
					return []
				}
			},
		},
		data() {
			return {
				avator: require('../../static/img/avator.png'),
			}
		},
		onLoad() {},
		methods: {}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f2f2;
	}

	.comment {
		padding: 30rpx;
		font-size: 32rpx;
		background-color: #ffffff;

		.top {
			display: flex;
			justify-content: space-between;
		}

		.left {
			display: flex;

			.heart-photo {
				image {
					width: 64rpx;
					height: 64rpx;
				}
			}

			.user-info {
				margin-left: 10rpx;

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
		}

		.right {
			display: flex;
			font-size: 20rpx;
			align-items: center;
			color: #9a9a9a;

			.like {
				margin-left: 6rpx;
			}

			.num {
				font-size: 26rpx;
				color: #9a9a9a;
			}
		}

		.highlight {
			color: #5677fc;

			.num {
				color: #5677fc;
			}
		}
	}
	.item {
		border-bottom: solid 2rpx $u-border-color;
	}
</style>
