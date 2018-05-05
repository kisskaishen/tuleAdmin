<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form label-width="140px" class="demo-ruleForm">
                <el-form-item label="装备名称：" prop="equip_name">
                    <span>{{watchRuleForm.equip_name}}</span>
                </el-form-item>
                <el-form-item label="装备价格：" prop="price">
                    <span>{{watchRuleForm.price}}</span>
                </el-form-item>

                <el-form-item label="装备分类：" prop="classify_id">
                    <span>{{watchRuleForm.classify_name}}</span>
                </el-form-item>
                <el-form-item label="装备用途：" prop="purpose">
                    <span>{{watchRuleForm.purpose}}</span>
                </el-form-item>
                <el-form-item label="是否为热销产品：" prop="is_hot">
                    <span>{{watchRuleForm.is_hot=='1'?'是':'否'}}</span>
                </el-form-item>
                <el-form-item label="是否为特卖产品：" prop="is_sale">
                    <span>{{watchRuleForm.is_sale=='1'?'是':'否'}}</span>
                </el-form-item>
                <el-form-item label="特卖价格：" prop="sale_price" v-if="watchRuleForm.is_sale=='1'">
                    <span>{{watchRuleForm.sale_price}}</span>
                </el-form-item>
                <el-form-item label="装备展示图片：">
                    <div class="imgsList" v-if="watchRuleForm.images">
                        <div class="imgDiv" v-for="item,index in watchRuleForm.images">
                            <img :src="item.image" alt="">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="装备说明图片：">
                    <div class="imgsList" v-if="watchRuleForm.introduce_images">
                        <div class="imgDiv" v-for="item,index in watchRuleForm.introduce_images">
                            <img :src="item.image" alt="">
                        </div>

                    </div>

                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="goBack">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "watch-equip",
        data() {

            return {
                watchRuleForm: {
                    equip_name: '',         // 装备名称
                    price: '',               // 装备价格
                    purpose: '',             // 装备用途
                    classify_id: '',         // 装备分类id
                    classify_name: '',       // 装备分类名称
                    is_hot: 1,              // 是否为热销产品
                    is_sale: 1,             // 是否为特卖产品
                    sale_price: '0',        // 特卖价格
                    images: [],
                    introduce_images: [],

                }

            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getEquipInfo()
        },
        methods: {
            // 获取装备信息
            getEquipInfo() {
                this.$post('equip/equip_detail', {
                    equip_id: this.$route.query.equip_id
                })
                    .then(res => {
                        this.watchRuleForm = res.data
                    })
            },

            goBack() {
                this.$router.push('/equip')
            },


        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 20px;
        .el-form {
            span {
                float: left;
                display: block;
                min-width: 300px;
                text-align: left;
                border-bottom: 1px solid #ccc;
            }

            .el-button {
                float: left;
            }
            .imgsList {
                float: left;
                margin-right: 20px;
                .imgDiv {
                    position: relative;
                    display: inline-block;
                    width: 160px;
                    height: 160px;
                    margin-right: 10px;
                    img {
                        width: 100%;
                        height: 100%;
                    }

                }
            }

        }
    }
</style>
