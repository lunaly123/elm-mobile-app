<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          class="menu-item"
          v-for="(item,index) in goods"
          :key="index"
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
                  <!-- <cartcontrol :food="food"></cartcontrol> -->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getGoods } from '@/server/api';
import Cls from '@/common/cls-name/cls-name';
export default {
  data() {
    return {
      goods:[],
      cls:[]
    }
  },
  created() {
    getGoods().then(({data}) =>{
        this.goods = data.data.goods;
    }),
    this.cls = Cls;
  }
}
</script>

<style lang="less">
  @import url('./goods.less');
</style>
