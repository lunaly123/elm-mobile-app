<template>
  <div class="header">
    <!--header-->
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="avatra"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div> 
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="cls[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-arrow-right"></i>
    </div>
    <!-- 背景 -->
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%"/>
    </div>
    <!-- 详情弹出层 -->
    <div 
      class="detail"
      v-show="detailShow"
    >
      <div class="detail-wrapper">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <Star :score="seller.score"></Star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li 
                class="support-item" 
                v-for="(item,index) in seller.supports"
                :key="index"
              >
                <span class="icon" :class="cls[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
          </div>
        </div>
      </div>
      <!-- stricky footer -->
      <div 
        class="detail-close"
        @click="closeDetail"
      >
        <i class="iconfont icon-guanbi"></i>
      </div>
    </div>
    <tab 
      :line-width="2"
      bar-active-color="#f33" 
      active-color='#f33'
    >
      <tab-item 
      @on-item-click="skipPage"
      selected 
      >
        商品
      </tab-item>
      <tab-item 
      @on-item-click="skipPage" 
      >
        评价
      </tab-item>
      <tab-item 
      @on-item-click="skipPage" 
      >
        商家
      </tab-item>
    </tab>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import Star from '@/components/star/star';
export default {
  props: {
    seller: {
      type: Object,
      default:() => {}
    }
  },
  data(){
    return {
      cls: [],
      detailShow: false
    }
  },
  components: {
    Tab,
    TabItem,
    Star
  },
  created(){
    this.cls = ['decrease','discount','special','invoice','guarantee'];
  },
  methods: {
    //设置tab线条宽度
    getBarWidth(index) {
      let num;
      index == 1 ? (num = 28) : (num = 42);
      index % 2 == 0 ? (num = 56) : true;
      return num + "px";
    },
    skipPage(index) {
      if (index == 0) {
        this.$router.push({
          name: "goods"
        });
      } else if (index == 1) {
        this.$router.push({
          name: "ratings"
        });
      } else if (index == 2) {
        this.$router.push({
          name: "seller"
        });
      }
    },
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    }
  }
};
</script>

<style lang="less">
  @import url('./header.less');
</style>