<template>
    <div class="bread">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="'/'+firstNav">{{navName}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="navLen">{{navName2}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "bread-crumb",
        props: ['path'],
        data() {
            return {
                navName: '',
                navName2: '',
                navLen: true,
                firstNav: '',
                secondNav: '',
            }
        },
        mounted() {
            this.navData(this.path)
        },
        methods: {
            navData(path) {
                this.firstNav = path.split('/')[1]
                this.secondNav = path.split('/')[2]
                if (path.slice(-5) == 'index' || path == '/') {
                    this.navLen = false
                } else {
                    this.navLen = true
                }

                switch (this.firstNav) {
                    case '/':
                        this.navName = '首页概览'
                        this.firstNav = ''
                        break;
                    case 'ticket':
                        this.navName = '门票管理'
                        this.firstNav = 'ticket'
                        break;
                    case 'equip':
                        this.navName = '装备管理'
                        this.firstNav = 'equip'
                        break;
                    case 'fruit':
                        this.navName = '果蔬管理'
                        this.firstNav = 'equip'
                        break;
                    case 'order':
                        this.navName = '订单管理'
                        this.firstNav = 'order'
                        break;
                    case 'user':
                        this.navName = '用户管理'
                        this.firstNav = 'user'
                        break;
                    case 'banner':
                        this.navName = 'banner管理'
                        this.firstNav = 'banner'
                        break;
                }
                switch (this.secondNav) {
                    case 'addTicket':
                        this.navName2 = '添加门票'
                        break;
                    case 'editTicket':
                        this.navName2 = '修改门票'
                        break;
                    case 'watchTicket':
                        this.navName2 = '查看门票'
                        break;
                    case 'addEquip':
                        this.navName2 = '添加装备'
                        break;
                    case 'editEquip':
                        this.navName2 = '编辑装备'
                        break;
                    case 'addEquipType':
                        this.navName2 = '添加装备分类'
                        break;
                    case 'watchEquip':
                        this.navName2 = '查看装备'
                        break;
                    case 'addFruit':
                        this.navName2 = '添加果蔬'
                        break;
                    case 'watchOrder':
                        this.navName2 = '查看订单'
                        break;
                    case 'watchUser':
                        this.navName2 = '查看用户信息'
                        break;
                    case 'editUser':
                        this.navName2 = '编辑用户信息'
                        break;
                    case 'editBanner':
                        if (this.$route.query.id) {
                            this.navName2 = '编辑banner图'
                        } else {
                            this.navName2 = '添加banner图'
                        }
                        break;

                }
            }
        }
    }
</script>

<style scoped>

</style>
