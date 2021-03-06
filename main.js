import Vue from 'vue'
import App from './App'
import moment from "moment"
//注册全局公用函数
import "@/utils/common/func.js"

/* ==================
        注册全局组件
 ==================== */
// cu-custom 头部导航栏
import CuCustom from '@/colorui/components/cu-custom.vue'
Vue.component('cu-custom', CuCustom)

// project
import project from '@/pages/project/index.vue'
Vue.component('project', project)

// Home
import Home from '@/pages/index/home.vue'
Vue.component('home', Home)

// 回到顶部
import BackTop from '@/components/BackTop.vue'
Vue.component('back-top', BackTop)

// 空数据
import EmptyData from '@/components/EmptyData.vue'
Vue.component('empty-data', EmptyData)

// 顶部搜索弹框
import FiltrateModal from '@/components/FiltrateModal.vue'
Vue.component('filtrate-modal', FiltrateModal)

// 列表头部
import ListBar from '@/components/ListBar.vue'
Vue.component('list-bar', ListBar)

// 添加弹窗
import CuModal from '@/components/CuModal.vue'
Vue.component('cu-modal', CuModal)

// 分页加载中
import Paging from '@/components/Paging.vue'
Vue.component('paging', Paging)

// 弹窗modal
import DrawerModal from '@/components/DrawerModal.vue'
Vue.component('drawer-modal', DrawerModal)


// 数字输入框
import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
Vue.component('number-box', uniNumberBox)


// 页面抽屉
// import DrawerPage from '@/components/DrawerPage.vue'
// Vue.component('drawer-page',DrawerPage)
// 
Vue.config.productionTip = false

// 时间格式化工具
Vue.prototype.$moment = moment;

App.mpType = 'app'




const app = new Vue({
	...App
})
app.$mount()
