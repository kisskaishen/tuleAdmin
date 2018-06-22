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

                <el-form-item label="轮播图跳转类型：">
                    <el-select v-model="dataType">
                        <el-option
                            v-for="item,index in dataTypes"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="跳转商品ID：">
                    <el-input v-model="dataId"></el-input>
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
                    <span>数字越大约在上面，不填默认按添加时间正序</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitBtn">确认提交</el-button>
                    <el-button @click="goBack">回到列表页</el-button>
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
                // banner位置
                bannerTypes: [
                    {
                        id: '1',
                        label: '首页轮播'
                    },
                    {
                        id: '2',
                        label: '装备专区'
                    },
                    {
                        id: '3',
                        label: '活动专区'
                    }
                ],
                bannerType: '',
                // banner跳转的类型
                dataTypes:[
                    {
                        id:'1',
                        label:'门票'
                    },
                    {
                        id:'2',
                        label:'装备'
                    }
                ],
                dataType:'',
                // 对应的详情id
                dataId:'',

                imageUrl: '',
                imageUrlId:'',
                bannerSort: '',

                updateData: {type: '6'},


                // banner详情
                bannerDetail:''
            }
        },
        components: {BreadCrumb},
        mounted() {
            if (this.$route.query.id) {
                this.getBannerDetail()
            }
        },
        methods: {
            getBannerDetail() {
                this.$post('Banner/banner_detail',{
                    id:this.$route.query.id
                })
                    .then(res=>{
                        this.bannerDetail = res.data
                    })
            },
            // 上传图片
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.imageUrlId = res.data.id
            },
            // 上传图片前的准备
            beforeAvatarUpload(file) {
                this.updateData.image = file
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('轮播图片只能是 JPG/JPEG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('轮播图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            // 确认提交
            submitBtn() {
                this.$post('Banner/banner_add_update', {
                    type: this.bannerType,
                    data_type: this.dataType,
                    data: this.dataId,
                    url: this.imageUrlId,
                    sort: this.bannerSort,
                    id: this.$route.query.id ? this.$route.query.id : ''
                })
                    .then(res=>{
                        if (res.code == '200') {
                            this.$message.success(res.message)
                            this.$confirm('添加成功，是否继续添加?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '回到列表页',
                                type: 'warning'
                            })
                                .then(res=>{
                                    location.reload()
                                })
                                .catch(err=>{
                                    this.$router.push('/banner')
                                })
                        }
                    })
            },
            // 返回上一页
            goBack() {
                this.$router.push('/banner')
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        margin-top: 10px;
        .el-form {
            .el-form-item {
                .el-input, .el-select, .avatar-uploader,span,.el-button {
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
                span {
                    width: auto;
                    margin-left: 20px;
                    color: red;
                }
            }
        }
    }
</style>
