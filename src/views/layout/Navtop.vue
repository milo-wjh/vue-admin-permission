<template>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">tab1</el-menu-item> 
        <el-menu-item index="2">tab2</el-menu-item> 
        <el-menu-item index="3">tab3</el-menu-item> 
        <el-menu-item index="4">tab4</el-menu-item> 
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';
import Cookies from 'js-cookie';

export default {
    data() {
        var now = Cookies.get('tabActive') || '1';
        return {
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    methods: {
        handleSelect(index, keyPath) {
            this.$store.dispatch('ChangeTab', index);
        }
    },
    components: {},
    computed: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
li.is-active{
    background: #EEF1F6;
}
 
</style>



