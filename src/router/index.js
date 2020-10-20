import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueRouter)

const routes = [

  {
    path: '/payList',
    component: () => import('@/views/pay-list.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
