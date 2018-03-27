<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form label-width="120px" label-position="right" class="demo-ruleForm">
                <el-form-item label="门票名称：">
                    <span>{{ticketInfo.ticketName}}</span>
                </el-form-item>
                <el-form-item label="景点地址：">
                    <span>{{ticketInfo.address}}</span>
                </el-form-item>
                <el-form-item label="总票数：">
                    <span>{{ticketInfo.ticketNum}}</span>
                </el-form-item>
                <el-form-item label="出发频率：">
                    <span>{{ticketInfo.startNumTxt}}</span>
                </el-form-item>
                <el-form-item label="出发时间：" v-if="startTimeShow">
                    <span>{{ticketInfo.startTime}}</span>
                </el-form-item>
                <el-form-item label="景点介绍：">
                    <span>{{ticketInfo.introduce}}</span>
                </el-form-item>
                <el-form-item label="图片上传：">
                    <img src="" alt="">
                </el-form-item>
                <el-form-item label="注意说明：">
                    <span>{{ticketInfo.tip}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger"><router-link to="/ticket/editTicket">去修改</router-link></el-button>
                    <el-button><router-link to="/ticket/index">门票管理</router-link></el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "watch-ticket",
        data() {
            return {
                ticketInfo: {
                    ticketName: '门票名称',
                    address: '焦作武陟',
                    ticketNum: '20',
                    startNum:-1,
                    startNumTxt:'每天',

                    introduce: '这里是介绍',
                    dialogImageUrl: '',
                    tip: '',
                },
                startTimeShow:this.startNum == '-1'?true:false
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 20px;
        .el-form {
            span {
                float: left;
                display: block;
                min-width: 300px;
                text-align: left;
                border-bottom: 1px solid #ccc;
            }
            .el-button {
                float: left;
                &:first-child {
                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
