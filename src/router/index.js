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

const OrderIndex = r => require.ensure([], () => r(require('@/view/order/index')), 'OrderIndex')
const WatchOrder = r => require.ensure([], () => r(require('@/view/order/watchOrder')), 'WatchOrder')

const UserIndex = r => require.ensure([], () => r(require('@/view/user/index')), 'UserIndex')
const EditUser = r => require.ensure([], () => r(require('@/view/user/editUser')), 'EditUser')
const WatchUser = r => require.ensure([], () => r(require('@/view/user/watchUser')), 'WatchUser')

const BannerIndex = r => require.ensure([], () => r(require('@/view/banner/index')), 'BannerIndex')
const EditBanner = r => require.ensure([], () => r(require('@/view/banner/editBanner')), 'EditBanner')


Vue.use(Router)

export default new Router({
    mode: 'history',
    linkActiveClass: '',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/index/index',
            component: Home,
            children: [
                {
                    path: '/index',
                    component: IndexIndex,
                    children: [
                        {
                            path: '/index/index',
                            component: IndexIndex,
                        }
                    ]
                },
                // 门票管理
                {
                    path: '/ticket',
                    component: TicketIndex,
                    children: [
                        {
                            path: '/ticket/index',
                            component: TicketIndex
                        }
                    ]
                },
                {
                    path: '/ticket/addTicket',
                    component: AddTicket,
                },
                {
                    path: '/ticket/editTicket',
                    component: EditTicket,
                },
                {
                    path: '/ticket/watchTicket',
                    component: WatchTicket,
                },
                // 装备管理
                {
                    path: '/equip',
                    component: EquipIndex,
                    children: [
                        {
                            path: '/equip/index',
                            component: EquipIndex
                        }
                    ]
                },
                {
                    path: '/equip/addEquip',
                    component: AddEquip,
                },
                {
                    path: '/equip/addEquipType',
                    component: AddEquipType,
                },
                {
                    path: '/equip/editEquip',
                    component: EditEquip,
                },
                {
                    path: '/equip/watchEquip',
                    component: WatchEquip,
                },
                // 订单管理
                {
                    path: '/order',
                    component: OrderIndex,
                    children: [
                        {
                            path: '/order/index',
                            name: 'index',
                            component: OrderIndex
                        }
                    ]
                },
                {
                    path: '/order/watchOrder',
                    component: WatchOrder,
                },
                // 用户管理
                {
                    path: '/user',
                    component: UserIndex,
                    children: [
                        {
                            path: '/user/index',
                            component: UserIndex
                        }
                    ]
                },
                {
                    path: '/user/editUser',
                    component: WatchOrder,
                },
                {
                    path: '/user/watchOrder',
                    component: WatchOrder,
                },
                // banner图管理
                {
                    path: '/banner',
                    component: BannerIndex,
                    children: [
                        {
                            path: '/banner/index',
                            component: BannerIndex
                        }
                    ]
                },
                {
                    path: '/banner/editBanner',
                    component: EditBanner,
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

