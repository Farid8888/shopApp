import { orderFunction } from "../actions/orders"
import { SET_PRODUCTS,UPDATE_PRODUCT,CREATE_PRODUCT, DELETE_PRODUCT } from "../actions/products"
import Product from "../../models/product"

const initialState={
    availabaleProducts:[],
    usersProducts:[]
}



const ProductsReducer =(state=initialState,action)=>{
    switch(action.type){
      case SET_PRODUCTS: return {usersProducts:action.products,availabaleProducts:action.products}
      case UPDATE_PRODUCT:
         const findedIndex = state.availabaleProducts.findIndex(prd=>prd.id === action.product.id)
         const product = new Product(
             action.product.id,
             state.usersProducts[findedIndex].ownerId,
             action.product.title,
             action.product.imageUrl,
             action.product.description,
             state.usersProducts[findedIndex].price
         )
          const newAvPr =[...state.availabaleProducts]
          newAvPr[findedIndex]=product
          const findedInd = state.usersProducts.findIndex(prd=>prd.id === action.product.id)
          const newUserPr = [...state.usersProducts]
          newUserPr[findedInd] = product
          return{availabaleProducts:newAvPr,usersProducts:newUserPr}
          case CREATE_PRODUCT:
          const newAvProd = state.availabaleProducts.concat(action.product)  
          const newUsPr = state.usersProducts.concat(action.product)
          return {availabaleProducts:newAvProd,usersProducts:newUsPr}
          case DELETE_PRODUCT:
             const delPr = state.availabaleProducts.filter(product=>product.id !==action.id) 
             const delUsPr = state.usersProducts.filter(product=>product.id !==action.id) 
             return {availabaleProducts:delPr,usersProducts:delUsPr}
     }
  
    return state
}


export default ProductsReducer