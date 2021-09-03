<template>
	<view class="detail">
		<u-form :rule="rules" :model="form" ref="uForm" class="formView">
			<u-cell-group>
				<u-form-item required label="商铺名称" prop="mSignName">
					<u-input v-model="form.mSignName" maxlength="32" />
				</u-form-item>
				<u-form-item required label="服务类型" prop="mTypeStr">
					<u-input v-model="form.mTypeStr" @tap="showSelect('mTypeStr')" />
				</u-form-item>
				<u-form-item label="简介"><u-input v-model="form.intro" /></u-form-item>
				<u-form-item label="性别"><u-input v-model="form.sex" type="select" /></u-form-item>
				<u-form-item label="水果">
					<u-checkbox-group>
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="味道">
					<u-radio-group v-model="radio">
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" :disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="开关"><u-switch slot="right" v-model="switchVal"></u-switch></u-form-item>
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
					shopId: '',
					selectType: '',
					selectView: '',
					form: {
						mSignName: '小葡萄的小店', // 商铺名称
						mType: '零售业', // 服务类型
						address: '浙江省杭州市滨江区滨安路1080号', // 详细地址
						blPath: '', // 营业执照照片
						blName: '小葡萄的小店', // 营业执照名称
						blCode: '小葡萄的小店', // 社会统一信用码
						operator_name: '李永', // 经营者姓名
						phone: '13588658888', // 联系方式
						area: 20, // 经营面积
						mPaths: '' // 商铺实景图
					},
					formOption: {
						mType: []
					},
					rules: {
						mType: [{
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
			onLoad(opt) {
				this.getShopDetail(opt.id)
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
					this.$u.api.getInfo({id}).then(res => {
						console.log(res)
					})
				},
				format(arr, type) {
					let temp = []
					arr.forEach(item => {
						temp.push({
							value: item.name,
							label: item.name
						})
					})
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
	.detail {
		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: 20rpx 40rpx;
			background-color: #EDEDED;
			text-align: center;
		}
		.unit {
			color: #2f2f2f;
		}
		.formView {
			margin-bottom: 100rpx;
		}
	}
</style>
