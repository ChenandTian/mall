// import Vue from "vue";
// import Vuex from "vuex";
//
// import mutations from "@/store/mutations";
// import actions from "@/store/actions";
//
// //安装插件
// Vue.use(Vuex)
//
// //创建Store对象
// const store = new Vuex.Store({
//   state:{
//     cartList: []
//   },
//   mutations,
//   actions
// })
//
// //3.挂载Vue实例上
// export default store
//
//
//
// import Vue from 'vue'
// import Vuex from 'vuex'
//
// import getters from "@/store/getters";
//
// //1.安装插件
// Vue.use(Vuex)
//
// //2.创建store对象
// const store = new Vuex.Store({
//   state: {
//     cartList: []
//   },
//   getters,
//   //修改store里的东西都需要经过mutations
//   mutations: {
//     addCart(context, payload){
//       // let oldProduct = null;
//       // for(let item of state.cartList){
//       // 	if(item.iid === payload.iid){
//       // 		oldProduct = item
//       // 	}
//       // }
//       //数组find()方法
//       return new Promise((resolve, reject) => {
//         let oldProduct = context.cartList.find(function(item){
//           return item.iid === payload.iid
//         })
//         if(oldProduct){
//           oldProduct.count += 1;
//           resolve('当前商品数量加1')
//         }else {
//           payload.count = 1;
//           payload.checked = true;
//           context.cartList.push(payload)
//           resolve('添加了新的商品')
//         }
//       })
//       // state.cartList.push(payload)
//       // console.log(payload);
//     }
//   }
// })
//
// //3.挂载
// export default store


import Vue from "vue";
import Vuex from "vuex";

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters

  }
)

export default store
