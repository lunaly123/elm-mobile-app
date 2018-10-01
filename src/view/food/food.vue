<template>
  <transition name="move">
    <div 
      class="food"
      v-show="footShow"
      ref="food"
    >
      <div class="food-content">
        <div class="image">
          <img :src="food.image" alt="image">
          <i class="iconfont icon-arrow-left" @click="back"></i>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">
              ￥{{food.oldPrice}}
            </span>
          </div>
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food" ref="cartcontrol"></Cartcontrol>
          </div>
          <transition name="fade">
              <div 
              class="buy" 
              v-show="!food.count ||food.count === 0"
              @click.stop.prevent="addFirst"
            >
              加入购物车
            </div>    
          </transition>
        </div>
        <Split v-show="food.info"></Split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <Ratingselect
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @changeSelectType="changeType"
            @changeContent="changeOnlyContent"
          ></Ratingselect>
        </div>
      </div>
    </div>
  </transition>
  
</template>

<script>
import BScroll from 'better-scroll';
import Cartcontrol from '@/components/cart-control/cart-control';
import Split from '@/components/split/split';
import Ratingselect from '@/components/rating-select/rating-select';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    food:{
      type:Object,
      default: () => {}
    }
  },
  components: {
    Cartcontrol,
    Split,
    Ratingselect
  },
  data() {
    return {
      footShow:false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all:'全部',
        positive:'推荐',
        negative:'吐槽'
      }
    }
  },
  methods: {
    show() {
      this.footShow = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.food,{
            click:true
          });
        } else {
          this.scroll.refresh();
        }
      })
    },
    back() {
      this.footShow = false;
    },
    addFirst(ev) {
      this.$set(this.food,'count',1);
      this.$refs.cartcontrol.addCart(ev);
    },
    changeType(type) {
      this.selectType = type;
    },
    changeOnlyContent(bl) {
      this.onlyContent = bl;
    }
  }
}
</script>

<style lang="less">
@import url('./food.less');
</style>

