<template>
    <div class="login">
        <div class="loginDiv">
            <h4>途乐户外后台管理登录</h4>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="登录账号"></el-input>
                </el-form-item>
                <el-form-item prop="userPwd">
                    <el-input type="password" v-model="loginForm.userPwd" placeholder="登录密码"></el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-input class="captcha" v-model="loginForm.captcha" placeholder="验证码"></el-input>
                    <img src="" alt="验证码">
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm:{
                    userName:'',
                    userPwd:'',
                    captcha:'',
                },
                loginRules:{
                    userName:[
                        {required:true,message:'登录账号不能为空',trigger:'blur'}
                    ],
                    userPwd:[
                        {required:true,message:'登录密码不能为空',trigger:'blur'}
                    ],
                    captcha:[
                        {required:true,message:'验证码不能为空',trigger:'blur'}
                    ]
                }

            }
        },
        mounted() {

        },
        methods: {
            submit(form) {
                this.$refs[form].validate((valid)=>{
                    if (valid) {
                        this.$router.push('/')
                        // if (this.$refs[form].model.captcha) {
                        //     console.log('验证码正确后去验证登录账号和密码是否正确')
                        //     if (this.$refs[form].model.userName && this.$refs[form].model.userPwd) {
                        //         console.log('账号密码正确登录成功，跳转首页')
                        //     } else {
                        //         console.log('账号或密码错误，重新登录！')
                        //     }
                        // } else {
                        //     console.log('验证码错误，刷新验证码重新输入')
                        // }

                    } else {
                        this.$message.error('登录失败！')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background:linear-gradient(red,blue);
        .loginDiv {
            position: absolute;
            width: 300px;
            /*height: 240px;*/
            margin-left: -200px;
            left: 50%;
            margin-top: -150px;
            top: 40%;
            background-color: #fff;
            padding: 30px 50px 10px;
            h4 {
                margin-bottom: 20px;
            }
            .el-form-item {
                .captcha {
                    display: inline-block;
                    width: 180px;
                }
                img {
                    display: inline-block;
                    width: 114px;
                    height: 38px;
                    border:1px solid #ccc;
                    border-radius: 0;
                }
                .el-button {
                    width: 100%;
                }
            }
        }
    }
</style>
