<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <div class="container">
            <el-form :model="addRuleForm" :rules="addRule" ref="addRuleForm" label-width="140px" class="demo-ruleForm">
                <el-form-item label="装备名称：" prop="equipName">
                    <el-input v-model="addRuleForm.equipName" placeholder="请输入装备名称"></el-input>
                </el-form-item>

                <el-form-item label="装备介绍：" prop="introduce">
                    <el-input type="textarea" :rows="3" v-model="addRuleForm.introduce"
                              placeholder="请填写装备介绍"></el-input>
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

                <el-form-item label="设置商品规格：" prop="spec">
                    <el-radio-group v-model="addRuleForm.spec">
                        <el-radio :label="1" border>单规格</el-radio>
                        <el-radio :label="2" border>双规格</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="spec1">
                    <el-select v-model="addRuleForm.spec1">
                        <el-option
                            v-for="item in specList"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"></el-option>
                    </el-select>
                    <el-tag
                        :key="tag"
                        v-for="tag in tags"
                        closable
                        :disable-transitions="false"
                        @close="tagClose(tag)">{{tag}}</el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputVal"
                        ref="saveTagInput"
                        @keyup.enter.native="saveInputVal"
                        @blur="saveInputVal"></el-input>
                    <el-button v-else class="button-new-tag" @click="showInput">+添加</el-button>
                </el-form-item>

                <el-form-item prop="spec2">
                    <el-select v-model="addRuleForm.spec2">
                        <el-option
                            v-for="item in specList"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="规格尺寸价格图片：">
                    <el-table>
                        <el-table-column :label="tags[0]"></el-table-column>
                        <el-table-column label="当前库存"></el-table-column>
                        <el-table-column label="设置库存"></el-table-column>
                        <el-table-column label="价格"></el-table-column>
                        <el-table-column label="缩略图"></el-table-column>
                    </el-table>
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
        name: "add-equip",
        data() {
            var checkTicket = (rule, val, cb) => {
                if (val == '') {
                    cb(new Error('请设置库存数量！'))
                } else if (!Number.isInteger(val) || val < 0) {
                    cb(new Error('库存必须为大于0的数字！'))
                } else {
                    cb();
                }
            }
            return {
                addRuleForm: {
                    ticketName: '',
                    address: '',
                    ticketNum: '',
                    startNum: 1,
                    startTime: '',
                    introduce: '',
                    dialogImageUrl: '',
                    tip: '',
                    spec:2,
                    spec1:'',
                    spec2:'',
                },
                specList:[
                    {
                        id:'1',
                        label:'规格1'
                    },
                    {
                        id:'2',
                        label:'规格2'
                    },
                    {
                        id:'3',
                        label:'规格3'
                    }
                ],
                addRule: {
                    equipName: [
                        {required: true, message: '请输入门票名称', trigger: 'blur'}
                    ],
                    introduce: [
                        {required: true, message: '请填写景点介绍', trigger: 'blur'}
                    ]
                },
                startTimeShow: false,        // 发团时间选择
                dialogVisible: false,        // 图片
                tags:[],        // 标签数组
                inputVisible:false,
                inputVal:'',
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
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
            },

            // 删除添加de标签
            tagClose(tag) {
                this.tags.splice(this.tags.indexOf(tag),1)
            },
            // 显示标签输入框
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_=>{
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            },
            // 保存输入内容
            saveInputVal() {
                if (this.inputVal) {
                    this.tags.push(this.inputVal)
                }
                console.log(this.tags)
                this.inputVisible = false
                this.inputVal = ''
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
            .el-tag+.el-tag {
                margin-left: 10px;
                float: left;
            }
            .el-tag {
                margin-left: 10px;
                float: left;
            }
            .button-new-tag {
                margin-left: 10px;
            }
            .input-new-tag {
                width: 100px;
                margin-left: 10px;
                vertical-align: middle;
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
