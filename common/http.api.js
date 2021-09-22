const install = (Vue, vm) => {
	let api = {
		getShopInfo: (id) => vm.$u.get(`/merchantInfo/view/${id}`),
		modifyShopInfo: (params) => vm.$u.post('/merchantInfo/update', params),
		getDirectory: () => vm.$u.get('/dic'),
		login: (params) => vm.$u.post('/login', params),
		logout: (params) => vm.$u.get('/exit', params),
		getRecordList: (params) => vm.$u.get('/patrolInfo/page', params),
		getRecordDetail: (id) => vm.$u.get(`/patrolInfo/view/${id}`)
	}
	
	vm.$u.api = api;
}

export default {
	install
}