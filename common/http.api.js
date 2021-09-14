const url = {
	getShopInfo: '/merchantInfo/view',
	getDirectory: '/dic'
}

const install = (Vue, vm) => {
	let getShopInfo = (id) => vm.$u.get(`${url.getShopInfo}/${id}`);
	let getDirectory = () => vm.$u.get(url.getDirectory);
	// 此处使用了传入的params参数，一切自定义即可
	// let getDirectory = (params = {}) => vm.$u.post(indexUrl, params);
	
	vm.$u.api = { getShopInfo, getDirectory };
}

export default {
	install
}