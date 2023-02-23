<template>
<div id="detail">
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll"
          :probe-type="3"
          @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
    <detail-param-info ref="params" :param-info="paramsInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <detail-bottom-bar @addToCart="addToCart"/>

  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  <toast/>
</div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";


import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import Toast from "@/components/common/toast/Toast";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import {debounce} from "@/common/utils";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";



export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Toast,

    Scroll,
    GoodsList,

  },
  mixins: [itemListenerMixin, backTopMixin],
  data(){
    return {
      iid : null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,


    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据传入的iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的轮播图的图片
      const data = res.result
      this.topImages = res.result.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3，获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //4.获取商品详细信息
      this.detailInfo = data.detailInfo;

      //5.获取参数信息
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo =data.rate.list[0]
      }

      // this.$nextTick(() => {
      //   //根据最新的数据，对应的DOM已经被渲染出来
      //   //但是图片依然没有加载完（目前获取到的offsetTop不包含其中的图片）
      //   //offsetTop值不对都是图片的原因
      //   this.themeTopYs = []
      //
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    })

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    //4.给getThemeTopY赋值(对给this。themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.$nextTick(() => {
        //根据最新的数据，对应的DOM已经被渲染出来
        //但是图片依然没有加载完（目前获取到的offsetTop不包含其中的图片）
        //offsetTop值不对都是图片的原因
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);

      });
    },100)
  },
  methods: {
    imgLoad() {
      this.refresh()

      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position){
      //是否显示回到顶部的按钮
      this.isShowBackTop = position.y < -1000

      const positionY = -position.y

      //使用positionY与主题中的Y值做对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        //2.方法二：
        // if(this.currentIndex !== 1 && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex

        // 1.方法一：使用较为简单且繁琐
        if(this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i ===
        length - 1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i;
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      //1.获取商品信息（获取购物车需要展示的信息）
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid

      //将商品对象添加到Vuex中(购物车)
      this.$store.dispatch('addCart', product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)

        this.$toast.show(res, 1500)
        console.log(this.$toast);
      })
    }
  },
  mounted() {
    //在这里面获取参数以及评论的offsetTop不准确,因为在mounted中，这时子组件有可能还没有加载完成
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }

}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }

 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }

 .content{
   height: calc(100% - 44px - 49px);
 }
</style>
