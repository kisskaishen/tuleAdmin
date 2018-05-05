<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="editRuleForm" :rules="addRule" ref="editRuleForm" label-width="140px"
                     label-position="right" class="demo-ruleForm">
                <el-form-item label="门票名称：" prop="ticket_name">
                    <el-input v-model="editRuleForm.ticket_name" placeholder="请输入门票名称"></el-input>
                </el-form-item>
                <el-form-item label="景点名称：" prop="scenic_name">
                    <el-input v-model="editRuleForm.scenic_name" placeholder="请输入景点名称"></el-input>
                </el-form-item>
                <el-form-item label="景点地址：" prop="narea">
                    <el-input v-model="editRuleForm.narea" placeholder="请输入景点地址,如河南、焦作、武陟"></el-input>
                </el-form-item>
                <el-form-item label="票价：" prop="price">
                    <el-input v-model.number="editRuleForm.price" placeholder="请设置门票价格"></el-input>
                </el-form-item>
                <el-form-item label="总票数：" prop="delivery_num">
                    <el-input v-model.number="editRuleForm.delivery_num" placeholder="请设置门票数量，如100表示100张"></el-input>
                </el-form-item>
                <el-form-item label="是否为热销产品：" prop="is_hot">
                    <el-radio-group v-model="editRuleForm.is_hot" @change="startNumChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="2" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否为特卖产品：" prop="is_sale">
                    <el-radio-group v-model="editRuleForm.is_sale" @change="startNumChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="2" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="特卖价格：" prop="sale_price" v-if="editRuleForm.is_sale=='1'">
                    <el-input v-model.number="editRuleForm.sale_price" placeholder="请设置门票特卖价格"></el-input>
                </el-form-item>
                <el-form-item label="发团类型：" prop="leave_type">
                    <el-radio-group v-model="editRuleForm.leave_type" @change="startNumChange">
                        <el-radio :label="1" border>每天发团</el-radio>
                        <el-radio :label="2" border>固定时间选择</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出发时间：" prop="leave_date" v-if="editRuleForm.leave_type=='2'">
                    <el-date-picker
                        v-model="editRuleForm.leave_date"
                        type="date"
                        placeholder="请选择出发日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="景点介绍：" prop="introduce">
                    <el-input type="textarea" :rows="3" v-model="editRuleForm.introduce"
                              placeholder="请填写景点介绍"></el-input>
                </el-form-item>
                <el-form-item label="图片上传：" prop="images">
                    <div class="imgsList" v-if="editRuleForm.images">
                        <div class="imgDiv" v-for="item,index in editRuleForm.images">
                            <img :src="item.image" alt="" @mouseover="mouseShow(item,index)">
                            <div class="dialogBg" v-if="index==currentIndex" @mouseout="mouseHide(item,index)"></div>
                            <i class="el-icon-delete" v-if="index==currentIndex" @click="deleteImg(item,index)"></i>
                        </div>

                    </div>
                    <div class="addImgBtn">
                        <input type="file" multiple @change="imgUpload">
                        <el-button icon="el-icon-plus"></el-button>
                    </div>
                    <div class="tip">
                        <p>上传图片只能为jpg、jpeg、png格式！</p>
                        <p>上传图片大小不能超过1M！</p>
                    </div>
                </el-form-item>
                <el-form-item label="注意说明：" prop="attention">
                    <el-input type="textarea" :rows="3" v-model="editRuleForm.attention"
                              placeholder="请填写注意说明（选填）"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('editRuleForm')">确认修改</el-button>
                    <el-button @click="goBack">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "edit-ticket",
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
                } else if (val < 0) {
                    cb(new Error('价格必须为大于0的数字！'))
                } else {
                    cb();
                }
            }
            return {
                editRuleForm: {
                    ticket_id: '',
                    ticket_name: '',
                    scenic_name: '',
                    narea: '',
                    delivery_num: '',
                    price: '',
                    introduce: '',
                    attention: '',
                    is_hot: '',
                    is_sale: '',
                    sale_price: '',
                    leave_type: '',
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
                dialogVisible: false,   // 图片
                uploadData: {type: 1},
                currentIndex: -1,            // 显示哪一个
                images: [],              // 图片数组，包括id和url的对象
                dialogImageIdArr: [],        // 图片id数组
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getInfo()
        },
        methods: {
            // 先获取信息
            getInfo() {
                this.$post('ticket/ticket_detail', {
                    ticket_id: this.$route.query.ticket_id
                })
                    .then(res => {
                        this.editRuleForm = res.data
                        this.images = res.data.images
                    })
            },
            // 产品图
            // 显示隐藏删除按钮
            mouseShow(val, index) {
                this.currentIndex = index
            },
            mouseHide(val, index) {
                this.currentIndex = -1
            },
            // 删除图片
            deleteImg(val, index) {
                this.images.splice(index, 1)
            },
            // 上传图片
            imgUpload(e) {
                e.preventDefault();
                let fileArr = e.target.files
                for (let i = 0; i < fileArr.length; i++) {
                    const type = fileArr[i].type
                    const size = fileArr[i].size / 1024 / 1024
                    if (!(type != 'image/jpg' || 'image/png' || 'image/jpeg')) {
                        this.$message.error('上传图片只能为jpg、jpeg、png格式！')
                        return;
                    } else if (size > 1) {
                        this.$message.error('上传图片大小不能超过1M！')
                        return;
                    } else {
                        let data = new FormData();
                        data.append('image', fileArr[i])
                        data.append('type', 1)
                        this.$upload('other/Img/upload', data)
                            .then(res => {
                                this.images.push(res)
                            })
                    }
                }
            },


            // 选择出发时间类型
            startNumChange(e) {
                if (e == '1') {
                    this.editRuleForm.leave_date = ''
                }
            },


            // 编辑门票接口
            editTicket() {
                for (let i = 0; i < this.images.length; i++) {
                    this.dialogImageIdArr.push((this.images[i].id).toString())
                }
                this.$post('ticket/ticket_add_update', {
                    ticket_id: this.editRuleForm.ticket_id,
                    ticket_name: this.editRuleForm.ticket_name,
                    scenic_name: this.editRuleForm.scenic_name,
                    narea: this.editRuleForm.narea,
                    delivery_num: this.editRuleForm.delivery_num,
                    price: this.editRuleForm.price,
                    introduce: this.editRuleForm.introduce,
                    attention: this.editRuleForm.attention,
                    is_hot: this.editRuleForm.is_hot,
                    is_sale: this.editRuleForm.is_sale,
                    sale_price: this.editRuleForm.sale_price,
                    leave_type: this.editRuleForm.leave_type,
                    leave_date: this.editRuleForm.leave_date,
                    images: JSON.stringify(this.dialogImageIdArr),
                })
                    .then(res => {
                        this.$message.success(res.message)
                    })
            },
            // 编辑门票接口提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editTicket()
                    } else {
                        this.$message.error('修改失败！')
                    }
                })
            },
            // 返回略表页
            goBack() {
                this.$router.push('/ticket')
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
                    .dialogBg {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background-color: rgba(0, 0, 0, .2);
                    }
                    i {
                        position: absolute;
                        font-size: 40px;
                        left: 50%;
                        margin-left: -20px;
                        top: 50%;
                        margin-top: -20px;
                        cursor: pointer;
                        z-index: 9;
                        color: #fff;
                    }
                }
            }
            .addImgBtn {
                float: left;
                position: relative;
                overflow: hidden;
                width: 160px;
                height: 160px;
                input {
                    width: 160px;
                    height: 160px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    opacity: 0;
                    z-index: 9;
                }
                .el-button {
                    width: 160px;
                    height: 160px;
                    border: 1px dashed #ccc;
                    .el-icon-plus {
                        font-size: 40px;
                    }

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

    .addImgBtn {
        .el-button {
            i {
                font-size: 40px;
            }
        }
    }
</style>
