<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form inline label-position="right" :model="searchForm" label-width="80px" class="demo-form-inline">
                <el-form-item>
                    <el-select v-model="searchForm.userType" size="small">
                        <el-option
                            v-for="item in searchForm.userTypes"
                            :key="item.type"
                            :label="item.name"
                            :value="item.type"></el-option>
                    </el-select>
                    <el-input v-model="searchForm.userName" size="small" clearable placeholder="输入查询"></el-input>

                </el-form-item>

                <el-form-item>
                    <el-button size="small" type="danger" @click="searchBtn">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success" @click="outExcel">导出Excel</el-button>
                </el-form-item>

            </el-form>
            <el-table :data="userData" style="width: 100%;" size="medium" highlight-current-row>
                <el-table-column header-align="center" align="center" width="120px" label="微信头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.member_avatar" :alt="scope.row.member_nickname">
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="member_name" label="用户账号"></el-table-column>

                <el-table-column header-align="center" align="center" label="用户信息">
                    <template slot-scope="scope">
                        <p>{{scope.row.member_truename}}</p>
                        <p>{{scope.row.member_mobile}}</p>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" prop="member_nickname"
                                 label="昵称"></el-table-column>
                <el-table-column header-align="center" align="center" prop="create_time" label="注册时间"></el-table-column>
                <el-table-column header-align="center" align="center" prop="orderNum" label="订单总数">
                    <template slot-scope="scope">
                        <router-link to="/order/index">{{scope.row.order_num}}</router-link>
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
                    userTypes: [
                        {
                            type: 'member_name ',
                            name: '用户账号'
                        },
                        {
                            type: 'member_truename',
                            name: '用户姓名'
                        },
                        {
                            type: 'member_mobile',
                            name: '用户手机号'
                        },
                    ],
                    userType: '1',
                    userName: '',
                },
                userData: [],
                totalPage: 1,
                page: '1'
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getUserList()
        },
        methods: {
            getUserList() {
                this.$post('member/member_list', {
                    search_field_name: this.searchForm.userType,
                    search_field_value: this.searchForm.userName,
                    page: this.page
                })
                    .then(res => {
                        this.userData = res.data.list
                        this.totalPage = res.data.last_page * 10
                    })
            },
            seeUser(e) {
                console.log(e)
                this.$router.push('/user/watchUser')
            },
            editUser(e) {
                console.log(e)
                this.$router.push('/user/editUser')
            },
            deleteUser(e) {
                this.$confirm('确认删除此条信息？', '提示', {
                    confirmButtonText: '确认',
                    confirmButtonText: '取消',
                    type: 'warning'
                })
                    .then((res) => {
                        this.userData.splice(e.$index, 1)
                        this.$message.success('删除成功')
                    })
                    .catch((err) => {
                        this.$message.info('取消删除')
                    })
            },
            // 翻页改变页数
            pageChange(val) {
                this.page = val
            },
            // 条件查询
            searchBtn() {
                this.page = '1'
                this.getUserList()
            },
            outExcel() {
                location.href = this.$baseUrl + 'member/member_list?search_field_name=' + this.searchForm.userType + '&search_field_value=' + this.searchForm.userVal + '&is_outexcel=1'
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
            img {
                width: 60px;
                height: 60px;
                margin: auto;
                border: 1px solid #ccc;
                border-radius: 50%;
            }
            .el-button {
                margin: 0;
                padding: 4px;
            }

        }
    }
</style>
