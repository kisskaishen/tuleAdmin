<template>
    <div>
        <bread-crumb :path="this.$route.path"></bread-crumb>
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'
    export default {
        name: "index",
        data() {
            return {

            }
        },
        components:{BreadCrumb},
        mounted(){
            console.log(this.$route.path)
        }
    }
</script>

<style scoped>

</style>
