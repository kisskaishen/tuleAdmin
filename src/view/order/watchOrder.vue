<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-collapse v-model="activeName">
                <el-collapse-item name="1">
                    <template slot="title">
                        <i class="el-icon-info"></i>订单信息
                    </template>
                    <el-form class="orderInfo" label-width="140px" label-position="right">
                        <el-form-item label="订单号："></el-form-item>
                        <el-form-item label="订单商品："></el-form-item>
                        <el-form-item label="支付金额："></el-form-item>
                        <el-form-item label="订单状态："></el-form-item>
                        <el-form-item label="下单时间："></el-form-item>
                        <el-form-item label="支付时间："></el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <i class="el-icon-success"></i>用户信息
                    </template>
                    <el-form class="orderInfo" label-width="140px" label-position="right">
                        <el-form-item label="用户账号："></el-form-item>
                        <el-form-item label="用户姓名："></el-form-item>
                        <el-form-item label="用户手机号："></el-form-item>
                        <el-form-item label="用户身份证："></el-form-item>
                        <el-form-item label="用户昵称："></el-form-item>
                        <el-form-item label="用户性别："></el-form-item>
                        <el-form-item label="用户头像："></el-form-item>
                    </el-form>
                </el-collapse-item>

                <el-collapse-item name="3">
                    <template slot="title">
                        <i class="el-icon-success"></i>游客信息
                    </template>
                    <el-form class="orderInfo" label-width="140px" label-position="right">
                        <el-form-item label="游客姓名："></el-form-item>
                        <el-form-item label="游客手机号："></el-form-item>
                        <el-form-item label="游客身份证："></el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "watch-order",
        data() {
            return {
                activeName: ['1']
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 20px;
        .el-collapse-item {
            text-align: left;
            .el-form {
                .el-form-item {
                    margin-bottom: 0;
                }
            }
        }
    }


</style>
