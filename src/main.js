/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import _ from 'lodash';


Vue.config.productionTip = false
Vue.use(iView);

const instance = Axios.create({
    // baseURL: 'https://bjjj.zhongchebaolian.com',
    withCredentials:true
});

Vue.prototype.$http = instance
Vue.prototype.$_ = _

new Vue({
    render: h => h(App)
}).$mount('#app')
