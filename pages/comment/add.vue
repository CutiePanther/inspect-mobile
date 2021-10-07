<template>
	<view class="add-comment">
		<u-form :model="form" ref="uForm" class="formList">
			<u-cell-group>
				<u-form-item label="商铺名称" label-width="auto" class="formList" prop="m_SignName">
					<u-input v-model="m_SignName" maxlength="50" :clearable="true" disabled/>
				</u-form-item>
				<u-form-item label="商铺评分" label-width="auto" class="formList" prop="shopFraction">
					<u-rate v-model="form.shopFraction" :count="5" size="32" min-count="1" :colors="colors"></u-rate>
				</u-form-item>
				<u-form-item label="服务评分" label-width="auto" class="formList" prop="serverFraction">
					<u-rate v-model="form.serverFraction" :count="5" size="32" min-count="1" :colors="colors"></u-rate>
				</u-form-item>
				<u-form-item class="formList" label="上传照片" prop="photo" label-width="auto">
					<u-upload ref="commentUpload" :max-size="10 * 1024 * 1024" :action="action" max-count="5" :show-progress="false" width="160" height="160"></u-upload>
				</u-form-item>
				<u-form-item label="评价商铺" label-width="auto" class="formList" prop="evaluation">
					<u-input type="textarea" :clearable="true" v-model="form.evaluation" />
				</u-form-item>
			</u-cell-group>
		</u-form>
		<view class="footer">
			<u-button type="primary" :ripple="true" shape="circle" @tap="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopId: '',
				// evaPaths
				m_SignName: '', // 商铺名称
				form: {
					shopFraction: 5,
					serverFraction: 5,
					evaluation: ''
				},
				action: '/pic/uploadPic',
				colors: ['#ffc454', '#ffb409', '#ff9500']
			}
		},
		onShow() {
			this.shopId = uni.getStorageSync('id')
			this.m_SignName = uni.getStorageSync('m_SignName')
		},
		methods: {
			submit() {
				let photoList = this.$refs.commentUpload.lists
				let evaPaths = []
				photoList.forEach(item => {
					// 判断修改情况，原图片地址
					if(item.progress !== 100) return
					if(item.response) {
						evaPaths.push(item.response.data)
					}
				})
				let params = {
					marchantId: this.shopId,
					...this.form,
					evaPaths
				}
				console.info('params', params)
				this.$u.api.addComment(params).then(res => {
					this.$u.toast('评价成功')
					setTimeout(() => this.$u.route('/', {id: this.shopId}), 1000)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-comment {
		
		::v-deep .u-form-item--left__content {
			margin-right: 24rpx;
		}
		
		.footer {
			width: 100%;
			padding: 24rpx 40rpx;
			text-align: center;
		}

		.unit {
			color: #000;
		}

	}
</style>
