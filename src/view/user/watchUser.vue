<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form label-position="right" label-width="120px" class="demo-ruleForm">
                <el-form-item label="用户姓名：">
                    <span>{{userInfo.userName}}</span>
                </el-form-item>
                <el-form-item label="用户手机号：">
                    <span>{{userInfo.userTel}}</span>
                </el-form-item>
                <el-form-item label="用户身份证号：">
                    <span>{{userInfo.userIdentity}}</span>
                </el-form-item>
                <el-form-item label="微信名称：">
                    <span>{{userInfo.nickName}}</span>
                </el-form-item>
                <el-form-item label="微信头像：">
                    <img :src="userInfo.headerImg" :alt="userInfo.nickName">
                </el-form-item>
                <el-form-item>
                    <el-button>
                        <router-link to="/user">返回用户列表</router-link>
                    </el-button>
                    <!--<el-button type="danger" plain @click="goEdit">去修改</el-button>-->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "watch-user",
        data() {
            return {
                listData:[
                    {
                        state: false,
                        visit_id: 4,
                        visit_name: "秦文凯",
                        visit_phone: "13798238693",
                        vist_idcard_num: "qq"
                    },
                    {
                        state: false,
                        visit_id: 5,
                        visit_name: "许紫嫣",
                        visit_phone: "13798238693",
                        vist_idcard_num: "qq"
                    }
                ],
                userInfo: {
                    userName: 'qwk',
                    userTel: '13798238693',
                    userIdentity: '410823199510240078',
                    nickName: '0的离心率',
                    headerImg: '',
                },
            }
        },
        components: {BreadCrumb},
        mounted() {
            let testArr = []
            for(let i=0;i<this.listData.length;i++) {
                testArr.push(this.listData[i].visit_id)
            }
            console.log(testArr)
            this.$post('test',{
                arr:JSON.stringify(testArr)
            })
                .then(res=>{
                    console.log(res)
                })

        },
        methods: {
            goEdit() {
                this.$router.push('/user/editUser')
            }
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
                &:first-child {
                    a {
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
