<template>
    <div class="addFruit">
        <bread-crumb :path="this.$route.path"></bread-crumb>

        添加果蔬类
    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "addFruit",
        components: {BreadCrumb},

    }
</script>

<style scoped>

</style>
