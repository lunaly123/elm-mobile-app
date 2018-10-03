<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          class="menu-item"
          v-for="(item,index) in goods"
          :key="index"
          :class="{'current':currentIndex === index}"
          @click="selectMenu(index)"
        >
          <span class="text">
            <span 
              class="icon"
              v-show="item.type>0"
              :class="cls[item.type]"
            ></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li 
          v-for="(item,index) in goods" 
          :key="index"
          class="food-list food-list-hook"
        >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li 
              v-for="(food,index) in item.foods" 
              :key="index"
              class="food-item"
              @click="selectFood(food)"
            >
              <div class="icon">
                <img :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">
                    月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%
                  </span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">
                    ￥{{food.oldPrice}}
                  </span>
                </div>
                <div class="cartcontrol-wrapper">
                  <Cartcontrol :food="food" @add="addBall"></Cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcar
      ref="shopCar"
      :delivery-price="seller.deliveryPrice" 
      :min-price="seller.minPrice"
      :select-foods="sellectFoods"
    ></Shopcar>
    <DetailFood 
      :food="currectFood" 
      ref="detailFood"
      @add="addBall"
      @seed="addBall"
    >
    </DetailFood>
  </div>
</template>
<script>
import { getGoods } from '@/server/api';
import Cls from '@/common/cls-name/cls-name';
import BScroll from 'better-scroll';
import Shopcar from '@/components/shop-car/shop-car';
import Cartcontrol from '@/components/cart-control/cart-control';
import DetailFood from '@/view/food/food';

export default {
  props: {
    seller: {
      type: Object,
      default: ()=> {}
    }
  },
  data() {
    return {
      goods: [],
      cls: [],
      listHeight: [],
      scrollY: 0,
      currectFood: {}
    }
  },
  components: {
    Shopcar,
    Cartcontrol,
    DetailFood
  },
  created() {
    getGoods().then(({data}) =>{
        this.goods = data.data.goods;
        this.$nextTick(() =>{
          this.initScroll();
          this.calulateHeight();
        })
    }),
    this.cls = Cls;
  },
  computed: {
    currentIndex() {
      for(let i =0;i<this.listHeight.length;i++){
        let curr = this.listHeight[i];
        let next = this.listHeight[i+1];
        if(!next || (this.scrollY >= curr && this.scrollY < next)){
          return i;
        }
      }
      return 0;
    },
    sellectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if(food.count) {
            foods.push(food)
          }
        })
      })
      return foods;
    }
  },
  methods:{
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper,{
        click:true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        probeType: 3,
        click:true
      })
      this.foodsScroll.on('scroll',((position) => {
        this.scrollY = Math.abs(Math.round(position.y));
      }))
    },
    calulateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height)
      Array.from(foodList).forEach(item => {
        height += item.clientHeight;
        this.listHeight.push(height)
      })
    },
    selectMenu(index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let currentEle = foodList[index];
      this.foodsScroll.scrollToElement(currentEle,300);
    },
    drop(el) {
      //强行异步处理下落动画，优化效果
      this.$nextTick(() => {
        this.$refs.shopCar.drop(el);
      });
    },
    addBall(el) {
      console.log(el)                          
      this.drop(el);
    },
    selectFood(food) {
      this.currectFood = food;
      this.$refs.detailFood.show();
    }
  }
}
</script>

<style lang="less">
  @import url('./goods.less');
</style>
