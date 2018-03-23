<template>
    <div id="app">
        <el-container>
            <el-header height="80px">
                <h2><i class="logo"></i></h2>
                <div class="adminInfo">
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                        default-active="/"
                        class="el-menu-vertical-demo"
                        router
                        @open="handleOpen"
                        @close="handleClose">
                        <el-menu-item index="/">
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
        name: 'App',
        data() {
            return {

            }
        },
        created(){

        },
        methods:{
            handleOpen() {
            },
            handleClose() {
            }
        }
    }
</script>

<style lang="scss">
    @import './style/base.css';
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .el-header {
        background-color: #fff;
        border-bottom: 1px solid #333;
    }
    .logo {
        width: 60px;
        height: 60px;
        border: 1px solid red;
    }

    .el-aside {
        background-color: #fff;
    }

    .el-main {
        background-color: #fff;
        margin: 20px 0 0 20px;
    }
</style>
