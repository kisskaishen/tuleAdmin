<template>
    <div class="editBanner">
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <div class="bannerDiv">
                <div class="bannerImg">
                    <el-upload
                        class="avatar-uploader"
                        :action="$baseUrlApi+'other/Img/upload'"
                        :show-file-list="false"
                        :data="uploadData"
                        :on-success="uploadSuccess"
                        :before-upload="uploadBefore">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="bannerInfo">
                    <div class="info">
                        <span>跳转的商品ID：</span>
                        <el-input v-model="goodsId" placeholder="跳转的商品id" v-if="!goodsSpan"></el-input>
                        <span v-else>{{goodsId}}</span>
                    </div>
                    <div class="info">
                        <el-button :type="btnType" @click="changeType">{{btnName}}</el-button>
                        <el-button type="danger">删除</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "editBanner",
        data() {
            return {
                goodsId:'',
                bannerId: '',
                bannerIdArr: [],
                uploadData: {type: 1},        // 图片上传的参数
                imageUrl:'',
                goodsSpan:false,
                btnType:'success',
                btnName:'确定'
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
                this.imageUrl = res.data.url
                this.bannerId = res.data.id
            },
            // 更改按钮
            changeType() {
                if (this.goodsSpan) {
                    this.goodsSpan = false
                    this.btnType = 'success'
                    this.btnName = '确定'
                } else {
                    this.goodsSpan = true
                    this.btnType = 'primary'
                    this.btnName = '修改'

                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .bannerDiv {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 20px;
        padding: 10px;
        border-top: 1px solid #ccc;
        .bannerImg {
            margin-right: 20px;
            .avatar-uploader {
                .el-upload {
                    border: 1px solid red;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    &:hover {
                        border-color: #409EFF;
                    }
                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 375px;
                        height: 150px;
                        line-height: 150px;
                        text-align: center;
                        border:1px dashed #ccc;
                        -webkit-border-radius: 6px;
                        -moz-border-radius: 6px;
                        border-radius: 6px;
                    }
                    img {
                        width: 375px;
                        height: 150px;
                    }
                }
            }
        }
        .bannerInfo {
            .info {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 10px;
                .el-input {
                    width: 140px;
                }
            }

        }
    }
</style>
