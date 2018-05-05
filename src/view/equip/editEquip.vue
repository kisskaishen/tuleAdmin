<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="editRuleForm" :rules="addRule" ref="editRuleForm" label-width="140px"
                     class="demo-ruleForm">
                <el-form-item label="装备名称：" prop="equip_name">
                    <el-input v-model="editRuleForm.equip_name" placeholder="请输入装备名称"></el-input>
                </el-form-item>
                <el-form-item label="装备价格：" prop="price">
                    <el-input v-model="editRuleForm.price" placeholder="请输入装备价格"></el-input>
                </el-form-item>

                <el-form-item label="装备分类：" prop="classify_id">
                    <el-select v-model="editRuleForm.classify_id" placeholder="请选择装备分类" @change="classChange">
                        <el-option
                            v-for="item,index in classify"
                            :key="item.class_id"
                            :label="item.class_name"
                            :value="item.class_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="装备用途：" prop="purpose">
                    <el-input v-model="editRuleForm.purpose" placeholder="请输入装备用途"></el-input>
                </el-form-item>
                <el-form-item label="是否为热销产品：" prop="is_hot">
                    <el-radio-group v-model="editRuleForm.is_hot" @change="isHotChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="2" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否为特卖产品：" prop="is_sale">
                    <el-radio-group v-model="editRuleForm.is_sale" @change="isSaleChange">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="2" border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="特卖价格：" prop="sale_price" v-if="editRuleForm.is_sale=='1'">
                    <el-input v-model.number="editRuleForm.sale_price" placeholder="请设置门票特卖价格"></el-input>
                </el-form-item>
                <el-form-item label="装备展示图片：" >
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
                <el-form-item label="装备说明图片：">
                    <div class="imgsList" v-if="editRuleForm.introduce_images">
                        <div class="imgDiv" v-for="item,index in editRuleForm.introduce_images">
                            <img :src="item.image || item.url" alt="" @mouseover="mouseRemarkShow(item,index)">
                            <div class="dialogBg" v-if="index==currentRemarkIndex"
                                 @mouseout="mouseRemarkHide(item,index)"></div>
                            <i class="el-icon-delete" v-if="index==currentRemarkIndex"
                               @click="deleteRemarkImg(item,index)"></i>
                        </div>

                    </div>
                    <div class="addImgBtn">
                        <input type="file" multiple @change="imgRemarkUpload">
                        <el-button icon="el-icon-plus"></el-button>
                    </div>
                    <div class="tip">
                        <p>上传图片只能为jpg、jpeg、png格式！</p>
                        <p>上传图片大小不能超过1M！</p>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('editRuleForm')">确认修改</el-button>
                    <el-button @click="resetForm('editRuleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "edit-equip",
        data() {
            var checkPrice = (rule, val, cb) =>{
                if (val == '') {
                    cb(new Error('请设置装备价格！'))
                } else if (isNaN(val) || val < 0) {
                    cb(new Error('价格必须为大于0的数字！'))
                } else {
                    cb();
                }
            }
            return {
                editRuleForm: {
                    equip_name: '',         // 装备名称
                    price: '',               // 装备价格
                    purpose: '',             // 装备用途
                    classify_id: '',         // 装备分类id
                    classify_name: '',       // 装备分类名称
                    is_hot: 1,              // 是否为热销产品
                    is_sale: 1,             // 是否为特卖产品
                    sale_price: '0',        // 特卖价格
                    images:[],
                    introduce_images:[],

                },
                images:[],
                introduce_images:[],
                dialogImageIdArr: [],            // 图片id数组

                remarkImageIdArr: [],
                classify: [],            // 分类

                addRule: {
                    equip_name: [
                        {required: true, message: '请输入装备名称', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, validator: checkPrice, trigger: 'blur'}
                    ],
                    classify_id: [
                        {required: true, message: '请选择装备分类', trigger: 'change'}
                    ],
                    introduce: [
                        {required: true, message: '请填写装备介绍', trigger: 'blur'}
                    ]
                },
                currentIndex: -1,            // 显示哪一个
                currentRemarkIndex: -1,            // 显示哪一个


            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getEquipInfo()
            this.getEquipClassify()
        },
        methods: {
            // 获取装备信息
            getEquipInfo() {
                this.$post('equip/equip_detail', {
                    equip_id: this.$route.query.equip_id
                })
                    .then(res => {
                        this.editRuleForm = res.data
                        this.images = res.data.images
                        this.introduce_images = res.data.introduce_images
                    })
            },
            // 获取装备分类
            getEquipClassify() {
                this.$post('equip/class_list')
                    .then(res => {
                    this.classify = res.data
            })
            },
            // 改变装备分类选择
            classChange(val) {
                this.editRuleForm.classify_id = val
                for(let i=0;i<this.classify.length;i++) {
                    if (this.classify[i].class_id == this.editRuleForm.classify_id) {
                        this.editRuleForm.classify_name = this.classify[i].class_name
                    }

                }
            },
            // 是否热销
            isHotChange(val) {
                this.editRuleForm.is_hot = val
            },
            // 是否热卖
            isSaleChange(val) {
                if (val == '2') {
                    this.$confirm('切换后此商品特卖价格将被清空，是否继续？','提示',{
                        confirmButtonText:'继续',
                        cancelButtonText:'取消',
                        type:'info'
                    })
                        .then(()=>{
                            this.editRuleForm.is_sale = val
                            this.editRuleForm.sale_price = '0'
                        })
                        .catch(()=>{
                            this.editRuleForm.is_sale = 1
                            this.editRuleForm.sale_price = this.editRuleForm.sale_price
                        })
                }
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
                console.log(this.images)
            },
            // 上传图片
            imgUpload(e) {
                e.preventDefault();
                let fileArr = e.target.files
                for (let i=0;i<fileArr.length;i++) {
                    const type = fileArr[i].type
                    const size = fileArr[i].size/1024/1024
                    if (!(type != 'image/jpg'||'image/png'||'image/jpeg')) {
                        this.$message.error('上传图片只能为jpg、jpeg、png格式！')
                        return;
                    } else if (size>1) {
                        this.$message.error('上传图片大小不能超过1M！')
                        return;
                    } else {
                        let data = new FormData();
                        data.append('image',fileArr[i])
                        data.append('type',2)
                        this.$upload('other/Img/upload',data)
                            .then(res=>{
                                this.images.push(res)
                            })
                    }
                }
            },
            // 说明图
            // 显示隐藏删除按钮
            mouseRemarkShow(val, index) {
                this.currentRemarkIndex = index
            },
            mouseRemarkHide(val, index) {
                this.currentRemarkIndex = -1
            },
            // 删除图片
            deleteRemarkImg(val, index) {
                this.introduce_images.splice(index, 1)

            },
            imgRemarkUpload(e) {
                e.preventDefault();
                let fileArr = e.target.files
                for (let i=0;i<fileArr.length;i++) {
                    const type = fileArr[i].type
                    const size = fileArr[i].size/1024/1024
                    if (!(type != 'image/jpg'||'image/png'||'image/jpeg')) {
                        this.$message.error('上传图片只能为jpg、jpeg、png格式！')
                        return;
                    } else if (size>1) {
                        this.$message.error('上传图片大小不能超过1M！')
                        return;
                    } else {
                        let data = new FormData();
                        data.append('image',fileArr[i])
                        data.append('type',3)
                        this.$upload('other/Img/upload',data)
                            .then(res=>{
                                this.introduce_images.push(res)
                            })
                    }
                }
            },
            editEquipData() {
                for(let i=0;i<this.images.length;i++) {
                    this.dialogImageIdArr.push((this.images[i].id).toString())
                }
                console.log(this.dialogImageIdArr)
                for(let i=0;i<this.introduce_images.length;i++) {
                    this.remarkImageIdArr.push((this.introduce_images[i].id).toString())
                }



                this.$post('equip/equip_add_update', {
                    equip_id: this.$route.query.equip_id,
                    equip_name: this.editRuleForm.equip_name,
                    price: this.editRuleForm.price,
                    purpose: this.editRuleForm.purpose,
                    classify_id: this.editRuleForm.classify_id,
                    classify_name: this.editRuleForm.classify_name,
                    is_hot: this.editRuleForm.is_hot,
                    is_sale: this.editRuleForm.is_sale,
                    sale_price: this.editRuleForm.sale_price,
                    images: JSON.stringify(this.dialogImageIdArr),
                    introduce_images: JSON.stringify(this.remarkImageIdArr)
                })
                    .then(res => {
                        this.$message.success(res.message)
                    })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.editEquipData();
                    } else {
                        this.$message.error('信息必填！')
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
            .el-select {
                float: left;
                width: 200px;
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
            table {
                width: 100%;
                thead {
                    background-color: #ccc;
                    tr {
                        td {
                            width: 160px;
                        }
                    }
                }
                tr {
                    td {
                        .el-input {
                            width: 160px;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .addImgBtn {
        .el-button {
            i {
                font-size: 40px;
            }
        }
    }
</style>
