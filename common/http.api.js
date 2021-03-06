const install = (Vue, vm) => {
	const api = {
		getShopInfo: (id) => vm.$u.get(`/merchantInfo/view/${id}`),
		modifyShopInfo: (params) => vm.$u.put('/merchantInfo/edit', params),
		getDirectory: () => vm.$u.get('/cacheDic'),
		login: (params) => vm.$u.post('/login', params),
		settingPassword: (params) => vm.$u.post('/revise', params),
		logout: (params) => vm.$u.get('/exit', params),
		getRecordList: (params) => vm.$u.get('/patrolInfo/page', params),
		getRecordDetail: (id) => vm.$u.get(`/patrolInfo/view/${id}`),
		addPatrols: (params) => vm.$u.post('/patrolInfo/add', params),
		addScore: (params) => vm.$u.post('/patrolInfo/score/add', params),
		getComments: (params) => vm.$u.get('/tourist/page', params),
		addComment: (params) => vm.$u.post('/tourist/add', params),
		getPublicKey: (username) => vm.$u.get(`/getPublicKey/${username}`)
	}
	
	vm.$u.api = api;
}

export default {
	install
}