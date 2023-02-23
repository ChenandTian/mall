// import {
//   ADD_COUNTER,
//   ADD_TO_CART
// } from "@/store/mutations-types";
//
// export default {
//   //mutation唯一的目的就是修改state中的状态
//   //mutation中的每个方法尽可能完成的事件比较单一一点
//   [ADD_COUNTER](state, payload){
//     payload.count++
//   },
//   [ADD_TO_CART](state, payload){
//     state.cartList.push(payload)
//   },
//
// }


import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutations-types";

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.isChecked = true
    state.cartList.push(payload)
  }
}
