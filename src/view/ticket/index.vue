<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form inline label-position="right" label-width="80px" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="searchForm.typeVal" size="small">
                        <el-option
                            v-for="item,index in searchForm.types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="searchForm.ticketName" size="small" clearable
                              placeholder="请输入门票/景区名称"></el-input>
                </el-form-item>
                <el-form-item label="所在地">
                    <el-input v-model="searchForm.cityName" size="small" clearable placeholder="请输入城市名称"></el-input>
                </el-form-item>
                <el-form-item label="出发时间">
                    <el-date-picker
                        v-model="searchForm.startTime"
                        type="date"
                        placeholder="请输入出发时间"
                        value-format="yyyy-MM-dd"
                        size="small"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="danger" @click="searchBtn">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary">
                        <router-link to="/ticket/addTicket">添加门票</router-link>
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success" @click="outExcel">导出Excel</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="ticketData" style="width: 100%;" size="medium" highlight-current-row
                      :default-sort="{prop:'startTime'}">
                <el-table-column header-align="center" align="center" prop="ticket_id" label="id"></el-table-column>
                <el-table-column header-align="center" align="center" prop="leave_date" label="出发日期"
                                 sortable></el-table-column>
                <el-table-column header-align="center" align="center" prop="ticket_name" label="门票名称"></el-table-column>
                <el-table-column header-align="center" align="center" width="80px" prop="price"
                                 label="票价"></el-table-column>
                <el-table-column header-align="center" align="center" prop="is_sale" label="是否为特卖">
                    <template slot-scope="scope">
                        {{scope.row.is_sale=='1'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="scenic_name" label="景点名称"></el-table-column>
                <el-table-column header-align="center" align="center" prop="inclusion" label="包含事项"></el-table-column>
                <el-table-column header-align="center" align="center" prop="narea" label="所在地区"></el-table-column>
                <el-table-column header-align="center" align="center" width="100px" prop="delivery_num"
                                 label="总票数"></el-table-column>
                <el-table-column header-align="center" align="center" width="120px" prop="real_num" label="剩余票数"
                                 sortable></el-table-column>
                <el-table-column header-align="center" align="center" width="60px" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" plain @click="seeTicket(scope.row)">查看</el-button>
                        <el-button type="primary" size="small" plain @click="editTicket(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" plain @click="deleteTicket(scope)">删除</el-button>
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
                    ticketName: '',
                    cityName: '',
                    startTime: '',
                    types: [
                        {
                            label: '门票名称',
                            value: 'ticket_name'
                        },
                        {
                            label: '景区名称',
                            value: 'scenic_name'
                        }
                    ],
                    typeVal: 'ticket_name'
                },
                ticketData: [],
                totalPage: 1,       // 总页数
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getList()
        },
        methods: {
            // 获取列表信息
            getList() {
                this.$post('ticket/ticket_list', {
                    search_field_name: this.searchForm.typeVal,
                    search_field_value: this.searchForm.ticketName,
                    narea: this.searchForm.cityName,
                    leave_date: this.searchForm.startTime
                })
                    .then(res => {
                        this.ticketData = res.data.list
                        this.totalPage = res.data.last_page * 10
                    })
            },
            // 条件查询列表
            searchBtn() {
                this.getList()
            },
            // 导出为excel
            outExcel() {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('@/excel/Export2Excel');
                    const tHeader = ['出发日期', '门票名称', '票价', '景点名称', '包含事项', '所在地区', '总票数', '剩余票数'];
                    const filterVal = ['leave_date', 'ticket_name', 'price', 'scenic_name', 'content', 'narea', 'delivery_num', 'real_num'];
                    const list = this.ticketData;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '门票列表');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            // 查看当前数据
            seeTicket(e) {
                this.$router.push({
                    path: '/ticket/watchTicket',
                    query: {
                        ticket_id: e.ticket_id
                    }
                })
            },
            // 编辑当前数据
            editTicket(e) {
                this.$router.push({
                    path: '/ticket/editTicket',
                    query: {
                        ticket_id: e.ticket_id
                    }
                })
            },
            // 删除当前数据
            deleteTicket(e) {
                this.$confirm('确认删除此条信息？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$post('ticket/ticket_del', {ticket_id: e.row.ticket_id})
                            .then(res => {
                                this.ticketData.splice(e.$index, 1)
                                this.$message.success('删除成功')
                            })
                    })
                    .catch(() => {
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
            .el-select {
                width: 104px;
            }
            .el-input {
                width: 160px;
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
