<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form inline label-position="right" :model="searchForm" label-width="80px" class="demo-form-inline"
                     style="border-bottom: 0px;">
                <el-form-item label="门票名称">
                    <el-input v-model="searchForm.ticketName" size="small" clearable placeholder="如云台山"></el-input>
                </el-form-item>

                <el-form-item label="时间选择">
                    <el-select v-model="searchForm.timeType" size="small">
                        <el-option
                            v-for="item in searchForm.timeTypes"
                            :key="item.type"
                            :label="item.label"
                            :value="item.type"></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="searchForm.orderTime"
                        type="date"
                        size="small"
                        placeholder="时间查询"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

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
                <el-form-item label="订单号">
                    <el-input v-model="searchForm.orderNum" size="small" clearable placeholder="订单号查询"></el-input>
                </el-form-item>
                <el-form-item label="购买人">
                    <el-select v-model="searchForm.buyerType" size="small">
                        <el-option
                            v-for="item in searchForm.buyerTypes"
                            :key="item.type"
                            :label="item.label"
                            :value="item.type"></el-option>
                    </el-select>
                    <el-input v-model="searchForm.orderPeople" size="small" clearable placeholder="购买人信息查询"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="danger" @click="searchBtn">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success" @click="outExcel">导出出行游客</el-button>
                </el-form-item>

            </el-form>
            <el-table :data="orderData" style="width: 100%;" size="medium" highlight-current-row>
                <el-table-column header-align="center" align="center" prop="order_sn" label="订单号"></el-table-column>
                <el-table-column header-align="center" align="center" label="购买人">
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.member_truename}}</el-button>
                        <el-button type="text">{{scope.row.member_mobile}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="商品名称">
                    <template slot-scope="scope">
                        <p>{{scope.row.goods_name}}</p>
                        <p>x{{scope.row.goods_num}}</p>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="order_amount"
                                 label="支付金额"></el-table-column>
                <el-table-column header-align="center" align="center" label="下单/支付时间">
                    <template slot-scope="scope">
                        <p>下单：{{scope.row.create_time}}</p>
                        <p>支付：{{scope.row.payment_time}}</p>
                    </template>
                </el-table-column>

                <el-table-column header-align="center" align="center"
                                 label="订单状态">
                    <template slot-scope="scope">
                        <span :class="scope.row.order_state=='已支付'?'paySuccess':''">{{scope.row.order_state}}</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" plain @click="seeOrder(scope)">查看</el-button>
                        <el-button type="danger" size="small" plain @click="deleteOrder(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="pageChange"
                :page-sizes="[10, 20]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
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
                    ticketName: '',
                    buyerTypes: [
                        {
                            type: 'member_truename',
                            label: '购买人姓名'
                        },
                        {
                            type: 'member_mobile',
                            label: '手机号'
                        }
                    ],
                    buyerType: 'member_truename',
                    orderPeople: '',
                    orderTime: '',
                    timeTypes: [
                        {
                            type: 'leave_date',
                            label: '出发时间'
                        },
                        {
                            type: 'create_time',
                            label: '下单时间'
                        },
                        {
                            type: 'payment_time',
                            label: '支付时间'
                        }
                    ],
                    timeType: 'leave_date',
                    orderStatuses: [
                        {
                            id: '',
                            label: '全部状态'
                        },
                        {
                            id: '20',
                            label: '已支付'
                        },
                        {
                            id: '10',
                            label: '未支付'
                        }
                    ],
                    orderStatus: '',
                    orderNum: '',
                },
                page: '1',
                orderData: [],
                pageSize: 10,
                totalPage: 1
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getOrderList()
        },
        methods: {
            getOrderList() {
                this.$post('Order/order_list', {
                    order_sn: this.searchForm.orderNum,
                    order_state: this.searchForm.orderStatus,
                    field_name: this.searchForm.timeType,
                    field_value: this.searchForm.orderTime,
                    search_field_name: this.searchForm.buyerType,
                    search_field_value: this.searchForm.orderPeople,
                    page: this.page,
                    page_size: this.pageSize
                })
                    .then(res => {
                        this.orderData = res.data.list
                        this.totalPage = res.data.last_page * 10
                    })
            },
            // 条件查询
            searchBtn() {
                this.page = '1'
                this.getOrderList()
            },
            // 导出excel
            outExcel() {
                if (this.searchForm.timeType == 'leave_date' && this.searchForm.orderTime != '' && this.searchForm.ticketName != '') {
                    this.$post('Order/out_vister', {
                        leave_date: this.searchForm.orderTime,
                        ticket_name: this.searchForm.ticketName
                    }).then(res => {
                        location.href = this.$baseUrl + 'Order/out_vister?leave_date=' + this.searchForm.orderTime + '&ticket_name=' + this.searchForm.ticketName
                    })
                } else {
                    this.$message({
                        message: '请选择出发时间和门票名称才成正确导出哦~',
                        type: 'warning',
                        duration: 2000
                    });
                }
            },
            // 页数选择
            handleSizeChange(val) {
                this.pageSize = val
                this.getOrderList()
            },
            seeOrder(e) {
                this.$router.push({
                    path: '/order/watchOrder',
                    query: {
                        order_id: e.row.order_id
                    }
                })
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
                this.page = val
                this.getOrderList()
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
            .paySuccess {
                color: #85ce61;
            }
        }
    }
</style>
