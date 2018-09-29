<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/header/header";
import { getSeller } from '@/server/api';

export default {
  name: 'App',
  components:{
    Header
  },
  data() {
    return {
      seller: {}
    }
  },
  created(){
      getSeller().then(({data}) =>{
        this.seller = data.data.seller;
      })
  }
}
</script>

<style lang="less" rel="stylesheet/less">
</style>