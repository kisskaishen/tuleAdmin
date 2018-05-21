<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="formModel" :rules="formRules" ref="formModel" label-width="140px">
                <el-form-item label="分类名称：" prop="class_name">
                    <el-input v-model="formModel.class_name" clearable placeholder="请设置分类名称"></el-input>
                </el-form-item>
                <el-form-item label="分类图片：" prop="class_img">
                    <el-upload
                        :action="$baseUrlApi+'other/Img/upload'"
                        list-type="picture-card"
                        :data="uploadData"
                        ref="upload"
                        :show-file-list="false"
                        :beforeUpload="uploadBefore"
                        :on-success="uploadSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类排序：" prop="sort">
                    <el-input v-model="formModel.sort" clearable placeholder="请设置分类排序"></el-input>
                    <div class="tip">
                        <p>(数字越小越靠前)</p>
                    </div>
                </el-form-item>
                <el-form-item label="已有分类：">
                    <el-dropdown trigger="click" placement="top-start">
                        <el-button type="primary">
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
                    sort: '',
                    class_img:''

                },
                uploadData: {type: 5},        // 图片上传的参数
                imageUrl:'',
                imageId:'',
                formRules: {
                    class_name: [
                        {required: true, message: '请输入装备类型', trigger: 'blur'}
                    ],
                    class_img:[],
                    sort: [
                        {required: true, validator: checkSort, trigger: 'change'}
                    ]
                },
                classify: []
            }
        },
        components: {BreadCrumb},
        mounted() {
            this.getEquipClassify()
        },
        methods: {
            // 获取装备分类
            getEquipClassify() {
                this.$post('equip/class_list')
                    .then(res => {
                        this.classify = res.data
                    })
            },
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
                this.imageId = res.data.id
                this.imageUrl = res.data.url
            },

            addClassify() {
                this.$post('equip/class_add_update', {
                    class_name: this.formModel.class_name,
                    sort: this.formModel.sort,
                    img_id:this.imageId
                })
                    .then(res => {
                        this.$message.success(res.message)
                        setTimeout(() => {
                            this.resetForm('formModel')
                            this.imageUrl = ''
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
<style lang="scss">
    .el-upload {
        float: left;
        img {
            width: 148px;
            height: 148px;
        }
    }
    .el-upload-list {
        float: left;
    }
</style>
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
