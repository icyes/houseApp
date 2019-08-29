const Token = 'AUTH_TOKEN'

// 同步将数据存储在本地缓存中指定的 key 中
const set = (key, data) => {
	uni.setStorageSync(
		key,
		data
	);
}

// 同步获取缓存数据。
const get = (key) => {
	let res = uni.getStorageSync(key);
	return res
}

// 删除缓存数据。
const remove = (key) => {
	uni.removeStorageSync({
		key
	});
}

// 缓存token
const setToken = (v) => {
	set(Token, v)
}

// 获取token
const getToken = () => {
	return get(Token)
}

// 清除Token
const removeToken = () => {
	remove(Token)
}

// 清空缓存
const clear = ()=>{
	try {
	    uni.clearStorageSync();
	} catch (e) {
	    // error
	}
}


const storage = {
	set,
	get,
	remove,
	clear,
	setToken,
	removeToken,
	getToken
}

module.exports = storage
