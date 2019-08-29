import Vue from 'vue'
import App from './App'

//注册全局公用函数
import "@/utils/common/func.js"

/* ==================
        注册全局组件
 ==================== */
// cu-custom 头部导航栏
import CuCustom from '@/colorui/components/cu-custom.vue'
Vue.component('cu-custom', CuCustom)

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

// 页面抽屉
// import DrawerPage from '@/components/DrawerPage.vue'
// Vue.component('drawer-page',DrawerPage)
// 
Vue.config.productionTip = false

App.mpType = 'app'




const app = new Vue({
	...App
})
app.$mount()
