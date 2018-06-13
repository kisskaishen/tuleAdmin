<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
        <el-row>
            <el-col :span="6" :offset="1" v-for="item,index in homeInfo" :key="item.url">
                <div @mouseover="mouseover(item,index)" @mouseout="mouseout(item,index)">
                    <router-link :to="item.url">
                        <i :class="currentIndex==index?item.url.split('/')[1]+'Active':item.url.split('/')[1]"></i>
                        <p>{{item.title}}</p>
                    </router-link>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "index",
        data() {
            return {
                homeInfo:[],
                currentIndex:-1,
            }
        },
        components: {BreadCrumb},

        mounted() {
            this.getIndex()
        },
        methods: {
            getIndex() {
                this.$post('home/home_index')
                    .then(res=>{
                        this.homeInfo = res.data
                })
            },
            handleOpen() {
            },
            handleClose() {
            },
            mouseover(val,index) {
                this.currentIndex = index
            },
            mouseout(val,index) {
                this.currentIndex = -1
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-col {
        border: 1px solid #ccc;
        margin-top: 20px;
        border-radius: 10px;
        div {
            a {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-content: center;
                align-items: center;
                i {
                    width: 80px;
                    height: 80px;
                    margin: 20px;
                }
                p {
                    padding: 0 0 10px;
                    font-size: 20px;
                }
            }
        }
        .active {

        }

    }

</style>
