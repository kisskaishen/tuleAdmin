<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="addRuleForm" :rules="addRule" ref="addRuleForm" label-width="140px" label-position="right" class="demo-ruleForm">
                <el-form-item label="门票名称：" prop="ticketName">
                    <el-input v-model="addRuleForm.ticketName" placeholder="请输入门票名称"></el-input>
                </el-form-item>
                <el-form-item label="景点地址：" prop="address">
                    <el-input v-model="addRuleForm.address" placeholder="请输入景点地址,如河南、焦作、武陟"></el-input>
                </el-form-item>
                <el-form-item label="票价：" prop="ticketPrice">
                    <el-input v-model.number="addRuleForm.ticketPrice" placeholder="请设置门票价格"></el-input>
                </el-form-item>
                <el-form-item label="是否为热销产品：" prop="hotTicket">
                    <el-radio-group v-model="addRuleForm.hotTicket" @change="hotTicketChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="-1" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否为特卖产品：" prop="cheapTicket">
                    <el-radio-group v-model="addRuleForm.cheapTicket" @change="cheapTicketChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="-1" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="总票数：" prop="ticketNum">
                    <el-input v-model.number="addRuleForm.ticketNum" placeholder="请设置门票数量，如100表示100张"></el-input>
                </el-form-item>
                <el-form-item label="出发频率：" prop="startNum">
                    <el-radio-group v-model="addRuleForm.startNum" @change="startNumChange">
                        <el-radio :label="1" border>每天发团</el-radio>
                        <el-radio :label="-1" border>固定时间选择</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出发时间：" prop="startTime" v-if="startTimeShow">
                    <el-date-picker
                        v-model="addRuleForm.startTime"
                        type="date"
                        placeholder="请选择出发日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="景点介绍：" prop="introduce">
                    <el-input type="textarea" :rows="3" v-model="addRuleForm.introduce"
                              placeholder="请填写景点介绍"></el-input>
                </el-form-item>
                <el-form-item label="图片上传：" prop="dialogImageUrl">
                    <el-upload
                        action="#"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="addRuleForm.dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="注意说明：" prop="tip">
                    <el-input type="textarea" :rows="3" v-model="addRuleForm.tip" placeholder="请填写注意说明（选填）"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('addRuleForm')">添加</el-button>
                    <el-button @click="resetForm('addRuleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "add-ticket",
        data() {
            var checkTicket = (rule, val, cb) => {
                if (val == '') {
                    cb(new Error('请设置门票数量！'))
                } else if (!Number.isInteger(val) || val < 0) {
                    cb(new Error('票数必须为大于0的数字！'))
                } else {
                    cb();
                }
            };
            var checkTicketMoney = (rule, val, cb) => {
                if (val == '') {
                    cb(new Error('请设置门票价格！'))
                } else if (!Number.isInteger(val) || val < 0) {
                    cb(new Error('价格必须为大于0的整数！'))
                } else {
                    cb();
                }
            };
            return {
                addRuleForm: {
                    ticketName: '',
                    address: '',
                    ticketPrice:'',
                    hotTicket:-1,
                    cheapTicket:-1,
                    ticketNum: '',
                    startNum: 1,
                    startTime: '',
                    introduce: '',
                    dialogImageUrl: '',
                    tip: '',
                },
                addRule: {
                    ticketName: [
                        {required: true, message: '请输入门票名称', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入景点地址', trigger: 'blur'}
                    ],
                    ticketPrice:[
                        {required: true, validator: checkTicketMoney, trigger: 'blur'}
                    ],
                    ticketNum: [
                        {required: true, validator: checkTicket, trigger: 'blur'}
                    ],
                    // startTime: [
                    //     { type: 'date', required: true, message: '请设置出发时间', trigger: 'change' }
                    // ],
                    introduce: [
                        {required: true, message: '请填写景点介绍', trigger: 'blur'}
                    ]
                },
                startTimeShow: false,        // 发团时间选择
                dialogVisible: false,   // 图片
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            // 设置是否为热销产品
            hotTicketChange() {

            },
            // 是否为特卖产品
            cheapTicketChange() {

            },
            // 选择出发时间类型
            startNumChange(e) {
                if (e == '1') {
                    this.startTimeShow = false
                    this.addRuleForm.startTime = ''
                } else if (e == '-1') {
                    this.startTimeShow = true
                }
            },
            // 上传图片
            handlePictureCardPreview() {

            },
            // 添加提交
            submitForm(e) {
                console.log(e)
                this.$refs[e].validate((valid) => {
                    if (valid) {
                        this.$confirm('添加成功', '提示', {
                            confirmButtonText: '继续添加',
                            cancelButtonText: '去列表页',
                            type: 'success'
                        })
                            .then((res) => {
                                this.$refs[e].resetFields()
                            })
                            .catch((err) => {
                                this.$router.push('/ticket/index')
                            })
                    } else {
                        this.$message.error('添加失败！')
                    }
                })
            },
            // 重置
            resetForm(e) {
                console.log(e)
                this.$refs[e].resetFields()
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 20px;
        .el-form {
            .el-input, .el-textarea, .el-radio-group {
                width: 400px;
                float: left;
                .el-radio {
                    float: left;
                }
            }
            .el-button {
                float: left;
            }
        }
    }
</style>
<style lang="scss">
    .el-upload {
        float: left;
    }

    .el-upload--picture-card {
        float: left;
    }
</style>
