<template>
    <div class="fruitIndex">
        <bread-crumb :path="this.$route.path"></bread-crumb>

    </div>
</template>

<script>
    import BreadCrumb from '@/components/breadCrumb'

    export default {
        name: "index",
        data() {
            return {}
        },
        components: {BreadCrumb},
        mounted() {

        }
    }
</script>

<style scoped>

</style>
