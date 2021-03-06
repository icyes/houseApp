import http from "@/utils/request"
const prefix = "/app/sign/";
export default {
	/**
	 * 小程序端签约登记
	 */
	// 删除
	del(data) {
		return http(prefix + 'delete', 'post', data);
	},
	// 详情
	info(id) {
		return http(prefix + 'info/' + id, 'post');
	},
	// 列表
	list(data) {
		return http(prefix + 'select', 'post', data);
	},
	// 保存
	save(data) {
		return http(prefix + 'save', 'post', data);
	},
	// 更新
	update(data) {
		return http(prefix + 'update', 'post', data);
	},
}
