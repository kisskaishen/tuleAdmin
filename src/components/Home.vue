<template>
    <div>
        <el-container>
            <el-header height="80px">
                <div class="header">
                    <router-link to="/">
                        <h2>
                            <i class="logo"></i>
                            <span>途乐户外管理后台</span>
                        </h2>
                    </router-link>
                    <div class="adminInfo">
                        <el-dropdown trigger="click" @command="outAdmin">
                            <el-button><i class="el-icon-menu"></i>{{$local.get('adminInfo').admin_name}}</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="out">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                        :default-active="$route.path"
                        class="el-menu-vertical-demo"
                        router
                        @open="handleOpen"
                        @close="handleClose">
                        <el-menu-item index="/index/index">
                            <i class="index"></i>
                            <span slot="title">首页概览</span>
                        </el-menu-item>
                        <el-menu-item index="/ticket/index">
                            <i class="ticket"></i>
                            <span slot="title">门票管理</span>
                        </el-menu-item>
                        <el-menu-item index="/equip/index">
                            <i class="equip"></i>
                            <span slot="title">装备管理</span>
                        </el-menu-item>
                        <el-menu-item index="/order/index">
                            <i class="order"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                        <el-menu-item index="/user/index">
                            <i class="user"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/banner/index">
                            <i class="banner"></i>
                            <span slot="title">banner图管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <transition name="el-fade-out-linear">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {}
        },
        mounted() {

        },
        methods: {
            handleOpen() {
            },
            handleClose() {
            },
            outAdmin(command) {
                if (command == 'out') {
                    this.$confirm('确认退出？', {
                        confirmButtonText: '确认',
                        cancelButtonText: '取消',
                        type: 'danger'
                    }).then(() => {
                        this.$message.success('退出成功')
                        this.$local.delete('adminInfo')
                        this.$router.push('/login')
                    }).catch(() => {
                        this.$message.info('取消退出')
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-header {
        background-color: #fff;
        border-bottom: 1px solid #333;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-content: center;
            width: 96%;
            height: 100%;
            margin: 0 auto;
            h2 {
                display: flex;
                align-items: center;
                .logo {
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    margin-right: 20px;
                    background: url("../images/logotule.png") no-repeat center /100%;
                }
            }
        }

    }

    .el-aside {
        background-color: #fff;
        .el-menu-item {
            i {
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;
            }
        }
        .is-active {
            .index {
                background: url("../images/index-active.png") no-repeat center /100%;
            }
            .ticket {
                background: url("../images/ticket-active.png") no-repeat center /100%;
            }
            .equip {
                background: url("../images/equip-active.png") no-repeat center /100%;
            }
            .order {
                background: url("../images/order-active.png") no-repeat center /100%;
            }
            .user {
                background: url("../images/user-active.png") no-repeat center /100%;
            }
            .banner {
                background: url("../images/banner-active.png") no-repeat center /100%;
            }
        }
    }

    .el-main {
        background-color: #fff;
        margin: 20px 0 0 20px;
    }


</style>
