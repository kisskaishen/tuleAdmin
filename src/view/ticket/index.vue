<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form inline label-position="right" :model="searchForm" label-width="80px" class="demo-form-inline">
                <el-form-item label="景点名称">
                    <el-input v-model="searchForm.ticketName" size="small" clearable placeholder="请输入景点名称"></el-input>
                </el-form-item>
                <el-form-item label="城市名称">
                    <el-input v-model="searchForm.cityName" size="small" clearable placeholder="请输入城市名称"></el-input>
                </el-form-item>
                <el-form-item label="出发时间">
                    <el-date-picker
                        v-model="searchForm.startTime"
                        type="date"
                        placeholder="请输入出发时间"
                        size="small"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="danger">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary">
                        <router-link to="/ticket/addTicket">添加门票</router-link>
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success">导出Excel</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="ticketData" style="width: 100%;" size="medium" highlight-current-row :default-sort="{prop:'startTime'}">
                <el-table-column header-align="center" align="center" prop="startTime" label="出发日期" sortable></el-table-column>
                <el-table-column header-align="center" align="center" prop="ticketName" label="景点名称"></el-table-column>
                <el-table-column header-align="center" align="center" prop="content" label="包含事项"></el-table-column>
                <el-table-column header-align="center" align="center" prop="cityName" label="所在地区"></el-table-column>
                <el-table-column header-align="center" align="center" width="100px" prop="ticketNum" label="总票数"></el-table-column>
                <el-table-column header-align="center" align="center" width="120px" prop="restTicket" label="剩余票数" sortable></el-table-column>
                <el-table-column header-align="center" align="center" width="80px" prop="ticketPrice" label="票价"></el-table-column>
                <el-table-column header-align="center" align="center" width="60px" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" plain @click="seeTicket(scope)">查看</el-button>
                        <el-button type="primary" size="small" plain @click="editTicket(scope)">编辑</el-button>
                        <el-button type="danger" size="small" plain @click="deleteTicket(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

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
                    cityName:'',
                    startTime:'',
                },
                ticketData:[
                    {
                        id:'1',
                        startTime:'2018-04-07',
                        ticketName:'云台山景区',
                        content:'云台山基本上所有的景点',
                        cityName:'焦作修武',
                        ticketNum:'40',
                        restTicket:'20',
                        ticketPrice:'¥120'
                    },
                    {
                        id:'2',
                        startTime:'2018-06-07',
                        ticketName:'方特旅游度假区',
                        content:'除酒店外的所有景点',
                        cityName:'郑州',
                        ticketNum:'90',
                        restTicket:'60',
                        ticketPrice:'¥200'
                    }
                ],
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods:{
            seeTicket(e) {
                console.log(e)
                this.$router.push('/ticket/watchTicket')
            },
            editTicket(e) {
                console.log(e)
                this.$router.push('/ticket/editTicket')
            },
            deleteTicket(e) {
                this.$confirm('确认删除此条信息？','提示',{
                    confirmButtonText:'确认',
                    confirmButtonText:'取消',
                    type:'warning'
                })
                    .then((res)=>{
                        this.$message.success('删除成功')
                    })
                    .catch((err)=>{
                        this.$message.info('取消删除')
                    })
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
