<template>
    <div class="bannerIndex">
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :inline="true">
                <el-form-item label="轮播图类型">
                    <el-select v-model="bannerType" size="small">
                        <el-option
                            v-for="item,index in bannerTypes"
                            :key="item.type"
                            :label="item.label"
                            :value="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" size="small">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="addBanner">添加轮播图</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
                <el-table-column prop="id" label="轮播图ID" width="80" align="left"></el-table-column>
                <el-table-column prop="type" label="轮播图位置" width="120" align="left"></el-table-column>
                <el-table-column prop="data_type" label="轮播图跳转位置" width="120" align="left"></el-table-column>
                <el-table-column prop="data" label="跳转id" width="80" align="left"></el-table-column>
                <el-table-column label="轮播图图片" width="140" align="left">
                    <template slot-scope="scope">
                        <img :src="scope.row.url" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" width="80" align="left"></el-table-column>
                <el-table-column prop="create_time" label="添加时间" width="160" align="left"></el-table-column>
                <el-table-column label="操作" width="160" align="left">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="editBanner(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteBanner(scope.$index, scope.row)">删除
                        </el-button>
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
                tableData: [],
                bannerTypes: [
                    {
                        type: '1',
                        label: '首页'
                    },
                    {
                        type: '2',
                        label: '景点专区'
                    },
                    {
                        type: '3',
                        label: '特卖专区'
                    },
                    {
                        type: '4',
                        label: '装备专区'
                    }
                ],
                bannerType:'',
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getBannnerList()
        },
        methods: {
            // banner轮播图列表
            getBannnerList() {
                this.$post('Banner/banner_list',{
                    type:''
                })
                    .then(res=>{
                        this.tableData = res.data
                    })
            },
            // 添加轮播图
            addBanner() {
                this.$router.push('editBanner')
            },
            editBanner(index, val) {
                console.log(index)
                console.log(val)
                this.$router.push({
                    path: 'editBanner',
                    query: {
                        id: val.id
                    }
                })
            },
            deleteBanner(index, val) {
                console.log(index)
                console.log(val)
                this.tableData.splice(index, 1)
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
            align-items: center;
            .el-form-item {
                .el-input {
                    width: 160px;
                }
            }
        }
        .el-table {
            img {
                width: 100px;
                height: 50px;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
            }
        }

    }
</style>
