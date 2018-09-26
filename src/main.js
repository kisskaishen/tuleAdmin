// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {get, post, upload, baseUrl, baseUrlApi} from './config/api'

import Util from './config/utils'
import $ from 'jquery'
Vue.use(Util)


Vue.use(ElementUI);
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$upload = upload          // 图片上传专用
Vue.prototype.$baseUrl = baseUrl
Vue.prototype.$baseUrlApi = baseUrlApi

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
