<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="formModel" :rules="formRules" ref="formModel" label-width="140px">
                <el-form-item label="分类名称：" prop="class_name">
                    <el-input v-model="formModel.class_name" clearable placeholder="请设置分类名称"></el-input>
                </el-form-item>
                <el-form-item label="分类排序：" prop="sort">
                    <el-input v-model="formModel.sort" clearable placeholder="请设置分类排序"></el-input>
                    <div class="tip">
                        <p>(数字越小越靠前)</p>
                    </div>
                </el-form-item>
                <el-form-item label="已有分类：">
                    <el-dropdown trigger="click" placement="top-start">
                        <el-button type="primary" @click="getEquipClassify">
                            已有分类<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item,index in classify" :key="item.class_id">{{item.class_name}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('formModel')">添加分类</el-button>
                    <el-button @click="resetForm('formModel')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "add-equip-type",
        data() {
            var checkSort = (rule, val, cb) => {
                if (val == '') {
                    cb(new Error('请设置装备排序！'))
                } else if (isNaN(val) || val < 0) {
                    cb(new Error('排序必须为大于0的数字！'))
                } else {
                    cb();
                }
            }
            return {
                formModel: {
                    class_name: '',
                    sort: ''
                },
                formRules: {
                    class_name: [
                        {required: true, message: '请输入装备类型', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true, validator: checkSort, trigger: 'change'}
                    ]
                },
                classify: []
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            // 获取装备分类
            getEquipClassify() {
                this.$post('equip/class_list')
                    .then(res => {
                        this.classify = res.data
                    })
            },
            addClassify() {
                this.$post('equip/class_add_update', {
                    class_name: this.formModel.class_name,
                    sort: this.formModel.sort
                })
                    .then(res => {
                        this.$message.success(res.message)
                        setTimeout(() => {
                            this.resetForm('formModel')
                        }, 800)
                    })
            },
            submitForm(e) {
                this.$refs[e].validate((valid) => {
                    if (valid) {
                        this.addClassify()

                    } else {
                        this.$message.success('必填信息未填写！')

                    }
                })
            },
            resetForm(e) {
                this.$refs[e].resetFields()
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 10px;
        .el-form {
            .el-input {
                float: left;
                width: 200px;
            }
            .el-dropdown {
                float: left;
                .el-dropdown-menu {
                    float: left;
                }
            }
            .el-button {
                float: left;
            }
        }
    }
</style>
