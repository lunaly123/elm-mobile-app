<template>
  <div class="shopcart">
    <div class="content" >
      <div class="content-left">
        <div class="logo-wrapper">
          <div 
            class="logo" 
            :class="{'highlight':totalCount > 0}"
          >
            <i 
              class="iconfont"
              :class="{'icon-gouwuchekong':totalCount < 0 ,'highlight':totalCount > 0,'icon-gouwucheman':totalCount > 0}" 
            ></i>
          </div>
          <div 
            class="num" 
            v-show="totalCount > 0"
          >{{totalCount}}</div>
        </div>
        <div 
          class="price" 
        >
          ￥{{totalPrice}}元
        </div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div 
          class="pay" 
          :class="payClass"
        >
        {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    selectFoods:{
      type:Array,
      default: ()=> [
        {
          price:15,
          count:1
        }
      ]
    },
    deliveryPrice:{
      type:Number,
      default:0
    },
    minPrice:{
      type:Number,
      default:0
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((item)=>{
        total += item.price * item.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((item)=>{
          count += item.count;
      });
      return count;
    },
    payDesc() {
      if(this.totalPrice === 0){
        return `¥${this.minPrice}元起送`; 
      }else if(this.totalPrice<this.minPrice){
        let diff = this.minPrice - this.totalPrice;
        return `还差¥${diff}元起送`
      }else{
        return '去结算';
      }
    },
    payClass() {
      if(this.totalPrice< this.minPrice){
        return 'not-enough';
      }else{
        return 'enough';
      }
    },
  }
}
</script>

<style lang="less">
@import url('./shop-car.less');
</style>



