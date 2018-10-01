<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span 
        class="box posi" 
        :class="{'active':selectType === 2}"
        @click="selected(2)"
      >
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span 
        class="box posi" 
        :class="{'active':selectType === 0}"
        @click="selected(0)"
      >
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span 
        class="box nega" 
        :class="{'active':selectType === 1}"
        @click="selected(1)"
      >
        {{desc.negative}} 
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div 
      class="switch" 
      :class="{'on':onlyContent}"
      @click="toggleContent"
    >
      <i class="iconfont icon-xuanze"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default: ()=> []
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default:()=> false
    },
    desc: {
      type: Object,
      default() {
        return {
          all:'全部',
          positive:'满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    selected(type) {
      this.$emit('changeSelectType',type)
    },
    toggleContent() {
      this.$emit('changeContent',!this.onlyContent)
    }
  }
}
</script>

<style lang="less">
@import url('./rating-select.less');
</style>

