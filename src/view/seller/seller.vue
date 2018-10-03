<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <Star :score="seller.score"></Star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="box">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="box">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="box">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <i 
            class="iconfont icon-xihuan" 
            :class="{'active':favorite}"
            @click="toggleFavorite"
          ></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li 
            class="support-item border-1px" 
            v-for="(item,index) in seller.supports"
            :key="index"
          >
            <span class="icon" :class="cls[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <Split></Split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li 
              class="pic-item" 
              v-for="(pic,index) in seller.pics"
              :key="index"
            >
              <img :src="pic">
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li 
            class="info-item" 
            v-for="(info,index) in seller.infos"
            :key="index"
          >{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import Split from '@/components/split/split.vue';
import Star from '@/components/star/star';
import Cls from '@/common/cls-name/cls-name';
import { saveToLocal, loadFromLocal } from '@/common/js/store';

export default {
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Split,
    Star
  },
  data(){
    return {
      cls: [],
      favorite: false
    }
  },
  created() {
    this.cls = Cls;
  },
  mounted() {
    this.initScroll();
    this.initPics();
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  watch: {
    'seller'() {
      this.$nextTick(() => {
        this.initScroll();
        this.initPics();
        this.$set(this.seller,'id','123');
        this.favorite = loadFromLocal(this.seller.id, 'favorite', false)
      });
    }
  },
  methods: {
    initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    initPics() {
      if (this.seller.pics) {
        let dpi = window.devicePixelRatio;
        let screenWidth = window.screen.width;
        let pixel = dpi*screenWidth;
        let picWidth = Math.ceil((240*(pixel/750))/dpi);
        let margin = (12*(pixel/750))/dpi;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  }
}
</script>

<style lang="less">
@import url('./seller.less');
</style>
