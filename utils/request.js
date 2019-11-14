import config from '@/config/index.js'
import storage from "./storage"
import util from "@/utils"
const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
}
export default function(url, method, data = {}, header = {}) {
	let self = this
	let app = getApp()
	let defheader = {
		'token': storage.getToken() ? storage.getToken() : '',
		'content-type': 'application/json',
		'X-Requested-Page': 'json'
	}
	header = Object.assign(defheader, header);
	return new Promise(function(resolve, reject) {
		uni.request({
			url: config.HTTPURL + url,
			data: data,
			method: method || METHOD.GET,
			header: header,
			success: function(res) {
				let {
					data: {
						data,
						status,
						msg
					}
				} = res
				if (status == 200) {
					resolve(data);
				} else if (status === 401) {
					util.toast('登入已过期，请重新登入')
					setTimeout(() => {
						storage.clear();
						util.navigateTo('/pages/login/login')
					}, 1000)
				} else {
					util.toast(msg)
					// reject(msg);
				}
			},
			fail: function(res) {
				reject(res.data);
			}
		})
	})
}
