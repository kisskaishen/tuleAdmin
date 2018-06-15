<template>
    <div class="editBanner">
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form label-width="180px">
                <el-form-item label="轮播图所在页面：">
                    <el-select v-model="bannerType">
                        <el-option
                            v-for="item,index in bannerTypes"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="轮播图图片：">
                    <el-upload
                        class="avatar-uploader"
                        :action="$baseUrlApi+'other/Img/upload'"
                        :data="updateData"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </el-form-item>
                <el-form-item label="轮播图排序：">
                    <el-input v-model="bannerSort"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "editBanner",
        data() {
            return {
                bannerTypes: [
                    {
                        id: '1',
                        label: '门票轮播图'
                    },
                    {
                        id: '2',
                        label: '装备轮播图'
                    },
                    {
                        id: '6',
                        label: '首页轮播图'
                    }
                ],
                bannerType: '',
                imageUrl:'',
                bannerSort: '',
                updateData:{type:'6'}
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'||file.type === 'image/jpg'||file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('轮播图片只能是 JPG/JPEG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('轮播图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 10px;
        .el-form {
            .el-form-item {
                .el-input, .el-select,.avatar-uploader {
                    float: left;
                    width: 200px;
                }
                .avatar-uploader .el-upload {
                    border: 1px dashed #ccc;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                }
                .avatar-uploader .el-upload:hover {
                    border-color: #409EFF;
                }
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 375px;
                    height: 150px;
                    line-height: 150px;
                    text-align: center;
                    border: 1px dashed #ccc;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
                .avatar {
                    width: 375px;
                    height: 150px;
                    display: block;
                }
            }
        }
    }
</style>
