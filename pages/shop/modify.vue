<template>
	<view class="modify">
		<u-form :rule="rules" :model="form" ref="uForm" class="formView">
			<u-cell-group>
				<u-form-item required label="商铺名称" label-width="auto" class="formList" prop="m_SignName">
					<u-input v-model="form.m_SignName" maxlength="32" :clearable="true" />
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
				<u-form-item v-if="form.businessLicense === 1" label="营业执照名称" label-width="auto" class="formList" prop="blName">
					<u-input v-model="form.blName" maxlength="50" :clearable="true" />
				</u-form-item>
				<u-form-item v-if="form.businessLicense === 1" label="统一社会信用码" label-width="auto" class="formList" prop="blCode">
					<u-input v-model="form.blCode" maxlength="50" :clearable="true" />
				</u-form-item>
				<!-- <u-form-item v-if="form.businessLicense === 1" class="formList" label="营业执照" prop="photo"
					label-width="auto">
					<u-upload ref="blUpload" :action="action" max-count="3" width="160" height="160"
						:limitType="['jpg']"></u-upload>
				</u-form-item> -->
				<u-form-item required label="经营范围" label-width="auto" class="formList" right-icon="arrow-right"
					prop="m_Type">
					<u-input v-model="form.m_TypeStr" :disabled="true" @tap="showSelect('m_Type')" />
				</u-form-item>
				<u-form-item required label="经营场所面积" label-width="auto" class="formList" right-icon="arrow-right"
					prop="area">
					<u-input v-model="form.areaStr" :disabled="true" @tap="showSelect('area')" />
				</u-form-item>
				<u-form-item label="经营者姓名" label-width="auto" class="formList" prop="operatorsName">
					<u-input v-model="form.operatorsName" maxlength="32" :clearable="true" />
				</u-form-item>
				<u-form-item label="联系电话" label-width="auto" class="formList" prop="phone">
					<u-input v-model="form.phone" maxlength="11" :clearable="true" />
				</u-form-item>
				<u-form-item class="formList" label="店铺照片" prop="photo" label-width="auto">
					<u-upload ref="shopUpload" :max-size="10 * 1024 * 1024" :file-list="shopImgList" :action="action" max-count="5" :show-progress="false" width="160" height="160"></u-upload>
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
					m_SignName: '', // 商铺名称
					m_Type: '', // 服务类型
					address: '', // 详细地址
					businessLicense: 1, // 营业执照 1有 2无 3过期
					blName: '', // 营业执照名称
					blCode: '', // 社会统一信用码
					operatorName: '', // 经营者姓名
					phone: '', // 联系方式
					area: '', // 经营面积
					paths: '', // 商铺实景图
					m_TypeStr: '',
					areaStr: ''
				},
				formOption: {
					m_Type: [],
					area: []
				},
				radioList: [{
						name: '有',
						value: 1
					},
					{
						name: '无',
						value: 2
					}
				],
				rules: {
					m_SignName: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur,change'
					}],
					address: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur,change'
					}],
					m_Type: [{
						required: true,
						message: '请选择服务类型'
					}],
					area: [{
						required: true,
						message: '请输入经营面积'
					}],
					phone: [{
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value) || this.$u.test.code(value, 8) || value.length === 0
						},
						message: '请输入正确的手机号或8位座机号',
						trigger: 'blur'
					}],
					blCode: [{
						validator: (rule, value, callback) => {
							return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14}$/.test(value) || value.length === 0
						},
						message: '请输入合法统一社会信用码',
						trigger: 'blur'
					}]
				},
				action: '/pic/uploadPic', // 演示地址
				shopImgList: [] //已上传图片
			}
		},
		async onShow() {
			let id = uni.getStorageSync('id')
			let shop = await this.$u.api.getShopInfo(id)
			if (shop.paths) {
				this.shopImgList = shop.paths.map(v => ({ url: `http://123.153.1.134:4399/pic/getImageByte/${v}` }))
			}
			this.form = {
				...this.form,
				...shop
			}
			console.info('shop', this.shopImgList)
			console.info('photo', this.$refs.shopUpload.lists)
			
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
				let m_Type = Object.keys(typeMap).map((v, index) => {
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
				this.form.m_TypeStr = typeMap[this.form.m_Type]
				this.form.areaStr = areaMap[this.form.area]
				this.formOption = {
					m_Type,
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
				let photoList = this.$refs.shopUpload.lists
				console.info('refs', photoList)
				let paths = []
				const id = uni.getStorageSync('id')
				photoList.forEach(item => {
					// 判断修改情况，原图片地址
					if(item.progress !== 100) return
					if(item.response) {
						paths.push(item.response.data)
					} else {
						console.log(item.url.split('getImageByte/'))
						paths.push(item.url.split('getImageByte/')[1])
					}
					
				})
				this.$refs.uForm.validate(vaild => {
					if (vaild) {
						let params = {
							id,
							...this.form,
							paths
						}
						console.info('params', params)
						this.$u.api.modifyShopInfo(params).then(res => {
							this.$u.toast('编辑成功')
							setTimeout(() => util.backRouter(this), 2000)
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
			color: #000;
		}

	}
</style>
