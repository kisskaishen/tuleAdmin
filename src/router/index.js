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
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }

    ]
})

