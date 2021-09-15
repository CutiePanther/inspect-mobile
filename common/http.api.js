const install = (Vue, vm) => {
	let api = {
		getShopInfo: (id) => vm.$u.get(`/merchantInfo/view/${id}`),
		getDirectory: () => vm.$u.get('/dic'),
		login: (params) => vm.$u.post('/login', params)
	}
	
	vm.$u.api = api;
}

export default {
	install
}