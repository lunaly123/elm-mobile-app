<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <div class="title">
              <span>服务态度</span>
            </div>
            
            <Star :score="seller.serviceScore"></Star>
            <div class="score">
              <span>{{seller.serviceScore}}</span>
            </div>
          </div>
          <div class="score-wrapper">
            <div class="title">
              <span>商品评分</span>
            </div>
            <Star :score="seller.foodScore"></Star>
            <div class="score">
              <span>{{seller.foodScore}}</span>
            </div>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <Ratingselect 
        @changeSelectType="changeType"
        @changeContent="changeOnlyContent"
        :select-type="selectType" 
        :only-content="onlyContent"
        :ratings="ratings"
      >
      </ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li 
            v-for="(rating, index) in ratings" 
            :key="index"
            class="rating-item"
            v-show="needShow(rating.rateType, rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :score="rating.score"></star>
                <div class="delivery" v-show="rating.deliveryTime">
                    <span>
                    {{rating.deliveryTime}}
                  </span>
                </div>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <i class="iconfont icon-dianzan"></i>
                <span 
                  class="item" 
                  v-for="(item,index) in rating.recommend" 
                  :key="index"
                >
                {{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import { formatDate } from '@/common/js/date';
import Star from '@/components/star/star';
import Ratingselect from '@/components/rating-select/rating-select';
import Split from '@/components/split/split.vue';
import { getRatings } from '@/server/api';

const ALL = 2;
const debug = process.env.NODE_ENV !== 'production';

export default {
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  created() {
    getRatings().then(({data}) => {
      this.ratings = data.data.ratings;
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      });
    });
  },
  methods: {
    changeType(type) {
      this.selectType = type;
      console.log(type)
      this.$nextTick(() => {//DOM更新是异步的，直接refresh无法刷新
        this.scroll.refresh();
      })
    },
    changeOnlyContent(bl) {
      this.onlyContent = bl;
      console.log(bl)
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
  },
  components: {
    Star,
    Ratingselect,
    Split
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
}
</script>

<style lang="less">
@import url('./ratings.less');
</style>
