<template>
  <div class="cartcontrol">
    <transition name="move">
      <div 
        class="cart-decrease" 
        v-show="food.count>0"
        @click.stop.prevent="decreaseCart"
      >
        <i class="inner iconfont icon-jianshao"></i>
      </div>
    </transition>
    <div 
      class="cart-count" 
      v-show="food.count>0" 
    >
    {{food.count}}
    </div>
    <div 
      class="cart-add" 
      @click.stop.prevent="addCart"
    >
      <i class="iconfont icon-zengjia"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object,
      default:()=> {}
    }
  },
  methods: {
    addCart(event) {
      if(!this.food.count){
        this.$set(this.food,'count',1);
      }else{
        this.food.count++;
      }
      this.$emit('add',event.target);
      console.log(event.target,this.food.count)
    },
    decreaseCart(event) {
      if(this.food.count){
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="less">
@import url('./cart-control.less');
</style>

