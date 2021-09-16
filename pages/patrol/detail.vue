<template>
	<view class="content">
		<view class="patrol-time">
			<text>{{detail.createTime}} 巡查记录</text>
		</view>
		<u-table class="patrol-table" border-color="#EDEDED" padding="14rpx 0" color="#2F2F2F">
			<u-tr>
				<u-th width="40%">检查项</u-th>
				<u-th>合格</u-th>
				<u-th>不合格</u-th>
			</u-tr>
			<u-tr>
				<u-td width="40%">五包</u-td>
				<u-td>{{ five.pass }}项</u-td>
				<u-td>{{ five.deny }}项</u-td>
			</u-tr>
			<u-tr>
				<u-td width="40%">十不准</u-td>
				<u-td>{{ ten.pass }}项</u-td>
				<u-td>{{ ten.deny }}项</u-td>
			</u-tr>
			<u-tr>
				<u-td width="40%">餐饮单位附加要求</u-td>
				<u-td>{{ additional.pass }}项</u-td>
				<u-td>{{ additional.deny }}项</u-td>
			</u-tr>
		</u-table>
		<u-collapse :accordion="false" class="patrol-item">
			<u-collapse-item :title="item.titleName" :open="item.open" align="center"
				v-for="(item,index) in detail.patrols" :key="item.titleName">
				<!-- <view class="item-wrap" v-for="info in item.info" :key="item.titleName+index"> -->
				<view class="item-wrap" v-for="info in item.info">
					<view class="item-info">
						<view class="item-title">
							{{ info.category }}
						</view>
						<view class="item-desc">
							{{ info.content }}
						</view>
						<u-radio-group v-model="info.status" @change="radioGroupChange">
							<u-radio name="true" :disabled="isView">合格</u-radio>
							<u-radio name="false" :disabled="isView">不合格</u-radio>
						</u-radio-group>
					</view>
					<view v-if="info.status === 'false'">
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
				five: {
					pass: 5,
					deny: 0
				},
				ten: {
					pass: 10,
					deny: 0
				},
				additional: {
					pass: 5,
					deny: 0
				},
				// {
				//     "merchantId":123,//商铺id
				//     "template":0,//模板编号默认0,用于后续扩展
				//     "patrols":[
				//         { "count":1//题目编号 +1
				//             "titleName":1,//五包, 2:十不准, 3:餐饮单位附加要求
				//             "status":false//是否合格  true:合格  false:不合格
				//             "errorCode":1,//错误方 0:客户造成 1:商家造成
				//             "mark":1,//不合格原因 1:现场整改 2:首错不罚 3:简单程序 4:一般程序
				//             "images":[1,1,1];//上传照片的id主键
				//         }
				//     ]
				// }
				detail: {
					createTime: '2021-08-16',
					result: '扣分0，无不合格项。',
					name: '朱小贝',
					patrols: [{
							titleName: '五包',
							info: [{
									category: '包垃圾分类',
									content: '做好垃圾分类，定时定点规范投放。',
									status: 'true',
									pic: '/static/license.jpg'
								},
								{
									category: '包秩序井然',
									content: '维护责任区卫生清洁，车辆规范停放。',
									status: 'true',
									pic: '/static/license.jpg'
								},
								{
									category: '包立面美观',
									content: '保持建筑外立面、户外设施完好整洁。',
									status: 'true',
									pic: '/static/license.jpg'
								},
								{
									category: '包绿化完好',
									content: '维护责任区树木花草及绿化设施完好。',
									status: 'true',
									pic: '/static/license.jpg'
								},
								{
									category: '包文明劝导',
									content: '劝导责任区范围内不文明行为。',
									status: 'true',
									pic: '/static/license.jpg'
								}
							],
							open: true
						},
						{
							titleName: '十不准',
							info: [{
									content: '不乱搭乱建',
									status: 'true',
									pic: []
								},
								{
									content: '不占道经营',
									status: 'true',
									pic: []
								},
								{
									content: '不乱贴乱画',
									status: 'true',
									pic: []
								},
								{
									content: '不乱倒垃圾',
									status: 'true',
									pic: []
								},
								{
									content: '不乱倒污水',
									status: 'true',
									pic: []
								},
								{
									content: '不私摆乱放',
									status: 'true',
									pic: []
								},
								{
									content: '不侵占绿地',
									status: 'true',
									pic: []
								},
								{
									content: '不沿街晾晒',
									status: 'true',
									pic: []
								},
								{
									content: '不制造噪音',
									status: 'true',
									pic: []
								},
								{
									content: '不放养宠物',
									status: 'true',
									pic: []
								}
							],
							open: false
						},
						{
							titleName: '餐饮单位附加要求',
							info: [{
									content: '按标准安装油烟净化装置，正常使用油烟净化装置。',
									status: 'true',
									pic: []
								},
								{
									content: '落实油烟净化装置定期清洗',
									status: 'true',
									pic: []
								},
								{
									content: '大中型餐饮经营单位，落实第三方清洗制度',
									status: 'true',
									pic: []
								},
								{
									content: '大中型餐饮经营单位，及时登记相关清洗台账',
									status: 'true',
									pic: []
								},
								{
									content: '有油烟在线监测系统的，按要求使用',
									status: 'true',
									pic: []
								}
							],
							open: false
						}
					]
				}
			}
		},
		onLoad(option) {
			console.log(option)
			this.detail = {
				...option,
				patrols: this.detail.patrols
			}
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
