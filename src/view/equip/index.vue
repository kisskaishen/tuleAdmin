<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form inline label-position="right" :model="searchForm" label-width="80px" class="demo-form-inline">
                <el-form-item label="装备名称">
                    <el-input v-model="searchForm.equipName" size="small" clearable placeholder="请输入装备名称"></el-input>
                </el-form-item>
                <el-form-item label="装备用途">
                    <el-input v-model="searchForm.equipUse" size="small" clearable placeholder="请输入装备用途"></el-input>
                </el-form-item>
                <el-form-item label="装备分类">
                    <el-select v-model="searchForm.equipType" size="small">
                        <el-option
                            v-for="item in searchForm.equipTypes"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"></el-option>
                    </el-select>
                    <router-link to="addEquipType" class="primary">添加分类？</router-link>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="danger">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary">
                        <router-link to="/equip/addEquip">添加装备</router-link>
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success">导出Excel</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="equipData" style="width: 100%;" size="medium" highlight-current-row
                      :default-sort="{prop:'startTime'}">
                <el-table-column header-align="center" align="center" prop="equip_name" label="装备名称"></el-table-column>
                <el-table-column header-align="center" align="center" prop="purpose" label="装备用途"></el-table-column>
                <el-table-column header-align="center" align="center" prop="classify_name" label="装备分类"></el-table-column>
                <el-table-column header-align="center" align="center" prop="price"
                                 label="价格"></el-table-column>
                <el-table-column header-align="center" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" plain @click="seeTicket(scope.row)">查看</el-button>
                        <el-button type="primary" size="small" plain @click="editTicket(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" plain @click="deleteTicket(scope.row)">删除</el-button>
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
                    equipName: '',
                    equipUse: '',
                    equipTypes: [
                        {
                            id: '0',
                            label: '全部分类'
                        },
                        {
                            id: '1',
                            label: '分类1'
                        },
                        {
                            id: '2',
                            label: '分类2'
                        },
                        {
                            id: '3',
                            label: '分类3'
                        }
                    ],
                    equipType: '0',
                },
                equipData: [],
                totalPage:1
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getList()
            this.getEquipClassify()
        },
        methods: {
            // 装备列表
            getList() {
                this.$post('equip/equip_list', {
                    equip_name:this.searchForm.equipName,
                    purpose:this.searchForm.equipUse,
                    classify_name:this.searchForm.equipType,
                })
                    .then(res => {
                        this.equipData = res.data.list
                        this.totalPage = res.data.last_page * 10
                    })
            },
            // 装备分类
            getEquipClassify() {
                this.$post('equip/class_list')
                    .then(res => {
                    this.classify = res.data
                })
            },
            seeTicket(e) {
                this.$router.push({
                    path:'/equip/watchEquip',
                    query:{
                        equip_id:e.equip_id
                    }
                })
            },
            editTicket(e) {
                this.$router.push({
                    path:'/equip/editEquip',
                    query:{
                        equip_id:e.equip_id
                    }
                })
            },
            deleteTicket(e) {
                this.$confirm('确认删除此条信息？', '提示', {
                    confirmButtonText: '确认',
                    confirmButtonText: '取消',
                    type: 'warning'
                })
                    .then((res) => {
                        this.$post('equip/equip_del',{
                            equip_id:e.equip_id
                        })
                            .then(res=>{
                                this.equipData.splice(e.$index, 1)
                                this.$message.success('删除成功')
                            })
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
            .el-input {
                width: 160px;
            }
            .el-select {
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
