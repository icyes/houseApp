import Vue from 'vue'

const objFilter = function(obj) {
	let newObj = {};
	for (let i in obj) {
		if (obj[i] != null) newObj[i] = obj[i];
	}
	return newObj;
}

Vue.prototype.objFilter = objFilter;