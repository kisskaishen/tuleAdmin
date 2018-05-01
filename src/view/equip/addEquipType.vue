<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="formModel" :rules="formRules" ref="formModel" label-width="140px">
                <el-form-item label="分类名称：" prop="typeName">
                    <el-input v-model="formModel.typeName" clearable placeholder="请设置分类名称"></el-input>
                </el-form-item>
                <el-form-item label="已有分类：">
                    <el-dropdown trigger="click">
                        <el-button type="primary">
                            已有分类<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>分类1</el-dropdown-item>
                            <el-dropdown-item>分类2</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('formModel')">添加</el-button>
                    <el-button @click="resetForm('formModel')">重制</el-button>
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
            return {
                formModel: {
                    typeName: ''
                },
                formRules: {
                    typeName: [
                        {required: true, message: '请输入装备类型', trigger: 'blur'}
                    ],
                }
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            submitForm(e) {
                this.$refs[e].validate((valid)=>{
                    if (valid) {
                        alert('submit')
                    } else {
                        alert('error')
                        return;
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
