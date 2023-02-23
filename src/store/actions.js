// export default {
//   addToCart(context, payload) {

    //payload新添加的商品
    //1.查找之前数组中是否由该商品
    // let oldProduct= context.state.cartList.find(item => item.iid === payload.iid)
    //
    // //2.判断oldProduct
    // if(oldProduct){
    //   // oldProduct.count += 1
    //   context.commit('addCounter',oldProduct)
    //   resolve('当前商品数量加1')
    // }else {
    //   payload.count = 1
    //   payload.checked = true;
    //   // context.state.cartList.push(payload)
    //   context.commit('addToCart', payload)
    //   resolve('添加了新的商品')
    // }

//   }
// }

import {ADD_TO_CART, ADD_COUNTER} from "@/store/mutations-types";

export default {
  addCart(context, payload) {
    return new Promise(((resolve, reject) => {
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldproduct) {
        context.commit(ADD_COUNTER,oldproduct)
        //  oldproduct.count++
        resolve('添加商品数量加1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART,payload)
        resolve('添加了新商品')
      }
    }))
  }
}
