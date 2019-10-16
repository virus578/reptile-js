import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
// export
const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: { title: 'Amazon' },
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '测试', icon: 'home' }
    }]
  },
  {
    path: '/Amazon',
    component: Layout,
    redirect: '/example/table',
    name: 'Amazon',
    meta: { title: 'Amazon', icon: 'amazon (1)' },
    children: [
      {
        path: '/US',
        name: 'US',
        component: () => import('@/views/amazon/US/index'),
        meta: { title: 'Amazon-US' }
      },
      {
        path: '/UK',
        name: 'UK',
        component: () => import('@/views/amazon/UK/index'),
        meta: { title: '暂无其他站点...' }
      }
    ]
  },
  {
    path: '/eBay',
    component: Layout,
    name: 'eBay',
    meta: { title: 'eBay', icon: 'ebay' },
    children: [
      {
        path: '/ebay_US',
        name: 'ebay_US',
        component: () => import('@/views/ebay/US/index'),
        meta: { title: 'eBay-US' }
      },
      {
        path: '/ebay_UK',
        name: 'ebay_UK',
        component: () => import('@/views/ebay/UK/index'),
        meta: { title: '暂无其他站点...' }
      }
    ]
  },
  {
    path: '/AliExpress',
    component: Layout,
    //   redirect: '/example/table',
    name: 'AliExpress',
    meta: { title: 'AliExpress', icon: 'platform-aliexpress' },
    children: [
      {
        path: '/AliExpress-RUS',
        name: 'AliExpress-RUS',
        component: () => import('@/views/ali-express/RUS/index'),
        meta: { title: 'AliExpress-选品' }
      },
      {
        path: '/UK',
        name: 'UK',
        component: () => import('@/views/ali-express/UK/index'),
        meta: { title: '暂无其他站点...' }
      }
    ]
  },
  {
    path: 'system-settings',
    component: Layout,
    name: 'system-settings',
    meta: { title: '系统设置' },
    children: [
      {
        path: '/system-settings/platform/idnex',
        name: 'platform',
        component: () => import('@/views/system-settings/platform-manager/index'),
        meta: { title: '平台账号管理' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
