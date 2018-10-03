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
            <Cartcontrol 
              :food="food" 
              ref="cartcontrol" 
              @add="receive"
            >
            </Cartcontrol>
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
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li 
              class="rating-item"
              v-for="(rating,index) in food.ratings" 
              :key="index"
              v-show="needShow(rating.rateType, rating.text)"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" :src="rating.avatar" />
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <i 
                    class="iconfont" 
                    :class="{'icon-dianzan':rating.rateType === 0,'icon-yijin14-cai':rating.rateType === 1}"
                  ></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
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
import { formatDate } from '@/common/js/date';

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
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    show() {
      this.footShow = true;
      this.selectType = ALL;
      this.onlyContent = true;
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
    addFirst(event) {
      this.$set(this.food,'count',1);
      this.$emit('add',event.target);
    },
    receive(event) {
      this.$emit('seed',event);
    },
    changeType(type) {
      this.selectType = type;
      this.$nextTick(() => {//DOM更新是异步的，直接refresh无法刷新
        this.scroll.refresh();
      })
    },
    changeOnlyContent(bl) {
      this.onlyContent = bl;
      this.$nextTick(() => {//DOM更新是异步的，直接refresh无法刷新
        this.scroll.refresh();
      })
    },
    needShow(type, text) {
      if(this.onlyContent && !text) {
        return false;
      }
      if(this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  }
}
</script>

<style lang="less">
@import url('./food.less');
</style>

