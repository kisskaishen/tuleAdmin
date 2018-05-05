<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>

        <el-row>
            <el-col :span="6" :offset="1">
                <router-link to="/ticket/index">
                    <i class="ticket"></i>
                    <p>门票管理(100)</p>
                </router-link>
            </el-col>

            <el-col :span="6" :offset="1">
                <router-link to="/equip/index">
                    <i class="equip"></i>
                    <p>装备管理(100)</p>
                </router-link>
            </el-col>

            <el-col :span="6" :offset="1">
                <router-link to="/order/index">
                    <i class="order"></i>
                    <p>订单管理(100)</p>
                </router-link>
            </el-col>

            <el-col :span="6" :offset="1">
                <router-link to="/user/index">
                    <i class="user"></i>
                    <p>用户管理(100)</p>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "index",
        data() {
            return {}
        },
        components: {BreadCrumb},

        mounted() {

        },
        methods: {
            handleOpen() {
            },
            handleClose() {
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-col {
        border: 1px solid #ccc;
        margin-top: 20px;
        border-radius: 10px;
        a {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            align-items: center;
            i {
                width: 80px;
                height: 80px;
                margin: 20px;
            }
            p {
                padding: 0 0 10px;
                font-size: 20px;
            }
        }
    }

</style>
