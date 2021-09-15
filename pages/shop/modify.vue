<template>
	<view class="modify">
		<u-form :rule="rules" :model="form" ref="uForm" class="formView">
			<u-cell-group>
				<u-form-item required label="商铺名称" label-width="auto" class="formList" prop="mSignName">
					<u-input v-model="form.MSignName" maxlength="32" :clearable="true" />
				</u-form-item>
				<u-form-item required label="详细地址" label-width="auto" class="formList" prop="address">
					<u-input v-model="form.address" maxlength="50" :clearable="true" />
				</u-form-item>
				<u-form-item label="营业执照" label-width="auto" class="formList">
					<u-radio-group v-model="form.businessLicense">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.value"
							:disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item required v-if="form.businessLicense === 1" label="营业执照名称" label-width="auto"
					class="formList" prop="blName">
					<u-input v-model="form.blName" maxlength="50" :clearable="true" />
				</u-form-item>
				<u-form-item required label="经营范围" label-width="auto" class="formList" right-icon="arrow-right"
					prop="MType">
					<u-input v-model="form.MType" :disabled="true" @tap="showSelect('mType')" />
				</u-form-item>
				<u-form-item required label="经营场所面积" label-width="auto" class="formList" right-icon="arrow-right"
					prop="area">
					<u-input v-model="form.area" :disabled="true" @tap="showSelect('area')" />
				</u-form-item>
				<u-form-item required label="经营者姓名" label-width="auto" class="formList" prop="operatorsName">
					<u-input v-model="form.operatorsName" maxlength="32" :clearable="true" />
				</u-form-item>
				<u-form-item required label="联系电话" label-width="auto" class="formList" prop="phone">
					<u-input v-model="form.phone" maxlength="11" :clearable="true" />
				</u-form-item>
			</u-cell-group>
		</u-form>
		<u-select v-model="selectView" :list="array" @confirm="selectConfirm"></u-select>
		<view class="footer">
			<u-button type="primary" :ripple="true" shape="circle" @tap="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import util from '@/common/utils.js'
	export default {
		data() {
			return {
				array: [],
				shopId: '',
				selectType: '',
				selectView: false,
				form: {
					MSignName: '小葡萄的小店', // 商铺名称
					MType: '零售业', // 服务类型
					address: '浙江省杭州市滨江区滨安路1080号', // 详细地址
					businessLicense: 1,
					blPath: '', // 营业执照照片
					blName: '小葡萄的小店', // 营业执照名称
					blCode: '小葡萄的小店', // 社会统一信用码
					operatorName: '李永', // 经营者姓名
					phone: '13588658888', // 联系方式
					area: 20, // 经营面积
					mPaths: '' // 商铺实景图
				},
				formOption: {
					MType: [],
					area: []
				},
				radioList: [{
						name: '有',
						value: 1,
						disabled: false
					},
					{
						name: '无',
						value: 2,
						disabled: false
					}
				],
				rules: {
					MHType: [{
						required: true,
						message: '请选择服务类型'
					}],
					area: [{
						required: true,
						message: '请输入经营面积'
					}]
				}
			}
		},
		async onLoad() {
			let id = uni.getStorageSync('id')
			let shop = await this.$u.api.getShopInfo(id)
			let orign = {
				MSignName: '',
				MType: '',
				address: '',
				bussinessLicense: 1,
				blPath: '',
				blName: '',
				blCode: '',
				operatorsName: '',
				phone: '',
				area: '',
				status: 0
			}
			this.form = {
				...this.form,
				...shop
			}
			this.getOptions()
		},
		onBackPress() {
			if (e.form === 'backbutton') {
				let self = this
				uni.showModal({
					title: '提示',
					content: '本次信息还未填写完成，是否确认退出？',
					success: (res) => {
						if (res.confirm) {
							util.backRouter(self)
						}
					}
				})
			}
		},
		methods: {
			getShopDetail(id) {
				this.$u.api.getInfo({
					id
				}).then(res => {
					console.log(res)
				})
			},
			getOptions() {
				let MTypeMap = uni.getStorageSync('MType')
				let areaMap = uni.getStorageSync('area')
				let MType = Object.keys(MTypeMap).map((v, index) => {
					return {
						value: v,
						label: MTypeMap[v]
					}
				})
				let area = Object.keys(areaMap).map((v, index) => {
					return {
						value: v,
						label: areaMap[v]
					}
				})
				this.formOption = {
					MType,
					area
				}
			},
			showSelect(type) {
				this.selectType = type
				this.arr = this.formOption[type]
				this.selectView = true
			},
			selectConfirm(val) {
				this.form[this.selectType] = val[0].value
				this.form[`${this.selectType}Str`] = val[0].label
			},
			submit() {
				this.$ref.uForm.validate(vaild => {
					if (vaild) {
						let params = {
							...this.form,
							id: '1',
							userId: '1'
						}
						this.$u.api.modifyShopInfo(params).then(res => {
							this.$u.toast('编辑成功')
							util.backRouter(this)
						})
					}
				})
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		}
	}
</script>

<style lang="scss" scoped>
	.modify {
		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 20rpx 40rpx;
			text-align: center;
		}

		.formList {

			::v-deep .uni-input-input,
			::v-deep .uni-input-placeholder {
				text-align: right;
			}

			::v-deep .u-form-item--right__content__slot {
				justify-content: flex-end;
			}
		}

		.unit {
			// color: #2f2f2f;
			color: #000;
		}

		.formView {
			margin-bottom: 116rpx;
		}
	}
</style>
