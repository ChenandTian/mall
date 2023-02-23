<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button
      class="check-button"
      :is-checked="isSelectAll"
      @click.native="checkClick"/>
    <span>全选</span>
  </div>

  <div class="price">
    合计: {{totalPrice}}
  </div>

  <div class="calculate" @click="calcClick">
    去计算( {{checkLength}} )
  </div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data(){
    return{
      check: false
    }
  },
  computed:{
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.isChecked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.isChecked).length
    },
    isSelectAll() {
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length === 0) return false
     return  !this.$store.state.cartList.find(item => !item.isChecked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {  //全部选中
        this.$store.state.cartList.forEach(item => item.isChecked = false)
      }else{
        this.$store.state.cartList.forEach(item => item.isChecked = true)
      }

    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择要购买的商品!',2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;

  font-size: 14px;
}
.check-content{
  display: flex;
  /*line-height: 40px;*/
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 20px;
  flex: 1;
}
.calculate{
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;

}
</style>
