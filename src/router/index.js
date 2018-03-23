import Vue from 'vue'
import Router from 'vue-router'

const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'IndexIndex')
const TicketIndex = r => require.ensure([], () => r(require('@/view/ticket/index')), 'TicketIndex')
const AddTicket = r => require.ensure([], () => r(require('@/view/ticket/addTicket')), 'AddTicket')
const EditTicket = r => require.ensure([], () => r(require('@/view/ticket/editTicket')), 'EditTicket')
const WatchTicket = r => require.ensure([], () => r(require('@/view/ticket/watchTicket')), 'WatchTicket')

const EquipIndex = r => require.ensure([], () => r(require('@/view/equip/index')), 'EquipIndex')
const AddEquip = r => require.ensure([], () => r(require('@/view/equip/addEquip')), 'AddEquip')
const EditEquip = r => require.ensure([], () => r(require('@/view/equip/editEquip')), 'EditEquip')
const WatchEquip= r => require.ensure([], () => r(require('@/view/equip/watchEquip')), 'WatchEquip')

const OrderIndex = r => require.ensure([], () => r(require('@/view/order/index')), 'OrderIndex')
const UserIndex = r => require.ensure([], () => r(require('@/view/user/index')), 'UserIndex')


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: IndexIndex,
            children: [
                {
                    path: '/index/index',
                    component: IndexIndex
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
            path: '/user',
            component: UserIndex,
            children: [
                {
                    path: '/user/index',
                    component: UserIndex
                }
            ]
        }
    ]
})
