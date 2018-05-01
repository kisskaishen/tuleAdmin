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
                            <el-button><i class="el-icon-menu"></i>秦文凯</el-button>
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
                        default-active="/index/index"
                        class="el-menu-vertical-demo"
                        router
                        @open="handleOpen"
                        @close="handleClose">
                        <el-menu-item index="/index/index">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页概览</span>
                        </el-menu-item>
                        <el-menu-item index="/ticket/index">
                            <i class="el-icon-menu"></i>
                            <span slot="title">门票管理</span>
                        </el-menu-item>
                        <el-menu-item index="/equip/index">
                            <i class="el-icon-menu"></i>
                            <span slot="title">装备管理</span>
                        </el-menu-item>
                        <el-menu-item index="/order/index">
                            <i class="el-icon-menu"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                        <el-menu-item index="/user/index">
                            <i class="el-icon-menu"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <transition name="el-fade-in">
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
            return {

            }
        },
        mounted() {

        },
        methods:{
            handleOpen() {
            },
            handleClose() {
            },
            outAdmin(command) {
                if (command == 'out') {
                    this.$confirm('确认退出？',{
                        confirmButtonText:'确认',
                        cancelButtonText:'取消',
                        type:'danger'
                    }).then(()=>{
                        this.$message.success('退出成功')
                        this.$router.push('/login')
                    }).catch(()=>{
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
                    background: url("../assets/logotule.png") no-repeat center /100%;
                }
            }
        }

    }


    .el-aside {
        background-color: #fff;
    }

    .el-main {
        background-color: #fff;
        margin: 20px 0 0 20px;
    }
</style>
