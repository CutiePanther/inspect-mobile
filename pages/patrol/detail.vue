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
				v-for="item in detail.patrols" :key="item.titleName">
				<view class="item-wrap" v-for="info in item.info" :key="info.category">
					<view class="item-flex">
						<view class="item-info">
							<view class="item-title">
								{{ info.category }}
							</view>
							<view class="item-desc">
								{{ info.content }}
							</view>
							<u-radio-group v-model="info.status" @change="radioGroupChange">
								<u-radio name="true" active-color="#19be6b" :disabled="!info.disabled">合格</u-radio>
								<u-radio name="false" active-color="#ff9900" :disabled="info.disabled">不合格</u-radio>
							</u-radio-group>
						</view>
						<view v-if="!info.disabled">
							<image :src="info.pic[0]" mode="aspectFit" @tap="imgListPreview(info.pic)"></image>
						</view>
					</view>
					<view class="item-desc" v-if="!info.disabled">
						{{ info.outcome }}
					</view>
				</view>
			</u-collapse-item>
		</u-collapse>
	</view>
</template>
<script>
	const countMap = [{
			category: '包垃圾分类',
			content: '做好垃圾分类，定时定点规范投放。',
		},
		{
			category: '包秩序井然',
			content: '维护责任区卫生清洁，车辆规范停放。'
		},
		{
			category: '包立面美观',
			content: '保持建筑外立面、户外设施完好整洁。'
		},
		{
			category: '包绿化完好',
			content: '维护责任区树木花草及绿化设施完好。'
		},
		{
			category: '包文明劝导',
			content: '劝导责任区范围内不文明行为。',
		},
		{
			category: '不乱搭乱建'
		},
		{
			category: '不占道经营'
		},
		{
			category: '不乱贴乱画'
		},
		{
			category: '不乱倒垃圾'
		},
		{
			category: '不乱倒污水'
		},
		{
			category: '不私摆乱放'
		},
		{
			category: '不侵占绿地'
		},
		{
			category: '不沿街晾晒'
		},
		{
			category: '不制造噪音'
		},
		{
			category: '不放养宠物'
		},
		{
			category: '按标准安装油烟净化装置，正常使用油烟净化装置。'
		},
		{
			category: '落实油烟净化装置定期清洗'
		},
		{
			category: '大中型餐饮经营单位，落实第三方清洗制度'
		},
		{
			category: '大中型餐饮经营单位，及时登记相关清洗台账'
		},
		{
			category: '有油烟在线监测系统的，按要求使用'
		}
	]
	export default {
		data() {
			return {
				five: {
					pass: 0,
					deny: 0
				},
				ten: {
					pass: 0,
					deny: 0
				},
				additional: {
					pass: 0,
					deny: 0
				},
				detail: {
					createTime: '2021-09-16',
					name: '朱小贝',
					patrols: []
				}
			}
		},
		onLoad() {
			let pages = getCurrentPages()
			let currentPage = pages[pages.length - 1]
			const {
				id
			} = currentPage.options
			this.getRecordDetail(id)
		},
		methods: {
			async getRecordDetail(id) {
				const detail = await this.$u.api.getRecordDetail(id)
				let five = [] // 五包
				let ten = [] // 十不准
				let additional = [] // 附加选项
				detail.patrols.forEach(item => {
					let info = countMap[item.count - 1]
					let pic = []
					if (item.images) {
						pic = item.images.map(v => `http://123.153.1.134:4399/pic/getImageByte/${v}`)
					}
					let temp = {
						category: info.category,
						content: info.content || '',
						disabled: item.status,
						status: item.status ? 'true' : 'false',
						pic,
						errorCode: item.errorCode,
						mark: item.mark,
						outcome: item.outcome || ''
					}
					switch (item.titleName) {
						case 1:
							five.push(temp)
							temp.disabled ? this.five.pass++ : this.five.deny++
							break
						case 2:
							ten.push(temp)
							temp.disabled ? this.ten.pass++ : this.ten.deny++
							break
						case 3:
							additional.push(temp)
							temp.disabled ? this.additional.pass++ : this.additional.deny++
							break
						default:
							break
					}
				})
				this.detail = {
					...detail,
					patrols: [{
							titleName: '五包',
							info: five,
							open: true
						},
						{
							titleName: '十不准',
							info: ten,
							open: false
						},
						{
							titleName: '餐饮单位附加要求',
							info: additional,
							open: false
						}
					]
				}
			},
			imgListPreview(item) {
				uni.previewImage({
					urls: item,
					current: item[0]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 24rpx 32rpx;

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
				margin-bottom: 32rpx;

				.item-flex {
					display: flex;
					justify-content: space-between;
					color: #2F2F2F;

					.item-title {
						font-size: 32rpx;
						padding: 8rpx 0;
					}

					.item-desc {
						font-size: 24rpx;
						margin-bottom: 12rpx;
					}

					image {
						width: 220rpx;
						height: 160rpx;
					}
				}
			}
		}
	}
</style>
