<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form inline label-position="right" :model="searchForm" label-width="80px" class="demo-form-inline"
                     style="border-bottom: 0px;">
                <el-form-item label="订单号">
                    <el-input v-model="searchForm.orderNum" size="small" clearable placeholder="订单号查询"></el-input>
                </el-form-item>

                <el-form-item label="下单时间">
                    <el-date-picker
                        v-model="searchForm.orderTime"
                        type="date"
                        size="small"
                        placeholder="下单时间查询"></el-date-picker>
                </el-form-item>
                <!--<el-form-item label="订单分类">-->
                <!--<el-select v-model="searchForm.orderType" size="small" placeholder="订单分类">-->
                <!--<el-option-->
                <!--v-for="item in searchForm.orderTypes"-->
                <!--:key="item.id"-->
                <!--:label="item.label"-->
                <!--:value="item.id"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="订单状态">
                    <el-select v-model="searchForm.orderStatus" size="small" placeholder="订单状态">
                        <el-option
                            v-for="item in searchForm.orderStatuses"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>


            </el-form>
            <el-form inline label-position="right" :model="searchForm" label-width="80px" class="demo-form-inline">
                <el-form-item label="购买人">
                    <el-input v-model="searchForm.orderPeople" size="small" clearable placeholder="购买人姓名查询"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="searchForm.orderTel" size="small" clearable placeholder="购买人手机号查询"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="danger">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success">导出Excel</el-button>
                </el-form-item>

            </el-form>
            <el-table :data="orderData" style="width: 100%;" size="medium" highlight-current-row>
                <el-table-column header-align="center" align="center" prop="orderNum" label="订单号"></el-table-column>
                <el-table-column header-align="center" align="center" width="160px" label="购买人">
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.orderPeople}}</el-button>
                        <el-button type="text">{{scope.row.orderTel}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" width="100px"
                                 label="商品名称">
                    <template slot-scope="scope">
                        <p>{{scope.row.ticketName}}</p>
                        <p>x{{scope.row.ticketNum}}</p>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" width="100px" prop="payMoney"
                                 label="支付金额"></el-table-column>
                <el-table-column header-align="center" align="center" width="200px"
                                 label="下单/支付时间">
                    <template slot-scope="scope">
                        <p>下单：{{scope.row.orderTime}}</p>
                        <p>支付：{{scope.row.payTime}}</p>
                    </template>
                </el-table-column>

                <el-table-column header-align="center" align="center" width="100px" prop="payStatus"
                                 label="订单状态"></el-table-column>
                <el-table-column header-align="center" align="center" width="120px" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" plain @click="seeOrder(scope)">查看</el-button>
                        <el-button type="danger" size="small" plain @click="deleteOrder(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                layout="prev, pager, next"
                @current-change="pageChange"
                :total="totalPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "index",
        data() {
            return {
                searchForm: {
                    orderNum: '',
                    orderPeople: '',
                    orderTel: '',
                    orderTime: '',
                    payTime: '',
                    orderStatuses: [
                        {
                            id: '0',
                            label: '全部状态'
                        },
                        {
                            id: '1',
                            label: '支付成功'
                        },
                        {
                            id: '2',
                            label: '未支付'
                        }
                    ],
                    orderStatus: '0',
                },
                orderData: [
                    {
                        id: '1',
                        orderNum: '1231241434',
                        orderPeople: '秦文凯',
                        orderTel: '13798238693',
                        ticketName: '云台山门票',
                        ticketNum:'1',
                        orderTime: '2018-03-13 12:00:00',
                        payTime: '2018-03-13 12:00:00',
                        payMoney: '20',
                        payStatus: '支付成功'
                    }
                ],
                totalPage:1
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            seeOrder(e) {
                console.log(e)
                this.$router.push('/order/watchOrder')
            },
            deleteOrder(e) {
                this.$confirm('确认删除此条信息？', '提示', {
                    confirmButtonText: '确认',
                    confirmButtonText: '取消',
                    type: 'warning'
                })
                    .then((res) => {
                        this.orderData.splice(e.$index, 1)
                        this.$message.success('删除成功')
                    })
                    .catch((err) => {
                        this.$message.info('取消删除')
                    })
            },
            // 改变当前页
            pageChange(val) {
                alert(val)
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 10px;
        .el-form {
            display: flex;
            justify-content: flex-start;
            border-bottom: 1px solid #ccc;
            .el-input, .el-select {
                width: 140px;
            }
            .el-date-picker {
                width: 160px;
            }
            .el-button {
                a {
                    color: #fff;
                }
            }
        }
        .el-table {
            .el-button {
                margin: 0;
                padding: 4px;
            }
        }
    }
</style>
