import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";

//两个组件之间使用混入来进行重复代码的复用
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh(), 100)

    this.itemImgListener = () => {
      this.refresh()
    }

    this.$bus.$on('itemImgLoad',this.itemImgListener)
    // console.log('我是混入中的内容');
  }
}

export const backTopMixin ={
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}
