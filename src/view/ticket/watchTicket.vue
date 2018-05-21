<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form label-width="140px" label-position="right" class="demo-ruleForm">
                <el-form-item label="门票名称：">
                    <span>{{ticketInfo.ticket_name}}</span>
                </el-form-item>
                <el-form-item label="景点地址：">
                    <span>{{ticketInfo.narea}}</span>
                </el-form-item>
                <el-form-item label="票价：">
                    <span>{{ticketInfo.price}}元</span>
                </el-form-item>
                <el-form-item label="总票数：">
                    <span>{{ticketInfo.delivery_num}}</span>
                </el-form-item>
                <el-form-item label="包含事项：">
                    <span>内容1、内容2、内容3</span>
                </el-form-item>

                <el-form-item label="是否为热销产品：">
                    <span>{{ticketInfo.is_hot=='1'?'是':'否'}}</span>
                </el-form-item>
                <el-form-item label="是否为特卖产品：">
                    <span>{{ticketInfo.is_sale=='1'?'是':'否'}}</span>
                </el-form-item>
                <el-form-item label="发团类型：">
                    <span>{{ticketInfo.leave_type=='1'?'每日发团':'固定时间发团'}}</span>
                </el-form-item>
                <el-form-item label="出发时间：" v-if="ticketInfo.leave_type=='2'">
                    <span>{{ticketInfo.leave_date}}</span>
                </el-form-item>
                <el-form-item label="景点介绍：">
                    <span>{{ticketInfo.introduce}}</span>
                </el-form-item>
                <el-form-item label="图片上传：">
                    <img :src="item.image" alt="" v-for="item,index in ticketInfo.images">
                </el-form-item>
                <el-form-item label="注意说明：">
                    <span>{{ticketInfo.attention}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger">
                        <router-link :to="'editTicket?ticket_id='+this.$route.query.ticket_id">去修改</router-link>
                    </el-button>
                    <el-button>
                        <router-link to="/ticket/index">门票管理</router-link>
                    </el-button>
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
                ticketInfo: {},
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getInfo()
        },
        methods: {
            getInfo() {
                this.$post('ticket/ticket_detail', {
                    ticket_id: this.$route.query.ticket_id
                })
                    .then(res => {
                        this.ticketInfo = res.data
                    })
            },
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
            img {
                float: left;
                width: 160px;
                height: 160px;
                margin-right: 20px;
            }
        }
    }
</style>
