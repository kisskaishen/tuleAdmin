<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="userInfo" :rules="userInfoRules" ref="userInfo" label-position="right" label-width="140px"
                     class="demo-ruleForm">
                <el-form-item label="用户姓名：" prop="userName">
                    <el-input v-model="userInfo.userName"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号：" prop="userTel">
                    <el-input v-model="userInfo.userTel"></el-input>
                </el-form-item>
                <el-form-item label="用户身份证号：" prop="userIdentity">
                    <el-input v-model="userInfo.userIdentity"></el-input>
                </el-form-item>
                <el-form-item label="微信名称：" prop="nickName">
                    <el-input v-model="userInfo.nickName" disabled></el-input>
                </el-form-item>
                <el-form-item label="微信头像：" prop="headerImg">
                    <img :src="userInfo.headerImg" :alt="userInfo.nickName">
                </el-form-item>
                <el-form-item>
                    <el-button>
                        <router-link to="/user">返回用户列表</router-link>
                    </el-button>
                    <el-button type="danger" plain @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "edit-user",
        data() {
            var checkTel = (rule, value, cb) => {
                if (!value) {
                    return cb(new Error('手机号不能为空！'))
                } else if (!(/^1[34578]\d{9}$/.test(value))) {
                    cb(new Error('请输入有效手机号！'))
                } else {
                    cb()
                }
            };
            var checkIdentity = (rule, value, cb) => {
                if (!value) {
                    return cb(new Error('身份证不能为空！'))
                } else if (!/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value)) {
                    cb(new Error('请输入有效身份证！'))
                } else {
                    cb()
                }
            };
            return {
                userInfo: {
                    userName: 'qwk',
                    userTel: '13798238693',
                    userIdentity: '410823199510240078',
                    nickName: '0的离心率',
                    headerImg: '',
                },
                userInfoRules: {
                    userName: [
                        {required: true, message: '用户姓名不能为空', trigger: 'blur'}
                    ],
                    userTel: [
                        {required: true, validator: checkTel, trigger: 'blur'}
                    ],
                    userIdentity: [
                        {required: true, validator: checkIdentity, trigger: 'blur'}
                    ]
                }
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            submit() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 20px;
        .el-form {
            .el-button {
                float: left;
            }
            .el-input {
                float: left;
                width: 400px;
            }
        }
    }
</style>
