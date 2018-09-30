<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div 
            class="logo" 
            :class="{'highlight':totalCount > 0}"
          >
            <i 
              class="iconfont"
              :class="{'icon-gouwuchekong':totalCount === 0 ,'highlight':totalCount > 0,'icon-gouwucheman':totalCount > 0}" 
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
    <transition name="fold">
      <div 
        class="shopcart-list" 
        v-show="listShow"
      >
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <div>
          <span class="empty" @click="empty">清空</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li 
              class="food" 
              v-for="(food,index) in selectFoods"
              :key="index"
            >
              <div><span class="name">{{food.name}}</span></div>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol :food="food"></Cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Cartcontrol from '@/components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';

export default {
  props:{
    selectFoods:{
      type:Array,
      default: ()=> []
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
  data(){
    return {
      fold: true
    }
  },
  components: {
    Cartcontrol
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
    listShow() {
      if(!this.totalCount) {
        this.fold = true;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    toggleList(){
      if(!this.totalCount){
        return;
      }
      this.fold = !this.fold;
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
  }
}
</script>

<style lang="less">
@import url('./shop-car.less');
</style>



