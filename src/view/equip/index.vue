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
                <el-table-column header-align="center" align="center" prop="equipName" label="装备名称"></el-table-column>
                <el-table-column header-align="center" align="center" prop="equipUse" label="装备用途"></el-table-column>
                <el-table-column header-align="center" align="center" prop="equipType" label="装备分类"></el-table-column>
                <el-table-column header-align="center" align="center" prop="equipPrice"
                                 label="价格"></el-table-column>
                <el-table-column header-align="center" align="center" label="操作">
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
                    equipName: '',
                    equipUse: '',
                    equipTypes:[
                        {
                            id:'0',
                            label:'全部分类'
                        },
                        {
                            id:'1',
                            label:'分类1'
                        },
                        {
                            id:'2',
                            label:'分类2'
                        },
                        {
                            id:'3',
                            label:'分类3'
                        }
                    ],
                    equipType: '0',
                },
                equipData: [
                    {
                        id: '1',
                        equipName: '骆驼登山靴',
                        equipUse: '山地、徒步',
                        equipType:'分类1',
                        equipSize: 'L/M/XL/XXL',
                        equipNum: '40',
                        restNum: '20',
                        equipPrice: '¥120'
                    },
                    {
                        id: '2',
                        equipName: '骆驼登山靴',
                        equipUse: '山地、徒步',
                        equipType:'分类2',
                        equipSize: 'L/M/XL/XXL',
                        equipNum: '40',
                        restNum: '20',
                        equipPrice: '¥120'
                    }
                ],
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            seeTicket(e) {
                console.log(e)
                this.$router.push('/equip/watchEquip')
            },
            editTicket(e) {
                console.log(e)
                this.$router.push('/equip/editEquip')
            },
            deleteTicket(e) {
                this.$confirm('确认删除此条信息？', '提示', {
                    confirmButtonText: '确认',
                    confirmButtonText: '取消',
                    type: 'warning'
                })
                    .then((res) => {
                        this.equipData.splice(e.$index,1)
                        this.$message.success('删除成功')
                    })
                    .catch((err) => {
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
