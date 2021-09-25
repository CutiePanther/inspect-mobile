<template>
	<view class="content">
		<view class="patrol-time">
			<text>{{m_SignName}}: 巡查上报</text>
		</view>
		
		<u-collapse :accordion="false" class="patrol-item">
				<u-collapse-item :title="item.titleName" :open="item.open" align="center"
					v-for="item in detail.patrols" :key="item.titleName">
					<view class="item-wrap" v-for="info in item.info" :key="info.category">					
						<view class="item-info">
							<view class="item-title">
								{{ info.category }}
							</view>
							<view class="item-desc">
								{{ info.content }}
							</view>
							<u-radio-group v-model="info.status" @change="radioGroupChange">
								<u-radio name="true" active-color="#19be6b">合格</u-radio>
								<u-radio name="false" active-color="#ff9900">不合格</u-radio>
							</u-radio-group>
						</view>
						<view v-show="info.status === 'false'">
							<u-upload ref="shopUpload" :max-size="10 * 1024 * 1024" :file-list="shopImgList" :action="action" max-count="3" width="160" height="160"></u-upload>
						</view>			
						<view class="item-desc"  v-if="info.status === 'false'">
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
            titleName: 1
		},
		{
			category: '包秩序井然',
			content: '维护责任区卫生清洁，车辆规范停放。',
			titleName: 1
		},
		{
			category: '包立面美观',
			content: '保持建筑外立面、户外设施完好整洁。',
			titleName: 1
		},
		{
			category: '包绿化完好',
			content: '维护责任区树木花草及绿化设施完好。',
			titleName: 1
		},
		{
			category: '包文明劝导',
			content: '劝导责任区范围内不文明行为。',
			titleName: 1
		},
		{
			category: '不乱搭乱建',
			titleName: 2
		},
		{
			category: '不占道经营',
			titleName: 2
		},
		{
			category: '不乱贴乱画',
			titleName: 2
		},
		{
			category: '不乱倒垃圾',
			titleName: 2
		},
		{
			category: '不乱倒污水',
			titleName: 2
		},
		{
			category: '不私摆乱放',
			titleName: 2
		},
		{
			category: '不侵占绿地',
			titleName: 2
		},
		{
			category: '不沿街晾晒',
			titleName: 2
		},
		{
			category: '不制造噪音',
			titleName: 2
		},
		{
			category: '不放养宠物',
			titleName: 2
		},
		{
			category: '按标准安装油烟净化装置，正常使用油烟净化装置。',
			titleName: 3
		},
		{
			category: '落实油烟净化装置定期清洗',
			titleName: 3
		},
		{
			category: '大中型餐饮经营单位，落实第三方清洗制度',
			titleName: 3
		},
		{
			category: '大中型餐饮经营单位，及时登记相关清洗台账',
			titleName: 3
		},
		{
			category: '有油烟在线监测系统的，按要求使用',
			titleName: 3
		}
	]
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
	const errorCodeMap = {
		0: '客户造成',
		1: '商家造成'
	}
	const markMap = {
		1: '现场整改',
		2: '首错不罚',
		3: '简单程序',
		4: '一般程序'
	}
	export default {
		data() {
			return {
				m_SignName: '', // 商铺名称
				detail: {
					merchantId: null,
					template: 0,
					patrols: []
				}
			}
		},
		onLoad() {
			this.m_SignName = uni.getStorageSync('m_SignName')
			this.initData()
		},
		methods: {
			initData() { // 初始化数据
				let five = [] // 五包
				let ten = [] // 十不准
				let additional = [] // 附加选项
				countMap.forEach((item,index) => {
					let temp = {
						count: index + 1,
						titleName: item.titleName,
						category: item.category,
						content: item.content || '',
						status: 'true',
						pic: [],
						errorCode: null,
						mark: null,
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
				debugger
				this.detail = {
					merchantId: uni.getStorageSync('id'),
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
					}]
				}
				console.log(this.detail)
			},
			radioGroupChange(e) {
				console.log(e)
				console.log(typeof(e))
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
</style>
