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
                <!--
                                <el-form-item label="设置商品规格：" prop="spec">
                                    <el-radio-group v-model="addRuleForm.spec" @change="specChoose">
                                        <el-radio label="1" border>单规格</el-radio>
                                        <el-radio label="2" border>双规格</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item prop="spec1">
                                    <el-select v-model="addRuleForm.spec1" @change="spec1Choose">
                                        <el-option
                                            v-for="item in specList"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.label"></el-option>
                                    </el-select>
                                    <el-tag
                                        :key="tag"
                                        v-for="tag in tags1"
                                        closable
                                        :disable-transitions="false"
                                        @close="tagClose1(tag)">{{tag}}
                                    </el-tag>
                                    <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible1"
                                        v-model="inputVal1"
                                        ref="saveTagInput1"
                                        @keyup.enter.native="saveInputVal1"
                                        @blur="saveInputVal1"></el-input>
                                    <el-button v-else class="button-new-tag" @click="showInput1">+添加</el-button>
                                </el-form-item>

                                <el-form-item prop="spec2" v-if="this.addRuleForm.spec == '2'">
                                    <el-select v-model="addRuleForm.spec2" @change="spec2Choose">
                                        <el-option
                                            v-for="item in specList"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.label"></el-option>
                                    </el-select>
                                    <el-tag
                                        :key="tag"
                                        v-for="tag in tags2"
                                        closable
                                        :disable-transitions="false"
                                        @close="tagClose2(tag)">{{tag}}
                                    </el-tag>
                                    <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible2"
                                        v-model="inputVal2"
                                        ref="saveTagInput2"
                                        @keyup.enter.native="saveInputVal2"
                                        @blur="saveInputVal2"></el-input>
                                    <el-button v-else class="button-new-tag" @click="showInput2">+添加</el-button>
                                </el-form-item>


                                <el-form-item label="规格尺寸价格图片：">
                                    <table>
                                        <thead>
                                        <tr>
                                            <td v-if="this.addRuleForm.spec2">{{addRuleForm.spec2}}</td>
                                            <td v-if="this.addRuleForm.spec1">{{addRuleForm.spec1}}</td>
                                            <td>当前库存</td>
                                            <td>设置库存</td>
                                            <td>价格</td>
                                            <td>SKU缩略图</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in tbodyes">
                                            <td v-if="addRuleForm.spec1">{{item.spec1}}</td>
                                            <td><span>{{item.currentStorage}}</span></td>
                                            <td>
                                                <el-input v-model="item.setStorage" size="small" placeholder="设置当前库存"></el-input>
                                            </td>
                                            <td>
                                                <el-input v-model="item.price" size="small" placeholder="设置价格"></el-input>
                                            </td>
                                            <td>1111</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </el-form-item>-->
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
                    spec: '1',
                    spec1: '',
                    spec2: '',
                },
                specList: [
                    {
                        id: '1',
                        label: '规格1'
                    },
                    {
                        id: '2',
                        label: '规格2'
                    },
                    {
                        id: '3',
                        label: '规格3'
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
                dialogVisible: false,        // 图片
                tags1: [],        // 标签数组
                inputVisible1: false,
                inputVal1: '',
                tags2: [],        // 标签数组
                inputVisible2: false,
                inputVal2: '',

                tbodyes: [],
            }
        },
        components: {BreadCrumb},
        mounted() {

        },
        methods: {
            // 上传图片
            handlePictureCardPreview() {

            },
            // 规格种类选择，是一种还是两种规格
            specChoose(e) {
                this.$alert('商品规格会清空', '提示', {
                    confirmButtonText: '确认',
                    callback: action => {
                        this.addRuleForm.spec1 = ''
                        this.addRuleForm.spec2 = ''
                        this.tbodyes = []
                    }
                })
            },
            // spec1选择
            spec1Choose(val) {
                if (this.addRuleForm.spec1 == this.addRuleForm.spec2) {
                    this.$message.error('规格1与规格2不能相同！')
                    this.addRuleForm.spec1 == ''
                } else {
                    this.addRuleForm.spec1 = val

                }

            },
            // spec2选择
            spec2Choose(val) {
                if (this.addRuleForm.spec2 == this.addRuleForm.spec1) {
                    this.$message.error('规格1与规格2不能相同！')
                    this.addRuleForm.spec2 == ''
                } else {
                    this.addRuleForm.spec2 = val
                }
            },

            // 删除添加de标签
            tagClose1(tag) {
                this.tags1.splice(this.tags1.indexOf(tag), 1)
            },
            // 显示标签输入框
            showInput1() {
                if (this.addRuleForm.spec1) {
                    this.inputVisible1 = true;
                    this.$nextTick(_ => {
                        this.$refs.saveTagInput1.$refs.input.focus()
                    })
                } else {
                    this.$message.warning('请先选择规格1')
                }

            },
            // 保存输入内容
            saveInputVal1() {
                let list1 = {}
                if (this.inputVal1) {
                    this.tags1.push(this.inputVal1)
                }
                // console.log(this.tags1)
                this.inputVisible1 = false
                this.inputVal1 = ''

                for (let i = 0; i < this.tags1.length; i++) {
                    console.log(this.tags1.length)
                    list1 = {
                        'spec1': this.tags1[i],
                        'currentStorage': '0',
                        'setStorage': '',
                        'price': '',
                    }
                    console.log(list1)

                }
                // console.log(list1)
                this.tbodyes.push(list1)

                console.log(this.tbodyes)

            },
            // 删除添加de标签
            tagClose2(tag) {
                this.tags2.splice(this.tags2.indexOf(tag), 1)
            },
            // 显示标签输入框
            showInput2() {
                if (this.addRuleForm.spec2) {
                    this.inputVisible2 = true;
                    this.$nextTick(_ => {
                        this.$refs.saveTagInput2.$refs.input.focus()
                    })
                } else {
                    this.$message.warning('请先选择规格2')
                }

            },
            // 保存输入内容
            saveInputVal2() {
                if (this.inputVal2) {
                    this.tags2.push(this.inputVal2)
                }
                this.inputVisible2 = false
                this.inputVal2 = ''
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
            .el-tag + .el-tag {
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
    .el-upload {
        float: left;
    }

    .el-upload--picture-card {
        float: left;
    }
</style>
