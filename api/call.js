import http from "@/utils/request"
const prefix = "/app/call/";
const formHead = {'X-Requested-Page': 'form','Content-Type':"application/x-www-form-urlencoded"};
export default {

	/**
	 * 客户端
	 * 
	 * 小程序端来电登记管理
	 */
	// 删除来电登记
	del(data) {
		return http(prefix + 'delete', 'post', data);
	},
	// 来电登记详情
	info(id) {
		return http(prefix + 'info/' + id, 'post');
	},
	// 来电登记列表
	list(data) {
		return http(prefix + 'list', 'post', data);
	},
	// 保存来电登记
	save(data) {
		return http(prefix + 'save', 'post', data);
	},
	// 更新来电登记
	update(data) {
		return http(prefix + 'update', 'post', data);
	}
}
