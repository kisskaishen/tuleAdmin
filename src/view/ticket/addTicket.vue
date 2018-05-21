<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="addRuleForm" :rules="addRule" ref="addRuleForm" label-width="140px" label-position="right"
                     class="demo-ruleForm">
                <el-form-item label="门票名称：" prop="ticket_name">
                    <el-input v-model="addRuleForm.ticket_name" placeholder="请输入门票名称"></el-input>
                </el-form-item>
                <el-form-item label="景点名称：" prop="scenic_name">
                    <el-input v-model="addRuleForm.scenic_name" placeholder="请输入景点名称"></el-input>
                </el-form-item>
                <el-form-item label="景点地址：" prop="narea">
                    <el-input v-model="addRuleForm.narea" placeholder="请输入景点地址,如河南、焦作、武陟"></el-input>
                </el-form-item>
                <el-form-item label="票价：" prop="price">
                    <el-input v-model.number="addRuleForm.price" placeholder="请设置门票价格"></el-input>
                </el-form-item>
                <el-form-item label="总票数：" prop="delivery_num">
                    <el-input v-model.number="addRuleForm.delivery_num" placeholder="请设置门票数量，如100表示100张"></el-input>
                </el-form-item>
                <el-form-item label="包含事项：" prop="content">
                    <el-input v-model="content" type="textarea" :rows="4" placeholder="请填写此次活动的包含事项内容，如来回车费、食宿费用等"></el-input>
                </el-form-item>
                <el-form-item label="是否为热销产品：" prop="is_hot">
                    <el-radio-group v-model="addRuleForm.is_hot" @change="startNumChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="2" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否为特卖产品：" prop="is_sale">
                    <el-radio-group v-model="addRuleForm.is_sale" @change="startNumChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="2" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="特卖价格：" prop="sale_price" v-if="addRuleForm.is_sale=='1'">
                    <el-input v-model.number="addRuleForm.sale_price" placeholder="请设置门票特卖价格"></el-input>
                </el-form-item>
                <el-form-item label="发团类型：" prop="leave_type">
                    <el-radio-group v-model="addRuleForm.leave_type" @change="startNumChange">
                        <el-radio :label="1" border>每天发团</el-radio>
                        <el-radio :label="2" border>固定时间选择</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出发时间：" prop="leave_date" v-if="addRuleForm.leave_type=='2'">
                    <el-date-picker
                        v-model="addRuleForm.leave_date"
                        type="date"
                        placeholder="请选择出发日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="景点介绍：" prop="introduce">
                    <el-input type="textarea" :rows="3" v-model="addRuleForm.introduce"
                              placeholder="请填写景点介绍"></el-input>
                </el-form-item>
                <el-form-item label="图片上传：" prop="images">
                    <el-upload
                        :action="$baseUrlApi+'other/Img/upload'"
                        list-type="picture-card"
                        :data="uploadData"
                        ref="upload"
                        :beforeUpload="uploadBefore"
                        :on-success="uploadSuccess"
                        :on-preview="uploadImg"
                        :on-remove="deleteImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogVisibleUrl" alt="">
                    </el-dialog>
                    <div class="tip">
                        <p>上传图片只能为jpg、jpeg、png格式！</p>
                        <p>上传图片大小不能超过1M！</p>
                    </div>
                </el-form-item>
                <el-form-item label="注意说明：" prop="attention">
                    <el-input type="textarea" :rows="3" v-model="addRuleForm.attention"
                              placeholder="请填写注意说明（选填）"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('addRuleForm')">确认添加</el-button>
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
            }
            var checkPrice = (rule, val, cb) => {
                if (val == '') {
                    cb(new Error('请设置门票价格！'))
                } else if (isNaN(val) || val < 0) {
                    cb(new Error('价格必须为大于0的数字！'))
                } else {
                    cb();
                }
            }
            return {
                addRuleForm: {
                    ticket_name: '',
                    scenic_name: '',
                    narea: '',
                    delivery_num: '',
                    price: '',
                    content:'',
                    introduce: '',
                    attention: '',
                    is_hot: 1,
                    is_sale: 1,
                    sale_price: '',
                    leave_type: 1,
                    leave_date: '',
                    images: [],
                },
                addRule: {
                    ticket_name: [
                        {required: true, message: '请输入门票名称', trigger: 'blur'}
                    ],
                    scenic_name: [
                        {required: true, message: '请输入景区名称', trigger: 'blur'}
                    ],
                    narea: [
                        {required: true, message: '请输入景点地址', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, validator: checkPrice, trigger: 'blur'}
                    ],
                    content:[
                        {required: true, message: '请填写此次活动的包含内容', trigger: 'blur'}
                    ],
                    delivery_num: [
                        {required: true, validator: checkTicket, trigger: 'blur'}
                    ],
                    sale_price: [
                        {required: true, validator: checkPrice, trigger: 'blur'}
                    ],
                    introduce: [
                        {required: true, message: '请填写景点介绍', trigger: 'blur'}
                    ]
                },
                dialogVisible: false,   // 点击显示隐藏弹框图片
                dialogVisibleUrl: '',   // 点击查看大图片
                uploadData: {type: 1},        // 图片上传的参数
                imagesId: [],                // 图片id数组
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            // 上传图片前的检测
            uploadBefore(file) {
                const type = file.type.split('/')[1]
                const size = file.size / 1024 / 1024
                if (!(type == 'png' || type == 'jpg' || type == 'jpeg')) {
                    this.$message.error('图片格式必须为png、jpg、jpeg！')
                } else if (size > 1) {
                    this.$message.error('上传图片大小不能超过1M！')
                } else {
                    this.uploadData.image = file
                }
            },
            // 上传图片成功后调用
            uploadSuccess(res, file, fileList) {
                console.log('上传成功的图片信息：')
                this.imagesId = []
                for (let i = 0; i < fileList.length; i++) {
                    this.imagesId.push(fileList[i].response.data.id)
                }

            },
            // 上传图片
            uploadImg(file) {
                console.log('点击查看')
                this.dialogVisibleUrl = file.url
                this.dialogVisible = true

            },
            deleteImg(file, fileList) {
                console.log('点击删除按钮：')
                this.imagesId = []
                for (let i = 0; i < fileList.length; i++) {
                    this.imagesId.push(fileList[i].response.data.id)
                }
            },
            // 选择出发时间类型
            startNumChange(e) {
                if (e == '1') {
                    this.addRuleForm.leave_date = ''
                }
            },

            // 添加门票接口
            addTicket() {
                this.$post('ticket/ticket_add_update', {
                    ticket_name: this.addRuleForm.ticket_name,
                    scenic_name: this.addRuleForm.scenic_name,
                    narea: this.addRuleForm.narea,
                    delivery_num: this.addRuleForm.delivery_num,
                    price: this.addRuleForm.price,
                    introduce: this.addRuleForm.introduce,
                    attention: this.addRuleForm.attention,
                    is_hot: this.addRuleForm.is_hot,
                    is_sale: this.addRuleForm.is_sale,
                    sale_price: this.addRuleForm.sale_price,
                    leave_type: this.addRuleForm.leave_type,
                    leave_date: this.addRuleForm.leave_date,
                    images: JSON.stringify(this.imagesId),
                })
                    .then(res => {
                        this.$message.success(res.message)
                        this.$confirm('添加成功', '提示', {
                            confirmButtonText: '继续添加',
                            cancelButtonText: '回到列表页',
                            type: 'info'
                        })
                            .then(() => {
                                this.resetForm('addRuleForm')
                            })
                            .catch(() => {
                                this.$router.push('/ticket/index')
                            })
                    })
            },
            // 编辑门票接口提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addTicket()
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
            .el-dialog {
                img {
                    width: 300px;
                    height: 300px;
                }
            }
        }
    }
</style>
<style lang="scss">
    .el-upload, .el-upload-list {
        float: left;
    }

    .el-upload--picture-card {
        float: left;
    }
</style>
