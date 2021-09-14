const url = {
	getShopInfo: '/merchantInfo/view',
	getDirectory: '/dic',
	login: 'login'
}

const install = (Vue, vm) => {
	let api = {
		getShopInfo: (id) => vm.$u.get(`${url.getShopInfo}/${id}`),
		getDirectory: () => vm.$u.get(url.getDirectory),
		login: (params) => vm.$u.post(url.login, params)
	}
	
	vm.$u.api = api;
}

export default {
	install
}