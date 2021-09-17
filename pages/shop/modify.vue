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
				<u-form-item required v-if="form.businessLicense === 1" label="统一社会信用码" label-width="auto"
					class="formList" prop="blCode">
					<u-input v-model="form.blCode" maxlength="50" :clearable="true" />
				</u-form-item>
				<u-form-item v-if="form.businessLicense === 1" class="formList" label="营业执照" prop="photo"
					label-width="auto">
					<u-upload ref="blUpload" :action="action" max-count="3" width="160" height="160"
						:limitType="['jpg']"></u-upload>
				</u-form-item>
				<u-form-item required label="经营范围" label-width="auto" class="formList" right-icon="arrow-right"
					prop="MType">
					<u-input v-model="form.MTypeStr" :disabled="true" @tap="showSelect('MType')" />
				</u-form-item>
				<u-form-item required label="经营场所面积" label-width="auto" class="formList" right-icon="arrow-right"
					prop="area">
					<u-input v-model="form.areaStr" :disabled="true" @tap="showSelect('area')" />
				</u-form-item>
				<u-form-item required label="经营者姓名" label-width="auto" class="formList" prop="operatorsName">
					<u-input v-model="form.operatorsName" maxlength="32" :clearable="true" />
				</u-form-item>
				<u-form-item required label="联系电话" label-width="auto" class="formList" prop="phone">
					<u-input v-model="form.phone" maxlength="11" :clearable="true" />
				</u-form-item>
				<u-form-item class="formList" label="店铺照片" prop="photo" label-width="auto">
					<u-upload ref="shopUpload" :action="action" max-count="5" width="160" height="160"
						:limitType="['jpg']"></u-upload>
				</u-form-item>

			</u-cell-group>
		</u-form>
		<u-select v-model="selectView" :list="optionArray" @confirm="selectConfirm"></u-select>
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
				optionArray: [],
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
					blCode: '330523604009696', // 社会统一信用码
					operatorName: '李永', // 经营者姓名
					phone: '13588658888', // 联系方式
					area: '', // 经营面积
					mPaths: '', // 商铺实景图
					MTypeStr: '',
					areaStr: ''
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
				},
				action: '/pic/uploadPic', // 演示地址
				showUploadList: false,
				fileList: []
			}
		},
		async onShow() {
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
			getOptions() {
				let typeMap = uni.getStorageSync('typeMap')
				let areaMap = uni.getStorageSync('areaMap')
				let MType = Object.keys(typeMap).map((v, index) => {
					return {
						value: v,
						label: typeMap[v]
					}
				})
				let area = Object.keys(areaMap).map((v, index) => {
					return {
						value: v,
						label: areaMap[v]
					}
				})
				// 初始化绑定值
				this.form.MTypeStr = typeMap[this.form.MType]
				this.form.areaStr = areaMap[this.form.area]
				this.formOption = {
					MType,
					area
				}
			},
			showSelect(type) {
				this.selectType = type
				this.optionArray = this.formOption[type]
				this.selectView = true
			},
			selectConfirm(val) {
				this.form[this.selectType] = val[0].value
				this.form[`${this.selectType}Str`] = val[0].label
			},
			submit() {
				let blList = this.$refs.blUpload.lists
				let shopList = this.$refs.shopUpload.lists
				let blPath = []
				let mPaths = []
				const id = uni.getStorageSync('id')
				blList.forEach(item => {
					blPath.push(item.response.data)
				})
				shopList.forEach(item => {
					mPaths.push(item.response.data)
				})
				console.info('营业执照', blPath)
				this.$refs.uForm.validate(vaild => {
					if (vaild) {
						let params = {
							id,
							...this.form,
							blPath,
							mPaths
						}
						console.info('params', params)
						// 接口404 先模拟跳转
						this.$u.toast('编辑成功')
						setTimeout(
							() => this.$u.route('/', { id }), 2000)
						// this.$u.api.modifyShopInfo(params).then(res => {
						// 	this.$u.toast('编辑成功')
						// 	util.backRouter(this)
						// })
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
			// position: fixed;
			// bottom: 0;
			// left: 0;
			width: 100%;
			padding: 64rpx 40rpx;
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
			// margin-bottom: 48rpx;
		}
	}
</style>
