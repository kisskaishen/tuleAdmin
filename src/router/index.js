import Vue from 'vue'
import Router from 'vue-router'

const Login = r => require.ensure([], () => r(require('@/components/login')), 'Login')

const Home = r => require.ensure([], () => r(require('@/components/Home')), 'Home')

const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'IndexIndex')

const TicketIndex = r => require.ensure([], () => r(require('@/view/ticket/index')), 'TicketIndex')
const AddTicket = r => require.ensure([], () => r(require('@/view/ticket/addTicket')), 'AddTicket')
const EditTicket = r => require.ensure([], () => r(require('@/view/ticket/editTicket')), 'EditTicket')
const WatchTicket = r => require.ensure([], () => r(require('@/view/ticket/watchTicket')), 'WatchTicket')

const EquipIndex = r => require.ensure([], () => r(require('@/view/equip/index')), 'EquipIndex')
const AddEquip = r => require.ensure([], () => r(require('@/view/equip/addEquip')), 'AddEquip')
const AddEquipType = r => require.ensure([], () => r(require('@/view/equip/addEquipType')), 'AddEquipType')
const EditEquip = r => require.ensure([], () => r(require('@/view/equip/editEquip')), 'EditEquip')
const WatchEquip = r => require.ensure([], () => r(require('@/view/equip/watchEquip')), 'WatchEquip')

const FruitIndex = r => require.ensure([], () => r(require('@/view/fruit/index')), 'FruitIndex')
const AddFruit = r => require.ensure([], () => r(require('@/view/fruit/addFruit')), 'AddFruit')


const OrderIndex = r => require.ensure([], () => r(require('@/view/order/index')), 'OrderIndex')
const WatchOrder = r => require.ensure([], () => r(require('@/view/order/watchOrder')), 'WatchOrder')

const UserIndex = r => require.ensure([], () => r(require('@/view/user/index')), 'UserIndex')
// const EditUser = r => require.ensure([], () => r(require('@/view/user/editUser')), 'EditUser')
const WatchUser = r => require.ensure([], () => r(require('@/view/user/watchUser')), 'WatchUser')


const BannerIndex = r => require.ensure([], () => r(require('@/view/banner/index')), 'BannerIndex')
const EditBanner = r => require.ensure([], () => r(require('@/view/banner/editBanner')), 'EditBanner')


Vue.use(Router)
let router = new Router({
    mode: 'history',
    linkActiveClass: '',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/index/index',
            component: Home,
            meta: {
                title: '途乐管理系统',
                login: true
            },
            children: [
                {
                    path: '/index',
                    component: IndexIndex,
                    meta: {
                        title: '途乐管理系统',
                        login: true
                    },
                    children: [
                        {
                            path: '/index/index',
                            component: IndexIndex,
                            meta: {
                                title: '途乐管理系统',
                                login: true
                            },
                        }
                    ]
                },
                // 门票管理
                {
                    path: '/ticket',
                    component: TicketIndex,
                    meta: {
                        title: '门票管理',
                        login: true
                    },
                    children: [
                        {
                            path: '/ticket/index',
                            component: TicketIndex,
                            meta: {
                                title: '门票管理',
                                login: true
                            },
                        }
                    ]
                },
                {
                    path: '/ticket/addTicket',
                    component: AddTicket,
                    meta: {
                        title: '添加门票',
                        login: true
                    },
                },
                {
                    path: '/ticket/editTicket',
                    component: EditTicket,
                    meta: {
                        title: '编辑门票',
                        login: true
                    },
                },
                {
                    path: '/ticket/watchTicket',
                    component: WatchTicket,
                    meta: {
                        title: '查看门票',
                        login: true
                    },
                },
                // 装备管理
                {
                    path: '/equip',
                    component: EquipIndex,
                    meta: {
                        title: '装备管理',
                        login: true
                    },
                    children: [
                        {
                            path: '/equip/index',
                            component: EquipIndex,
                            meta: {
                                title: '装备管理',
                                login: true
                            },
                        }
                    ]
                },
                {
                    path: '/equip/addEquip',
                    component: AddEquip,
                    meta: {
                        title: '添加装备',
                        login: true
                    },
                },
                {
                    path: '/equip/addEquipType',
                    component: AddEquipType,
                    meta: {
                        title: '新增装备分类',
                        login: true
                    },
                },
                {
                    path: '/equip/editEquip',
                    component: EditEquip,
                    meta: {
                        title: '编辑装备',
                        login: true
                    },
                },
                {
                    path: '/equip/watchEquip',
                    component: WatchEquip,
                    meta: {
                        title: '查看装备',
                        login: true
                    },
                },

                // 果蔬管理
                {
                    path: '/fruit/index',
                    component: FruitIndex,
                    meta: {
                        title: '果蔬管理',
                        login: true
                    },
                },
                {
                    path: '/fruit/addFruit',
                    component: AddFruit,
                    meta: {
                        title: '添加果蔬',
                        login: true
                    },
                },
                // 订单管理
                {
                    path: '/order',
                    component: OrderIndex,
                    meta: {
                        title: '订单管理',
                        login: true
                    },
                    children: [
                        {
                            path: '/order/index',
                            component: OrderIndex,
                            meta: {
                                title: '订单管理',
                                login: true
                            },
                        }
                    ]
                },
                {
                    path: '/order/watchOrder',
                    component: WatchOrder,
                    meta: {
                        title: '查看订单',
                        login: true
                    },
                },
                // 用户管理
                {
                    path: '/user',
                    component: UserIndex,
                    meta: {
                        title: '用户管理',
                        login: true
                    },
                    children: [
                        {
                            path: '/user/index',
                            component: UserIndex,
                            meta: {
                                title: '用户管理',
                                login: true
                            },
                        }
                    ]
                },
                {
                    path: '/user/watchUser',
                    component: WatchUser,
                    meta: {
                        title: '查看用户',
                        login: true
                    },
                },


                // banner图管理
                {
                    path: '/banner',
                    component: BannerIndex,
                    meta: {
                        title: 'banner管理',
                        login: true
                    },
                    children: [
                        {
                            path: '/banner/index',
                            component: BannerIndex,
                            meta: {
                                title: 'banner管理',
                                login: true
                            },
                        }
                    ]
                },
                {
                    path: '/banner/editBanner',
                    component: EditBanner,
                    meta: {
                        title: '编辑banner',
                        login: true
                    },
                },

            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }

    ]
})


router.beforeEach((to,from,next)=>{
    if(to.matched.some((item)=>item.meta.login)) {
        let adminName = router.app.$local.get('adminInfo').admin_name
        if(adminName) {
            next()
        } else {
            router.push('/login')
        }
    } else {
        next()
    }
    if (to.meta.title) {
        window.document.title = to.meta.title
    } else {
        window.document.title = '途乐户外管理后台'
    }
})

export default router

