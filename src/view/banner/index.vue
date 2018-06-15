<template>
    <div class="bannerIndex">
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :inline="true">
                <el-form-item label="轮播图名称">
                    <el-input v-model="name" size="small"></el-input>
                </el-form-item>
                <el-form-item label="轮播图所在页面">
                    <el-input v-model="page" size="small"></el-input>
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
                <el-table-column prop="id" label="轮播图ID" width="120" align="left"></el-table-column>
                <el-table-column prop="page" label="轮播图所在页面" width="180" align="left"></el-table-column>
                <el-table-column prop="name" label="轮播图名称" align="left"></el-table-column>
                <el-table-column label="轮播图图片" align="left">
                    <template slot-scope="scope">
                        <img :src="scope.row.photo" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" width="120" align="left"></el-table-column>
                <el-table-column label="操作" width="160" align="left">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="editBanner(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteBanner(scope.$index, scope.row)">删除</el-button>
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
                tableData: [
                    {
                        id:'1',
                        page:'首页',
                        name:'推荐门票banner',
                        photo:'https://cdn2.pinquduo.cn/5b10afc972e3549448.jpg',
                        sort:'1'
                    }
                ],
                name:'',
                page:'',
            }
        },
        components:{BreadCrumb},
        methods:{
            // 添加轮播图
            addBanner() {
                this.$router.push('editBanner')
            },
            editBanner(index,val) {
                console.log(index)
                console.log(val)
                this.$router.push({
                    path:'editBanner',
                    query:{
                        banner_id:'123'
                    }
                })
            },
            deleteBanner(index,val) {
                console.log(index)
                console.log(val)
                this.tableData.splice(index,1)
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
