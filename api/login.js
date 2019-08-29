import http from "@/utils/request"
const prefix = "/sys/";
const formHead = {'X-Requested-Page': 'form','Content-Type':"application/x-www-form-urlencoded"};
export default {
	// 登入
	login(data) {
		return http(prefix+'login', 'post', data,formHead);
	},
	// 登出
	logout(){
		return http(prefix+'logout', 'post', data);
	}
}
