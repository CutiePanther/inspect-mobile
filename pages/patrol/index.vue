<template>
	<view class="content">
		<view class="patrol-time">
			<text>{{m_SignName}}: 巡查上报</text>
		</view>

		<u-collapse :accordion="false" class="patrol-item">
			<u-collapse-item :title="item.titleName" :open="item.open" align="center"
				v-for="(item, i) in detail.patrols" :key="item.titleName" :ref="'collapse'+i">
				<view class="item-wrap" v-for="(info, j) in item.info" :key="info.category">
					<view class="item-info">
						<view class="item-title">
							{{ info.category }}
						</view>
						<view class="item-desc">
							{{ info.content }}
						</view>
						<u-radio-group v-model="info.status" @change="radioGroupChange('collapse'+i)">
							<u-radio name="true" active-color="#19be6b">合格</u-radio>
							<u-radio name="false" active-color="#ff9900">不合格</u-radio>
						</u-radio-group>
					</view>
					<view v-show="info.status === 'false'">
						<u-upload :ref="'patrolUpload'+i+j" :max-size="10 * 1024 * 1024" :action="action" max-count="3"
							:show-progress="false" width="160" height="160" upload-text="上传图片"></u-upload>
					</view>
					<view class="options" v-show="info.status === 'false'">
						<u-radio-group v-model="info.errorCode" :wrap="true">
							<u-radio v-for="item in errorCodeMap" :name="item.value">{{item.content}}</u-radio>
						</u-radio-group>
						<u-radio-group v-model="info.mark" :wrap="true">
							<u-radio v-for="item in markMap" :name="item.value">{{item.content}}</u-radio>
						</u-radio-group>
					</view>
				</view>
			</u-collapse-item>
		</u-collapse>

		<view class="footer">
			<u-button type="primary" :ripple="true" shape="circle" @tap="submit">提交</u-button>
		</view>
	</view>
</template>
<script>
	const countMap = [{
			category: '包垃圾分类',
			content: '做好垃圾分类，定时定点规范投放。',
			titleName: 1
		},
		{
			category: '包秩序井然',
			content: '维护责任区卫生清洁，车辆规范停放。',
			titleName: 1
		},
		{
			category: '包立面美观',
			content: '保持建筑外立面、户外设施完好整洁。',
			titleName: 1
		},
		{
			category: '包绿化完好',
			content: '维护责任区树木花草及绿化设施完好。',
			titleName: 1
		},
		{
			category: '包文明劝导',
			content: '劝导责任区范围内不文明行为。',
			titleName: 1
		},
		{
			category: '不乱搭乱建',
			titleName: 2
		},
		{
			category: '不占道经营',
			titleName: 2
		},
		{
			category: '不乱贴乱画',
			titleName: 2
		},
		{
			category: '不乱倒垃圾',
			titleName: 2
		},
		{
			category: '不乱倒污水',
			titleName: 2
		},
		{
			category: '不私摆乱放',
			titleName: 2
		},
		{
			category: '不侵占绿地',
			titleName: 2
		},
		{
			category: '不沿街晾晒',
			titleName: 2
		},
		{
			category: '不制造噪音',
			titleName: 2
		},
		{
			category: '不放养宠物',
			titleName: 2
		},
		{
			category: '按标准安装油烟净化装置，正常使用油烟净化装置。',
			titleName: 3
		},
		{
			category: '落实油烟净化装置定期清洗',
			titleName: 3
		},
		{
			category: '大中型餐饮经营单位，落实第三方清洗制度',
			titleName: 3
		},
		{
			category: '大中型餐饮经营单位，及时登记相关清洗台账',
			titleName: 3
		},
		{
			category: '有油烟在线监测系统的，按要求使用',
			titleName: 3
		}
	]
	export default {
		data() {
			return {
				errorCodeMap: [{
						value: 0,
						content: '客户造成'
					},
					{
						value: 1,
						content: '商家造成'
					}
				],
				markMap: [{
						value: 1,
						content: '现场整改'
					},
					{
						value: 2,
						content: '首错不罚'
					},
					{
						value: 3,
						content: '简单程序'
					},
					{
						value: 4,
						content: '一般程序'
					}
				],
				shopId: '',
				m_SignName: '', // 商铺名称
				action: '/pic/uploadPic',
				detail: {
					merchantId: null,
					template: 0,
					patrols: []
				}
			}
		},
		onLoad() {
			this.m_SignName = uni.getStorageSync('m_SignName')
			this.shopId = uni.getStorageSync('id')
			this.initData()
		},
		methods: {
			initData() { // 初始化数据
				let five = [] // 五包
				let ten = [] // 十不准
				let additional = [] // 附加选项
				countMap.forEach((item, index) => {
					let temp = {
						count: index + 1,
						titleName: item.titleName,
						category: item.category,
						content: item.content || '',
						status: 'true',
						pic: [],
						errorCode: 0,
						mark: 1,
						outcome: ''
					}
					switch (item.titleName) {
						case 1:
							five.push(temp)
							break
						case 2:
							ten.push(temp)
							break
						case 3:
							additional.push(temp)
							break
						default:
							break
					}
				})
				this.detail = {
					merchantId: this.shopId,
					template: 0,
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
			radioGroupChange(ref) {
				// 改变内容,重新计算collapse item高度
				this.$nextTick(() => {
					this.$refs[ref][0].init()
				})
			},
			submit() {
				console.log(this.detail)
				let patrols = []
				this.detail.patrols.forEach((item, i) => {
					item.info.forEach((v, j) => {
						if (v.status === 'true') {
							patrols.push({
								titleName: v.titleName,
								count: v.count,
								status: true
							})
						} else {
							let images = []
							let photoList = this.$refs['patrolUpload'+i+j][0].lists
							photoList.forEach(pic => {
								if (pic.progress === 100 && pic.response) {
									images.push(pic.response.data)
								}
							})
							patrols.push({
								titleName: v.titleName,
								count: v.count,
								status: false,
								errorCode: v.errorCode,
								mark: v.mark,
								images
							})
						}
					})
				})
				const params = {
					merchantId: this.detail.merchantId,
					template: 0,
					patrols
				}
				this.$u.api.addPatrols(params).then(res => {
					this.$u.toast('上报成功')
					setTimeout(() => this.$u.route('/', {id: this.shopId}), 2000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding: 0 24rpx 32rpx;

		.footer {
			width: 100%;
			padding: 24rpx 40rpx;
			text-align: center;
		}

		.patrol-time {
			color: #2f2f2f;
			font-size: 32rpx;
			font-weight: bold;
			padding: 16rpx 0 12rpx;
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
				color: #2F2F2F;

				.item-title {
					font-size: 32rpx;
					padding: 8rpx 0;
				}

				.options {
					display: flex;
					align-items: flex-start;
				}
			}
		}
	}
</style>
