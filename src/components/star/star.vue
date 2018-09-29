<template>
  <div class="star">
    <span 
      v-for="(star,index) in stars" 
      :class="star" class="star-item"
      :key="index"
    ></span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default{
  props:{
    score:{
      type:Number
    }
  },
  computed:{
    stars() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for(let i = 0;i<integer;i++){
        result.push(CLS_ON);
      }
      if(hasDecimal){
        result.push(CLS_HALF);
      }
      while(result.length < LENGTH){
        result.push(CLS_OFF);
      }
      return result;
    }
  }
}
</script>

<style lang="less">
  .star{
    font-size: 0;
    vertical-align: center;
    display: flex;
    margin: 0 1.5rem;
    justify-content: space-between;
    .star-item{
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      background-size: 0.48rem 0.48rem;
      background-repeat: no-repeat;
      &.last-child{
        margin-right: 0;
      }
      &.on{
        background-image: url('./star48_on@3x.png')
      }
      &.half{
        background-image: url('./star48_half@3x.png')
      }
      &.off{
        background-image: url('./star48_off@3x.png')
      }
    }
  }
</style>