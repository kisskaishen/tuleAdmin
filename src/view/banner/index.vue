<template>
    <div class="bannerIndex">
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form inline label-position="right" label-width="120px" class="demo-form-inline">
                <el-form-item label="banner图位置：">
                    <el-select v-model="bannerType" size="small" placeholder="banner图位置">
                        <el-option
                            v-for="item in bannerTypes"
                            :key="item.type"
                            :label="item.name"
                            :value="item.type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="danger">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="squared">
                <ul>
                    <li v-for="item in 7">
                        <router-link to="editBanner">
                            <div class="bannerImg">
                                <img src="" alt="banner图片">
                            </div>
                            <div class="bannerName">
                                <span>banner图名称</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'
    export default {
        name: "index",
        data() {
            return {
                bannerTypes:[
                    {
                        type:'1',
                        name:'首页banner'
                    },
                    {
                        type:'2',
                        name:'装备banner'
                    },
                    {
                        type:'3',
                        name:'特卖banner'
                    }
                ],
                bannerType:''
            }
        },
        components:{BreadCrumb},
    }
</script>

<style scoped lang="scss">
.container {
    margin-top: 10px;
    .el-form {
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #ccc;
        .el-form-item {
            .el-select {
                width: 140px;
            }
        }
    }
    .squared {
        padding: 20px;
        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            li {
                border:1px solid red;
                padding: 20px;
                margin-bottom: 20px;
                a {
                    .bannerImg {
                        img {
                            display: block;
                            width: 200px;
                            height: 200px;
                        }
                    }
                    .bannerName {
                        margin-top: 10px;
                        span {
                            display: block;
                            width: 200px;
                            font-size: 16px;
                            overflow: hidden;
                            -ms-text-overflow: ellipsis;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }
}
</style>
